import React from 'react';
import { ShieldCheck, Anchor, Award, CheckCircle } from 'lucide-react';

export default function PartnersMarquee() {
  const partners = [
    { name: 'Dahej Liquid Terminal', type: 'Port Terminal Hub' },
    { name: 'Asian Paints Sourcing', type: 'Solvents Procurement' },
    { name: 'GACL Chemicals Ltd', type: 'Chlor-Alkali Partner' },
    { name: 'Hazira Chemical Port', type: 'Deepwater Terminal' },
    { name: 'Reliance Petro Supply', type: 'Aromatics & Olefins' },
    { name: 'EuroChem Global', type: 'Fertilizers & Acids' },
    { name: 'JNPT Chemical Bay', type: 'Container Logistics' },
    { name: 'BioSynthetics India', type: 'Specialty Formulation' }
  ];

  return (
    <section className="py-8 border-y border-[#E3E8DF]/80 bg-white/40 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#075C46] uppercase tracking-wider shrink-0">
            <ShieldCheck className="w-4 h-4 text-[#C6A66A]" />
            <span>Powering Trusted Chemical Hubs</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {partners.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 border border-[#E3E8DF] text-xs font-medium text-[#17372F] shadow-xs whitespace-nowrap shrink-0 hover:border-[#075C46]/40 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F795C]" />
                <span className="font-bold text-[#063F32]">{p.name}</span>
                <span className="text-[10px] text-[#7A8980]">| {p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

