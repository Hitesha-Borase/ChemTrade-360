import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Truck, ShieldCheck } from 'lucide-react';

export default function DispatchScheduleModal() {
  const { closeModal, salesOrders, batches, scheduleDispatch, modalData } = useApp();

  const [orderRef, setOrderRef] = useState(modalData?.id || salesOrders[0]?.id || 'SO-2026-0451');
  const [customer, setCustomer] = useState(modalData?.customerName || 'Asian Paints Ltd');
  const [destination, setDestination] = useState('Taloja Plant, Navi Mumbai');
  const [chemical, setChemical] = useState(modalData?.items?.[0]?.chemicalName || 'Caustic Soda Lye (48%)');
  const [qty, setQty] = useState(modalData?.items?.[0]?.qty || '35.0');
  const [batchNo, setBatchNo] = useState(modalData?.items?.[0]?.batchNo || batches[0]?.batchNo || 'BAT-2026-CS-01');
  const [transporter, setTransporter] = useState('ChemiCarrier Bulk Tankers');
  const [vehicleNo, setVehicleNo] = useState('GJ-16-Z-8890');
  const [driverName, setDriverName] = useState('Rameshwar Yadav (+91 94280 12891)');
  const [eWayBill, setEWayBill] = useState(`241908234${Math.floor(100 + Math.random() * 899)}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    const challanNo = `DC-2026-0${Math.floor(345 + Math.random() * 50)}`;

    const dispatchData = {
      challanNo,
      orderRef,
      customer,
      destination,
      chemical,
      qty: Number(qty),
      uom: 'MT',
      batchNo,
      transporter,
      vehicleNo,
      driverName,
      dispatchDate: new Date().toISOString().split('T')[0],
      estimatedArrival: new Date(Date.now() + 86400000).toISOString().split('T')[0] + ' 18:00',
      status: 'Ready for Dispatch',
      eWayBill,
      tremcardAttached: true,
      podStatus: 'Assigned Road Tanker'
    };

    scheduleDispatch(dispatchData);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E8DF] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#C6A66A]" />
            <h2 className="text-base font-bold text-[#17372F]">Schedule Tanker Dispatch & Challan</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sales Order Reference</label>
            <select
              value={orderRef}
              onChange={(e) => {
                setOrderRef(e.target.value);
                const matched = salesOrders.find(so => so.id === e.target.value);
                if (matched) {
                  setCustomer(matched.customerName);
                  if (matched.items?.[0]) {
                    setChemical(matched.items[0].chemicalName);
                    setQty(matched.items[0].qty);
                    setBatchNo(matched.items[0].batchNo);
                  }
                }
              }}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
            >
              {salesOrders.map(so => (
                <option key={so.id} value={so.id}>{so.id} — {so.customerName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer</label>
              <input
                type="text"
                value={customer}
                onChange={(e) => setCustomer(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs bg-slate-50 font-semibold"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Destination Plant</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chemical Commodity</label>
              <input
                type="text"
                value={chemical}
                onChange={(e) => setChemical(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs bg-slate-50 font-semibold"
                readOnly
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Quantity (MT)</label>
              <input
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Allocated Batch Lot</label>
              <select
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
              >
                {batches.filter(b => b.qualityStatus === 'Approved').map(b => (
                  <option key={b.batchNo} value={b.batchNo}>{b.batchNo} ({b.availableQty} MT avail)</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Transporter Fleet</label>
              <select
                value={transporter}
                onChange={(e) => setTransporter(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-medium"
              >
                <option value="ChemiCarrier Bulk Tankers">ChemiCarrier Bulk Tankers</option>
                <option value="V-Trans SafeChemicals Logistics">V-Trans SafeChemicals Logistics</option>
                <option value="Patel Roadways Chemical Div">Patel Roadways Chemical Div</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Road Tanker / Vehicle Reg No</label>
              <input
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                placeholder="e.g. GJ-16-Z-8890"
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold uppercase"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Driver Name & Contact</label>
              <input
                type="text"
                value={driverName}
                onChange={(e) => setDriverName(e.target.value)}
                placeholder="e.g. Ramesh Yadav (+91 94280 12891)"
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Hazchem Tremcard & E-Way Bill <strong>{eWayBill}</strong> automatically paired to delivery challan.</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E3E8DF]">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-[#E3E8DF] rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#075C46] text-white rounded-lg font-bold hover:bg-[#063F32]"
            >
              Generate Delivery Challan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

