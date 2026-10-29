import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  Receipt,
  Plus,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Download
} from 'lucide-react';

export default function FinanceModule() {
  const { invoices, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('invoices'); // 'invoices' | 'receivables'

  const invoiceColumns = [
    {
      header: 'Invoice No & Ref',
      accessor: 'invoiceNumber',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F] text-sm font-mono">{row.invoiceNumber}</div>
          <div className="text-[11px] text-slate-500 font-mono">SO: {row.salesOrderRef}</div>
          <div className="text-[10px] text-slate-400">Date: {row.invoiceDate}</div>
        </div>
      )
    },
    {
      header: 'Customer / Debtor',
      accessor: 'customerName',
      cell: (row) => <span className="font-semibold text-slate-800 text-xs">{row.customerName}</span>
    },
    {
      header: 'Grand Total & Tax',
      accessor: 'grandTotal',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-sm text-[#17372F]">
            ₹{row.grandTotal.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-slate-500 font-mono">
            GST (18%): ₹{row.gstAmount.toLocaleString('en-IN')}
          </span>
        </div>
      )
    },
    {
      header: 'Balance Due',
      accessor: 'balanceDue',
      cell: (row) => (
        <div>
          <span className={`font-mono font-bold text-sm ${
            row.balanceDue > 0 ? (row.status === 'Overdue' ? 'text-[#C43232]' : 'text-[#17372F]') : 'text-[#0F795C]'
          }`}>
            ₹{row.balanceDue.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-slate-500 font-mono">
            Paid: ₹{row.paidAmount.toLocaleString('en-IN')}
          </span>
        </div>
      )
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      cell: (row) => (
        <span className="font-mono text-xs font-medium text-slate-700">
          {row.dueDate}
        </span>
      )
    },
    {
      header: 'NIC E-Invoice IRN & E-Way',
      accessor: 'irnStatus',
      cell: (row) => (
        <div className="text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" /> IRN Active
          </span>
          <span className="block font-mono text-[10px] text-slate-500 mt-0.5">
            E-Way: {row.eWayBillNo}
          </span>
        </div>
      )
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
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => showToast(`Printing GST Tax Invoice ${row.invoiceNumber}`, 'info')}
            className="p-1.5 rounded border border-[#E3E8DF] hover:bg-[#F7F5EC] text-slate-700"
            title="Print Tax Invoice"
          >
            <Printer className="w-3.5 h-3.5 text-[#C6A66A]" />
          </button>
          {row.balanceDue > 0 && (
            <button
              onClick={() => showToast(`Recorded payment receipt for ${row.invoiceNumber}`, 'success')}
              className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded font-medium hover:bg-[#063F32]"
            >
              Collect
            </button>
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
          <h1 className="text-xl font-bold text-[#17372F]">Finance, Invoicing & GST Compliance</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            GST compliant tax invoices, automated NIC E-Invoicing IRN generation, debtor ledger, and receivables aging.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_invoice')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Generate GST Tax Invoice</span>
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <DataTable
        columns={invoiceColumns}
        data={invoices}
        searchPlaceholder="Search invoice no., customer, sales order ref..."
      />
    </div>
  );
}

