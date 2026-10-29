import React from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  Truck,
  Navigation,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Calendar,
  User,
  ArrowRight
} from 'lucide-react';

export default function LogisticsManagerDashboard() {
  const { dispatches, markDelivered, openModal, setActiveNav, showToast } = useApp();

  const toDispatch = dispatches.filter(d => d.status === 'Ready for Dispatch');
  const inTransit = dispatches.filter(d => d.status === 'In Transit');
  const delivered = dispatches.filter(d => d.status === 'Delivered');

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Chemical Logistics & Dispatch Control</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Dedicated chemical tanker dispatch, Hazchem Tremcard compliance, GPS tracking, and Proof of Delivery (POD).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('schedule_dispatch')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors"
          >
            + Schedule Tanker Dispatch
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Orders To Dispatch"
          value={toDispatch.length.toString()}
          subvalue="Tanker Assigned"
          icon={Truck}
          accent={true}
        />
        <KPICard
          title="Shipments In Transit"
          value={inTransit.length.toString()}
          subvalue="Active GPS Route"
          icon={Navigation}
          badgeText="GPS Linked"
        />
        <KPICard
          title="Completed Deliveries"
          value={`${delivered.length + 3} Delivered`}
          subvalue="POD Uploaded"
          icon={CheckCircle2}
          badgeText="100% On-Time"
        />
        <KPICard
          title="Delivery Exceptions"
          value="0 Exceptions"
          subvalue="Zero Hazmat Incidents"
          icon={AlertTriangle}
          badgeText="All Safe"
        />
      </div>

      {/* Dispatch Queue & Active Tanker Movement */}
      <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div>
            <h2 className="text-sm font-bold text-[#17372F]">Active Delivery Challans & Tanker Fleet Status</h2>
            <p className="text-xs text-[#7A8980]">Statutory Requirements: Tremcard, E-Way Bill & Dedicated Driver License</p>
          </div>
          <button onClick={() => setActiveNav('logistics')} className="text-xs text-[#C6A66A] font-semibold hover:underline flex items-center gap-1">
            Dispatch Queue <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#E3E8DF] mt-3">
          {dispatches.map((d) => (
            <div key={d.challanNo} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#17372F] font-mono">{d.challanNo}</span>
                  <span className="text-slate-600 font-semibold">• {d.customer}</span>
                  <Badge status={d.status} size="xs" />
                </div>
                <p className="text-slate-700">
                  Chemical: <strong>{d.chemical}</strong> ({d.qty} {d.uom}) • Batch: <span className="font-mono">{d.batchNo}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-[#17372F]">
                    <Truck className="w-3.5 h-3.5 text-[#C6A66A]" /> {d.transporter} ({d.vehicleNo})
                  </span>
                  <span>•</span>
                  <span>Driver: {d.driverName}</span>
                  <span>•</span>
                  <span>Destination: {d.destination}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                  <span className="text-emerald-700 font-semibold">E-Way: {d.eWayBill}</span>
                  <span>•</span>
                  <span>Tremcard: {d.tremcardAttached ? 'Attached ✓' : 'Missing'}</span>
                  <span>•</span>
                  <span>Status: {d.podStatus}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Generating Delivery Challan ${d.challanNo}`, 'info')}
                  className="px-2.5 py-1 border border-[#E3E8DF] rounded hover:bg-[#F7F5EC] text-xs font-medium"
                >
                  Print Challan
                </button>
                {d.status !== 'Delivered' && (
                  <button
                    onClick={() => markDelivered(d.challanNo)}
                    className="px-3 py-1 bg-[#0F795C] text-white rounded font-semibold text-xs hover:bg-[#0F795C]/90"
                  >
                    Confirm POD
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

