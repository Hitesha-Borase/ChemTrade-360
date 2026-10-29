import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  Receipt,
  AlertCircle,
  CreditCard,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

export default function AccountantDashboard() {
  const { invoices, customers, suppliers, openModal, setActiveNav, showToast } = useApp();

  const overdueInvoices = invoices.filter(inv => inv.status === 'Overdue');
  const totalReceivables = invoices.reduce((acc, inv) => acc + inv.balanceDue, 0);

  const agingBuckets = [
    { label: '0–30 Days', amount: '₹17.11 L', count: 1, status: 'Current' },
    { label: '31–60 Days', amount: '₹4.20 L', count: 1, status: 'Normal' },
    { label: '61–90 Days', amount: '₹7.60 L', count: 1, status: 'Attention' },
    { label: '90+ Days (Overdue)', amount: '₹3.10 L', count: 1, status: 'Critical' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Financial Ledger & Tax Management</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            GST compliance, NIC E-Invoicing IRN generation, debtor receivables aging, and supplier payables.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_invoice')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors"
          >
            + Generate GST Tax Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Receivables"
          value={`₹ ${(totalReceivables / 100000).toFixed(2)} L`}
          subvalue="3 Active Invoices"
          icon={Receipt}
          accent={true}
        />
        <KPICard
          title="Overdue Debtors"
          value="₹ 3.10 L"
          subvalue="UPL Agro-Solutions"
          change="32 Days Overdue"
          changeType="negative"
          icon={AlertCircle}
          badgeText="Collection Notice"
        />
        <KPICard
          title="Supplier Payables"
          value="₹ 49.4 L"
          subvalue="GACL & Deepak Phenolics"
          icon={CreditCard}
          badgeText="Due in 15d"
        />
        <KPICard
          title="Collections This Period"
          value="₹ 18.5 L"
          subvalue="Target: 95% Realized"
          change="+6.2%"
          changeType="positive"
          icon={CheckCircle2}
          badgeText="On Track"
        />
      </div>

      {/* Receivables Aging Buckets */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <h2 className="text-sm font-bold text-[#17372F] pb-3 border-b border-[#E3E8DF]">
          Debtor Receivables Aging Analysis
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {agingBuckets.map((bucket, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#F7F5EC] border border-[#E3E8DF]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{bucket.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                  bucket.status === 'Critical' ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {bucket.status}
                </span>
              </div>
              <p className="text-lg font-bold text-[#17372F] mt-2 font-mono">{bucket.amount}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{bucket.count} Invoice</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent GST Invoices with IRN Status */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div>
            <h2 className="text-sm font-bold text-[#17372F]">Recent GST Tax Invoices & NIC E-Invoice Status</h2>
            <p className="text-xs text-[#7A8980]">Rule 499: 100% Verified IRN & E-Way Bill numbers</p>
          </div>
          <button onClick={() => setActiveNav('finance')} className="text-xs text-[#C6A66A] font-semibold hover:underline flex items-center gap-1">
            All Invoices <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#E3E8DF] mt-3">
          {invoices.map((inv) => (
            <div key={inv.invoiceNumber} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#17372F] font-mono">{inv.invoiceNumber}</span>
                  <span className="text-slate-600 font-semibold">• {inv.customerName}</span>
                  <Badge status={inv.status} size="xs" />
                </div>
                <p className="text-slate-600 mt-1">
                  Grand Total: <strong>₹{inv.grandTotal.toLocaleString('en-IN')}</strong> (Incl. GST: ₹{inv.gstAmount.toLocaleString('en-IN')}) | Balance Due: <span className="font-bold text-[#17372F]">₹{inv.balanceDue.toLocaleString('en-IN')}</span>
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                  <span className="text-emerald-700 font-semibold">IRN: {inv.irnNumber.substring(0, 16)}...</span>
                  <span>•</span>
                  <span>E-Way: {inv.eWayBillNo}</span>
                  <span>•</span>
                  <span>Due: {inv.dueDate}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Printing Tax Invoice ${inv.invoiceNumber}`, 'info')}
                  className="px-2.5 py-1 text-xs border border-[#E3E8DF] rounded hover:bg-[#F7F5EC] font-medium"
                >
                  Print PDF
                </button>
                {inv.balanceDue > 0 && (
                  <button
                    onClick={() => showToast(`Recorded payment receipt for ${inv.invoiceNumber}`, 'success')}
                    className="px-3 py-1 text-xs bg-[#075C46] text-white rounded font-semibold hover:bg-[#063F32]"
                  >
                    Record Receipt
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

