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
  DollarSign
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
          <div className="font-bold text-[#101828]">{row.companyName}</div>
          <div className="text-[11px] text-[#667085] font-mono">{row.id} • {row.contactPerson}</div>
        </div>
      )
    },
    {
      header: 'Chemical Needed',
      accessor: 'chemicalNeeded',
      cell: (row) => (
        <div>
          <span className="font-semibold text-[#101828]">{row.chemicalNeeded}</span>
          <span className="block text-[11px] text-slate-500 font-mono">Qty: {row.estimatedQty} {row.uom}</span>
        </div>
      )
    },
    {
      header: 'Target Price',
      accessor: 'targetPrice',
      cell: (row) => (
        <span className="font-mono font-bold text-[#101828]">
          ₹{row.targetPrice.toLocaleString('en-IN')}/{row.uom}
        </span>
      )
    },
    {
      header: 'Pipeline Stage',
      accessor: 'stage',
      cell: (row) => <Badge status={row.stage} />
    },
    {
      header: 'Assigned Exec',
      accessor: 'assignedTo',
      cell: (row) => <span className="text-xs text-slate-700 font-medium">{row.assignedTo}</span>
    },
    {
      header: 'Next Follow-up',
      accessor: 'nextFollowUp',
      cell: (row) => (
        <span className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          {row.nextFollowUp}
        </span>
      )
    },
    {
      header: 'Action',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openModal('create_quote', { customerName: row.companyName, chemicalNeeded: row.chemicalNeeded })}
            className="px-2.5 py-1 text-xs bg-[#101828] text-white rounded font-medium hover:bg-[#101828]/90"
          >
            Draft Quote
          </button>
        </div>
      )
    }
  ];

  const customerColumns = [
    {
      header: 'Customer / Company',
      accessor: 'companyName',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#101828]">{row.companyName}</div>
          <div className="text-[11px] text-[#667085] font-mono">{row.id} • {row.city}, {row.state}</div>
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
          <span className="font-mono font-bold text-[#101828]">₹{(row.creditLimit / 100000).toFixed(1)} L</span>
          <span className="block text-[11px] text-slate-500">{row.creditDays} Days Credit</span>
        </div>
      )
    },
    {
      header: 'Current Outstanding',
      accessor: 'outstandingBalance',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-[#101828]">₹{row.outstandingBalance.toLocaleString('en-IN')}</span>
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
    }
  ];

  const stagesList = ['New Inquiry', 'Technical Review', 'Quotation Sent', 'Price Negotiation', 'Won'];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">CRM & Customer Accounts</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Capture chemical inquiries, manage enterprise customer dossiers, credit limits, and quotation pipelines.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_lead')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Add Lead / Customer RFQ</span>
          </button>
        </div>
      </div>

      {/* Segmented View Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-2">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'leads' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Leads & Inquiries ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('kanban')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'kanban' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Pipeline Kanban
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'customers' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
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
              <div key={stage} className="bg-white rounded-xl border border-[#E4E7EC] p-3 shadow-sm min-w-[240px]">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC] mb-3">
                  <span className="text-xs font-bold text-[#101828]">{stage}</span>
                  <span className="w-5 h-5 rounded-full bg-[#FAF9F6] border border-[#E4E7EC] text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((l) => (
                    <div key={l.id} className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E4E7EC] hover:border-[#C6A66B] transition-all text-xs space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="font-bold text-[#101828]">{l.companyName}</span>
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
                          className="w-full text-[10px] bg-white border border-[#E4E7EC] rounded px-1.5 py-1 text-slate-700 focus:outline-none"
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
