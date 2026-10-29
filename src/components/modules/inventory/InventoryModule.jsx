import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  Boxes,
  ArrowDownToLine,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Package
} from 'lucide-react';

export default function InventoryModule() {
  const { batches, chemicals, openModal, showToast } = useApp();
  const [filter, setFilter] = useState('all');

  const lowStockCount = batches.filter(b => b.availableQty <= 20).length;
  const totalStockQty = batches.reduce((sum, b) => sum + (Number(b.availableQty) || 0), 0);

  const filteredBatches = batches.filter(b => {
    if (filter === 'low_stock') return b.availableQty <= 20;
    if (filter === 'expiring_soon') return b.feFoPriority === 1;
    return true;
  });

  const batchColumns = [
    {
      header: 'Batch / Lot No',
      accessor: 'batchNo',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F] font-mono text-xs">{row.batchNo}</div>
          <div className="text-[10px] text-slate-500">Recvd: {row.receivedDate}</div>
        </div>
      )
    },
    {
      header: 'Chemical Product',
      accessor: 'chemicalName',
      cell: (row) => (
        <div>
          <span className="font-bold text-[#17372F] text-xs">{row.chemicalName}</span>
          <span className="block text-[10px] text-slate-500">Supplier: {row.supplier}</span>
        </div>
      )
    },
    {
      header: 'Available Stock',
      accessor: 'availableQty',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-xs text-[#075C46]">
            {row.availableQty} {row.uom}
          </span>
          <span className="block text-[10px] text-slate-500">
            Initial: {row.initialQty} | Reserved: {row.reservedQty}
          </span>
        </div>
      )
    },
    {
      header: 'Shelf Life / Expiry',
      accessor: 'expiryDate',
      cell: (row) => (
        <div className="font-mono text-xs">
          <span className="font-semibold text-slate-800">{row.expiryDate}</span>
          {row.feFoPriority === 1 && (
            <span className="block text-[10px] text-amber-800 font-bold">Priority Pick</span>
          )}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: 'qualityStatus',
      cell: (row) => <Badge status={row.qualityStatus} />
    },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => showToast(`COA document verified for lot ${row.batchNo}`, 'info')}
            className="px-2 py-1 border border-[#E3E8DF] rounded hover:bg-[#F7F5EC] text-xs font-medium text-slate-700"
          >
            View COA
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Chemical Inventory & Stock</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Manage incoming stock (GRN), available stock quantities, batches, and low stock notifications.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_grn')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Receive Stock (Stock In)</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-xl border border-[#E3E8DF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Available Stock</p>
            <p className="text-xl font-bold text-[#17372F] mt-1">{totalStockQty} MT</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Across all chemical products</p>
          </div>
          <div className="p-2.5 rounded-lg bg-[#DDE9D9] text-[#075C46]">
            <Boxes className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E3E8DF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Batches</p>
            <p className="text-xl font-bold text-[#17372F] mt-1">{batches.length}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Tracked with batch numbers</p>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 bg-white rounded-xl border border-[#E3E8DF] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Low Stock Alerts</p>
            <p className="text-xl font-bold text-[#C43232] mt-1">{lowStockCount}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Batches below safety reorder level</p>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] shadow-xs p-1">
        <DataTable
          columns={batchColumns}
          data={filteredBatches}
          searchPlaceholder="Search batch no, chemical name, supplier..."
          filterOptions={[
            { label: 'All Batches', value: 'all' },
            { label: 'Low Stock (≤20 MT)', value: 'low_stock' },
            { label: 'Priority Pick (FEFO)', value: 'expiring_soon' }
          ]}
          activeFilter={filter}
          onFilterChange={setFilter}
        />
      </div>
    </div>
  );
}
