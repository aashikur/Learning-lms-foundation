import { connectDB } from "@/lib/db";
import Order from "@/models/Order";



export async function POST(req: Request) {

    try { 
        await connectDB();
        const body = await req.json();
        const { userId, courseId, amount, status } = body;

        const res = await Order.create({
            userId,
            courseId,
            amount,
            status
            
        });

        return Response.json({ status: "success", data: res }, { status: 201 });

    } catch (error) {
        console.error("Error creating payment order:", error);
        return Response.json({ status: "error", message: "An error occurred while creating the payment order" }, { status: 500 });
    }
}


/*
{
 "userId":"...",
 "courseId":"...",
 "amount":665,
 "status":"pending",
 "paymentGateway":"bkash"
}
*/