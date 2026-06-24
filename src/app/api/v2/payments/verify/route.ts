import { NextRequest, NextResponse } from 'next/server';
import Order from '@/models/Order';
import { connectDB } from '@/lib/db';
import { VerifiedSMS2 } from '@/models/VerifiedSMS2';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { orderId, trxId, senderPhone, gateway } = await req.json();

    if (!orderId || !trxId) {
      return NextResponse.json({ error: 'Missing process requirements' }, { status: 400 });
    }

    const cleanTrxId = trxId.trim().toUpperCase();

    // 1. Locate Target Order
    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Target order context entry absent' }, { status: 404 });
    }

    if (order.status === 'paid') {
      return NextResponse.json({ message: 'Order processed', status: 'paid' }, { status: 200 });
    }

    // Update order tracking parameters
    order.userSubmittedTrxId = cleanTrxId;
    order.userSubmittedPhone = senderPhone;
    order.paymentGateway = gateway;
    await order.save();

    // 2. Evaluate if corresponding SMS has landed in Archive
    const matchedSms = await VerifiedSMS2.findOne({ trxId: cleanTrxId });

    if (!matchedSms) {
      return NextResponse.json({ 
        message: 'Payment verification pending. SMS has not arrived yet.', 
        status: 'pending' 
      }, { status: 200 });
    }

    // 3. Prevent Replay Attack Intercepts
    if (matchedSms.isUsed) {
      return NextResponse.json({ error: 'Transaction token signature used previously' }, { status: 400 });
    }

    // 4. Financial Integrity Underpayment Cross-Check
    if (matchedSms.amount < order.amount) {
      return NextResponse.json({ 
        error: `Insufficient transaction funds. Required: ${order.amount} BDT. Found: ${matchedSms.amount} BDT.` 
      }, { status: 400 });
    }

    // 5. Atomic Update Execution
    order.status = 'paid';
    order.paidAt = new Date();
    await order.save();

    matchedSms.isUsed = true;
    matchedSms.matchedOrderId = order._id;
    await matchedSms.save();

    return NextResponse.json({ 
      message: 'Payment verified successfully', 
      status: 'paid' 
    }, { status: 200 });

  } catch (error) {
    console.error('Verification Routing Failure:', error);
    return NextResponse.json({ error: 'Internal system fault occurred' }, { status: 500 });
  }
}