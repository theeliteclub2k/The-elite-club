import {  NextResponse } from "next/server";
import { Product } from "@prisma/client";
import prisma from "@/../prisma/prisma";

export async function GET() {
  try {
    const products: Product[] = await prisma.product.findMany();

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products: ", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
