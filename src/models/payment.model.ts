import mongoose from "mongoose";

const PaymentOrderSchema =
    new mongoose.Schema(
        {
            userId: { type: String, required: true, },
            courseId: { type: String, required: true, },
            amount: { type: Number, required: true, },
            senderNumber: { type: String, default: null, },
            mobileOperator: { type: String, default: null, },
            tnxId: { type: String, required: true , unique: true},
            status: {
                type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING"
            },
            unlocked: { type: Boolean, default: false }
        },
        {
            timestamps: true
        }
    );

export const PaymentOrder =
    mongoose.models.PaymentOrder ||
    mongoose.model(
        "PaymentOrder",
        PaymentOrderSchema
    );