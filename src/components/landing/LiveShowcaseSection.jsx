import React, { useState } from 'react';
import {
  FlaskConical,
  Package,
  FileCheck2,
  Truck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Download,
  Filter,
  Search,
  Sparkles,
  TrendingUp,
  MapPin,
  Clock
} from 'lucide-react';

export default function LiveShowcaseSection({ onLaunchApp }) {
  const [activeTab, setActiveTab] = useState('crm');

  const tabs = [
    {
      id: 'crm',
      title: 'Smart CRM & Leads',
      icon: FlaskConical,
      badge: 'CAS# Matching Engine',
      summary: 'Convert chemical RFQs in seconds with automated margins, supplier price parity, and credit limit checks.'
    },
    {
      id: 'inventory',
      title: 'Hazchem Inventory',
      icon: Package,
      badge: 'FEFO Expiry Guard',
      summary: 'Automated batch segregation, tank telemetry at Dahej Terminal, and hazardous quarantine protocols.'
    },
    {
      id: 'compliance',
      title: 'COA & Regulatory',
      icon: FileCheck2,
      badge: 'REACH & PESO Ready',
      summary: 'Automated generation of Certificates of Analysis, Form 13 dangerous goods declarations, and GHS labels.'
    },
    {
      id: 'logistics',
      title: 'Tanker Fleet & Port',
      icon: Truck,
      badge: 'Live GPS Tracking',
      summary: 'Multi-axle ISO chemical tankers dispatched with digital e-Way bills, gross/tare tare scales, and POD.'
    }
  ];

  return (
    <section id="showcase" className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-white/50 to-transparent">
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-10 w-96 h-96 rounded-full bg-[#075C46]/5 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#C6A66A]/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DDE9D9]/50 border border-[#0F795C]/20 text-[#075C46] text-xs font-bold mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Interactive Platform Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063F32] tracking-tight">
            Designed Specifically for{' '}
            <span className="bg-gradient-to-r from-[#075C46] to-[#B08E4F] bg-clip-text text-transparent">
              Chemical Workflows
            </span>
          </h2>
          <p className="mt-3 text-[#4B5E55] text-base leading-relaxed">
            Generic ERPs fail at CAS numbers, hazardous material compliance, and liquid tanker shrinkage. ChemTrade 360 handles everything out of the box.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar pb-3 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#063F32] to-[#075C46] text-white shadow-[0_8px_20px_rgba(6,63,50,0.25)] scale-105'
                    : 'bg-white/80 text-[#17372F] hover:bg-white border border-[#E3E8DF] shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C6A66A]' : 'text-[#075C46]'}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Mockup Container with Glassmorphism */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white p-4 sm:p-8 shadow-[0_20px_50px_rgba(6,63,50,0.08)]">
          {/* Top Bar inside Mockup */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3E8DF] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-[#7A8980] ml-2">
                chemtrade-terminal://active-ledger/{activeTab}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#075C46] bg-[#DDE9D9]/40 px-3 py-1 rounded-full border border-[#0F795C]/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F795C] animate-pulse" />
                Live Node: Dahej Terminal Hub
              </span>
              <button
                type="button"
                onClick={onLaunchApp}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-1 text-xs font-semibold text-white bg-[#063F32] hover:bg-[#042a22] rounded-full transition-all"
              >
                <span>Open in App</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* TAB 1: CRM & LEADS */}
          {activeTab === 'crm' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#F7F5EC] border border-[#E3E8DF]">
                  <p className="text-[11px] font-bold text-[#7A8980] uppercase">Open Chemical RFQs</p>
                  <p className="text-2xl font-black text-[#063F32] mt-1">42 Inquiries</p>
                  <span className="text-xs font-semibold text-[#0F795C] mt-1 inline-flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +14.8% vs last week
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F7F5EC] border border-[#E3E8DF]">
                  <p className="text-[11px] font-bold text-[#7A8980] uppercase">Target Monthly Volume</p>
                  <p className="text-2xl font-black text-[#063F32] mt-1">8,450 MT</p>
                  <span className="text-xs text-[#7A8980] mt-1">6,820 MT Contracted</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#F7F5EC] border border-[#E3E8DF]">
                  <p className="text-[11px] font-bold text-[#7A8980] uppercase">Avg Net Trade Margin</p>
                  <p className="text-2xl font-black text-[#075C46] mt-1">11.4% ($48/MT)</p>
                  <span className="text-xs font-semibold text-[#C6A66A]">Target Margin Maintained</span>
                </div>
              </div>

              {/* Sample Table */}
              <div className="overflow-x-auto rounded-2xl border border-[#E3E8DF]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F2] text-[#063F32] uppercase text-[10px] font-bold border-b border-[#E3E8DF]">
                    <tr>
                      <th className="p-3.5">Lead / Buyer</th>
                      <th className="p-3.5">Chemical Product</th>
                      <th className="p-3.5">CAS #</th>
                      <th className="p-3.5">Tonnage</th>
                      <th className="p-3.5">Target Price</th>
                      <th className="p-3.5">Est. Gross Margin</th>
                      <th className="p-3.5 text-right">Instant Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E3E8DF] bg-white">
                    <tr className="hover:bg-[#F7F5EC]/60 transition-colors">
                      <td className="p-3.5 font-bold text-[#17372F]">Asian Paints Ltd</td>
                      <td className="p-3.5 font-medium text-[#075C46]">Isobutyl Benzene (IBB) 99.5%</td>
                      <td className="p-3.5 font-mono text-[#7A8980]">538-93-2</td>
                      <td className="p-3.5 font-semibold">120 MT</td>
                      <td className="p-3.5 font-semibold">$1,420/MT</td>
                      <td className="p-3.5 font-bold text-[#0F795C]">+$5,400 (3.2%)</td>
                      <td className="p-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                          Quote Ready
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F7F5EC]/60 transition-colors">
                      <td className="p-3.5 font-bold text-[#17372F]">Pidilite Industries</td>
                      <td className="p-3.5 font-medium text-[#075C46]">Vinyl Acetate Monomer (VAM)</td>
                      <td className="p-3.5 font-mono text-[#7A8980]">108-05-4</td>
                      <td className="p-3.5 font-semibold">350 MT</td>
                      <td className="p-3.5 font-semibold">$980/MT</td>
                      <td className="p-3.5 font-bold text-[#0F795C]">+$11,200 (3.3%)</td>
                      <td className="p-3.5 text-right">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200">
                          Supplier Bidding
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: HAZCHEM INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E3E8DF] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#063F32]">Dahej Tank Farm A-04</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Flammable Liq 3
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xl font-black text-[#063F32]">Methanol 99.85%</span>
                    <span className="text-xs font-bold text-[#0F795C]">480 MT Capacity</span>
                  </div>
                  <div className="w-full bg-[#E3E8DF] h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#075C46] h-full w-[78%]" />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-[#7A8980]">
                    <span>Current: 374.4 MT</span>
                    <span>FEFO: 140 Days left</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E3E8DF] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#063F32]">Warehouse Bay B-12</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                      Corrosive 8
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xl font-black text-[#063F32]">Caustic Soda Flakes</span>
                    <span className="text-xs font-bold text-[#0F795C]">250 MT Max</span>
                  </div>
                  <div className="w-full bg-[#E3E8DF] h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#1E9E7C] h-full w-[45%]" />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-[#7A8980]">
                    <span>Current: 112.5 MT</span>
                    <span>FEFO: 310 Days left</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E3E8DF] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#063F32]">Hazchem Quarantine Bay</span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> QC Inspection
                    </span>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-xl font-black text-[#063F32]">Acetone Technical</span>
                    <span className="text-xs font-bold text-[#C6A66A]">Batch #ACT-882</span>
                  </div>
                  <div className="w-full bg-[#E3E8DF] h-2 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#C6A66A] h-full w-[20%]" />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-[#7A8980]">
                    <span>Pending Lab COA Approval</span>
                    <span>42 MT</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COA & COMPLIANCE */}
          {activeTab === 'compliance' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-300">
              <div className="p-5 rounded-2xl bg-[#FAF8F2] border border-[#E3E8DF] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E3E8DF] flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-5 h-5 text-[#075C46]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-[#063F32]">Batch COA #COA-2026-0914 (GACL Dahej)</h4>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        PASSED 99.85%
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5E55] mt-1">
                      Certified Chemical Analysis for Caustic Soda Lye 48%. Complies with IS:252 and REACH EU standards.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={onLaunchApp}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#063F32] text-white text-xs font-bold hover:bg-[#042a22]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF COA</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-[#E3E8DF]">
                  <span className="text-[10px] font-bold text-[#7A8980] uppercase">PESO License</span>
                  <p className="text-xs font-bold text-[#063F32] mt-0.5">Active & Compliant</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E3E8DF]">
                  <span className="text-[10px] font-bold text-[#7A8980] uppercase">Form 13 Manifest</span>
                  <p className="text-xs font-bold text-[#063F32] mt-0.5">Auto-Generated</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E3E8DF]">
                  <span className="text-[10px] font-bold text-[#7A8980] uppercase">GHS Hazard Class</span>
                  <p className="text-xs font-bold text-[#063F32] mt-0.5">Class 8 Corrosive</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-[#E3E8DF]">
                  <span className="text-[10px] font-bold text-[#7A8980] uppercase">REACH Registration</span>
                  <p className="text-xs font-bold text-[#063F32] mt-0.5">EU 01-2119457610</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: TANKER & FLEET */}
          {activeTab === 'logistics' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-300">
              <div className="p-4 rounded-2xl bg-white border border-[#E3E8DF] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#DDE9D9]/40 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#075C46]" />
                  </div>
                  <div>
                    <span className="font-bold text-[#063F32]">Tanker GJ-16-AX-4821 (32 KL Stainless Steel)</span>
                    <p className="text-xs text-[#7A8980] flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-[#075C46] font-medium">
                        <MapPin className="w-3 h-3" /> Dahej NH-48 Expressway
                      </span>
                      <span>• Speed: 54 km/h</span>
                      <span>• Temp: 24.2°C</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    On-Time ETA: 18:30 IST
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

