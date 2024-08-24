import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../db";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const {id, transferAmount} = body;
        // console.log("reciever id :-", id);
        
        const session = await getServerSession(NEXT_AUTH_CONFIG);
        

        const checkBalance = await prisma.balance.findFirst({
            where: {
                userId: session.user.id
            },
            select: {
                amount: true
            }
        })
        // console.log(checkBalance?.amount);
        

        if(!checkBalance || checkBalance.amount < transferAmount){
            return NextResponse.json({
                message: "insufficient balance"
            }, {status: 400})
        }


        await prisma.$transaction(async () => {

            await prisma.balance.updateMany({
                where: {
                    userId: session.user.id
                },
                data: {
                    amount: {decrement: transferAmount}
                }
            })

            await prisma.balance.updateMany({
                where: {
                    userId: id
                },
                data: {
                    amount: {increment: transferAmount}
                }
            })
        })

        return NextResponse.json({
            msg: "tranfer successfull"
        })

    } catch (error) {
        console.error("error occured", error)
        return NextResponse.json({
            msg: "error while transfer process"
        }, {status: 500})
    }
    
}