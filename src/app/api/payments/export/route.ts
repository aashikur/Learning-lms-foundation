import { connectDB } from "@/lib/db";
import { PaymentOrder } from "@/models/payment.model";


export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const status = searchParams.get("status");
        const courseId = searchParams.get("courseId");

        const filter: any = {};

        if (status) {
            filter.status = status;
        }

        if (courseId) {
            filter.courseId = courseId;
        }

        const orders = await PaymentOrder.find(filter);

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
/*

/api/payments/export?status=PAID
/api/payments/export?status=PENDING
/api/payments/export?courseId=abc123
/api/payments/export?status=PAID&courseId=xyz

*/
