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
  Warehouse,
  Receipt
} from 'lucide-react';

export default function SalesModule() {
  const { salesOrders, updateSalesOrderStatus, openModal, showToast } = useApp();
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
      cell: (row) => {
        const nextStatus = {
          'Confirmed': 'Ready to Dispatch',
          'Ready to Dispatch': 'In Transit',
          'In Transit': 'Delivered',
          'Delivered': 'Confirmed'
        };
        return (
          <Badge
            status={row.status}
            onClick={() => updateSalesOrderStatus && updateSalesOrderStatus(row.id, nextStatus[row.status] || 'Ready to Dispatch')}
            title="Click to advance order status"
          />
        );
      }
    },
    {
      header: 'Logistics Action',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          {row.status === 'Confirmed' && (
            <button
              onClick={() => openModal('schedule_dispatch', row)}
              className="px-2.5 py-1 text-xs bg-[#075C46] text-white rounded-lg font-semibold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            >
              Allocate Tanker
            </button>
          )}
          {row.status === 'Ready to Dispatch' && (
            <button
              onClick={() => {
                if (updateSalesOrderStatus) {
                  updateSalesOrderStatus(row.id, 'In Transit');
                } else {
                  showToast(`Dispatched order ${row.id}`, 'success');
                }
              }}
              className="px-2.5 py-1 text-xs bg-[#0F795C] text-white rounded-lg font-semibold hover:bg-[#063F32] shadow-xs active:scale-95 transition-all"
            >
              Mark Dispatched
            </button>
          )}
          {row.status === 'In Transit' && (
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-blue-700 font-mono font-bold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                GPS Live
              </span>
              <button
                onClick={() => updateSalesOrderStatus && updateSalesOrderStatus(row.id, 'Delivered')}
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-xs active:scale-95 transition-all"
                title="Confirm delivery & sign POD"
              >
                Mark Delivered
              </button>
            </div>
          )}
          {row.status === 'Delivered' && (
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Fulfilled
            </span>
          )}
          <button
            onClick={() => openModal('create_invoice', row)}
            className="p-1 rounded-lg border border-[#E3E8DF] hover:bg-slate-50 text-slate-600 hover:text-[#075C46] transition-colors"
            title="Generate GST Tax Invoice"
          >
            <Receipt className="w-3.5 h-3.5" />
          </button>
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
            onClick={() => openModal('create_invoice', salesOrders[0] || null)}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E3E8DF] hover:bg-[#F7F5EC] text-[#17372F] transition-colors shadow-2xs active:scale-95"
          >
            Create Proforma / Invoice
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

