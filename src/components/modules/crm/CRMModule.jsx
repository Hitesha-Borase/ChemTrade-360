import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  Users,
  Building,
  Plus,
  Phone,
  Mail,
  FileText,
  Clock,
  CheckCircle2,
  Calendar,
  DollarSign,
  MessageSquare,
  History
} from 'lucide-react';

export default function CRMModule() {
  const { leads, customers, updateLeadStage, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'customers' | 'kanban'
  const [stageFilter, setStageFilter] = useState('all');

  const filteredLeads = leads.filter(l => {
    if (stageFilter !== 'all' && l.stage !== stageFilter) return false;
    return true;
  });

  const leadColumns = [
    {
      header: 'Lead ID / Company',
      accessor: 'companyName',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F]">{row.companyName}</div>
          <div className="text-[11px] text-[#7A8980] font-mono">{row.id} • {row.contactPerson}</div>
        </div>
      )
    },
    {
      header: 'Chemical Needed',
      accessor: 'chemicalNeeded',
      cell: (row) => (
        <div>
          <span className="font-semibold text-[#17372F]">{row.chemicalNeeded}</span>
          <span className="block text-[11px] text-slate-500 font-mono">Qty: {row.estimatedQty} {row.uom}</span>
        </div>
      )
    },
    {
      header: 'Target Price',
      accessor: 'targetPrice',
      cell: (row) => (
        <span className="font-mono font-bold text-[#17372F]">
          ₹{row.targetPrice.toLocaleString('en-IN')}/{row.uom}
        </span>
      )
    },
    {
      header: 'Pipeline Stage',
      accessor: 'stage',
      cell: (row) => {
        const nextStages = {
          'New Inquiry': 'Technical Review',
          'Technical Review': 'Quotation Sent',
          'Quotation Sent': 'Price Negotiation',
          'Price Negotiation': 'Won',
          'Won': 'New Inquiry'
        };
        return (
          <Badge
            status={row.stage}
            onClick={() => updateLeadStage(row.id, nextStages[row.stage] || 'Technical Review')}
            title="Click to progress lead stage"
          />
        );
      }
    },
    {
      header: 'Assigned Exec',
      accessor: 'assignedTo',
      cell: (row) => <span className="text-xs text-slate-700 font-medium whitespace-nowrap">{row.assignedTo}</span>
    },
    {
      header: 'Next Follow-up',
      accessor: 'nextFollowUp',
      cell: (row) => (
        <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 whitespace-nowrap">
          {row.nextFollowUp}
        </span>
      )
    },
    {
      header: 'Action',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <button
            onClick={() => openModal('create_quote', { customerName: row.companyName, chemicalNeeded: row.chemicalNeeded, qty: row.estimatedQty })}
            className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded-lg font-semibold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            title="Create formal quotation for this inquiry"
          >
            Draft Quote
          </button>
          <button
            onClick={() => {
              const cleanPhone = (row.phone || '').replace(/[^0-9]/g, '');
              const msg = encodeURIComponent(`Hello ${row.contactPerson}, following up regarding your chemical inquiry for ${row.chemicalNeeded} (${row.estimatedQty} ${row.uom || 'MT'}) with ChemTrade.`);
              window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
            }}
            className="p-1 rounded-lg border border-[#E3E8DF] hover:bg-emerald-50 text-emerald-700 hover:border-emerald-300 transition-colors"
            title={`WhatsApp ${row.contactPerson} (${row.phone})`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
          <a
            href={`tel:${row.phone}`}
            className="p-1 rounded-lg border border-[#E3E8DF] hover:bg-blue-50 text-blue-700 hover:border-blue-300 transition-colors"
            title={`Call ${row.contactPerson} (${row.phone})`}
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        </div>
      )
    }
  ];

  const customerColumns = [
    {
      header: 'Customer / Company',
      accessor: 'companyName',
      cell: (row) => (
        <div 
          onClick={() => openModal('customer_history', row)}
          className="cursor-pointer group"
          title="Click to view Customer Purchase History & Dossier"
        >
          <div className="font-bold text-[#17372F] group-hover:text-[#075C46] group-hover:underline flex items-center gap-1.5">
            <span>{row.companyName}</span>
          </div>
          <div className="text-[11px] text-[#7A8980] font-mono">{row.id} • {row.city}, {row.state}</div>
        </div>
      )
    },
    {
      header: 'GSTIN & PAN',
      accessor: 'gstin',
      cell: (row) => (
        <div className="font-mono text-xs text-slate-700">
          <div>{row.gstin}</div>
          <div className="text-[10px] text-slate-400">PAN: {row.pan}</div>
        </div>
      )
    },
    {
      header: 'Credit Limit / Terms',
      accessor: 'creditLimit',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#17372F]">₹{(row.creditLimit / 100000).toFixed(1)} L</span>
          <span className="block text-[11px] text-slate-500">{row.creditDays} Days Credit</span>
        </div>
      )
    },
    {
      header: 'Current Outstanding',
      accessor: 'outstandingBalance',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#17372F]">₹{row.outstandingBalance.toLocaleString('en-IN')}</span>
          {row.overdueAmount > 0 && (
            <span className="block text-[10px] text-[#C43232] font-semibold">Overdue: ₹{row.overdueAmount.toLocaleString('en-IN')}</span>
          )}
        </div>
      )
    },
    {
      header: 'Customer Tier',
      accessor: 'tier',
      cell: (row) => <Badge status={row.tier} variant="gold" />
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} />
    },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <button
            onClick={() => openModal('customer_history', row)}
            className="px-2.5 py-1 text-xs border border-[#E3E8DF] hover:bg-slate-50 text-slate-700 rounded-lg font-semibold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
            title="View complete purchase & invoice history"
          >
            <History className="w-3.5 h-3.5 text-[#075C46]" />
            <span>History</span>
          </button>
          <button
            onClick={() => openModal('create_quote', { customerName: row.companyName })}
            className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded-lg font-semibold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            title="Create formal quote for customer"
          >
            Quote
          </button>
          <button
            onClick={() => {
              const cleanPhone = (row.phone || '').replace(/[^0-9]/g, '');
              const msg = encodeURIComponent(`Hello ${row.contactPerson}, reaching out from ChemTrade regarding your industrial chemical orders.`);
              window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank');
            }}
            className="p-1 rounded-lg border border-[#E3E8DF] hover:bg-emerald-50 text-emerald-700 hover:border-emerald-300 transition-colors"
            title={`WhatsApp ${row.contactPerson}`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  const stagesList = ['New Inquiry', 'Technical Review', 'Quotation Sent', 'Price Negotiation', 'Won'];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">CRM & Customer Accounts</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Capture chemical inquiries, manage enterprise customer dossiers, credit limits, and quotation pipelines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_lead')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Add Lead / Customer RFQ</span>
          </button>
        </div>
      </div>

      {/* Segmented View Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E3E8DF] pb-2">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'leads' ? 'bg-[#075C46] text-white' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          Leads & Inquiries ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('kanban')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'kanban' ? 'bg-[#075C46] text-white' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          Pipeline Kanban
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'customers' ? 'bg-[#075C46] text-white' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          Customer Directory ({customers.length})
        </button>
      </div>

      {/* Render Active View */}
      {activeTab === 'leads' && (
        <DataTable
          columns={leadColumns}
          data={filteredLeads}
          searchPlaceholder="Search leads, chemical name, contact..."
          filterOptions={[
            { label: 'All Inquiries', value: 'all' },
            { label: 'New', value: 'New Inquiry' },
            { label: 'Technical Review', value: 'Technical Review' },
            { label: 'Quoted', value: 'Quotation Sent' },
            { label: 'Negotiation', value: 'Price Negotiation' }
          ]}
          activeFilter={stageFilter}
          onFilterChange={setStageFilter}
        />
      )}

      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {stagesList.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage);
            return (
              <div key={stage} className="bg-white rounded-xl border border-[#E3E8DF] p-3 shadow-sm min-w-[240px]">
                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8DF] mb-3">
                  <span className="text-xs font-bold text-[#17372F]">{stage}</span>
                  <span className="w-5 h-5 rounded-full bg-[#F7F5EC] border border-[#E3E8DF] text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((l) => (
                    <div key={l.id} className="p-3 rounded-lg bg-[#F7F5EC] border border-[#E3E8DF] hover:border-[#C6A66A] transition-all text-xs space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-[#17372F]">{l.companyName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{l.id}</span>
                      </div>
                      <p className="text-slate-600 font-medium">{l.chemicalNeeded} ({l.estimatedQty} {l.uom})</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                        <span>₹{l.targetPrice.toLocaleString('en-IN')}/{l.uom}</span>
                        <span className="font-semibold text-amber-700">{l.nextFollowUp}</span>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        <select
                          value={l.stage}
                          onChange={(e) => updateLeadStage(l.id, e.target.value)}
                          className="w-full text-[10px] bg-white border border-[#E3E8DF] rounded px-1.5 py-1 text-slate-700 focus:outline-none"
                        >
                          {stagesList.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                  {stageLeads.length === 0 && (
                    <p className="text-center text-slate-400 text-xs py-6 italic">No leads in this stage</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'customers' && (
        <DataTable
          columns={customerColumns}
          data={customers}
          searchPlaceholder="Search customers, GSTIN, city..."
        />
      )}
    </div>
  );
}
