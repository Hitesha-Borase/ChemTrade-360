import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import { SUPPLIER_QUOTE_COMPARISONS } from '../../../data/mockData';
import {
  PackagePlus,
  Plus,
  Building,
  CheckCircle2,
  FileText,
  Clock,
  ArrowDownToLine,
  Truck
} from 'lucide-react';

export default function ProcurementModule() {
  const { suppliers, purchaseOrders, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('pos'); // 'pos' | 'comparisons' | 'suppliers'

  const poColumns = [
    {
      header: 'PO Number & Supplier',
      accessor: 'id',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#101828] text-sm font-mono">{row.id}</div>
          <div className="text-xs text-slate-700 font-semibold">{row.supplierName}</div>
          <div className="text-[10px] text-slate-400">Order Date: {row.orderDate}</div>
        </div>
      )
    },
    {
      header: 'Chemical Items & Qty',
      accessor: 'items',
      cell: (row) => (
        <div className="text-xs space-y-0.5">
          {row.items.map((it, idx) => (
            <div key={idx}>
              <span className="font-semibold text-[#101828]">{it.chemicalName}</span>
              <span className="text-slate-500 font-mono ml-1">
                ({it.orderedQty} {it.uom} @ ₹{it.rate.toLocaleString('en-IN')})
              </span>
            </div>
          ))}
        </div>
      )
    },
    {
      header: 'Total PO Value',
      accessor: 'totalAmount',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-sm text-[#101828]">
            ₹{row.totalAmount.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-slate-500">{row.paymentStatus}</span>
        </div>
      )
    },
    {
      header: 'Delivery Due Date',
      accessor: 'deliveryDueDate',
      cell: (row) => (
        <span className="font-mono text-xs font-semibold text-slate-800">
          {row.deliveryDueDate}
        </span>
      )
    },
    {
      header: 'Destination Hub',
      accessor: 'destinationWarehouse',
      cell: (row) => <span className="text-xs text-slate-700">{row.destinationWarehouse}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} />
    },
    {
      header: 'Action',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => openModal('create_grn', row)}
            className="px-2.5 py-1 text-xs bg-[#101828] text-white rounded font-medium hover:bg-[#101828]/90"
          >
            Create GRN
          </button>
        </div>
      )
    }
  ];

  const supplierColumns = [
    {
      header: 'Supplier / Vendor',
      accessor: 'companyName',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#101828]">{row.companyName}</div>
          <div className="text-[11px] text-[#667085] font-mono">{row.id} • {row.city}</div>
        </div>
      )
    },
    {
      header: 'Category & Supplies',
      accessor: 'category',
      cell: (row) => (
        <div className="text-xs">
          <span className="font-medium text-slate-800">{row.category}</span>
          <span className="block text-[10px] text-slate-500">{row.suppliedChemicals.join(', ')}</span>
        </div>
      )
    },
    {
      header: 'GSTIN',
      accessor: 'gstin',
      cell: (row) => <span className="font-mono text-xs text-slate-700">{row.gstin}</span>
    },
    {
      header: 'QC Rating',
      accessor: 'rating',
      cell: (row) => (
        <span className="font-mono font-bold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          ★ {row.rating} / 5.0
        </span>
      )
    },
    {
      header: 'Payment Terms',
      accessor: 'paymentTerms',
      cell: (row) => <span className="text-xs text-slate-700">{row.paymentTerms}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} />
    }
  ];

  const comparison = SUPPLIER_QUOTE_COMPARISONS[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Procurement & Inbound Logistics</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Manage chemical suppliers, compare landed purchase costs, issue purchase orders, and verify goods receipts (GRN).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Opening Supplier RFQ creator', 'info')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Create Supplier RFQ</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-2">
        <button
          onClick={() => setActiveTab('pos')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'pos' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Purchase Orders ({purchaseOrders.length})
        </button>
        <button
          onClick={() => setActiveTab('comparisons')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'comparisons' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Quote Comparison Matrix (1)
        </button>
        <button
          onClick={() => setActiveTab('suppliers')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'suppliers' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Supplier Directory ({suppliers.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'pos' && (
        <DataTable
          columns={poColumns}
          data={purchaseOrders}
          searchPlaceholder="Search PO number, supplier, chemical..."
        />
      )}

      {activeTab === 'comparisons' && (
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
            <div>
              <h2 className="text-sm font-bold text-[#101828]">RFQ-PR-2026-092 Supplier Evaluation</h2>
              <p className="text-xs text-[#667085]">
                Commodity: <strong>{comparison.chemical}</strong> ({comparison.requiredQty} {comparison.uom})
              </p>
            </div>
            <span className="text-xs font-bold text-[#8C6F3B] bg-[#FAF7F0] px-2.5 py-1 rounded-full border border-[#C6A66B]/30">
              Landed Cost Evaluation
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#E4E7EC] text-slate-600 font-semibold uppercase">
                  <th className="py-2.5 px-3">Supplier Name</th>
                  <th className="py-2.5 px-3">Base Price</th>
                  <th className="py-2.5 px-3">Freight to Dahej</th>
                  <th className="py-2.5 px-3">Total Landed Cost</th>
                  <th className="py-2.5 px-3">Credit Terms</th>
                  <th className="py-2.5 px-3">Lead Days</th>
                  <th className="py-2.5 px-3 text-right">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {comparison.quotes.map((q, idx) => (
                  <tr key={idx} className={q.recommended ? 'bg-[#FAF7F0]/60' : 'hover:bg-[#FAF9F6]'}>
                    <td className="py-3 px-3 font-bold text-[#101828]">{q.supplierName}</td>
                    <td className="py-3 px-3 font-mono font-semibold">₹{q.baseRate.toLocaleString('en-IN')}/MT</td>
                    <td className="py-3 px-3 font-mono text-slate-600">₹{q.freightRate}/MT</td>
                    <td className="py-3 px-3 font-mono font-bold text-sm text-[#101828]">
                      ₹{q.totalLandedCost.toLocaleString('en-IN')}/MT
                    </td>
                    <td className="py-3 px-3">{q.creditDays} Days</td>
                    <td className="py-3 px-3 font-medium">{q.deliveryLeadDays} Days</td>
                    <td className="py-3 px-3 text-right">
                      {q.recommended ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Best Landed Cost
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Alternative Bid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'suppliers' && (
        <DataTable
          columns={supplierColumns}
          data={suppliers}
          searchPlaceholder="Search suppliers, category, GSTIN..."
        />
      )}
    </div>
  );
}

