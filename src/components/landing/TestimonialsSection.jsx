import React from 'react';
import { Star, Quote, ShieldCheck, Building2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sunil Mehta',
      role: 'Managing Director',
      company: 'Apex Petrochem (Dahej)',
      image: '/images/avatar-ceo.jpg',
      quote:
        'ChemTrade 360 replaced 4 separate Excel sheets and an outdated legacy ERP. We can generate multi-currency quotations with real-time solvent price indexing in less than 3 minutes.',
      metric: '75% Faster Quote Cycle'
    },
    {
      name: 'Kavita Shah',
      role: 'Head of Sourcing',
      company: 'Gujarat Solvents & Intermediates',
      image: '/images/avatar-procurement.jpg',
      quote:
        'Managing FEFO batches and dangerous goods documentation used to give our warehouse team nightmares. The automated quarantine and PESO checklist features are exceptional.',
      metric: 'Zero Spoilage Incurred'
    },
    {
      name: 'Dr. Priya Nair',
      role: 'VP Quality & Compliance',
      company: 'BioSynthetics Pharma',
      image: '/images/avatar-chemist.jpg',
      quote:
        'Our pharmaceutical buyers require strict analytical testing parameters. The 1-click COA generation directly tied to batch QC records cut customer audit friction to near zero.',
      metric: '100% Audit Readiness'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3E8DF] text-xs font-bold text-[#075C46] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Customer Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063F32] tracking-tight">
            Trusted by Leaders in Chemical Commerce
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5E55]">
            Over 1,200 trading firms, toll manufacturers, and terminal operators run their daily book of business on ChemTrade 360.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_35px_rgba(6,63,50,0.06)] hover:shadow-[0_20px_45px_rgba(6,63,50,0.1)] transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating & Metric badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-[#C6A66A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#C6A66A]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-[#075C46] bg-[#DDE9D9]/50 px-2.5 py-0.5 rounded-full border border-[#0F795C]/20">
                    {t.metric}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#17372F] font-medium leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-5 border-t border-[#E3E8DF] flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#075C46]/20"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#063F32]">{t.name}</h4>
                  <p className="text-[11px] text-[#7A8980] font-medium">{t.role}</p>
                  <p className="text-[10px] text-[#0F795C] font-semibold">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

