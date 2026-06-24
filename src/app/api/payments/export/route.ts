import { connectDB } from "@/lib/db";
import { PaymentOrder } from "@/models/payment.model";


export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);

        const status = searchParams.get("status");
        const courseId = searchParams.get("courseId");
        const fromDate = searchParams.get("from");
        const toDate = searchParams.get("to");

        const fields = searchParams.get("fields"); // comma separated list of fields to include in the export

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const filter: any = {};


        if (status) {
            const statusArray = status.split(",");
            filter.status = { $in: statusArray };
        }

        if (courseId) {
            filter.courseId = courseId;
        }

        if (fromDate || toDate) {
            filter.createdAt = {};
            if (fromDate) filter.createdAt.$gte = new Date(fromDate);
            if (toDate) {
                const endDate = new Date(toDate);
                endDate.setHours(23, 59, 59, 999);
                filter.createdAt.$lte = endDate;
            }
        }

        const selectedFields = fields ? fields.split(",") : ["userId", "courseId", "amount", "status", "tnxId", "createdAt"];
        const orders = (await PaymentOrder.find(filter)) // {status: 'paid', courseId: '123456'}


        const headers = selectedFields;

        // const rows = orders.map(order => [
        //     order.userId,
        //     order.courseId,
        //     order.amount,
        //     order.status,
        //     order.tnxId,
        //     order.createdAt,
        // ]);

        const rows = orders.map(order =>
            selectedFields.map(field => order[field])
        )

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
/api/payments/export?courseId=6a1f3a63ab4e3b03bf8a41e4
/api/payments/export?status=PAID&courseId=6a1f3a63ab4e3b03bf8a41e4


/api/payments/export
/api/payments/export?status=PAID
/api/payments/export?fields=userId,amount,tnxId
/api/payments/export?status=PAID&fields=userId,amount


*/
