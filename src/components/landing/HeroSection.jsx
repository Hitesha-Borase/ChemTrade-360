import React from 'react';
import {
  ArrowRight,
  Play,
  Users,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  FlaskConical,
  Package,
  Scale,
  FileCheck2,
  BarChart3,
  Star
} from 'lucide-react';

export default function HeroSection({ onLaunchApp, onOpenDemo, onSelectFeature }) {
  const quickFeatures = [
    { id: 'crm', label: 'CRM & Leads', icon: FlaskConical },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'sales', label: 'Purchase & Sales', icon: Scale },
    { id: 'compliance', label: 'Compliance', icon: FileCheck2 },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 }
  ];

  const stats = [
    { value: '10+', label: 'Business Sectors', sub: 'Solvents, Polymers, APIs' },
    { value: '50K+', label: 'Happy Customers', sub: 'Metric Tons Traded' },
    { value: '99.8%', label: 'Uptime & Accuracy', sub: 'Zero Compliance Audit Defect' },
    { value: '24/7', label: 'Dedicated Support', sub: 'Chemical Logistics Desk' }
  ];

  return (
    <section id="hero" className="relative pt-6 pb-16 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Ambient background glows matching reference */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#DDE9D9]/40 to-[#FAF7F0]/30 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#C6A66A]/15 via-[#075C46]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Elegant Golden Flowing Ribbon Curves in the background */}
      <svg
        className="absolute top-0 right-0 w-full max-w-3xl h-[650px] pointer-events-none -z-10 opacity-70 hidden md:block"
        viewBox="0 0 800 650"
        fill="none"
      >
        <path
          d="M200 40C450 -20 680 120 740 320C800 520 620 620 400 580C260 550 180 430 220 310C260 190 480 140 600 220"
          stroke="url(#goldGradient1)"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          opacity="0.6"
        />
        <path
          d="M320 80C520 20 720 180 750 360C780 540 580 620 420 560"
          stroke="url(#goldGradient2)"
          strokeWidth="2"
          opacity="0.4"
        />
        <defs>
          <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C6A66A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#E5C378" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#075C46" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="goldGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C6A66A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#FAF7F0" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#E3E8DF] shadow-sm w-fit mb-5 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#075C46] animate-pulse" />
              <span className="text-xs font-semibold text-[#075C46] tracking-tight">
                Next-Gen Chemical Trading Operating System
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#063F32] leading-[1.12] tracking-tight">
              Smarter Chemical Trading,{' '}
              <span className="block text-[#075C46] bg-gradient-to-r from-[#075C46] via-[#0F795C] to-[#B08E4F] bg-clip-text text-transparent">
                Stronger Business Growth
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-5 text-base sm:text-lg text-[#4B5E55] leading-relaxed max-w-2xl font-normal">
              All-in-one CRM + ERP platform for chemical traders, distributors, suppliers and exporters. Manage your leads, orders, inventory, compliance and more — in one place.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onLaunchApp}
                className="group flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#063F32] via-[#075C46] to-[#063F32] hover:from-[#042a22] hover:to-[#063F32] rounded-full shadow-[0_8px_25px_rgba(6,63,50,0.3)] hover:shadow-[0_12px_30px_rgba(6,63,50,0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onOpenDemo}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#063F32] bg-white/80 hover:bg-white rounded-full border border-[#E3E8DF] shadow-sm backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:border-[#075C46]/40"
              >
                <div className="w-6 h-6 rounded-full bg-[#DDE9D9]/50 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-[#075C46] text-[#075C46] ml-0.5" />
                </div>
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Quick Feature Badges (5 Cards Row from screenshot) */}
            <div className="mt-10 pt-8 border-t border-[#E3E8DF]/70">
              <p className="text-xs font-semibold text-[#7A8980] uppercase tracking-wider mb-3">
                Core Operational Modules
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                {quickFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => onSelectFeature?.(feat.id)}
                      className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white/70 hover:bg-white border border-[#E3E8DF] hover:border-[#0F795C]/40 shadow-sm hover:shadow-md transition-all text-center backdrop-blur-sm"
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#F7F5EC] group-hover:bg-[#DDE9D9]/40 flex items-center justify-center mb-1.5 transition-colors">
                        <Icon className="w-4 h-4 text-[#075C46]" />
                      </div>
                      <span className="text-[11px] font-semibold text-[#17372F] group-hover:text-[#063F32] leading-tight">
                        {feat.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats Counter Row matching bottom of image */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-sm">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${
                    idx !== 0 ? 'sm:border-l sm:border-[#E3E8DF] sm:pl-4' : ''
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#063F32] tracking-tight">
                    {s.value}
                  </span>
                  <span className="text-xs font-bold text-[#17372F] mt-0.5">
                    {s.label}
                  </span>
                  <span className="text-[10px] text-[#7A8980] hidden sm:block">
                    {s.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT COLUMN (Glassmorphism Laboratory Visual) ================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Main Organic Curvature Container */}
            <div className="relative w-full max-w-[480px] aspect-[4/4.6] flex items-center justify-center">
              {/* Outer Golden Ribbon Glow Frame */}
              <div className="absolute inset-0 rounded-[44px] bg-gradient-to-tr from-[#C6A66A]/40 via-[#FAF7F0]/20 to-[#075C46]/25 p-[2px] shadow-[0_25px_60px_-15px_rgba(6,63,50,0.22)] backdrop-blur-xl">
                {/* Inner Window */}
                <div className="w-full h-full rounded-[42px] overflow-hidden relative bg-gradient-to-b from-[#F9FAF6] to-[#EAEFE7] flex items-center justify-center">
                  {/* High Quality Laboratory Glassware Visual */}
                  <img
                    src="/images/hero-chemistry.jpg"
                    alt="High Purity Chemical Laboratory Beakers & Flasks"
                    className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gentle gradient wash for seamless glass blending */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#063F32]/60 via-transparent to-white/20 pointer-events-none" />

                  {/* Center Flask Glow Reflection */}
                  <div className="absolute inset-x-0 bottom-4 px-6 text-center text-white pointer-events-none">
                    <span className="text-xs font-medium text-[#DDE9D9] bg-[#063F32]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#0F795C]/40 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66A] animate-pulse" />
                      Analytical Grade Purity Standard 99.8%
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Foliage Accent (Fresh Green Leaves top-right) */}
              <div className="absolute -top-6 -right-6 w-28 h-28 pointer-events-none z-10 select-none hidden sm:block animate-float-slow">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-md">
                  <path
                    d="M15 90C15 90 35 70 50 40C65 10 90 5 90 5C90 5 85 30 70 55C55 80 15 90 15 90Z"
                    fill="url(#leafGrad)"
                    opacity="0.9"
                  />
                  <path
                    d="M50 40C30 35 15 20 10 5C10 5 30 10 45 25C60 40 50 40 50 40Z"
                    fill="url(#leafGrad2)"
                    opacity="0.85"
                  />
                  <path
                    d="M15 90C40 60 70 30 90 5"
                    stroke="#042a22"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <defs>
                    <linearGradient id="leafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#075C46" />
                      <stop offset="60%" stopColor="#1E9E7C" />
                      <stop offset="100%" stopColor="#A9C2A3" />
                    </linearGradient>
                    <linearGradient id="leafGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#063F32" />
                      <stop offset="100%" stopColor="#148C6B" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* FLOATING CARD 1: Top Right - "Trusted by Global Chemical Businesses" */}
              <div className="absolute -top-4 -right-4 sm:-right-8 z-20 bg-white/85 backdrop-blur-xl border border-white/90 p-3.5 rounded-2xl shadow-[0_12px_35px_rgba(6,63,50,0.12)] max-w-[230px] animate-float-slow">
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#063F32] mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#075C46]" />
                  <span>Trusted by Global Traders</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                      src="/images/avatar-ceo.jpg"
                      alt="Sunil Mehta"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                      src="/images/avatar-procurement.jpg"
                      alt="Kavita Shah"
                    />
                    <img
                      className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                      src="/images/avatar-chemist.jpg"
                      alt="Dr. Nair"
                    />
                  </div>
                  <div>
                    <div className="flex items-center text-[#C6A66A]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-[#C6A66A]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#7A8980] font-semibold">
                      1,200+ Enterprise Clients
                    </span>
                  </div>
                </div>
              </div>

              {/* FLOATING CARD 2: Bottom Right - "🌱 Smart • Secure • Scalable" */}
              <div className="absolute -bottom-4 -right-2 sm:-right-4 z-20 bg-white/85 backdrop-blur-xl border border-white/90 px-4 py-2.5 rounded-full shadow-[0_10px_30px_rgba(6,63,50,0.12)] flex items-center gap-2.5 animate-float-reverse">
                <div className="w-2 h-2 rounded-full bg-[#0F795C] animate-ping" />
                <span className="text-xs font-bold text-[#063F32] whitespace-nowrap">
                  🌱 Smart • Secure • Scalable
                </span>
                <span className="hidden sm:inline-block text-[10px] text-[#C6A66A] font-semibold bg-[#FAF7F0] px-2 py-0.5 rounded-full border border-[#C6A66A]/30">
                  PESO & REACH
                </span>
              </div>

              {/* FLOATING CARD 3: Left Bottom Accent */}
              <div className="absolute bottom-12 -left-4 sm:-left-8 z-20 bg-white/90 backdrop-blur-xl border border-[#E3E8DF] px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2.5 hidden sm:flex">
                <div className="w-7 h-7 rounded-lg bg-[#DDE9D9]/50 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-[#075C46]" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#063F32] leading-tight">
                    Instant Margin Engine
                  </p>
                  <p className="text-[10px] text-[#0F795C] font-semibold">
                    +$42/MT Avg Optimization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

