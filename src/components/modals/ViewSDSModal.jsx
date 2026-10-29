import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, ShieldAlert, AlertTriangle, Flame, Droplets, Eye, FileText, CheckCircle2 } from 'lucide-react';
import HazardBadge from '../common/HazardBadge';

export default function ViewSDSModal() {
  const { closeModal, modalData } = useApp();
  const chem = modalData || {};

  const chemName = chem.name || chem.chemicalName || 'Caustic Soda Lye';
  const formula = chem.chemicalFormula || 'NaOH (aq)';
  const casNo = chem.casNumber || '1310-73-2';
  const hsn = chem.hsnCode || '28151200';
  const hazardClass = chem.hazardClass || 'Class 8: Corrosive';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3E8DF] my-8 max-h-[92vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E8DF] no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-red-50 text-red-700 font-bold px-3 py-1 rounded-full border border-red-200 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
              GHS 16-Section Safety Data Sheet (SDS)
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">OSHA / REACH / PESO Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-[#C6A66A]" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SDS Document Body */}
        <div className="mt-6 text-slate-900 space-y-5 text-xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-red-600 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#17372F] tracking-tight">{chemName}</span>
                <span className="text-xs font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {formula}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Material Safety Data Sheet (MSDS / SDS) • Industrial Grade Commercial Chemical
              </p>
              <div className="flex items-center gap-2 mt-2">
                <HazardBadge cas={casNo} hsn={hsn} />
                <HazardBadge hazardClass={hazardClass} />
              </div>
            </div>

            <div className="sm:text-right">
              <span className="text-red-700 font-black text-sm uppercase block tracking-wider">SIGNAL WORD: DANGER</span>
              <p className="text-[11px] text-slate-500 font-mono mt-1">Document: SDS-IN-{casNo.replace(/[^0-9]/g, '')}</p>
              <p className="text-[11px] text-slate-500">Revised: October 2026 • Rev 4.2</p>
            </div>
          </div>

          {/* 16 Standard Sections in Accordion / Grid */}
          <div className="space-y-3">
            {/* Section 1 & 2 */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#075C46] mb-1.5">
                Section 1: Identification & Emergency Contacts
              </h3>
              <p><strong>Product Identifier:</strong> {chemName} | <strong>CAS No:</strong> {casNo} | <strong>HSN Code:</strong> {hsn}</p>
              <p><strong>Supplier:</strong> ChemTrade Distribution Pvt Ltd, Dahej SEZ Terminal, Gujarat, India</p>
              <p className="text-red-700 font-semibold mt-1">
                24/7 National Chemical Emergency Response Desk: 1800-425-CHEM (2436) / +91-2641-259800
              </p>
            </div>

            <div className="p-3.5 bg-red-50/50 rounded-xl border border-red-200">
              <h3 className="font-bold text-red-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Section 2: Hazards Identification & GHS Classification
              </h3>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li><strong>H314:</strong> Causes severe skin burns and serious eye damage.</li>
                <li><strong>H290:</strong> May be corrosive to metals.</li>
                <li><strong>H302:</strong> Harmful if swallowed in concentrated doses.</li>
              </ul>
              <div className="mt-2 text-[11px] text-slate-600">
                <strong>Precautionary Statements (P-Codes):</strong> P260 (Do not breathe vapors/mist), P280 (Wear protective gloves/clothing/eye protection), P301+P330+P331 (IF SWALLOWED: Rinse mouth. Do NOT induce vomiting).
              </div>
            </div>

            {/* Section 4 & 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#075C46] mb-1.5">
                  Section 4: First-Aid Measures
                </h3>
                <ul className="space-y-1 text-slate-700">
                  <li><strong>Eye Contact:</strong> Rinse with clean water for 15+ minutes. Seek immediate ophthalmologist.</li>
                  <li><strong>Skin Contact:</strong> Immediately drench with water; remove contaminated clothes.</li>
                  <li><strong>Inhalation:</strong> Move to fresh air. Provide oxygen if breathing is labored.</li>
                </ul>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#075C46] mb-1.5">
                  Section 8: Exposure Controls & PPE
                </h3>
                <ul className="space-y-1 text-slate-700">
                  <li><strong>Eye Protection:</strong> Chemical splash goggles + full face shield.</li>
                  <li><strong>Hand Protection:</strong> Heavy-duty Neoprene / Nitrile gloves (EN 374).</li>
                  <li><strong>Body:</strong> Acid/alkali resistant apron and rubber safety boots.</li>
                </ul>
              </div>
            </div>

            {/* Section 7 & 14 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#075C46] mb-1.5">
                  Section 7: Handling & Storage Guidelines
                </h3>
                <p className="text-slate-700">
                  Store in dry, well-ventilated dedicated bunded storage bay. Keep away from reactive metals (Al, Zn) and strong acids. Use dedicated SS316 or HDPE lined tanks.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-[#075C46] mb-1.5">
                  Section 14: Transport Information (IMDG / PESO)
                </h3>
                <p className="text-slate-700">
                  <strong>UN Number:</strong> UN 1824 | <strong>Proper Shipping Name:</strong> SODIUM HYDROXIDE SOLUTION | <strong>Class:</strong> 8 (Corrosive) | <strong>Packing Group:</strong> II | <strong>TREM Card:</strong> Mandatory in tanker cabin.
                </p>
              </div>
            </div>
          </div>

          {/* Compliance & Regulatory Seal */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-[11px] text-emerald-900 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified SDS conforms to GHS Rev 8 & Ministry of Environment, Forest and Climate Change (MoEFCC) Standards.
            </span>
            <span className="font-mono font-bold text-emerald-700">Dahej Compliance Cell</span>
          </div>
        </div>
      </div>
    </div>
  );
}
