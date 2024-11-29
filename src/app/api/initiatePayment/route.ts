import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
interface RequestBody {
    order: Array<{
        itemId: string;
        quantity: number;
    }>;
}
interface Notes {
    [key: string]: number;
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});
const userId = "67477ba83d297752ec40ad33"
export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as RequestBody;
        const { order } = body;

        // Validate inputs
        if (!Array.isArray(order) || order.length === 0) {
            return NextResponse.json({ error: 'Order must be a non-empty array' }, { status: 400 });
        }
        if (!userId || typeof userId !== 'string') {
            return NextResponse.json({ error: 'Invalid or missing userId' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        // Fetch products in bulk
        const productIds = order.map(item => item.itemId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        const productMap = new Map(products.map(product => [product.id, product]));
        let totalAmount = 0;
        const notes: Notes = {};

        for (const item of order) {
            const product = productMap.get(item.itemId);
            if (product && product.quantity >= item.quantity) {
                totalAmount += product.price * item.quantity;
                notes[product.id] = item.quantity;
            } else {
                return NextResponse.json({ error: 'Product not found or insufficient quantity' }, { status: 400 });
            }
        }

        const receipt = `${user.name},${user.phoneNumber},TA:${totalAmount}}`;
        const options = {
            amount: totalAmount * 100, // Razorpay expects amount in paise (1 INR = 100 paise)
            currency: "INR",
            receipt: receipt.slice(0, 40),
            notes: notes,
        };

        // Create Razorpay order
        try {
            const razorpayOrder = await razorpay.orders.create(options);
            return NextResponse.json(razorpayOrder);
        } catch (razorpayError) {
            console.error('Razorpay API error:', razorpayError);
            return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
        }

    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
}

