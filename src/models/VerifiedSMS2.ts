import mongoose, {  Document, Schema } from 'mongoose';

export interface IVerifiedSMS extends Document {
  sender: string;      // e.g., "bKash", "NAGAD"
  rawText: string;     // Full unparsed message for audit trails
  trxId: string;       // Unique extracted transaction ID
  amount: number;      // Extracted cash amount
  isUsed: boolean;     // Flagged true when bound to a specific order
  matchedOrderId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const VerifiedSMSSchema = new Schema<IVerifiedSMS>({
  sender: { type: String, required: true, uppercase: true, trim: true },
  rawText: { type: String, required: true },
  trxId: { type: String, required: true, unique: true, uppercase: true, trim: true },
  amount: { type: Number, required: true },
  isUsed: { type: Boolean, default: false },
  matchedOrderId: { type: Schema.Types.ObjectId, ref: 'Order' }
}, { timestamps: true });


// Create compound index for safe lookups
// VerifiedSMSSchema.index({ trxId: 1, isUsed: 1 });  // removed




// const VerifiedSMSSchema = new mongoose.Schema({
//   sender: String,
//   rawText: String,
//   trxId: String,
//   amount: Number

// })

export const VerifiedSMS2 =
    mongoose.models.VerifiedSMS2 ||
    mongoose.model(
        "VerifiedSMS2",
        VerifiedSMSSchema
    );






// export default mongoose.models.VerifiedSMS || mongoose.model<IVerifiedSMS>('VerifiedSMS', VerifiedSMSSchema);