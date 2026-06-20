import { connectDB } from "@/lib/db";

import { VerifiedSMS } from "@/models/verified-sms.model";

import { parseSMS } from "@/lib/sms-parser";
import { PaymentOrder } from "@/models/payment.model";

export async function POST(req: Request) {

    try {
        await connectDB();

        const body = await req.json();

        // if (body.secret !== process.env.SMS_SECRET) {

        //     return Response.json(
        //         {
        //             success: false
        //         },
        //         {
        //             status: 401
        //         }
        //     );
        // }

        const parsed = parseSMS(body.text);

        if (!parsed.tnxId) {

            parsed.tnxId = "tnx_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            // return Response.json(
            //     {
            //         success: false,
            //         message: "invalid sms"
            //     }
            // );

        }

        await VerifiedSMS.create({

            tnxId: parsed.tnxId,
            amount: parsed.amount || 0,
            provider: parsed.provider || "unknown",
            rawText: body.text

        });

        const order = await PaymentOrder.findOne({
            tnxId: parsed.tnxId,
            status: "PENDING"
        });

        if (
            order && order.amount === parsed.amount
        ) {
            order.status = "PAID";
            order.unlocked = true;
            await order.save();

        }

        return Response.json({
            success: true
        });

    }

    catch (error) {

        console.log(error);

        return Response.json(
            {
                success: false
            },
            {
                status: 500
            }
        );

    }

}

export async function GET(req: Request) {
    connectDB();

    const sms = await VerifiedSMS.find().sort({ createdAt: -1 });

    return Response.json({
        success: true,
        data: sms
    });
}