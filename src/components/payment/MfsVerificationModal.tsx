'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle2, ShieldAlert } from 'lucide-react';
import InstructionGuide from '@/components/payment/InstructionGuide';

interface ComponentProps {
  orderId: string;
  expectedAmount: number;
}

export default function MfsVerificationModal({ orderId, expectedAmount }: ComponentProps) {
  const router = useRouter();
  const [trxId, setTrxId] = useState('');
  const [phone, setPhone] = useState('');
  const [gateway, setGateway] = useState<'bkash' | 'nagad'>('bkash'); // Default selection
  const [isPolling, setIsPolling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const executePollingLoop = useCallback(async (targetTrx: string) => {
    let systemRetries = 0;
    const maximumRetries = 15; // Polls every 6 seconds for 90 seconds total

    const intervalInstance = setInterval(async () => {
      try {
        const payload = { orderId, trxId: targetTrx, senderPhone: phone, gateway };
        console.log("Polling with payload:", systemRetries, payload);
        systemRetries++;

        const res = await fetch('/api/v2/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (!res.ok) {
          clearInterval(intervalInstance);
          setErrorMessage(data.error || 'System anomaly encountered');
          setIsPolling(false);
          return;
        }

        if (data.status === 'paid') {
          clearInterval(intervalInstance);
          setSuccess(true);
          setIsPolling(false);
          router.refresh();
        } else if (systemRetries >= maximumRetries) {
          clearInterval(intervalInstance);
          setErrorMessage('SMS verification timeout. If you paid, contact admin with TrxID.');
          setIsPolling(false);
        }
      } catch (err) {
        console.error(err);
      }
    }, 6000);

    return () => clearInterval(intervalInstance);
  }, [orderId, phone, gateway, router]);

  const handleVerificationTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trxId || trxId.length < 6) {
      setErrorMessage('Please type a valid MFS Transaction ID.');
      return;
    }

    setErrorMessage(null);
    setIsPolling(true);
    await executePollingLoop(trxId);
  };

  if (success) {
    return (
      <div className="p-6 border rounded-xl bg-card max-w-md mx-auto text-center space-y-4 shadow-sm">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
        <h3 className="text-xl font-bold tracking-tight">Payment Verified!</h3>
        <p className="text-sm text-muted-foreground">Your order is unlocked. Redirecting to course resource logs...</p>
      </div>
    );
  }
  return (
    <div className="p-6 border rounded-xl bg-card max-w-md mx-auto space-y-4 shadow-md">
      <div>
        <h3 className="text-lg font-bold">Manual Escrow Transfer</h3>
        <p className="text-sm text-muted-foreground">
          Send exactly <span className="font-semibold text-foreground">{expectedAmount} BDT</span> via Send Money to our personal number.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDE COMPONENT: Instruction Guide */}
        <div className="lg:col-span-5">
          <InstructionGuide
            paymentMethod={paymentMethod}
            activeStep={activeStep}
            copied={copied}
            copyToClipboard={copyToClipboard}
            merchantNumber={merchantNumber}
            totalAmount={orderDetails.total}
            activeTheme={activeTheme}
          />
        </div>

        {/* RIGHT SIDE COMPONENT: Interactive Payment Form */}
        <div className="lg:col-span-7">
          {/* <PaymentForm
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            senderNumber={senderNumber}
            handlePhoneChange={handlePhoneChange}
            transactionId={transactionId}
            handleTrxChange={handleTrxChange}
            formErrors={formErrors}
            handleConfirmPayment={handleConfirmPayment}
            activeTheme={activeTheme}
            setActiveStep={setActiveStep}
            triggerToast={triggerToast}
            setTransactionId={setTransactionId}
            setFormErrors={setFormErrors}
            orderDetails={orderDetails}
            logoUrls={logoUrls}
          /> */}
        </div>
      </div>
      <form onSubmit={handleVerificationTrigger} className="space-y-3">
        {/* Gateway Selection Dropdown */}
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Select Payment Gateway</label>
          <select
            value={gateway}
            onChange={(e) => setGateway(e.target.value as 'bkash' | 'nagad')}
            disabled={isPolling}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="bkash">bKash</option>
            <option value="nagad">Nagad</option>
          </select>
        </div>

        {/* Phone Number Input */}
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Your Phone Number</label>
          <Input placeholder="017XXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isPolling} />
        </div>

        {/* Transaction ID Input */}
        <div>
          <label className="text-xs font-semibold uppercase text-muted-foreground">Transaction ID (TrxID)</label>
          <Input placeholder="8N34X9PZ2" value={trxId} onChange={(e) => setTrxId(e.target.value)} disabled={isPolling} className="uppercase font-mono tracking-wider" />
        </div>

        {errorMessage && (
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
          </Alert>
        )}

        <Button type="submit" className="w-full font-medium" disabled={isPolling}>
          {isPolling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning Carrier Network Streams...
            </>
          ) : (
            'Verify Payment Status NOW!!!'
          )}
        </Button>
      </form>
    </div>
  );
}