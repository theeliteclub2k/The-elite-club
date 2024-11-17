import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        console.log(body);
        const {payment}=body;
        const bodyText = payment.razorpay_order_id + "|" + payment.razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET as string)
            .update(bodyText.toString())
            .digest("hex");
        console.log(expectedSignature);
        if (expectedSignature === payment.razorpay_signature) {
            console.log("Payment is verified");
            //Create Order in DB Logic
            return NextResponse.json({ message: "Payment is verified" }, { status: 200 });
        } else {
            console.log("Payment is not verified");
            return NextResponse.json({ message: "Payment is not verified" }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

