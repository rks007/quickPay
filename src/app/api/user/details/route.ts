import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import prisma from "../../../../../db";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function GET() {

    const session = await getServerSession(NEXT_AUTH_CONFIG)
    console.log(session?.user?.id)

    const usersData = await prisma.user.findMany({
        select:{
            id: true,
            firstName: true
        }
    });

    const users = usersData.filter((user) => user.id != session?.user?.id)

    return NextResponse.json({
        users
    })
}