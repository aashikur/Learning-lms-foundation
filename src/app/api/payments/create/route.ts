import { connectDB } from "@/lib/db";
import { Course } from "@/models/course.model";
import { PaymentOrder } from "@/models/payment.model";
import { sendOrderInvoiceEmail } from "@/services/mail.service";
import mongoose from "mongoose";

export async function POST(
    req: Request
) {

    try {

        await connectDB();

        const body = await req.json();

        const { userId, courseId, tnxId, senderNumber, mobileOperator } = body;

        if (!userId || !courseId) {
            return Response.json(
                {
                    success: false,
                    message: "User ID and Course ID are required"
                },
                {
                    status: 400
                }
            );
        }

        if (!mongoose.Types.ObjectId.isValid(courseId)) {
            return Response.json(
                {
                    success: false,
                    message: "Invalid course ID"
                },
                {
                    status: 400
                }
            );
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return Response.json(
                {
                    success: false,
                    message: "Course not found"
                },
                {
                    status: 404
                }
            );

        }

        // const existing = await PaymentOrder.findOne({
        //     userId,
        //     courseId,
        //     status: "PAID"
        // });

        // if (existing) {
        //     return Response.json(
        //         {
        //             success: false,
        //             message: "Already purchased"
        //         },
        //         {
        //             status: 400
        //         }
        //     );
        // }

        const order = await PaymentOrder.create({
            userId,
            courseId,
            amount: course.price,
            tnxId: tnxId,
            senderNumber: senderNumber || null,
            mobileOperator: mobileOperator || null
        });


        try {
            // 2. Automatically trigger the mail notification to admin using the response payload
            await sendOrderInvoiceEmail({
                userId: order.userId,
                courseId: order.courseId,
                tnxId: order.tnxId,
                senderNumber: order.senderNumber,
                mobileOperator: order.mobileOperator,
            });

            console.log("Order created and Admin invoice sent.");
        } catch (error) {
            console.error("Error sending order invoice email:", error);
        }



        return Response.json({
            success: true,
            order
        });
    }

    catch (error) {



        console.log(error);

        if ((error as { code?: number }).code === 11000) {
            return Response.json(
                {
                    success: false,
                    message: "Payment order already exists"
                },
                {
                    status: 409
                }
            );
        }

        return Response.json(
            {
                success: false,
                error: (error as Error).message,
                message: "Something went wrong",

            },
            {
                status: 500
            }
        );

    }

}
