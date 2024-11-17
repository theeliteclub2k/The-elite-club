import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { NextRequest } from "next/server";

interface PaymentBody {
    amount: number;
    currency: string;
    receipt: string;
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID as string,
    key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as PaymentBody;
        const { amount, currency, receipt } = body;
        const options = {
            amount,
            currency,
            receipt,
        };
        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
}
