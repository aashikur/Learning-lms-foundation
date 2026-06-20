import { connectDB } from "@/lib/db";

import { PaymentOrder } from "@/models/payment.model";


export async function GET() {

    try {
        await connectDB();

        const orders = await PaymentOrder.find();
        return Response.json(
            {
                success: true,
                orders
            }
        );
    } catch (error) {
        console.error("Error fetching payment orders:", error);
        return Response.json(
            {
                success: false,
                message: "Failed to fetch payment orders"
            }
        );

    }
}