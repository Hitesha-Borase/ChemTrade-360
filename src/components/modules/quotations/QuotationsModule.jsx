import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  FileSpreadsheet,
  Plus,
  Eye,
  CheckCircle2,
  FileText,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  MessageSquare
} from 'lucide-react';

export default function QuotationsModule() {
  const {
    quotations,
    currentRole,
    approveQuotation,
    convertQuoteToSalesOrder,
    openModal,
    showToast
  } = useApp();

  const [statusFilter, setStatusFilter] = useState('all');

  const filteredQuotes = quotations.filter(q => {
    if (statusFilter !== 'all' && q.status !== statusFilter) return false;
    return true;
  });

  const isExternalCustomer = currentRole === 'customer_portal';
  const isManagerOrAdmin = ['admin', 'super_admin', 'business_owner', 'sales_manager'].includes(currentRole);

  const columns = [
    {
      header: 'Quote ID / Customer',
      accessor: 'id',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F] text-sm flex items-center gap-1.5">
            <span>{row.id}</span>
            <span className="text-[10px] text-slate-400 font-mono">({row.rfqRef})</span>
          </div>
          <div className="text-xs text-slate-700 font-medium">{row.customerName}</div>
          <div className="text-[10px] text-slate-400">Date: {row.date} • Valid: {row.validUntil}</div>
        </div>
      )
    },
    {
      header: 'Items Quoted',
      accessor: 'items',
      cell: (row) => (
        <div className="space-y-0.5 text-xs">
          {row.items.map((it, idx) => (
            <div key={idx} className="text-slate-800">
              <span className="font-semibold">{it.name}</span>
              <span className="text-slate-500 font-mono ml-1.5">({it.qty} {it.uom} @ ₹{it.quotedRate.toLocaleString('en-IN')})</span>
            </div>
          ))}
        </div>
      )
    },
    {
      header: 'Grand Total',
      accessor: 'grandTotal',
      cell: (row) => (
        <div>
          <div className="font-mono font-bold text-sm text-[#17372F]">
            ₹{row.grandTotal.toLocaleString('en-IN')}
          </div>
          <div className="text-[10px] text-slate-500">
            Base: ₹{row.subtotal.toLocaleString('en-IN')} + GST
          </div>
        </div>
      )
    },
    // Internal Staff ONLY Gross Margin column (Wireframe Section 6.4 & 13)
    ...(!isExternalCustomer ? [{
      header: 'Gross Margin (Internal)',
      accessor: 'grossMarginPercent',
      cell: (row) => (
        <div>
          <span className={`font-mono font-bold text-xs ${
            row.grossMarginPercent < 7 ? 'text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200' : 'text-[#0F795C]'
          }`}>
            {row.grossMarginPercent}%
          </span>
          <span className="block text-[10px] text-slate-500 font-mono mt-0.5">
            Profit: ₹{row.grossMarginAmount.toLocaleString('en-IN')}
          </span>
        </div>
      )
    }] : []),
    {
      header: 'Approval Status',
      accessor: 'status',
      cell: (row) => (
        <Badge
          status={row.status}
          onClick={() => {
            if (row.status === 'Pending Approval' && isManagerOrAdmin) {
              approveQuotation(row.id);
            }
          }}
          title={row.status === 'Pending Approval' && isManagerOrAdmin ? 'Click to Approve quotation' : undefined}
        />
      )
    },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5 flex-nowrap whitespace-nowrap">
          <button
            onClick={() => openModal('view_quote_pdf', row)}
            className="p-1.5 rounded-lg border border-[#E3E8DF] hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 shadow-2xs active:scale-95 transition-all"
            title="Preview Printable PDF Quotation"
          >
            <Download className="w-3.5 h-3.5 text-[#C6A66A]" />
          </button>
          <button
            onClick={() => {
              const msg = encodeURIComponent(`Chemical Quotation ${row.id} for ${row.customerName}:\nTotal Amount: ₹${row.grandTotal?.toLocaleString('en-IN')}\nValid Until: ${row.validUntil}\nChemTrade Distribution.`);
              window.open(`https://wa.me/?text=${msg}`, '_blank');
            }}
            className="p-1.5 rounded-lg border border-[#E3E8DF] hover:bg-emerald-50 hover:border-emerald-300 text-emerald-700 shadow-2xs active:scale-95 transition-all"
            title="Share Quotation Offer on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          </button>

          {row.status === 'Pending Approval' && isManagerOrAdmin && (
            <button
              onClick={() => approveQuotation(row.id)}
              className="px-2.5 py-1 text-xs bg-[#0F795C] text-white rounded-lg font-bold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            >
              Approve
            </button>
          )}

          {row.status === 'Approved' && (
            <button
              onClick={() => convertQuoteToSalesOrder(row.id)}
              className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded-lg font-semibold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            >
              Convert to Order
            </button>
          )}

          {row.status === 'Accepted' && (
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Order Active
            </span>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Commercial Quotations & RFQs</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Dynamic quotation builder, automated GST & freight calculation, margin authorization, and PDF generation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_quote')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Create New Quotation</span>
          </button>
        </div>
      </div>

      {/* Quotations Table */}
      <DataTable
        columns={columns}
        data={filteredQuotes}
        searchPlaceholder="Search quotation by ID, customer name, RFQ ref..."
        filterOptions={[
          { label: 'All Quotations', value: 'all' },
          { label: 'Pending Approval', value: 'Pending Approval' },
          { label: 'Approved', value: 'Approved' },
          { label: 'Sent', value: 'Sent' },
          { label: 'Accepted', value: 'Accepted' }
        ]}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />
    </div>
  );
}

