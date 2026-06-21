import { connectDB } from "@/lib/db";
import { PaymentOrder } from "@/models/payment.model";


export async function GET() {
    try {
        await connectDB();

        const orders = await PaymentOrder.find();

        const headers = [
            "userId",
            "courseId",
            "amount",
            "status",
            "tnxId",
            "createdAt",
        ];


        const rows = orders.map(order => [
            order.userId,
            order.courseId,
            order.amount,
            order.status,
            order.tnxId,
            order.createdAt,
        ]);

        const csvContent =
            [headers.join(","), ...rows.map(r => r.join(","))].join("\n");

        return new Response(csvContent, {
            headers: {
                "content-type": "text/csv",
                "content-disposition": "attachment; filename=payment_orders.csv",
            }
        })

    } catch (error) { throw error; }
}

// /api/payments/export
// hiting here will auto download the csv file of all payment orders