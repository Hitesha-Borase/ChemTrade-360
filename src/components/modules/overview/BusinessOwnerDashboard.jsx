import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  TrendingUp,
  DollarSign,
  AlertTriangle,
  ShoppingBag,
  ArrowRight,
  ShieldAlert,
  Clock,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function BusinessOwnerDashboard() {
  const { quotations, salesOrders, batches, customers, approveQuotation, openModal, setActiveNav } = useApp();

  const pendingQuotes = quotations.filter(q => q.status === 'Pending Approval');
  const lowStockBatches = batches.filter(b => b.availableQty <= 20);
  const quarantinedBatches = batches.filter(b => b.qualityStatus === 'Quarantined');

  return (
    <div className="space-y-6">
      {/* Top Banner & Date Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Executive Business Overview</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Consolidated trading performance, gross margin profitability, risk alerts, and pending approvals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="text-xs bg-white border border-[#E3E8DF] rounded-lg px-3 py-1.5 font-medium text-[#17372F]">
            <option>Current Financial Quarter (Q3 2026-27)</option>
            <option>This Month (October 2026)</option>
            <option>Year to Date (FY 2026-27)</option>
          </select>
          <button
            onClick={() => setActiveNav('reports')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors"
          >
            Full Analytics
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Trading Revenue"
          value="₹ 4.28 Cr"
          subvalue="₹42,800,000"
          change="+14.2%"
          changeType="positive"
          icon={TrendingUp}
          accent={true}
        />
        <KPICard
          title="Gross Margin %"
          value="11.45%"
          subvalue="Target: 10.0%"
          change="+1.8%"
          changeType="positive"
          icon={DollarSign}
          badgeText="Healthy Margin"
        />
        <KPICard
          title="Receivables Outstanding"
          value="₹ 32.0 L"
          subvalue="Overdue: ₹3.10 L"
          change="-4.2%"
          changeType="positive"
          icon={Clock}
          badgeText="1 Overdue"
        />
        <KPICard
          title="Open Sales Orders"
          value={salesOrders.length.toString()}
          subvalue="Value: ₹57.6 L"
          change="+2"
          changeType="positive"
          icon={ShoppingBag}
          badgeText="Fulfilment Active"
        />
      </div>

      {/* Main Grid: Revenue / Margin Trend & Exceptions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Sales & Purchase Performance & Pending Approvals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Business Exceptions & Approvals */}
          <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B7791F]" />
                <h2 className="text-sm font-bold text-[#17372F]">Pending Approvals & Business Exceptions</h2>
              </div>
              <span className="text-xs bg-amber-50 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                {pendingQuotes.length + quarantinedBatches.length} Requiring Decision
              </span>
            </div>

            <div className="divide-y divide-[#E3E8DF] mt-3">
              {pendingQuotes.map(q => (
                <div key={q.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#17372F]">{q.id}</span>
                      <span className="text-[#7A8980]">• {q.customerName}</span>
                      <Badge status="Pending Approval" />
                    </div>
                    <p className="text-slate-600 mt-1">
                      Grand Total: <strong className="text-[#17372F]">₹{q.grandTotal.toLocaleString('en-IN')}</strong> | Internal Margin: <span className="text-amber-700 font-semibold">{q.grossMarginPercent}%</span> (Triggered due to &lt;7% policy)
                    </p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">"{q.approvalNote}"</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => approveQuotation(q.id)}
                      className="px-3 py-1.5 bg-[#0F795C] text-white rounded-lg font-semibold hover:bg-[#0F795C]/90 transition-colors"
                    >
                      Approve Price
                    </button>
                    <button
                      onClick={() => openModal('view_quote_pdf', q)}
                      className="px-2.5 py-1.5 border border-[#E3E8DF] text-[#17372F] rounded-lg hover:bg-[#F7F5EC]"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}

              {quarantinedBatches.map(b => (
                <div key={b.batchNo} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#C43232]">{b.batchNo}</span>
                      <span className="text-[#7A8980]">• {b.chemicalName}</span>
                      <Badge status="Quarantined" />
                    </div>
                    <p className="text-slate-600 mt-1">
                      Qty: <strong>{b.quarantinedQty} {b.uom}</strong> at {b.warehouse}
                    </p>
                    <p className="text-[11px] text-red-700 mt-0.5">{b.notes}</p>
                  </div>
                  <button
                    onClick={() => openModal('quarantine_review', b)}
                    className="px-3 py-1.5 border border-[#B7791F] text-[#B7791F] hover:bg-amber-50 rounded-lg font-semibold transition-colors"
                  >
                    Review QC Hold
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Top Chemical Products Performance */}
          <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
              <h2 className="text-sm font-bold text-[#17372F]">Top Chemical Trading Products</h2>
              <button onClick={() => setActiveNav('catalog')} className="text-xs text-[#C6A66A] font-semibold hover:underline flex items-center gap-1">
                View Catalog <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-[#E3E8DF] text-slate-500 font-semibold uppercase">
                    <th className="pb-2">Chemical Name</th>
                    <th className="pb-2">CAS No.</th>
                    <th className="pb-2">Current Stock</th>
                    <th className="pb-2">Avg Rate</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E3E8DF]">
                  <tr>
                    <td className="py-2.5 font-bold text-[#17372F]">Caustic Soda Lye (48%)</td>
                    <td className="py-2.5 font-mono text-slate-600">1310-73-2</td>
                    <td className="py-2.5 font-semibold">340.5 MT</td>
                    <td className="py-2.5 font-mono">₹34,500/MT</td>
                    <td className="py-2.5"><Badge status="Active" /></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#17372F]">Methanol Pure (99.85%)</td>
                    <td className="py-2.5 font-mono text-slate-600">67-56-1</td>
                    <td className="py-2.5 font-semibold">185.0 MT</td>
                    <td className="py-2.5 font-mono">₹28,200/MT</td>
                    <td className="py-2.5"><Badge status="Active" /></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#17372F]">Titanium Dioxide Rutile</td>
                    <td className="py-2.5 font-mono text-slate-600">13463-67-7</td>
                    <td className="py-2.5 font-semibold">32.5 MT</td>
                    <td className="py-2.5 font-mono">₹242,000/MT</td>
                    <td className="py-2.5"><Badge status="Quarantine Warning" variant="warning" /></td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-[#17372F]">Isopropyl Alcohol (IPA)</td>
                    <td className="py-2.5 font-mono text-slate-600">67-63-0</td>
                    <td className="py-2.5 font-semibold">48.2 MT</td>
                    <td className="py-2.5 font-mono">₹98,500/MT</td>
                    <td className="py-2.5"><Badge status="Expiring Soon" variant="warning" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Col: Top Key Accounts & Inventory Risk */}
        <div className="space-y-6">
          {/* Top Key Accounts */}
          <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
            <h2 className="text-sm font-bold text-[#17372F] pb-3 border-b border-[#E3E8DF]">
              Key Enterprise Accounts
            </h2>
            <div className="divide-y divide-[#E3E8DF] mt-3">
              {customers.slice(0, 4).map(c => (
                <div key={c.id} className="py-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#17372F]">{c.companyName}</span>
                    <span className="font-mono text-slate-500 font-semibold">₹{(c.lifetimeSpend / 10000000).toFixed(2)} Cr</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 mt-1">
                    <span>Outstanding: ₹{c.outstandingBalance.toLocaleString('en-IN')}</span>
                    {c.overdueAmount > 0 ? (
                      <span className="text-[#C43232] font-semibold">₹{c.overdueAmount.toLocaleString('en-IN')} Overdue</span>
                    ) : (
                      <span className="text-[#0F795C]">Current</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Operational Checklist */}
          <div className="glass-card-accent rounded-xl p-5 border border-[#C6A66A]/40 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-[#C6A66A]/30">
              <ShieldAlert className="w-4 h-4 text-[#075C46]" />
              <h2 className="text-sm font-bold text-[#17372F]">Risk & Governance Highlights</h2>
            </div>
            <ul className="mt-3 space-y-2.5 text-xs text-slate-800">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F795C] mt-1.5 flex-shrink-0" />
                <span>GST E-Invoicing IRN API Status: <strong>Live & Synchronized</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7791F] mt-1.5 flex-shrink-0" />
                <span>NCB Precursor Quota (Acetone/Toluene): <strong>63 days remaining</strong> for annual renewal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0F795C] mt-1.5 flex-shrink-0" />
                <span>PESO Bulk Storage License valid through <strong>Dec 2027</strong>.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

