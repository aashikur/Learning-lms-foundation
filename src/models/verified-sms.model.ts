import mongoose from "mongoose";

const VerifiedSMSSchema =
    new mongoose.Schema(
        {
            tnxId: { type: String, required: true },
            amount: { type: Number, required: true },
            provider: { type: String, required: true },
            rawText: { type: String, required: true }
        },
        {
            timestamps: true
        }
    );

export const VerifiedSMS =
    mongoose.models.VerifiedSMS ||
    mongoose.model(
        "VerifiedSMS",
        VerifiedSMSSchema
    );