import React from 'react';
import {
  Boxes,
  Truck,
  FileCheck2,
  Globe2,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Zap
} from 'lucide-react';

export default function FeatureVisualGrid({ onLaunchApp }) {
  const cards = [
    {
      id: 1,
      tag: 'Liquid & Dry Storage',
      title: 'Hazchem Warehouse & FEFO',
      image: '/images/chemical-warehouse.jpg',
      badge: 'Zero Spoilage',
      bullets: [
        'Automated FEFO expiry batch alerts',
        'Incompatible chemical segregation (PESO)',
        'Dahej & Hazira tank telemetry tracking'
      ]
    },
    {
      id: 2,
      tag: 'Fleet & Dispatch',
      title: 'GPS Chemical Tanker Fleet',
      image: '/images/chemical-logistics.jpg',
      badge: 'Real-time Telemetry',
      bullets: [
        'Gross / Tare weighbridge reconciliation',
        'e-Way Bill & Driver Hazchem cert checks',
        'Live transit temperature & pressure logs'
      ]
    },
    {
      id: 3,
      tag: 'Purity & Quality',
      title: 'Automated Lab COA Engine',
      image: '/images/hero-chemistry.jpg',
      badge: '99.8% Test Accuracy',
      bullets: [
        'Instant multi-parameter test report PDF',
        'GHS hazard pictograms & SDS library',
        'Self-service customer portal download'
      ]
    },
    {
      id: 4,
      tag: 'Global Indenting',
      title: 'Multi-Currency Trading Desk',
      image: '/images/chemical-industry.jpg',
      badge: 'USD / INR / EUR',
      bullets: [
        'Real-time forex hedging & margin lock',
        'High-seas sales & custom bond tracking',
        'Instant supplier quotation comparison'
      ]
    }
  ];

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF7F0] border border-[#C6A66A]/30 text-[#8C6F3B] text-xs font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
              <span>Engineered for Reliability</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063F32] tracking-tight">
              Built for High-Stakes{' '}
              <span className="bg-gradient-to-r from-[#075C46] via-[#0F795C] to-[#B08E4F] bg-clip-text text-transparent">
                Chemical Commerce
              </span>
            </h2>
            <p className="mt-3 text-base text-[#4B5E55]">
              Every module is designed to eliminate expensive trading errors, inventory contamination, and regulatory non-compliance.
            </p>
          </div>

          <button
            type="button"
            onClick={onLaunchApp}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#063F32] hover:bg-[#075C46] text-white text-xs font-bold shadow-md transition-all self-start md:self-auto hover:scale-105"
          >
            <span>Explore All Workflows</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Large Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="group relative rounded-3xl overflow-hidden border border-[#E3E8DF] bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063F32]/80 via-[#063F32]/20 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-[#063F32] shadow-sm">
                    {card.tag}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#063F32]/85 backdrop-blur-md text-[#C6A66A] border border-[#C6A66A]/40 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66A] animate-pulse" />
                    {card.badge}
                  </span>
                </div>

                {/* Bottom Title inside Image */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Glassmorphic Information Tray */}
              <div className="p-6 bg-white/90 backdrop-blur-lg">
                <ul className="space-y-2.5">
                  {card.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#17372F] font-medium">
                      <div className="w-5 h-5 rounded-full bg-[#DDE9D9]/60 flex items-center justify-center shrink-0">
                        <Zap className="w-3 h-3 text-[#075C46]" />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

