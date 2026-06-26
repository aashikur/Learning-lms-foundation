import { NextRequest, NextResponse } from 'next/server';

import { parseIncomingSMS } from '@/utils/mfsParser';
import { connectDB } from '@/lib/db';
import { VerifiedSMS2 } from '@/models/VerifiedSMS2';
import Order from '@/models/Order';

const ALLOWED_SENDERS = ['BKASH', 'NAGAD', '01710000000','+8801571048224']; // Add testing/system source phone numbers

export async function POST(req: Request) {
  try {

    await connectDB();

    const body = await req.json();
    const { from, text, secret_key, time } = body;

    console.log(`Received SMS Webhook: from=${from}, text=${text}, secret_key=${secret_key}, time=${time}`);


    // 1. Signature Security Verification
    if (!secret_key || secret_key !== process.env.MFS_WEBHOOK_SECRET) {
      return Response.json({ error: 'Unauthorized handshake signature' }, { status: 401 });
    }

    
    // 2. Structural Content Validations
    if (!from || !text) {
      return NextResponse.json({ error: 'Malformed payload data structure' }, { status: 400 });
    }
    // 3. Sender Identity Whitelisting
    const isWhitelisted = ALLOWED_SENDERS.some(sender => from.toUpperCase().includes(sender));
    if (!isWhitelisted) {
      return NextResponse.json({ error: 'Sender identity rejected' }, { status: 403 });
    }

    // 4. Data Extraction via Parsing Pipeline ` 
    const { trxId, amount } = parseIncomingSMS(from, text);
    if (!trxId || !amount) {
      return NextResponse.json({ error: 'Unrecognized transaction parameters' }, { status: 422 });
    }


    // 5. Database Commit with Double-Submission Safeguard
    let savedSMS;
    try {
      savedSMS = await VerifiedSMS2.create({
        sender: from,
        rawText: text,
        trxId,
        amount
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (dbError: any) {
      if (dbError.code === 11000) {
        return NextResponse.json({ message: 'Idempotent transaction already archived' }, { status: 200 });
      }
      throw dbError;
    }



    // 6. Proactive Core Reconciliation Pipeline
    try {

      console.log(`step 6: Attempting to reconcile pending order for trxId: ${trxId} and amount: ${amount}`);
      const pendingOrder = await Order.findOne({
        userSubmittedTrxId: trxId,
        status: 'pending'
      });

      if (pendingOrder) {
        console.log(`step 6: PendingOrder found for trxId: ${trxId} and amount: ${amount}`);

        if (amount >= pendingOrder.amount) {
          console.log(`step 6: status: paid, trxId: ${trxId} and amount: ${amount}`);

          pendingOrder.status = 'paid';
          pendingOrder.paidAt = new Date();
          await pendingOrder.save();

          savedSMS.isUsed = true;
          savedSMS.matchedOrderId = pendingOrder._id;
          await savedSMS.save();
        }
      }
    } catch (e) {
      console.error(" step 6: Error occurred while processing pending order:", e);
      return NextResponse.json({ error: 'Error processing pending order' }, { status: 500 });
    }


    return Response.json({
      success: true,
      message: "SMS Webhook received successfully",
      trxId,
      amount,
      savedSMS
    });
  } catch (error) {
    console.error("Error processing SMS webhook:", error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}