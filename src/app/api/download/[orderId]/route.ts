import { connectDB } from "@/lib/db";
import path from "path";
import fs from "fs";
import { PaymentOrder } from "@/models/payment.model";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ orderId: string }> }
) {

    try {

        await connectDB();

        const order =
            await PaymentOrder.findById(
                (await params).orderId
            );

        if (
            !order
        ) {

            return Response.json(
                { success: false, message: "Not found" },
                { status: 404 }
            );

        }

        if (
            order.status !== "PAID" ||
            !order.unlocked
        ) {

            return Response.json(
                { success: false, message: "Not allowed" },
                { status: 403 }
            );

        }

        // PDF path
        const filePath =
            path.join(
                process.cwd(),
                "public/workoutpdf.pdf"
            );

        const file =
            fs.readFileSync(filePath);

        return new Response(file, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition":
                    "inline; filename=workoutpdf.pdf"
            }
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