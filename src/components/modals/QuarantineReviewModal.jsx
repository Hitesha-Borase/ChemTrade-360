import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldAlert, CheckCircle2, AlertOctagon } from 'lucide-react';

export default function QuarantineReviewModal() {
  const { closeModal, modalData, updateBatchStatus } = useApp();
  const batch = modalData;

  const [decision, setDecision] = useState('Approved');
  const [labNotes, setLabNotes] = useState('SGS Lab report confirms moisture content 0.12% (within allowable <0.20% specification). Batch cleared for commercial allocation.');

  if (!batch) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBatchStatus(batch.batchNo, decision, labNotes);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E8DF]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#B7791F]" />
            <h2 className="text-base font-bold text-[#17372F]">Laboratory QC Review & Quality Release</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-slate-800 space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span className="font-mono text-red-900">{batch.batchNo}</span>
              <span className="text-red-700 bg-red-100 px-2 py-0.5 rounded text-[10px]">Currently Quarantined</span>
            </div>
            <p className="font-semibold text-[#17372F]">{batch.chemicalName} ({batch.quarantinedQty || batch.initialQty} {batch.uom})</p>
            <p className="text-[11px] text-slate-600 font-mono">Storage: {batch.warehouse}</p>
            <p className="text-[11px] text-red-800 mt-1 italic">Reason: {batch.notes}</p>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Quality Release Decision</label>
            <div className="grid grid-cols-2 gap-3">
              <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 ${
                decision === 'Approved' ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold' : 'border-[#E3E8DF]'
              }`}>
                <input
                  type="radio"
                  name="decision"
                  value="Approved"
                  checked={decision === 'Approved'}
                  onChange={() => setDecision('Approved')}
                  className="text-emerald-600"
                />
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Approve & Release to Stock</span>
              </label>

              <label className={`p-3 rounded-lg border cursor-pointer flex items-center gap-2 ${
                decision === 'Rejected' ? 'bg-red-50 border-red-500 text-red-900 font-bold' : 'border-[#E3E8DF]'
              }`}>
                <input
                  type="radio"
                  name="decision"
                  value="Rejected"
                  checked={decision === 'Rejected'}
                  onChange={() => setDecision('Rejected')}
                  className="text-red-600"
                />
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <span>Reject & Quarantine Return</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">QC Lab Inspection Summary & Test Certificate</label>
            <textarea
              value={labNotes}
              onChange={(e) => setLabNotes(e.target.value)}
              rows={3}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
              required
            />
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
              className={`px-4 py-2 text-white rounded-lg font-bold ${
                decision === 'Approved' ? 'bg-[#0F795C] hover:bg-[#0F795C]/90' : 'bg-[#C43232] hover:bg-[#C43232]/90'
              }`}
            >
              Confirm QC Release Decision
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

