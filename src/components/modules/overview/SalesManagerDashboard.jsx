import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  Users,
  FileSpreadsheet,
  Award,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';

export default function SalesManagerDashboard() {
  const { quotations, leads, salesOrders, approveQuotation, openModal, setActiveNav } = useApp();

  const pendingQuotes = quotations.filter(q => q.status === 'Pending Approval');
  const totalQuoteValue = quotations.reduce((acc, q) => acc + q.grandTotal, 0);

  const pipelineStages = [
    { name: 'New Inquiry', count: 1, value: '₹20.4 L' },
    { name: 'Technical Review', count: 1, value: '₹17.4 L' },
    { name: 'Quotation Sent', count: 1, value: '₹60.0 L' },
    { name: 'Price Negotiation', count: 1, value: '₹14.5 L' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Sales Management & Pipeline</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Team pipeline, quote approvals, sales rep targets, and conversion tracking.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_quote')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors"
          >
            + Create Quotation
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active Open Leads"
          value={leads.length.toString()}
          subvalue="High Value RFQs"
          change="+1"
          changeType="positive"
          icon={Users}
          accent={true}
        />
        <KPICard
          title="Pipeline Quote Value"
          value={`₹ ${(totalQuoteValue / 100000).toFixed(1)} L`}
          subvalue="3 Active Offers"
          change="+8.4%"
          changeType="positive"
          icon={FileSpreadsheet}
          badgeText="Active In Market"
        />
        <KPICard
          title="Sales Win Rate"
          value="68.5%"
          subvalue="Target: 60%"
          change="+4.2%"
          changeType="positive"
          icon={Award}
          badgeText="Above Target"
        />
        <KPICard
          title="Quotes Awaiting Approval"
          value={pendingQuotes.length.toString()}
          subvalue="Margin < 7% Rule"
          change={pendingQuotes.length > 0 ? "Requires Review" : "Clear"}
          changeType={pendingQuotes.length > 0 ? "negative" : "positive"}
          icon={Clock}
          badgeText={pendingQuotes.length > 0 ? "Action Required" : "All Clear"}
        />
      </div>

      {/* Pipeline Stage Breakdown */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#17372F] pb-3 border-b border-[#E3E8DF]">
          Chemical Inquiries & Pipeline by Stage
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {pipelineStages.map((stage, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#F7F5EC] border border-[#E3E8DF]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{stage.name}</span>
                <span className="w-5 h-5 rounded-full bg-[#075C46] text-white text-[10px] flex items-center justify-center font-bold">
                  {stage.count}
                </span>
              </div>
              <p className="text-lg font-bold text-[#17372F] mt-2 font-mono">{stage.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quotations Requiring Approval & Sales Rep Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Approvals Queue */}
        <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
            <h2 className="text-sm font-bold text-[#17372F]">Quotation Approval Queue</h2>
            <span className="text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200">
              {pendingQuotes.length} Pending
            </span>
          </div>

          <div className="divide-y divide-[#E3E8DF] mt-3">
            {pendingQuotes.length > 0 ? (
              pendingQuotes.map(q => (
                <div key={q.id} className="py-3 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#17372F]">{q.id}</span>
                      <span className="text-slate-500 ml-1.5">• {q.customerName}</span>
                    </div>
                    <Badge status="Pending Approval" />
                  </div>
                  <div className="p-2.5 rounded bg-[#F7F5EC] border border-[#E3E8DF] space-y-1">
                    <p className="text-slate-700">
                      Offered: <strong>₹{q.grandTotal.toLocaleString('en-IN')}</strong> | Gross Margin: <span className="font-bold text-amber-800">{q.grossMarginPercent}%</span>
                    </p>
                    <p className="text-[11px] text-slate-500 italic">Trigger: {q.approvalNote}</p>
                  </div>
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => openModal('view_quote_pdf', q)}
                      className="px-2.5 py-1 text-xs border border-[#E3E8DF] rounded hover:bg-slate-50"
                    >
                      Inspect Offer
                    </button>
                    <button
                      onClick={() => approveQuotation(q.id)}
                      className="px-3 py-1 text-xs bg-[#0F795C] text-white rounded font-semibold hover:bg-[#0F795C]/90"
                    >
                      Authorize Discount & Margin
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-xs text-slate-500">No quotations currently awaiting approval.</p>
            )}
          </div>
        </div>

        {/* Sales Team Targets vs Actual */}
        <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
          <h2 className="text-sm font-bold text-[#17372F] pb-3 border-b border-[#E3E8DF]">
            Team Performance & Targets (October 2026)
          </h2>
          <div className="divide-y divide-[#E3E8DF] mt-3 space-y-4">
            <div className="pt-2 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#17372F]">Rahul Sen (Sr. Sales Exec)</span>
                <span className="font-mono font-bold text-slate-700">₹24.5 L / ₹30 L (81.6%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#075C46] h-2 rounded-full" style={{ width: '81.6%' }}></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">2 Active Orders • Closed Asian Paints CSL deal</p>
            </div>

            <div className="pt-3 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-[#17372F]">Priya Sharma (Sales Exec)</span>
                <span className="font-mono font-bold text-slate-700">₹18.9 L / ₹25 L (75.6%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#C6A66A] h-2 rounded-full" style={{ width: '75.6%' }}></div>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">1 Active Order • UPL Agro Sulfuric Acid supply</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

