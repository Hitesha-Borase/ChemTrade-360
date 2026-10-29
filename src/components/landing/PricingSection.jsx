import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function PricingSection({ onLaunchApp }) {
  const [annual, setAnnual] = useState(true);

  const tiers = [
    {
      name: 'Starter Trader',
      description: 'Ideal for independent chemical brokers and indenting agents.',
      price: annual ? 159 : 199,
      badge: 'Boutique Firm',
      features: [
        'Up to 3 Operational Users',
        'Inquiry & RFQ CRM Funnel',
        'Basic CAS# Chemical Catalog',
        'Standard PDF Quotations',
        'Email Support (12h SLA)'
      ],
      popular: false
    },
    {
      name: 'Growth Enterprise',
      description: 'For growing distributors, stockists, and terminal depot operators.',
      price: annual ? 399 : 499,
      badge: 'Most Popular',
      features: [
        'Up to 15 Operational Users',
        'FEFO Batch & Shelf-Life Inventory',
        'Automated 1-Click COA PDF Engine',
        'Multi-Tanker GPS Dispatch & e-Way Bill',
        'External Customer & Supplier Portals',
        'PESO & GHS Regulatory Audit Vault',
        'Priority Phone & WhatsApp Support (2h SLA)'
      ],
      popular: true
    },
    {
      name: 'Global Conglomerate',
      description: 'For port terminal operators, high-seas importers, and toll manufacturers.',
      price: annual ? 799 : 999,
      badge: 'Full Suite',
      features: [
        'Unlimited Users & Multi-Branch Hubs',
        'Multi-Currency Forex Hedging Desk',
        'Tank Telemetry API & Weighbridge Sync',
        'Dedicated Enterprise Account Director',
        'Custom SAP / Oracle ERP Bridge',
        '99.99% Financial SLA Guarantee'
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 relative overflow-hidden bg-[#FAF8F2] border-t border-[#E3E8DF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3E8DF] text-xs font-bold text-[#075C46] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Transparent Tiered Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063F32] tracking-tight">
            Predictable Investment, Massive Operational Lift
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5E55]">
            No hidden per-tonnage fees. Switch tiers or cancel anytime with complete data portability.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-white border border-[#E3E8DF] shadow-xs">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                !annual
                  ? 'bg-[#063F32] text-white shadow-xs'
                  : 'text-[#7A8980] hover:text-[#17372F]'
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                annual
                  ? 'bg-[#063F32] text-white shadow-xs'
                  : 'text-[#7A8980] hover:text-[#17372F]'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold text-[#C6A66A] bg-[#C6A66A]/20 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'bg-white border-2 border-[#C6A66A] shadow-[0_20px_50px_rgba(6,63,50,0.14)] scale-105 z-10'
                  : 'bg-white/80 border border-[#E3E8DF] shadow-sm hover:shadow-md'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#C6A66A] to-[#B08E4F] text-[#063F32] font-black text-xs uppercase tracking-wider shadow-sm">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold text-[#063F32]">{tier.name}</h3>
                  {!tier.popular && (
                    <span className="text-[10px] font-bold text-[#7A8980] bg-[#F7F5EC] px-2 py-0.5 rounded-full border border-[#E3E8DF]">
                      {tier.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#7A8980] mb-6 min-h-[36px]">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#063F32] tracking-tight">
                    ${tier.price}
                  </span>
                  <span className="text-xs font-semibold text-[#7A8980]">
                    / month {annual ? '(billed annually)' : ''}
                  </span>
                </div>

                <div className="pt-6 border-t border-[#E3E8DF] space-y-3">
                  <p className="text-[11px] font-bold text-[#063F32] uppercase tracking-wider">
                    Included Capabilities:
                  </p>
                  {tier.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#17372F] font-medium">
                      <div className="w-4 h-4 rounded-full bg-[#DDE9D9]/70 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#075C46] stroke-[3]" />
                      </div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E3E8DF]">
                <button
                  type="button"
                  onClick={onLaunchApp}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#063F32] to-[#075C46] hover:from-[#042a22] hover:to-[#063F32] text-white shadow-lg hover:scale-[1.02]'
                      : 'bg-[#F7F5EC] hover:bg-[#EAE7DC] text-[#063F32] border border-[#E3E8DF]'
                  }`}
                >
                  <span>Start 14-Day Free Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

