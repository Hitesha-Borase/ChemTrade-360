import React, { useState } from 'react';
import {
  Calculator,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export default function ChemicalCalculator({ onLaunchApp }) {
  const [monthlyVolume, setMonthlyVolume] = useState(350); // Metric Tons
  const [marginPerTon, setMarginPerTon] = useState(65); // USD / MT

  // Calculations
  const monthlyRevenueMargin = monthlyVolume * marginPerTon;
  const annualRevenueMargin = monthlyRevenueMargin * 12;
  const hoursSavedPerMonth = Math.round(monthlyVolume * 0.35 + 24);
  const additionalProfitLift = Math.round(annualRevenueMargin * 0.045); // 4.5% automated discount/spread arbitrage

  return (
    <section id="calculator" className="py-20 relative overflow-hidden bg-[#FAF8F2] border-y border-[#E3E8DF]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-[#C6A66A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Sliders */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E3E8DF] text-xs font-bold text-[#075C46] mb-3 shadow-xs">
              <Calculator className="w-3.5 h-3.5 text-[#C6A66A]" />
              <span>Interactive Trade ROI Simulator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063F32] tracking-tight">
              See How Much Profit ChemTrade 360{' '}
              <span className="bg-gradient-to-r from-[#075C46] to-[#B08E4F] bg-clip-text text-transparent">
                Unlocks for You
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[#4B5E55]">
              Adjust your monthly tonnage and margin targets to calculate your potential time and capital efficiency gains.
            </p>

            {/* Slider 1: Monthly Volume */}
            <div className="mt-8 p-5 bg-white rounded-2xl border border-[#E3E8DF] shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#17372F] uppercase tracking-wider">
                  Monthly Chemical Volume (Metric Tons)
                </span>
                <span className="text-base font-extrabold text-[#063F32] px-3 py-0.5 rounded-full bg-[#F7F5EC] border border-[#E3E8DF]">
                  {monthlyVolume.toLocaleString()} MT
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="2500"
                step="25"
                value={monthlyVolume}
                onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                className="w-full h-2 bg-[#E3E8DF] rounded-lg appearance-none cursor-pointer accent-[#075C46]"
              />
              <div className="flex justify-between text-[11px] text-[#7A8980] mt-1.5 font-medium">
                <span>50 MT (Boutique Indenter)</span>
                <span>2,500 MT (Bulk Terminal)</span>
              </div>
            </div>

            {/* Slider 2: Average Margin per Ton */}
            <div className="mt-4 p-5 bg-white rounded-2xl border border-[#E3E8DF] shadow-xs">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#17372F] uppercase tracking-wider">
                  Target Gross Margin ($ / MT)
                </span>
                <span className="text-base font-extrabold text-[#075C46] px-3 py-0.5 rounded-full bg-[#DDE9D9]/40 border border-[#0F795C]/20">
                  ${marginPerTon} / MT
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="200"
                step="5"
                value={marginPerTon}
                onChange={(e) => setMarginPerTon(Number(e.target.value))}
                className="w-full h-2 bg-[#E3E8DF] rounded-lg appearance-none cursor-pointer accent-[#075C46]"
              />
              <div className="flex justify-between text-[11px] text-[#7A8980] mt-1.5 font-medium">
                <span>$20 (Bulk Solvents)</span>
                <span>$200 (Specialty APIs)</span>
              </div>
            </div>
          </div>

          {/* Right Calculated ROI Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#063F32] via-[#075C46] to-[#042a22] text-white shadow-2xl border border-[#C6A66A]/30">
              {/* Subtle top badge */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-[#C6A66A]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#C6A66A]">Annual Projected Impact</p>
                    <p className="text-[11px] text-emerald-200">Based on Dahej trading models</p>
                  </div>
                </div>

                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#C6A66A]/20 text-[#FAF7F0] border border-[#C6A66A]/30">
                  ROI &gt; 12x
                </span>
              </div>

              {/* Big Metrics */}
              <div className="py-6 space-y-5">
                <div>
                  <span className="text-xs text-emerald-200 uppercase font-bold tracking-wider">
                    Total Annual Trading Margin
                  </span>
                  <p className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
                    ${annualRevenueMargin.toLocaleString()}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#C6A66A] font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Admin Hours Saved</span>
                    </div>
                    <p className="text-2xl font-black text-white mt-1">
                      {hoursSavedPerMonth} hrs/mo
                    </p>
                    <p className="text-[10px] text-emerald-200/80 mt-0.5">Automated COA & Quotes</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-[#C6A66A] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Arbitrage Margin Lift</span>
                    </div>
                    <p className="text-2xl font-black text-white mt-1">
                      +${additionalProfitLift.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-emerald-200/80 mt-0.5">Supplier price parity</p>
                  </div>
                </div>
              </div>

              {/* CTA button inside card */}
              <button
                type="button"
                onClick={onLaunchApp}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#C6A66A] to-[#E5C378] hover:from-[#B08E4F] hover:to-[#C6A66A] text-[#063F32] font-extrabold text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Deploy ChemTrade 360 For Your Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

