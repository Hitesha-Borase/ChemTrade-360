import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ArrowDownToLine, CheckCircle2 } from 'lucide-react';

export default function CreateGRNModal() {
  const { closeModal, chemicals, batches, purchaseOrders, updateBatchStatus, logAudit, showToast } = useApp();

  const [poId, setPoId] = useState(purchaseOrders[0]?.id || 'PO-2026-0312');
  const [chemicalName, setChemicalName] = useState('Caustic Soda Lye (48%)');
  const [batchNo, setBatchNo] = useState(`BAT-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [receivedQty, setReceivedQty] = useState('40.0');
  const [warehouse, setWarehouse] = useState('Dahej Liquid Terminal (Tank T-104)');
  const [mfgDate, setMfgDate] = useState('2026-10-15');
  const [expiryDate, setExpiryDate] = useState('2027-10-15');
  const [qcStatus, setQcStatus] = useState('Approved');
  const [coaDoc, setCoaDoc] = useState('COA-MFR-2026.pdf');

  const handleSubmit = (e) => {
    e.preventDefault();
    const grnId = `GRN-2026-0${Math.floor(190 + Math.random() * 80)}`;

    logAudit(`Inwarded ${receivedQty} MT ${chemicalName} under GRN ${grnId} (Batch: ${batchNo}) at ${warehouse}. QC Status: ${qcStatus}`);
    showToast(`GRN ${grnId} generated! Batch ${batchNo} created in inventory.`, 'success');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E8DF]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div className="flex items-center gap-2">
            <ArrowDownToLine className="w-5 h-5 text-[#C6A66A]" />
            <h2 className="text-base font-bold text-[#17372F]">Goods Receipt Note (GRN) & Lot Inward</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Purchase Order Reference</label>
            <select
              value={poId}
              onChange={(e) => setPoId(e.target.value)}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
            >
              {purchaseOrders.map(po => (
                <option key={po.id} value={po.id}>{po.id} — {po.supplierName}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">New Batch / Lot Number</label>
              <input
                type="text"
                value={batchNo}
                onChange={(e) => setBatchNo(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Received Net Quantity (MT)</label>
              <input
                type="number"
                step="0.1"
                value={receivedQty}
                onChange={(e) => setReceivedQty(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono font-bold"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Destination Storage Tank / Warehouse</label>
            <select
              value={warehouse}
              onChange={(e) => setWarehouse(e.target.value)}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-medium"
            >
              <option value="Dahej Liquid Terminal (Tank T-104)">Dahej Liquid Terminal (Tank T-104)</option>
              <option value="Bhiwandi Central Depot (Shed B2)">Bhiwandi Central Depot (Shed B2)</option>
              <option value="Hazira Tank Terminal (Tank M-02)">Hazira Tank Terminal (Tank M-02)</option>
              <option value="JNPT Bonded Terminal (Bay 4)">JNPT Bonded Terminal (Bay 4)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Manufacturing Date</label>
              <input
                type="date"
                value={mfgDate}
                onChange={(e) => setMfgDate(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Expiry / Retest Date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Quality Inspection Status</label>
              <select
                value={qcStatus}
                onChange={(e) => setQcStatus(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-bold"
              >
                <option value="Approved">Approved (Ready for Sale)</option>
                <option value="Quarantined">Quarantined (Under Lab Review)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Manufacturer COA Attached</label>
              <input
                type="text"
                value={coaDoc}
                onChange={(e) => setCoaDoc(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
              />
            </div>
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
              Confirm Goods Receipt (GRN)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

