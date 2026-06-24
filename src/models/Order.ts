import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: string;       // Relates to your Firebase Sync Identity UID
  courseId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'paid' | 'cancelled';
  userSubmittedTrxId?: string;
  userSubmittedPhone?: string;
  paymentGateway: 'bkash' | 'nagad';
  paidAt?: Date;
}

const OrderSchema = new Schema<IOrder>({
  userId: { type: String, required: true },
  courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
  userSubmittedTrxId: { type: String, uppercase: true, trim: true, sparse: true },
  userSubmittedPhone: { type: String, trim: true },
  paymentGateway: { type: String, enum: ['bkash', 'nagad'], required: true },
  paidAt: { type: Date }
}, { timestamps: true });

OrderSchema.index({ userSubmittedTrxId: 1 }, { sparse: true });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);