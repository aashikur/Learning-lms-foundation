import { connectDB } from "@/lib/db";
import { PaymentOrder } from "@/models/payment.model";

export async function GET(req: Request, params: { params: Promise<{ id: string }> }) {
    try {
        await connectDB();

        const { id } = await params.params;
        const order = await PaymentOrder.findById(id);

        if (!order) {
            return Response.json({ success: false }, { status: 404 });
        }

        return Response.json({
            success: true,
            status: order.status,
            unlocked: order.unlocked
        });
    } catch {
        return Response.json({ success: false }, { status: 500 });
    }
}