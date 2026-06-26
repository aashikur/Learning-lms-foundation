import React, { useState } from 'react';
import {
  Check,
  Copy,
  Smartphone,
  ShieldCheck,
  Info,
  ArrowRight,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  AlertCircle,
  Clock
} from 'lucide-react';

// --- Types/Props Mockup for Next.js/TS ease ---
// In your TSX project, you can easily separate these into individual files.

// 1. LEFT SIDE COMPONENT: InstructionGuide
type InstructionTheme = {
  badge: string;
  solidBtn: string;
  hoverBtn: string;
  lightBg: string;
  activeBorder: string;
  // optional focus ring class used on input elements
  focusRing?: string;
};

type InstructionGuideProps = {
  paymentMethod: string;
  activeStep: number;
  copied: boolean;
  copyToClipboard: (value: string) => void;
  merchantNumber: string;
  totalAmount: number;
  activeTheme: InstructionTheme;
};

type PaymentFormProps = {
  paymentMethod: string;
  setPaymentMethod: (value: string) => void;
  senderNumber: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  transactionId: string;
  handleTrxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: { senderNumber: string; transactionId: string };
  handleConfirmPayment: (e: React.FormEvent<HTMLFormElement>) => void;
  activeTheme: InstructionTheme;
  setActiveStep: (value: number) => void;
  triggerToast: (msg: string) => void;
  setTransactionId: (value: string) => void;
  setFormErrors: React.Dispatch<React.SetStateAction<{ senderNumber: string; transactionId: string }>>;
  orderDetails: { item: string; total: number };
  logoUrls: { bkash: string; nagad: string };
};

