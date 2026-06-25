'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  CheckCircle2, 
  ShieldAlert, 
  Copy, 
  Check, 
  Smartphone, 
  CreditCard 
} from 'lucide-react';

interface ComponentProps {
  orderId: string;
  expectedAmount: number;
}

const merchantNumber = '01580563883'; // Configurable

export default function MfsVerificationModal({ orderId, expectedAmount }: ComponentProps) {
  const router = useRouter();
  
  // State Management
  const [gateway, setGateway] = useState<'bkash' | 'nagad'>('bkash');
  const [phone, setPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [isPolling, setIsPolling] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // Dynamic Theme Colors
  const activeTheme = {
    bkash: { border: 'border-pink-500', bg: 'bg-pink-50', text: 'text-pink-600', ring: 'focus-visible:ring-pink-500' },
    nagad: { border: 'border-orange-500', bg: 'bg-orange-50', text: 'text-orange-600', ring: 'focus-visible:ring-orange-500' }
  }[gateway];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const executePollingLoop = useCallback(async (targetTrx: string) => {
    let systemRetries = 0;
    const maximumRetries = 15;

    const intervalInstance = setInterval(async () => {
      try {
        const payload = { orderId, trxId: targetTrx, senderPhone: phone, gateway };
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
          setTimeout(() => router.refresh(), 2000);
        } else if (systemRetries >= maximumRetries) {
          clearInterval(intervalInstance);
          setErrorMessage('Verification timeout. If the amount was deducted, please contact support with your TrxID.');
          setIsPolling(false);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 6000);

    return () => clearInterval(intervalInstance);
  }, [orderId, phone, gateway, router]);

  const handleVerificationTrigger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 11) {
      setErrorMessage('Please enter a valid 11-digit mobile number.');
      return;
    }
    if (!trxId || trxId.length < 8) {
      setErrorMessage('Transaction ID must be at least 8 characters long.');
      return;
    }

    setErrorMessage(null);
    setIsPolling(true);
    await executePollingLoop(trxId.toUpperCase());
  };

  // --- Render Success State ---
  if (success) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-8 border border-slate-100 rounded-3xl bg-white max-w-md mx-auto text-center space-y-5 shadow-xl"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-100"
        >
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </motion.div>
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900">Payment Verified</h3>
          <p className="text-sm text-slate-500 mt-2">Your escrow transfer is complete. Redirecting to your secure dashboard...</p>
        </div>
      </motion.div>
    );
  }

  // --- Render Standard Form State ---
  return (
    <div className="border border-slate-100 rounded-3xl bg-white max-w-md mx-auto shadow-xl overflow-hidden">
      
      {/* Header Section */}
      <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">Secure Checkout</h3>
          <p className="text-xs text-slate-400 mt-1">Manual Escrow Transfer</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total Due</p>
          <p className="text-lg font-black tracking-tight">৳{expectedAmount.toLocaleString()}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Step 1: Gateway Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">1. Select Provider</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setGateway('bkash')}
              disabled={isPolling}
              className={`relative flex items-center justify-center p-3 rounded-xl border-2 transition-all ${
                gateway === 'bkash' ? `${activeTheme.border} ${activeTheme.bg} shadow-sm` : 'border-slate-100 hover:border-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className={`font-bold text-sm ${gateway === 'bkash' ? activeTheme.text : 'text-slate-600'}`}>
                bKash
              </span>
            </button>
            <button
              type="button"
              onClick={() => setGateway('nagad')}
              disabled={isPolling}
              className={`relative flex items-center justify-center p-3 rounded-xl border-2 transition-all ${
                gateway === 'nagad' ? `${activeTheme.border} ${activeTheme.bg} shadow-sm` : 'border-slate-100 hover:border-slate-200'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className={`font-bold text-sm ${gateway === 'nagad' ? activeTheme.text : 'text-slate-600'}`}>
                Nagad
              </span>
            </button>
          </div>
        </div>

        {/* Step 2: Merchant Info */}
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Merchant Number</p>
            <p className="font-mono font-bold text-slate-800 text-base">{merchantNumber}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => copyToClipboard(merchantNumber)}
            className="h-8 px-3 text-xs bg-white"
          >
            {copied ? <Check size={14} className="text-emerald-500 mr-1.5" /> : <Copy size={14} className="text-slate-500 mr-1.5" />}
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </div>

        {/* Step 3: Input Form */}
        <form onSubmit={handleVerificationTrigger} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Sender Number</label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                type="tel"
                placeholder="017XXXXXXXX" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))} 
                disabled={isPolling}
                className={`pl-9 h-11 rounded-xl bg-slate-50/50 ${activeTheme.ring}`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Transaction ID</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <Input 
                type="text"
                placeholder="e.g. 8N34X9PZ2" 
                value={trxId} 
                onChange={(e) => setTrxId(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12))} 
                disabled={isPolling} 
                className={`pl-9 h-11 uppercase font-mono tracking-wider rounded-xl bg-slate-50/50 ${activeTheme.ring}`}
              />
            </div>
          </div>

          <AnimatePresence>
            {errorMessage && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <Alert variant="destructive" className="rounded-xl border-red-200 bg-red-50 text-red-800 mt-2">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertDescription className="text-xs font-medium ml-2">{errorMessage}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Button 
            type="submit" 
            className="w-full h-12 rounded-xl font-bold text-sm mt-2 transition-all shadow-md active:scale-[0.98]" 
            disabled={isPolling}
          >
            {isPolling ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Scanning Carrier Network...
              </>
            ) : (
              'Confirm & Verify Payment'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}