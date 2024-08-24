import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '../../../../db'; // Adjust the import path according to your project structure

export async function POST(req: NextRequest) {
  try {
    const details = await req.json();

    // Check if the user already exists
    const existUser = await prisma.user.findFirst({
      where: {
        username: details.username,
      },
    });

    if (existUser) {
      return NextResponse.json({
        msg: "User already exists",
      });
    }

    // Use Prisma transaction to ensure atomicity
    await prisma.$transaction(async (prisma) => {
      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          firstName: details.firstName,
          lastName: details.lastName,
          username: details.username,
          password: details.password,
        },
      });

      // Creating a balance record for the new user
      await prisma.balance.create({
        data: {
          userId: newUser.id,
          amount: Math.floor(Math.random() * 100000),
        },
      });
    });

    return NextResponse.json({
      msg: "Signed up successfully",
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({
      msg: "Error while signing up",
    }, { status: 500 });
  }
}
