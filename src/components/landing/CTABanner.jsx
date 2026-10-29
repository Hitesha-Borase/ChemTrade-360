import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CTABanner({ onLaunchApp, onOpenDemo }) {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[36px] overflow-hidden bg-gradient-to-r from-[#063F32] via-[#075C46] to-[#042a22] p-8 sm:p-14 lg:p-16 text-white shadow-2xl border border-[#C6A66A]/40">
          {/* Subtle Golden ambient particles */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#C6A66A]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#1E9E7C]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-[#FAF7F0] text-xs font-bold mb-4 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
              <span>Modernize Your Chemical Enterprise</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to Accelerate Your Chemical Trading Operations?
            </h2>

            <p className="mt-4 text-sm sm:text-base text-emerald-100 max-w-2xl mx-auto font-normal leading-relaxed">
              Experience the all-in-one ERP built specifically for the complexities of hazardous chemical bulk trading, liquid storage, and regulatory compliance.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onLaunchApp}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#C6A66A] to-[#E5C378] hover:from-[#B08E4F] hover:to-[#C6A66A] text-[#063F32] font-black text-sm shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Launch ChemTrade 360 Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="flex items-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Watch Product Tour</span>
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-6 text-xs text-emerald-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A66A]" />
                14-Day Free Evaluation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A66A]" />
                No Credit Card Required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A66A]" />
                Full Role-Based Sandboxes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

