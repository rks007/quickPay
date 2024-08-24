import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";


export async function GET(req: NextRequest){
    const session = await getServerSession(NEXT_AUTH_CONFIG)
    const  { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "";

    const user = await prisma.user.findMany({
        where: {
            OR: [
                {firstName: {startsWith: filter, mode: "insensitive"}},
                {lastName: {startsWith: filter, mode: "insensitive"}}
            ]
        }
    })

    const users = user.filter((userInfo) => userInfo.id != session?.user?.id)


   return NextResponse.json({
    users
   });
    
}