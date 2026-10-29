import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  UserCheck,
  Calendar,
  FileText,
  ShoppingBag,
  Plus,
  Phone,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function SalesExecutiveDashboard() {
  const { leads, quotations, salesOrders, openModal, setActiveNav } = useApp();

  const myLeads = leads;
  const myQuotes = quotations.slice(0, 3);
  const myOrders = salesOrders;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">My Sales Desk</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Personal lead pipeline, daily customer follow-ups, quotation drafting, and client orders.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_lead')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E4E7EC] hover:bg-[#FAF9F6] text-[#101828] transition-colors"
          >
            + Add Lead
          </button>
          <button
            onClick={() => openModal('create_quote')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors"
          >
            + New Quotation
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Assigned Inquiries"
          value={myLeads.length.toString()}
          subvalue="Chemical RFQs"
          icon={UserCheck}
          accent={true}
        />
        <KPICard
          title="Today's Follow-ups"
          value="2 Scheduled"
          subvalue="Nerolac & Cipla"
          icon={Calendar}
          badgeText="Due Today"
        />
        <KPICard
          title="My Open Quotes"
          value={myQuotes.length.toString()}
          subvalue="Value: ₹56.4 L"
          icon={FileText}
          badgeText="In Negotiation"
        />
        <KPICard
          title="Orders In Progress"
          value={myOrders.length.toString()}
          subvalue="Active Deliveries"
          icon={ShoppingBag}
          badgeText="Dispatching"
        />
      </div>

      {/* Tasks Due Today & Active Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Follow-up Tasks */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
            <h2 className="text-sm font-bold text-[#101828]">Today's Follow-up Calendar</h2>
            <span className="text-xs font-semibold text-[#16805D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              2 Scheduled
            </span>
          </div>

          <div className="divide-y divide-[#E4E7EC] mt-3 space-y-2">
            <div className="py-2.5 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#101828]">Kansai Nerolac Paints (Manish Verma)</span>
                <span className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">2:30 PM Today</span>
              </div>
              <p className="text-slate-600">Product: Titanium Dioxide Rutile (25 MT) • Discussing R-996 technical equivalent</p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-[#2E6FBB]"><Phone className="w-3 h-3" /> +91 98199 88776</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> m.verma@nerolac.com</span>
              </div>
            </div>

            <div className="py-2.5 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#101828]">Cipla Laboratories (Dr. Archana Rao)</span>
                <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">4:00 PM Today</span>
              </div>
              <p className="text-slate-600">Product: Isopropyl Alcohol (IPA 99.9%) Pharma Grade (18 MT)</p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1 text-[#2E6FBB]"><Phone className="w-3 h-3" /> +91 97555 43210</span>
                <span>•</span>
                <span>Send COA & Endotoxin specifications</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Quotes Created */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
            <h2 className="text-sm font-bold text-[#101828]">My Active Quotations</h2>
            <button onClick={() => setActiveNav('quotations')} className="text-xs text-[#C6A66B] font-semibold hover:underline flex items-center gap-1">
              All Quotes <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#E4E7EC] mt-3">
            {myQuotes.map(q => (
              <div key={q.id} className="py-3 text-xs flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#101828]">{q.id}</span>
                    <span className="text-slate-500">• {q.customerName}</span>
                    <Badge status={q.status} size="xs" />
                  </div>
                  <p className="text-slate-600 mt-1">
                    Value: <strong>₹{q.grandTotal.toLocaleString('en-IN')}</strong> • Valid until {q.validUntil}
                  </p>
                </div>
                <button
                  onClick={() => openModal('view_quote_pdf', q)}
                  className="px-2.5 py-1 text-xs border border-[#E4E7EC] rounded-lg hover:bg-[#FAF9F6] font-medium"
                >
                  View PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

