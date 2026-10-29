import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, ShieldCheck, Award, FileText } from 'lucide-react';

export default function ViewCOAModal() {
  const { closeModal, modalData } = useApp();
  const data = modalData || {};

  // Normalize data whether passed from chemical catalog or inventory batch
  const batchNo = data.batchNo || `BAT-2026-${data.casNumber ? data.casNumber.replace(/-/g, '').slice(0, 4) : 'CS-01'}`;
  const chemicalName = data.chemicalName || data.name || 'Caustic Soda Lye (48%)';
  const grade = data.grade || 'Rayon / Industrial High Purity Grade';
  const supplier = data.supplier || data.manufacturer || 'Gujarat Alkalies & Chemicals Ltd (GACL)';
  const mfgDate = data.receivedDate || '2026-08-15';
  const expiryDate = data.expiryDate || '2027-08-14';
  const lotSize = data.availableQty ? `${data.availableQty} ${data.uom || 'MT'}` : (data.currentStock ? `${data.currentStock} ${data.uom || 'MT'}` : '40.0 MT');
  const casNo = data.casNumber || '1310-73-2';

  // Sample chemical analysis parameters
  const testParameters = [
    { parameter: 'Assay / Main Chemical Content', standard: '≥ 48.00 % w/w', observed: '48.45 % w/w', testMethod: 'IS 252 : 2013 Titrimetric', result: 'Pass' },
    { parameter: 'Sodium Carbonate (Na₂CO₃)', standard: '≤ 0.20 % w/w', observed: '0.08 % w/w', testMethod: 'IS 252 : 2013 Volumetric', result: 'Pass' },
    { parameter: 'Chlorides (as NaCl)', standard: '≤ 100 ppm', observed: '42 ppm', testMethod: 'Potentiometric Titration', result: 'Pass' },
    { parameter: 'Iron Content (as Fe)', standard: '≤ 10 ppm', observed: '3.2 ppm', testMethod: 'AAS (Atomic Absorption)', result: 'Pass' },
    { parameter: 'Specific Gravity @ 20°C', standard: '1.500 - 1.520', observed: '1.512', testMethod: 'Hydrometer Method', result: 'Pass' },
    { parameter: 'Physical Appearance', standard: 'Clear Colorless Liquid', observed: 'Conforms Visually', testMethod: 'Visual Inspection', result: 'Pass' }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3E8DF] my-8 max-h-[92vh] overflow-y-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E3E8DF] no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-[#DDE9D9] text-[#075C46] font-bold px-3 py-1 rounded-full border border-[#C6A66A]/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#C6A66A]" />
              Official Certificate of Analysis (COA)
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">Certified QC Dossier</span>
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

        {/* Printable Document Body */}
        <div className="mt-6 text-slate-900 space-y-6">
          {/* Company & Lab Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-[#075C46] pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-[#17372F] tracking-tight">ChemTrade</span>
                <span className="text-xs text-[#075C46] font-bold uppercase tracking-wider bg-[#DDE9D9] px-2 py-0.5 rounded border border-[#C6A66A]/30">
                  Analytical QC Labs
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                ChemTrade Distribution Pvt Ltd • Quality Assurance & Testing Division
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                Dahej SEZ Terminal, Gujarat • NABL Accredited Lab Reg: TC-8841 • ISO 9001:2015
              </p>
            </div>

            <div className="sm:text-right">
              <h2 className="text-lg font-black text-[#075C46] uppercase tracking-wide">CERTIFICATE OF ANALYSIS</h2>
              <p className="font-mono text-xs font-bold text-slate-700 mt-0.5">COA No: COA-2026-{batchNo.replace(/[^0-9]/g, '').slice(-4) || '8891'}</p>
              <p className="text-[11px] text-slate-500">Report Date: {new Date().toISOString().split('T')[0]}</p>
            </div>
          </div>

          {/* Product & Batch Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F7F5EC] p-4 rounded-xl border border-[#E3E8DF]">
            <div className="space-y-1">
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Product Name:</span> <strong className="text-[#17372F] text-sm">{chemicalName}</strong></p>
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Grade / Specification:</span> <span className="text-slate-800 font-medium">{grade}</span></p>
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">CAS Registry Number:</span> <span className="font-mono text-slate-700">{casNo}</span></p>
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Manufacturer / Source:</span> <span className="text-slate-800">{supplier}</span></p>
            </div>

            <div className="space-y-1 sm:border-l sm:border-[#E3E8DF] sm:pl-4">
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Batch / Lot Number:</span> <strong className="font-mono text-sm text-[#075C46]">{batchNo}</strong></p>
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Lot / Consignment Size:</span> <span className="font-mono text-slate-800">{lotSize}</span></p>
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Date of Manufacturing:</span> <span className="font-mono text-slate-800">{mfgDate}</span></p>
              <p><span className="text-slate-500 uppercase text-[10px] font-bold block">Best Before / Expiry Date:</span> <span className="font-mono text-emerald-800 font-semibold">{expiryDate}</span></p>
            </div>
          </div>

          {/* Analytical Test Parameters Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-[#E3E8DF] rounded-xl overflow-hidden">
              <thead className="bg-[#075C46] text-white">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Test Parameter</th>
                  <th className="py-2.5 px-3 font-semibold">Standard Specification</th>
                  <th className="py-2.5 px-3 font-semibold">Observed Value</th>
                  <th className="py-2.5 px-3 font-semibold">Test Method</th>
                  <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E3E8DF] bg-white">
                {testParameters.map((p, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-[#17372F]">{p.parameter}</td>
                    <td className="py-2.5 px-3 text-slate-600 font-mono">{p.standard}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-[#075C46]">{p.observed}</td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">{p.testMethod}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {p.result}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* QC Conclusion & Authorization */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-800">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-xs text-emerald-900">QC Conclusion: APPROVED & RELEASED FOR DISPATCH</p>
                <p className="text-[11px] text-emerald-800">The sample tested conforms in full to Indian & International Pharmacopoeia / Technical Standards.</p>
              </div>
            </div>

            <div className="text-right border-t sm:border-t-0 sm:border-l border-emerald-200 pt-3 sm:pt-0 sm:pl-4 min-w-[150px]">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Authorized Signatory</p>
              <p className="font-serif italic font-bold text-xs text-slate-800 mt-1">Dr. S. K. Nair, Ph.D.</p>
              <p className="text-[10px] text-slate-500">Chief Quality Chemist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

