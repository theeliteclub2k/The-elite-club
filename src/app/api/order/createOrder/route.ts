import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Product, User } from "@prisma/client";
import { sendWhatsAppMessage } from "@/services/whatsappService";

import prisma from "@/../prisma/prisma";

interface PaymentDetails {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export async function POST(request: NextRequest) {
  try {
    const { payment } = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }: PaymentDetails = payment;

    // Verify payment signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Payment signature mismatch.");
      return NextResponse.json(
        { message: "Payment verification failed" },
        { status: 400 }
      );
    }

    console.log("Payment verified successfully");

    // Store payment record in database
    const paymentData = await prisma.payment.create({
      data: { razorpay_payment_id, razorpay_order_id, razorpay_signature },
    });

    let orderItems: any[];
    let updateProducts: any[];
    let amount: number;

    // Fetch temp order or order details from Razorpay
    const tempOrder = await prisma.tempOrders.findUnique({
      where: { orderId: razorpay_order_id },
    });

    if (tempOrder) {
      orderItems = JSON.parse(tempOrder.orderItems);
      updateProducts = JSON.parse(tempOrder.updateProducts);
      amount = tempOrder.totalAmount;
    } else {
      console.log("Fetching order details from Razorpay");
      const response = await fetch(
        `https://api.razorpay.com/v1/orders/${razorpay_order_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`
            ).toString("base64")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order details from Razorpay");
      }

      const data = await response.json();
      const products = await prisma.product.findMany({
        where: { id: { in: Object.keys(data.notes || {}) } },
      });

      orderItems = products.map((product: Product) => ({
        quantity: data.notes[product.id],
        price: product.price,
        product: { connect: { id: product.id } },
      }));

      updateProducts = products.map((product: Product) => ({
        where: { id: product.id },
        data: {
          quantity: { decrement: data.notes[product.id] },
        },
      }));

      amount = data.amount;
    }

    // Create order in the database
    const order = await prisma.order.create({
      data: {
        status: "PENDING",
        totalAmount: amount,
        userId: "67477ba83d297752ec40ad33", // Replace with the actual user ID from session/token
        paymentId: paymentData.id,
        items: { create: orderItems.map(({ name, ...rest }) => rest) },
      },
    });
    console.log("Order created:", order);

    // Update product quantities and delete temp order in a transaction
    await prisma.$transaction(async (prisma) => {
      await Promise.all(
        updateProducts.map((update) => prisma.product.update(update))
      );

      if (tempOrder) {
        await prisma.tempOrders.delete({ where: { id: tempOrder.id } });
      }
    });
    const response = await prisma.user.findUnique({
      where: { id: "67477ba83d297752ec40ad33" },
    });
    sendWhatsAppMessage(
      `91${response?.phoneNumber || "9307655505"}`,
      process.env.WHATSAPP_ADMIN_PHONE_NUMBER || "919307655505",
      {
        userName: response?.name || "",
        orderId: order.id,
        totalAmount: order.totalAmount,
        products: orderItems,
      }
    );
    console.log("Product quantities updated and temporary order deleted");
    return NextResponse.json(
      { message: "Payment verified and order created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
