import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
export async function POST(req: NextRequest, res: NextResponse) {
  const { firstName, lastName, phoneNumber } = await req.json();

  try {
    const result = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        phoneNumber: phoneNumber,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      userId: result.id,
    });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const id = req.nextUrl.searchParams.get("id") || "";
  try {
    const userDetails = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        phoneNumber: true,
      },
    });
    return NextResponse.json(userDetails);
  } catch (error) {
    return NextResponse.json(error);
  }
}
