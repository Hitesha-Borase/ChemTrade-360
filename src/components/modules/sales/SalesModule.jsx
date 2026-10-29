import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  ShoppingBag,
  Plus,
  Truck,
  CheckCircle2,
  FileText,
  Clock,
  Warehouse
} from 'lucide-react';

export default function SalesModule() {
  const { salesOrders, openModal, showToast } = useApp();
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = salesOrders.filter(so => {
    if (statusFilter !== 'all' && so.status !== statusFilter) return false;
    return true;
  });

  const columns = [
    {
      header: 'Order ID & Customer',
      accessor: 'id',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F] text-sm flex items-center gap-1.5">
            <span>{row.id}</span>
            <span className="text-[10px] text-slate-400 font-mono">({row.quotationRef})</span>
          </div>
          <div className="text-xs text-slate-700 font-semibold">{row.customerName}</div>
          <div className="text-[10px] text-slate-500">Order Date: {row.orderDate}</div>
        </div>
      )
    },
    {
      header: 'Customer PO Ref',
      accessor: 'poNumber',
      cell: (row) => (
        <div className="font-mono text-xs text-slate-700">
          <div>{row.poNumber}</div>
          <div className="text-[10px] text-slate-400">PO Date: {row.poDate}</div>
        </div>
      )
    },
    {
      header: 'Commodity & Allocated Batch',
      accessor: 'items',
      cell: (row) => (
        <div className="text-xs space-y-1">
          {row.items.map((it, idx) => (
            <div key={idx}>
              <span className="font-bold text-[#17372F]">{it.chemicalName}</span>
              <span className="text-slate-600 font-mono ml-1">({it.qty} {it.uom})</span>
              <div className="text-[10px] text-emerald-800 font-mono">Batch: {it.batchNo}</div>
            </div>
          ))}
        </div>
      )
    },
    {
      header: 'Total Order Value',
      accessor: 'totalValue',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-sm text-[#17372F]">
            ₹{row.totalValue.toLocaleString('en-IN')}
          </span>
          <span className="block text-[10px] text-slate-500">{row.paymentStatus}</span>
        </div>
      )
    },
    {
      header: 'Expected Dispatch',
      accessor: 'expectedDispatchDate',
      cell: (row) => (
        <span className="text-xs font-mono font-medium text-slate-700">
          {row.expectedDispatchDate}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} />
    },
    {
      header: 'Logistics Action',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          {row.status === 'Confirmed' && (
            <button
              onClick={() => openModal('schedule_dispatch', row)}
              className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded font-medium hover:bg-[#063F32]"
            >
              Allocate Tanker
            </button>
          )}
          {row.status === 'Ready to Dispatch' && (
            <button
              onClick={() => showToast(`Dispatched order ${row.id}`, 'success')}
              className="px-2.5 py-1 text-xs bg-[#0F795C] text-white rounded font-medium hover:bg-[#0F795C]/90"
            >
              Mark Dispatched
            </button>
          )}
          {row.status === 'In Transit' && (
            <span className="text-[11px] text-blue-700 font-mono font-semibold">GPS Active</span>
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
          <h1 className="text-xl font-bold text-[#17372F]">Sales Orders & Fulfilment</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Confirmed customer purchase orders, batch reservation, dispatch scheduling, and delivery handoffs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Opening Proforma Invoice generator', 'info')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E3E8DF] hover:bg-[#F7F5EC] text-[#17372F] transition-colors"
          >
            Create Proforma
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <DataTable
        columns={columns}
        data={filteredOrders}
        searchPlaceholder="Search order ID, customer name, PO number..."
        filterOptions={[
          { label: 'All Orders', value: 'all' },
          { label: 'Confirmed', value: 'Confirmed' },
          { label: 'Ready to Dispatch', value: 'Ready to Dispatch' },
          { label: 'In Transit', value: 'In Transit' }
        ]}
        activeFilter={statusFilter}
        onFilterChange={setStatusFilter}
      />
    </div>
  );
}

