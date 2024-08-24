
import { getServerSession } from "next-auth";
import prisma from "../../../../../db";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(){

    const session = await getServerSession(NEXT_AUTH_CONFIG);

    const balance = await prisma.balance.findFirst({
        where: {
            userId: session.user.id
        },
        select: {
            amount: true
        }
    })

    return NextResponse.json({
        balance: balance?.amount || null
    })

}