const InstructionGuide = ({
  paymentMethod,
  activeStep,
  copied,
  copyToClipboard,
  merchantNumber,
  totalAmount,
  activeTheme
}: InstructionGuideProps) => {
  return (
    <div className="space-y-6">
      {/* Instructions Container */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base">Payment Guidelines</h3>
            <p className="text-xs text-slate-400 mt-1">Follow these simple steps</p>
          </div>
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase ${activeTheme.badge}`}>
            {paymentMethod} Guide
          </span>
        </div>

        <div className="p-6 sm:p-8 space-y-8 relative">
          {/* Decorative Timeline Guide Line */}
          <div className="absolute left-10 top-12 bottom-12 w-[1px] bg-slate-100"></div>

          {/* Step 1: Send Money */}
          <div className={`relative flex gap-4 transition-all duration-300 ${activeStep === 1 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}>
            <div className={`z-10 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${activeStep === 1
                ? `${activeTheme.solidBtn} text-white border-transparent shadow-md`
                : 'bg-white text-slate-400 border-slate-200'
              }`}>
              1
            </div>
            <div className="space-y-3 flex-grow">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">Send Money</h4>
                <p className="text-xs text-slate-500 mt-1">Please pay using <b>Send Money</b> option in {paymentMethod} App/Dial menu.</p>
              </div>

              {/* Merchant detail card with smooth dynamic colors */}
              <div className={`rounded-2xl border p-4 ${activeTheme.lightBg} ${activeTheme.activeBorder} space-y-3 transition-colors duration-300`}>
                <div className="flex justify-between items-center text-xs text-slate-400 font-bold tracking-wider">
                  <span>MERCHANT ACCOUNT</span>
                  <span className="flex items-center gap-1 text-[10px]"><Clock size={11} /> Instant Verify</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-slate-800 text-lg tracking-wider">
                    {merchantNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(merchantNumber)}
                    className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold transition-all shadow-sm ${copied
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : `${activeTheme.solidBtn} text-white ${activeTheme.hoverBtn}`
                      }`}
                  >
                    {copied ? (
                      <>
                        <Check size={13} strokeWidth={3} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy Number
                      </>
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200/50">
                  <span className="text-slate-500 font-semibold">Exact Amount:</span>
                  <span className="font-extrabold text-slate-800 text-sm">৳ {totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Extract transaction code */}
          <div className={`relative flex gap-4 transition-all duration-300 ${activeStep === 2 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}>
            <div className={`z-10 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${activeStep === 2
                ? `${activeTheme.solidBtn} text-white border-transparent shadow-md`
                : 'bg-white text-slate-400 border-slate-200'
              }`}>
              2
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Extract Transaction ID</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                After sending payment, copy the unique 8-10 digit <b>Transaction ID (TrxID)</b> from the confirmation SMS or in-app statement.
              </p>

              {/* Visual Clue representation */}
              <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 mt-3 flex items-center gap-3">
                <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                  <Info size={16} />
                </div>
                <div className="text-[10px] text-slate-500 font-semibold leading-normal">
                  Example SMS format:<br />
                  &quot;TrxID <span className="font-bold text-indigo-600 font-mono tracking-wider bg-slate-100 px-1 py-0.5 rounded">9JK8L10P</span> Successful...&ldquo;
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Paste and Verify */}
          <div className={`relative flex gap-4 transition-all duration-300 ${activeStep === 3 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}>
            <div className={`z-10 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${activeStep === 3
                ? `${activeTheme.solidBtn} text-white border-transparent shadow-md`
                : 'bg-white text-slate-400 border-slate-200'
              }`}>
              3
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Submit to verify</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Paste the code in the right field, input your sender mobile number, and hit &ldquo;Confirm Payment&ldquo; button.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// 2. RIGHT SIDE COMPONENT: PaymentForm
function PaymentForm({
  paymentMethod,
  setPaymentMethod,
  senderNumber,
  handlePhoneChange,
  transactionId,
  handleTrxChange,
  formErrors,
  handleConfirmPayment,
  activeTheme,
  setActiveStep,
  triggerToast,
  setTransactionId,
  setFormErrors,
  orderDetails,
  logoUrls
}: PaymentFormProps) {
  const [imageError, setImageError] = useState({ bkash: false, nagad: false });

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">

      {/* Micro Order Summary */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="space-y-0.5">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Purchase Summary</p>
          <p className="text-sm font-bold text-slate-800 line-clamp-1">{orderDetails.item}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 line-through block">৳1,500</span>
          <span className="text-base font-extrabold text-slate-900">৳{orderDetails.total.toLocaleString()}</span>
        </div>
      </div>

      <div>
        <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="h-5 w-1 bg-slate-800 rounded-full"></span>
          1. Select Payment Method
        </h3>

        {/* Method Selectors */}
        <div className="grid grid-cols-2 gap-4">

          {/* bKash Selector */}
          <button
            type="button"
            onClick={() => {
              setPaymentMethod('bkash');
              setActiveStep(1);
            }}
            className={`relative p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2.5 border-2 transition-all duration-200 outline-none ${paymentMethod === 'bkash'
                ? 'border-[#E2136E] bg-pink-50/20 shadow-md scale-[1.01]'
                : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
              }`}
          >
            {paymentMethod === 'bkash' && (
              <span className="absolute top-2 right-2 bg-[#E2136E] text-white p-0.5 rounded-full z-10">
                <Check size={10} strokeWidth={3} />
              </span>
            )}

            {/* bKash Logo Container */}
            <div className="h-10 w-full flex items-center justify-center px-2 overflow-hidden">
              {!imageError.bkash ? (
                <img
                  src={logoUrls.bkash}
                  alt="bKash"
                  onError={() => setImageError(prev => ({ ...prev, bkash: true }))}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : (
                <span className="font-bold text-lg text-[#E2136E]">bKash</span>
              )}
            </div>

            <span className={`text-[10px] font-bold tracking-wider uppercase ${paymentMethod === 'bkash' ? 'text-[#E2136E]' : 'text-slate-400'}`}>
              bKash Personal
            </span>
          </button>

          {/* Nagad Selector */}
          <button
            type="button"
            onClick={() => {
              setPaymentMethod('nagad');
              setActiveStep(1);
            }}
            className={`relative p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2.5 border-2 transition-all duration-200 outline-none ${paymentMethod === 'nagad'
                ? 'border-[#F47216] bg-orange-50/20 shadow-md scale-[1.01]'
                : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
              }`}
          >
            {paymentMethod === 'nagad' && (
              <span className="absolute top-2 right-2 bg-[#F47216] text-white p-0.5 rounded-full z-10">
                <Check size={10} strokeWidth={3} />
              </span>
            )}

            {/* Nagad Logo Container */}
            <div className="h-10 w-full flex items-center justify-center px-2 overflow-hidden">
              {!imageError.nagad ? (
                <img
                  src={logoUrls.nagad}
                  alt="Nagad"
                  onError={() => setImageError(prev => ({ ...prev, nagad: true }))}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : (
                <span className="font-bold text-lg text-[#F47216]">Nagad</span>
              )}
            </div>

            <span className={`text-[10px] font-bold tracking-wider uppercase ${paymentMethod === 'nagad' ? 'text-[#F47216]' : 'text-slate-400'}`}>
              Nagad Personal
            </span>
          </button>
        </div>
      </div>

      {/* Inputs Form */}
      <form onSubmit={handleConfirmPayment} className="space-y-5">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2 border-t border-slate-100 pt-5">
          <span className="h-5 w-1 bg-slate-800 rounded-full"></span>
          2. Transaction Information
        </h3>

        {/* Sender Phone Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Sender {paymentMethod} Number</span>
            <span className="text-[10px] text-slate-400 font-normal normal-case">Number you paid from</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Smartphone size={18} />
            </span>
            <input
              type="tel"
              value={senderNumber}
              onChange={handlePhoneChange}
              placeholder="e.g. 01712345678"
              onFocus={() => setActiveStep(3)}
              className={`w-full py-3.5 pl-11 pr-4 rounded-xl border font-medium text-slate-800 transition-all outline-none text-base placeholder-slate-300 ${formErrors.senderNumber
                  ? 'border-red-300 focus:border-red-500 bg-red-50/10'
                  : senderNumber.length === 11 && !formErrors.senderNumber
                    ? 'border-green-300 bg-green-50/10 focus:border-green-500'
                    : 'border-slate-200 focus:border-slate-900 focus:bg-white'
                } ${activeTheme.focusRing}`}
            />
          </div>
          {formErrors.senderNumber ? (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {formErrors.senderNumber}
            </p>
          ) : senderNumber.length === 11 && (
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1">
              <Check size={12} /> Number format verified
            </p>
          )}
        </div>

        {/* Transaction ID Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
            <span>Transaction ID (TrxID)</span>
            <span className="text-[10px] text-slate-400 font-normal normal-case">Copy from SMS & paste here</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={transactionId}
              onChange={handleTrxChange}
              onFocus={() => setActiveStep(3)}
              placeholder="e.g. AM89B0L8K"
              className={`w-full py-3.5 px-4 rounded-xl border font-mono font-bold tracking-wider text-slate-800 transition-all outline-none uppercase placeholder-slate-300 text-lg ${formErrors.transactionId
                  ? 'border-red-300 focus:border-red-500 bg-red-50/10'
                  : transactionId.length >= 8 && !formErrors.transactionId
                    ? 'border-green-300 bg-green-50/10 focus:border-green-500'
                    : 'border-slate-200 focus:border-slate-900 focus:bg-white'
                } ${activeTheme.focusRing}`}
            />
            <button
              type="button"
              onClick={async () => {
                try {
                  const clipboardText = await navigator.clipboard.readText();
                  if (clipboardText) {
                    const formatted = clipboardText.toUpperCase().trim().replace(/[^A-Z0-9]/g, '');
                    if (formatted.length >= 8 && formatted.length <= 12) {
                      setTransactionId(formatted);
                      setFormErrors(prev => ({ ...prev, transactionId: '' }));
                      triggerToast('Pasted transaction ID from clipboard!');
                    } else {
                      triggerToast('Clipboard text doesn\'t look like a valid TrxID.');
                    }
                  }
                } catch (e) {
                  triggerToast('Press Ctrl+V or Long-Press to paste!');
                }
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold py-1.5 px-3 rounded-lg transition-colors"
            >
              Paste
            </button>
          </div>
          {formErrors.transactionId ? (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {formErrors.transactionId}
            </p>
          ) : transactionId.length >= 8 && (
            <p className="text-xs font-semibold text-green-600 flex items-center gap-1 mt-1">
              <Check size={12} /> Correct format detected
            </p>
          )}
        </div>

        {/* Submitting Button & Safeguard */}
        <div className="pt-4">
          <button
            type="submit"
            className={`w-full text-white font-bold py-4 rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg active:scale-[0.99] ${activeTheme.solidBtn} ${activeTheme.hoverBtn} ${(!senderNumber || !transactionId || formErrors.senderNumber || formErrors.transactionId)
                ? 'opacity-90'
                : ''
              }`}
          >
            Confirm Payment & Verify
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}


// 3. MAIN COMPONENT: App
export function Instruction() {
  // Global States
  const [paymentMethod, setPaymentMethod] = useState('bkash'); // 'bkash' or 'nagad'
  const [senderNumber, setSenderNumber] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'success'
  const [formErrors, setFormErrors] = useState({ senderNumber: '', transactionId: '' });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeStep, setActiveStep] = useState(1); // 1, 2, 3

  // Merchant Configurations
  const merchantNumber = '01580563883'; // Single updated number for both merchants

  // Logos 7:3 Ratio URLs provided by user
  const logoUrls = {
    bkash: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZmvxwhqtYauUPWfz40OkRuOMtIcP5hhQPLLKfwElb7Q&s',
    nagad: 'https://nagad.com.bd//_nuxt/img/og-image.6e48f4e.jpeg'
  };

  const orderDetails = {
    id: 'ORD-2026-94821',
    item: 'Premium UI/UX Design System Pro',
    amount: 1250,
    charge: 0,
    get total() {
      return this.amount + this.charge;
    }
  };

  // Toast Helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Copy Function (Secure and Compatible with Iframes/Sandboxes)
  const copyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        triggerToast('Number copied to clipboard successfully!');
        setActiveStep(2); // Progress steps view automatically
        setTimeout(() => setCopied(false), 2000);
      } else {
        triggerToast('Failed to copy. Please copy manually.');
      }
    } catch (err) {
      triggerToast('Clipboard action blocked.');
    }
    document.body.removeChild(textArea);
  };

  // Live dynamic validation handlers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 11) {
      setSenderNumber(value);
      if (value.length === 11) {
        if (/^(013|014|015|016|017|018|019)\d{8}$/.test(value)) {
          setFormErrors(prev => ({ ...prev, senderNumber: '' }));
          setActiveStep(3);
        } else {
          setFormErrors(prev => ({ ...prev, senderNumber: 'Invalid operator prefix' }));
        }
      } else if (value.length > 0) {
        setFormErrors(prev => ({ ...prev, senderNumber: 'Must be exactly 11 digits' }));
      } else {
        setFormErrors(prev => ({ ...prev, senderNumber: '' }));
      }
    }
  };

  const handleTrxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (value.length <= 12) {
      setTransactionId(value);
      if (value.length >= 8) {
        setFormErrors(prev => ({ ...prev, transactionId: '' }));
      } else if (value.length > 0) {
        setFormErrors(prev => ({ ...prev, transactionId: 'Min 8 characters required' }));
      } else {
        setFormErrors(prev => ({ ...prev, transactionId: '' }));
      }
    }
  };

  // Handle Form Confirm Submit
  const handleConfirmPayment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;
    const errors = { senderNumber: '', transactionId: '' };

    if (!senderNumber || senderNumber.length !== 11) {
      errors.senderNumber = 'Please provide your 11-digit sender phone number.';
      isValid = false;
    }
    if (!transactionId || transactionId.length < 8) {
      errors.transactionId = 'Please enter a valid Transaction ID (min 8 chars).';
      isValid = false;
    }

    setFormErrors(errors);

    if (!isValid) {
      triggerToast('Please correct the highlighted errors.');
      return;
    }

    setPaymentStatus('processing');

    // Simulate verification API delay
    setTimeout(() => {
      setPaymentStatus('success');
      triggerToast('Payment received! Order confirmed.');
    }, 2500);
  };

  const resetForm = () => {
    setSenderNumber('');
    setTransactionId('');
    setPaymentStatus('idle');
    setActiveStep(1);
  };

  // Color theme mapping
  const brandThemes = {
    bkash: {
      primary: '#E2136E',
      lightBg: 'bg-pink-50/40',
      activeBorder: 'border-[#E2136E]',
      text: 'text-[#E2136E]',
      hoverBtn: 'hover:bg-[#c10e5b]',
      solidBtn: 'bg-[#E2136E]',
      focusRing: 'focus:ring-[#E2136E]/20',
      badge: 'bg-pink-50 text-[#E2136E] border-pink-100',
    },
    nagad: {
      primary: '#F47216',
      lightBg: 'bg-orange-50/40',
      activeBorder: 'border-[#F47216]',
      text: 'text-[#F47216]',
      hoverBtn: 'hover:bg-[#d45c0a]',
      solidBtn: 'bg-[#F47216]',
      focusRing: 'focus:ring-[#F47216]/20',
      badge: 'bg-orange-50 text-[#F47216] border-orange-100',
    }
  } as const;

  type BrandThemeKey = keyof typeof brandThemes;
  const activeTheme = brandThemes[paymentMethod as BrandThemeKey];

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-800 antialiased flex flex-col justify-center py-6 sm:py-12">

      {/* Toast Alert Popup */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white py-3 px-5 rounded-xl shadow-2xl border border-slate-800 transition-all duration-300 transform translate-y-0 max-w-sm">
          <Info size={18} className={paymentMethod === 'bkash' ? 'text-pink-400' : 'text-orange-400'} />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Primary Container */}
      <main className="max-w-6xl w-full mx-auto px-4 flex-grow flex items-center justify-center">
        {paymentStatus === 'success' ? (

          /* Success Screen State */
          <div className="w-full max-w-xl bg-white rounded-3xl border border-slate-100 shadow-xl p-8 text-center animate-fade-in">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
              <CheckCircle2 size={44} className="text-green-500" />
            </div>

            <span className="px-3 py-1 bg-green-100/60 text-green-700 text-xs font-semibold rounded-full tracking-wide uppercase">
              Payment Verified
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-3">Order Placed Successfully!</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
              We received your manual <span className="font-semibold uppercase text-slate-800">{paymentMethod}</span> transaction. Your order is now in queue for prompt fulfillment.
            </p>

            {/* Receipt Summary */}
            <div className="mt-8 bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200/60 text-xs font-bold tracking-wider text-slate-400 uppercase">
                <span>Receipt Summary</span>
                <span>ID: {orderDetails.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <span className="text-slate-500">Method Utilized</span>
                <span className="text-slate-800 font-semibold text-right flex items-center justify-end gap-1.5 capitalize">
                  <span className={`h-2.5 w-2.5 rounded-full ${paymentMethod === 'bkash' ? 'bg-pink-600' : 'bg-orange-500'}`}></span>
                  {paymentMethod} Transfer
                </span>

                <span className="text-slate-500">Sender Mobile</span>
                <span className="text-slate-800 font-mono text-right">{senderNumber}</span>

                <span className="text-slate-500">Transaction ID</span>
                <span className="text-slate-800 font-mono font-bold text-right tracking-wide text-indigo-600">{transactionId}</span>

                <span className="text-slate-500">Paid Amount</span>
                <span className="text-slate-900 font-bold text-right text-base">৳ {orderDetails.total.toLocaleString()} BDT</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={16} /> New Transaction
              </button>
              <button
                onClick={() => triggerToast('Redirecting to dashboard...')}
                className={`w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${activeTheme.solidBtn} ${activeTheme.hoverBtn}`}
              >
                Go to Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </div>

        ) : paymentStatus === 'processing' ? (

          /* Processing Verification State Screen */
          <div className="w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-10 text-center flex flex-col items-center justify-center min-h-[400px]">
            <div className="relative flex items-center justify-center mb-6">
              <Loader2 size={56} className={`animate-spin ${activeTheme.text}`} />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-slate-700">
                SSL
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Validating Transaction</h3>
            <p className="text-slate-500 text-sm mt-3 max-w-xs mx-auto leading-relaxed">
              We are verifying your TrxID <span className="font-mono font-semibold text-slate-800">{transactionId}</span> with the financial network. Please don&lsquo;t close this browser window.
            </p>
            <div className="mt-6 flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 border border-slate-100">
              <Clock size={14} className="animate-pulse" />
              Estimated wait: 2-3 seconds
            </div>
          </div>

        ) : (

          /* Standard Checkout State (Guidelines on Left (5-columns) / Input Form on Right (7-columns)) */
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
              <PaymentForm
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
              />
            </div>

          </div>
        )}
      </main>

    </div>
  );
}