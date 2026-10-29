import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  Boxes,
  Warehouse,
  AlertTriangle,
  ArrowDownToLine,
  ArrowLeftRight,
  ShieldAlert,
  Clock,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function InventoryModule() {
  const { batches, chemicals, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('batches'); // 'batches' | 'warehouses' | 'quarantine'
  const [warehouseFilter, setWarehouseFilter] = useState('all');

  const filteredBatches = batches.filter(b => {
    if (warehouseFilter !== 'all' && !b.warehouse.includes(warehouseFilter)) return false;
    return true;
  });

  const batchColumns = [
    {
      header: 'Lot / Batch No',
      accessor: 'batchNo',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#101828] font-mono text-sm">{row.batchNo}</div>
          <div className="text-[10px] text-slate-500">Recvd: {row.receivedDate}</div>
        </div>
      )
    },
    {
      header: 'Chemical Commodity',
      accessor: 'chemicalName',
      cell: (row) => (
        <div>
          <span className="font-bold text-[#101828]">{row.chemicalName}</span>
          <span className="block text-[11px] text-slate-500">Supplier: {row.supplier}</span>
        </div>
      )
    },
    {
      header: 'Warehouse & Bay',
      accessor: 'warehouse',
      cell: (row) => (
        <div className="text-xs">
          <div className="flex items-center gap-1 font-medium text-slate-800">
            <Warehouse className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>{row.warehouse}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Physical vs Available',
      accessor: 'initialQty',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-sm text-[#101828]">{row.availableQty} {row.uom}</span>
          <span className="block text-[10px] text-slate-500">
            Total: {row.initialQty} | Res: {row.reservedQty}
          </span>
        </div>
      )
    },
    {
      header: 'Shelf Life / Expiry',
      accessor: 'expiryDate',
      cell: (row) => (
        <div className="font-mono text-xs">
          <span className="font-bold text-slate-800">{row.expiryDate}</span>
          {row.feFoPriority === 1 && (
            <span className="block text-[10px] text-amber-800 font-bold">FEFO 1st Pick</span>
          )}
        </div>
      )
    },
    {
      header: 'Quality Status',
      accessor: 'qualityStatus',
      cell: (row) => <Badge status={row.qualityStatus} />
    },
    {
      header: 'Actions',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          {row.qualityStatus === 'Quarantined' ? (
            <button
              onClick={() => openModal('quarantine_review', row)}
              className="px-2.5 py-1 text-xs bg-[#B7791F] text-white rounded font-semibold hover:bg-amber-700"
            >
              Review QC
            </button>
          ) : (
            <button
              onClick={() => showToast(`Viewing COA document for ${row.batchNo}`, 'info')}
              className="px-2 py-1 border border-[#E4E7EC] rounded hover:bg-[#FAF9F6] text-xs font-medium text-slate-700"
            >
              COA Doc
            </button>
          )}
        </div>
      )
    }
  ];

  const warehousesList = [
    { name: 'Dahej Liquid Terminal', type: 'Tank Farm (SS316 & Rubber Lined)', capacity: '1,500 MT', occupancy: '68%', hazards: 'Class 8 Corrosives, Class 3 Flammables' },
    { name: 'Bhiwandi Central Depot', type: 'Dry Warehousing & Carboys Shed', capacity: '800 MT', occupancy: '42%', hazards: 'Packaged Non-Haz & Flammable Drums' },
    { name: 'Hazira Tank Terminal', type: 'Solvent Dedicated Storage', capacity: '1,200 MT', occupancy: '55%', hazards: 'Nitrogen Blanketed Methanol & Toluene' },
    { name: 'JNPT Port Bonded Terminal', type: 'Customs Bonded Import Hub', capacity: '600 MT', occupancy: '30%', hazards: 'Imported Cargo Clearance' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Inventory & Batch Traceability</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            FEFO/FIFO allocation control, warehouse locations, lot genealogy, quarantine holds, and chemical segregation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_grn')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            <ArrowDownToLine className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Receive Stock (GRN)</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-2">
        <button
          onClick={() => setActiveTab('batches')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'batches' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Batch & Lot Register ({batches.length})
        </button>
        <button
          onClick={() => setActiveTab('warehouses')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'warehouses' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Warehouses & Tank Terminals (4)
        </button>
        <button
          onClick={() => setActiveTab('quarantine')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'quarantine' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Quarantined & Non-Saleable Stock (1)
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'batches' && (
        <DataTable
          columns={batchColumns}
          data={filteredBatches}
          searchPlaceholder="Search lot no, chemical name, supplier..."
          filterOptions={[
            { label: 'All Warehouses', value: 'all' },
            { label: 'Dahej Terminal', value: 'Dahej' },
            { label: 'Bhiwandi', value: 'Bhiwandi' },
            { label: 'Hazira', value: 'Hazira' }
          ]}
          activeFilter={warehouseFilter}
          onFilterChange={setWarehouseFilter}
        />
      )}

      {activeTab === 'warehouses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {warehousesList.map((wh, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
                <div className="flex items-center gap-2">
                  <Warehouse className="w-4 h-4 text-[#C6A66B]" />
                  <h3 className="font-bold text-[#101828] text-sm">{wh.name}</h3>
                </div>
                <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {wh.occupancy} Full
                </span>
              </div>
              <p className="text-xs text-slate-600">{wh.type}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Total Capacity: <strong>{wh.capacity}</strong></span>
              </div>
              <div className="p-2.5 rounded bg-[#FAF9F6] border border-[#E4E7EC] text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">Hazard & Compatibility Segregation:</span>
                <span className="text-slate-700 font-medium">{wh.hazards}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'quarantine' && (
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
            <ShieldAlert className="w-5 h-5" />
            <span>Quarantine & Quality Hold Safeguard</span>
          </div>
          <p className="text-xs text-slate-600">
            In accordance with Chemical ERP Rule 472: Quarantined lots are hard-locked from sales quotation allocation and dispatch picking until certified quality release by laboratory QC.
          </p>

          <div className="divide-y divide-[#E4E7EC]">
            {batches.filter(b => b.qualityStatus === 'Quarantined').map(b => (
              <div key={b.batchNo} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#C43232] font-mono">{b.batchNo}</span>
                    <span className="font-semibold text-slate-800">• {b.chemicalName}</span>
                    <Badge status="Quarantined" />
                  </div>
                  <p className="text-slate-600 mt-1">
                    Hold Quantity: <strong>{b.quarantinedQty} {b.uom}</strong> • Location: <strong>{b.warehouse}</strong>
                  </p>
                  <p className="text-red-800 text-[11px] font-medium mt-1 bg-red-50 p-2 rounded border border-red-200">
                    {b.notes}
                  </p>
                </div>
                <button
                  onClick={() => openModal('quarantine_review', b)}
                  className="px-4 py-2 bg-[#B7791F] text-white text-xs font-bold rounded-lg hover:bg-amber-700 transition-colors self-start md:self-auto"
                >
                  Review QC Hold & Release
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

