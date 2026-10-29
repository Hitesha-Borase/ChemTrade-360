import React, { useState } from 'react';
import {
  X,
  Play,
  Pause,
  CheckCircle2,
  ArrowRight,
  FlaskConical,
  Scale,
  Package,
  FileCheck2,
  Truck,
  Sparkles
} from 'lucide-react';

export default function DemoVideoModal({ isOpen, onClose, onLaunchApp }) {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Inbound Inquiry & CAS# Matching',
      icon: FlaskConical,
      detail:
        'Asian Paints requests 120 MT Isobutyl Benzene (CAS: 538-93-2). ChemTrade 360 immediately checks historical supplier prices across Dahej terminals.'
    },
    {
      num: '02',
      title: 'Instant Margin & Quote Lock',
      icon: Scale,
      detail:
        'Our Margin Engine locks a 11.4% gross margin ($5,400 profit) and automatically formats a professional multi-currency PDF quotation.'
    },
    {
      num: '03',
      title: 'FEFO Batch Allocation & Safety Check',
      icon: Package,
      detail:
        'The system selects Tank Farm A-04 based on first-expiry first-out, verifies GHS Class 3 Flammable compatibility, and alerts the warehouse.'
    },
    {
      num: '04',
      title: 'Automated Lab COA & e-Way Bill',
      icon: FileCheck2,
      detail:
        'With 1 click, the QC Certificate of Analysis (99.85% purity) and government NIC GST e-Way bill with QR code are prepared.'
    },
    {
      num: '05',
      title: 'Tanker Dispatch & Real-Time GPS',
      icon: Truck,
      detail:
        'The 32 KL stainless steel tanker rolls out with driver hazardous goods manifest and digital delivery proof (POD).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#FAF8F2] rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#063F32] to-[#075C46] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-[#C6A66A]" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                ChemTrade 360 Workflow Walkthrough
              </h3>
              <p className="text-xs text-emerald-200">
                End-to-end chemical order fulfillment in 5 automated steps
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Step Progress Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {steps.map((st, idx) => {
              const isCurrent = activeStep === idx;
              const Icon = st.icon;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`p-3 rounded-2xl text-left transition-all border ${
                    isCurrent
                      ? 'bg-white border-[#075C46] shadow-md scale-102 ring-1 ring-[#075C46]'
                      : 'bg-white/60 border-[#E3E8DF] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black text-[#C6A66A]">{st.num}</span>
                    <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#075C46]' : 'text-[#7A8980]'}`} />
                  </div>
                  <p className="text-xs font-bold text-[#063F32] truncate">{st.title}</p>
                </button>
              );
            })}
          </div>

          {/* Active Step Demonstration Viewport */}
          <div className="p-6 rounded-3xl bg-white border border-[#E3E8DF] shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-[#C6A66A] bg-[#FAF7F0] px-2.5 py-0.5 rounded-full border border-[#C6A66A]/30">
                Step {steps[activeStep].num} Simulation
              </span>
              <h4 className="text-lg font-extrabold text-[#063F32]">
                {steps[activeStep].title}
              </h4>
            </div>

            <p className="text-sm text-[#4B5E55] leading-relaxed mb-6">
              {steps[activeStep].detail}
            </p>

            {/* Visual simulation graphics */}
            <div className="rounded-2xl bg-[#F7F5EC] p-5 border border-[#E3E8DF] font-mono text-xs text-[#17372F] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#7A8980] border-b border-[#E3E8DF] pb-2">
                <span>SYSTEM STATUS: VALIDATED</span>
                <span>DAHEJ PCPIR NODE #01</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-[#075C46] font-bold">✔ Chemical Safety Check:</span>
                <span>GHS Class 3 (Flammable Liquid) - Verified</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#075C46] font-bold">✔ Weighbridge Calibration:</span>
                <span>Tare 14,200 kg | Gross 46,200 kg (Net 32,000 kg)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#075C46] font-bold">✔ Regulatory Manifest:</span>
                <span>Form 13 Hazardous Waste & Transit e-Way PASS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-6 bg-white border-t border-[#E3E8DF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveStep(prev => (prev > 0 ? prev - 1 : steps.length - 1))}
              className="px-4 py-2 text-xs font-bold text-[#063F32] bg-[#F7F5EC] rounded-xl hover:bg-[#EAE7DC]"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() => setActiveStep(prev => (prev < steps.length - 1 ? prev + 1 : 0))}
              className="px-4 py-2 text-xs font-bold text-[#063F32] bg-[#F7F5EC] rounded-xl hover:bg-[#EAE7DC]"
            >
              Next Step →
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onLaunchApp();
            }}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#063F32] to-[#075C46] text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <span>Launch Full ERP Experience</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

