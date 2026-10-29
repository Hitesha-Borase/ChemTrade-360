import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  Truck,
  Plus,
  Navigation,
  FileCheck2,
  CheckCircle2,
  MapPin,
  Calendar,
  Download,
  Printer
} from 'lucide-react';

export default function LogisticsModule() {
  const { dispatches, markDelivered, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('challans'); // 'challans' | 'transporters'

  const dispatchColumns = [
    {
      header: 'Delivery Challan No',
      accessor: 'challanNo',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#101828] text-sm font-mono">{row.challanNo}</div>
          <div className="text-[10px] text-slate-400 font-mono">SO: {row.orderRef}</div>
          <div className="text-[10px] text-slate-500">Date: {row.dispatchDate}</div>
        </div>
      )
    },
    {
      header: 'Customer & Destination',
      accessor: 'customer',
      cell: (row) => (
        <div>
          <span className="font-semibold text-slate-900 text-xs">{row.customer}</span>
          <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
            <MapPin className="w-3 h-3 text-[#C6A66B]" />
            <span>{row.destination}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Chemical & Allocated Lot',
      accessor: 'chemical',
      cell: (row) => (
        <div className="text-xs">
          <span className="font-bold text-[#101828]">{row.chemical}</span>
          <span className="font-mono text-slate-600 ml-1">({row.qty} {row.uom})</span>
          <span className="block text-[10px] text-emerald-800 font-mono">Lot: {row.batchNo}</span>
        </div>
      )
    },
    {
      header: 'Tanker & Transporter',
      accessor: 'transporter',
      cell: (row) => (
        <div className="text-xs space-y-0.5">
          <span className="font-semibold text-slate-800">{row.transporter}</span>
          <span className="block font-mono text-[11px] text-[#101828] font-bold">Vehicle: {row.vehicleNo}</span>
          <span className="text-[10px] text-slate-500">{row.driverName}</span>
        </div>
      )
    },
    {
      header: 'Tremcard & E-Way',
      accessor: 'eWayBill',
      cell: (row) => (
        <div className="text-xs space-y-0.5 font-mono">
          <span className="block text-[11px] text-slate-700">E-Way: {row.eWayBill}</span>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
            Hazchem Tremcard ✓
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
      header: 'Action',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => showToast(`Printing Delivery Challan ${row.challanNo}`, 'info')}
            className="p-1.5 rounded border border-[#E4E7EC] hover:bg-[#FAF9F6] text-slate-700"
            title="Print Challan"
          >
            <Printer className="w-3.5 h-3.5 text-[#C6A66B]" />
          </button>
          {row.status !== 'Delivered' && (
            <button
              onClick={() => markDelivered(row.challanNo)}
              className="px-2.5 py-1 text-xs bg-[#16805D] text-white rounded font-medium hover:bg-[#16805D]/90"
            >
              Confirm POD
            </button>
          )}
        </div>
      )
    }
  ];

  const transportersList = [
    { name: 'ChemiCarrier Bulk Tankers', fleet: '18 Dedicated SS316 Tankers', rating: '4.9 ★', coverage: 'Gujarat, Maharashtra, MP', compliance: 'PESO & Explosives Licensed' },
    { name: 'V-Trans SafeChemicals Logistics', fleet: '35 Heavy Multi-Axle Trucks', rating: '4.8 ★', coverage: 'All India Pan-National', compliance: 'GPS Live Webhook Active' },
    { name: 'Patel Roadways Chemical Division', fleet: '12 Dry Box Trucks', rating: '4.7 ★', coverage: 'Western Region', compliance: 'Hazard Certified Drivers' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Chemical Logistics & Dispatch Fleet</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Dedicated road tankers, Hazchem Tremcard documentation, live transit tracking, and signed Proof of Delivery (POD).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('schedule_dispatch')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Schedule Tanker Dispatch</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-2">
        <button
          onClick={() => setActiveTab('challans')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'challans' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Delivery Challans & Dispatches ({dispatches.length})
        </button>
        <button
          onClick={() => setActiveTab('transporters')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'transporters' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Transporter Directory & Fleet (3)
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'challans' && (
        <DataTable
          columns={dispatchColumns}
          data={dispatches}
          searchPlaceholder="Search challan no., customer, vehicle number..."
        />
      )}

      {activeTab === 'transporters' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transportersList.map((tr, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
                <h3 className="font-bold text-[#101828] text-sm">{tr.name}</h3>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {tr.rating}
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">{tr.fleet}</p>
              <div className="text-xs text-slate-500">Coverage: {tr.coverage}</div>
              <div className="p-2 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold">
                {tr.compliance}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

