import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { Product } from '@prisma/client'
import prisma from "@/../prisma/prisma";

interface OrderItem {
    itemId: string;
    quantity: number;
}

interface RequestBody {
    order: OrderItem[];
}

interface Notes {
    [key: string]: number;
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const userId = "67477ba83d297752ec40ad33";

export async function POST(request: NextRequest) {
    try {
        // Parse and validate the request body
        const body = (await request.json()) as RequestBody;
        const { order } = body;

        if (!Array.isArray(order) || order.length === 0) {
            return NextResponse.json({ error: "Order must be a non-empty array" }, { status: 400 });
        }

        if (!userId || typeof userId !== "string") {
            return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
        }

        // Fetch user
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch products in bulk
        const productIds = order.map((item) => item.itemId);
        const products: Product[] = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        const productMap = new Map(products.map((product) => [product.id, product]));
        let totalAmount = 0;
        const notes: Notes = {};

        for (const item of order) {
            const product = productMap.get(item.itemId);
            if (product && product.quantity >= item.quantity) {
                totalAmount += product.price * item.quantity;
                notes[product.id] = item.quantity;
            } else {
                return NextResponse.json(
                    { error: `Product not found or insufficient quantity for itemId: ${item.itemId}` },
                    { status: 400 }
                );
            }
        }

        // Create Razorpay order
        const receipt = `${user.name},${user.phoneNumber},TA:${totalAmount}`.slice(0, 40);
        const options = {
            amount: totalAmount * 100, // Razorpay expects amount in paise
            currency: "INR",
            receipt,
            notes,
        };

        const razorpayOrder = await razorpay.orders.create(options);

        // Store temporary order data
        await prisma.tempOrders.create({
            data: {
                orderId: razorpayOrder.id,
                orderItems: JSON.stringify(
                    products.map((product) => ({
                        quantity: notes[product.id],
                        price: product.price,
                        productId: product.id,
                        name: product.name,
                    }))
                ),
                updateProducts: JSON.stringify(
                    products.map((product) => ({
                        where: { id: product.id },
                        data: {
                            quantity: { decrement: notes[product.id] },
                        },
                    }))
                ),
                totalAmount,
                createdAt: new Date(),
            },
        });

        // Return Razorpay order
        return NextResponse.json(razorpayOrder);
    } catch (error) {
        console.error("Error:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
