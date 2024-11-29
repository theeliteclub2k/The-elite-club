import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { PrismaClient, Product } from '@prisma/client'

const prisma = new PrismaClient()
export async function POST(request: NextRequest) {
    try {
        // Get request body
        const body = await request.json();
        const { payment } = body;
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payment;

        // Create the expected signature for verification
        const bodyText = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(bodyText)
            .digest("hex");

        // Verify the payment signature
        if (expectedSignature !== razorpay_signature) {
            console.log("Payment signature mismatch.");
            return NextResponse.json({ message: "Payment is not verified" }, { status: 400 });
        }

        console.log("Payment is verified");

        // Create payment record in DB
        const paymentData = await prisma.payment.create({
            data: {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
            },
        });

        // Fetch Razorpay order details
        const response = await fetch(
            `https://api.razorpay.com/v1/orders/${razorpay_order_id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${Buffer.from(
                        `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
                    ).toString('base64')}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch order details from Razorpay.");
        }

        const data = await response.json();
        const orderItems = Object.keys(data.notes || {});
        console.log("Order items:", orderItems);

        // Fetch product details
        const products = await prisma.product.findMany({
            where: { id: { in: orderItems } },
        });

        // Map products to order items
        const orderItemsData = products.map((product: Product) => ({
            quantity: data.notes[product.id],
            price: product.price,
            product: { connect: { id: product.id } },
        }));

        // Create order in DB
        const order = await prisma.order.create({
            data: {
                status: 'PENDING',
                totalAmount: data.amount / 100,
                userId: '67477ba83d297752ec40ad33', // Retrieve the actual user ID from session or token
                paymentId: paymentData.id,
                items: { create: orderItemsData },
            },
        });
        console.log("Order created:", order);

        // Update product quantities
        const productUpdates = products.map((product: Product) => ({
            where: { id: product.id },
            data: {
                quantity: { decrement: data.notes[product.id] },
            },
        }));

        // Use Prisma transaction to ensure consistency
        await prisma.$transaction(async (prisma) => {
            for (const update of productUpdates) {
                await prisma.product.update(update);
            }
        });

        console.log("Product quantities updated");

        // Return response
        return NextResponse.json({ message: "Payment is verified and order created" }, { status: 200 });

    } catch (error) {
        console.error("Error:", error);
        // Return a detailed error response
        return NextResponse.json({ error: (error instanceof Error) ? error.message : "Unknown error" }, { status: 500 });
    }
}
