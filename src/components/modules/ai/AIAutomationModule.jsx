import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  Bot,
  Sparkles,
  FileText,
  Send,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Copy,
  Check
} from 'lucide-react';

export default function AIAutomationModule() {
  const { openModal, showToast } = useApp();
  const [extractedData, setExtractedData] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [sampleRfqText, setSampleRfqText] = useState(
    `Dear ChemTrade Sales Team,
Please provide your best CIF quotation for 40 MT Caustic Soda Lye (Rayon Grade 48% Min) to our paint manufacturing plant located at Taloja MIDC, Navi Mumbai.
We require dispatch within 10 days in dedicated SS316 road tankers.
Payment terms requested: 45 days credit from invoice date.
Also attach COA of the available batch.
Regards,
Rajesh Sharma
Asian Paints Ltd`
  );

  const handleExtract = () => {
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedData({
        customer: 'Asian Paints Ltd',
        contact: 'Rajesh Sharma',
        commodity: 'Caustic Soda Lye (48%)',
        cas: '1310-73-2',
        grade: 'Rayon Grade',
        qty: 40.0,
        uom: 'MT',
        destination: 'Taloja MIDC, Navi Mumbai',
        requestedCredit: '45 Days',
        leadTime: '10 Days',
        tankerRequired: 'SS316 Dedicated Road Tanker',
        coaRequired: true,
        confidenceScore: '98.4%'
      });
      showToast('AI successfully parsed chemical inquiry parameters!', 'success');
    }, 900);
  };

  const handleCreateQuoteFromAI = () => {
    if (!extractedData) return;
    openModal('create_quote', {
      customerName: extractedData.customer,
      chemicalNeeded: extractedData.commodity,
      qty: extractedData.qty,
      destination: extractedData.destination
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-[#C6A66A]/20 text-[#C6A66A]">
              <Sparkles className="w-4 h-4" />
            </span>
            <h1 className="text-xl font-bold text-[#17372F]">AI & Automation Operations Suite</h1>
          </div>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Smart RFQ/PO document parsing, intelligent price suggestion, demand forecasting, and payment reminder drafting.
          </p>
        </div>
        <div className="text-xs bg-amber-50 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
          <span>Rule 278: AI outputs are suggestions requiring human review before commitment.</span>
        </div>
      </div>

      {/* Grid: RFQ Parser & Demand Forecasting */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Interactive RFQ Document Extractor */}
        <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E3E8DF]">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-[#C6A66A]" />
              <h2 className="text-sm font-bold text-[#17372F]">RFQ & PO Document Text Extractor</h2>
            </div>
            <span className="text-[10px] bg-[#DDE9D9] text-[#075C46] font-bold px-2 py-0.5 rounded border border-[#C6A66A]/40">
              NLP Parser Active
            </span>
          </div>

          <p className="text-xs text-slate-600">
            Paste raw chemical inquiries from emails, customer WhatsApp messages, or purchase tenders to automatically parse chemical specs and generate draft quotes:
          </p>

          <textarea
            value={sampleRfqText}
            onChange={(e) => setSampleRfqText(e.target.value)}
            rows={6}
            className="w-full p-3 text-xs font-mono bg-[#F7F5EC] border border-[#E3E8DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075C46]/20 text-[#17372F]"
          />

          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Understands CAS, grades, payment terms & UOMs</span>
            <button
              onClick={handleExtract}
              disabled={isExtracting}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#075C46] text-white text-xs font-bold rounded-lg hover:bg-[#063F32] transition-all shadow-sm"
            >
              <Sparkles className={`w-3.5 h-3.5 text-[#C6A66A] ${isExtracting ? 'animate-spin' : ''}`} />
              <span>{isExtracting ? 'Extracting Entities...' : 'Run Extraction'}</span>
            </button>
          </div>

          {/* Extracted Structured Entity Card */}
          {extractedData && (
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> Extracted Parameters ({extractedData.confidenceScore} match)
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  Ready to Quote
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-slate-500">Customer:</span> <strong className="text-slate-800">{extractedData.customer}</strong></div>
                <div><span className="text-slate-500">Contact:</span> <strong className="text-slate-800">{extractedData.contact}</strong></div>
                <div><span className="text-slate-500">Commodity:</span> <strong className="text-slate-800">{extractedData.commodity}</strong></div>
                <div><span className="text-slate-500">CAS No.:</span> <strong className="font-mono text-slate-800">{extractedData.cas}</strong></div>
                <div><span className="text-slate-500">Quantity:</span> <strong className="text-slate-800">{extractedData.qty} {extractedData.uom}</strong></div>
                <div><span className="text-slate-500">Credit Terms:</span> <strong className="text-slate-800">{extractedData.requestedCredit}</strong></div>
              </div>

              <div className="pt-2 border-t border-emerald-200/60 flex justify-end">
                <button
                  onClick={handleCreateQuoteFromAI}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0F795C] text-white text-xs font-bold rounded-lg hover:bg-[#0F795C]/90 transition-all shadow-sm"
                >
                  <span>Build Quotation with AI Prefill</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Demand Forecast & Automated Payment Reminder Drafts */}
        <div className="space-y-6">
          {/* Demand Forecast */}
          <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E3E8DF]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#0F795C]" />
                <h2 className="text-sm font-bold text-[#17372F]">Demand Forecasting & Sourcing Alerts</h2>
              </div>
              <span className="text-[10px] bg-blue-50 text-blue-800 font-bold px-2 py-0.5 rounded border border-blue-200">
                Predictive AI
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#F7F5EC] border border-[#E3E8DF] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17372F]">Isopropyl Alcohol (IPA 99.9%)</span>
                  <span className="text-amber-800 font-bold">Reorder Needed in 8 Days</span>
                </div>
                <p className="text-slate-600">
                  Current stock (48.2 MT) will deplete below minimum safety threshold (25 MT) by Nov 6 based on repeat consumption from Sun Pharma & Cipla.
                </p>
                <p className="text-[11px] text-slate-500 font-mono">Suggested PO: 40 MT from Deepak Phenolics at ~₹91,000/MT</p>
              </div>

              <div className="p-3 rounded-lg bg-[#F7F5EC] border border-[#E3E8DF] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17372F]">Caustic Soda Lye (48%)</span>
                  <span className="text-emerald-800 font-bold">Stock Optimum</span>
                </div>
                <p className="text-slate-600">
                  Stock of 340.5 MT covers next 26 days of average daily dispatch run-rate.
                </p>
              </div>
            </div>
          </div>

          {/* AI Payment Reminder Drafting */}
          <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-[#17372F] pb-2 border-b border-[#E3E8DF]">
              AI Payment Follow-up Draft
            </h2>
            <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-200 text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#17372F]">UPL Agro-Solutions (Invoice INV-2026-0675)</span>
                <span className="text-[10px] text-red-700 font-bold">₹3.10 L Overdue (32 Days)</span>
              </div>
              <p className="text-slate-700 italic text-[11px] bg-white p-2.5 rounded border border-amber-200">
                "Dear Accounts Team at UPL Agro, gentle reminder regarding outstanding balance of ₹3,10,000 against Tax Invoice INV-2026-0675 due on 12-Oct-2026. As fresh chemical supplies are pending dispatch, kindly share payment UTR reference at earliest."
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => showToast('Copied payment reminder to clipboard & opened WhatsApp gateway', 'success')}
                  className="px-3 py-1 bg-[#075C46] text-white text-xs font-semibold rounded hover:bg-[#063F32]"
                >
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

