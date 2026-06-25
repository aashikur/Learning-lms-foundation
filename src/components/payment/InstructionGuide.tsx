import { Check, Copy, Info, ShieldCheck } from "lucide-react";

// 1. LEFT SIDE COMPONENT: InstructionGuide
export default function InstructionGuide({ 
  paymentMethod , 
  activeStep, 
  copied, 
  copyToClipboard, 
  merchantNumber, 
  totalAmount,
  activeTheme 
}) {
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
            <div className={`z-10 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
              activeStep === 1 
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
                    className={`flex items-center gap-1.5 py-1.5 px-3.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                      copied 
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
            <div className={`z-10 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
              activeStep === 2 
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
                  "TrxID <span className="font-bold text-indigo-600 font-mono tracking-wider bg-slate-100 px-1 py-0.5 rounded">9JK8L10P</span> Successful..."
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Paste and Verify */}
          <div className={`relative flex gap-4 transition-all duration-300 ${activeStep === 3 ? 'opacity-100 scale-100' : 'opacity-70 scale-98'}`}>
            <div className={`z-10 flex-shrink-0 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
              activeStep === 3 
                ? `${activeTheme.solidBtn} text-white border-transparent shadow-md` 
                : 'bg-white text-slate-400 border-slate-200'
            }`}>
              3
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Submit to verify</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Paste the code in the right field, input your sender mobile number, and hit "Confirm Payment" button.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Security Banner Card */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-lg flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-2xl flex-shrink-0">
          <ShieldCheck size={28} className={paymentMethod === 'bkash' ? 'text-pink-500' : 'text-orange-500'} />
        </div>
        <div>
          <h4 className="font-bold text-sm">Security Assured</h4>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Transaction matching algorithm ensures zero false flags and protects sensitive wallet info.
          </p>
        </div>
      </div>
    </div>
  );
}