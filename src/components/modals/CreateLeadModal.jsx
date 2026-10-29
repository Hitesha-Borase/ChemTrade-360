import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, UserPlus } from 'lucide-react';

export default function CreateLeadModal() {
  const { closeModal, addLead, chemicals } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [chemicalNeeded, setChemicalNeeded] = useState(chemicals[0]?.name || 'Caustic Soda Lye');
  const [estimatedQty, setEstimatedQty] = useState('25');
  const [targetPrice, setTargetPrice] = useState('34000');
  const [source, setSource] = useState('Direct RFQ Portal');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLead = {
      id: `LEAD-2026-${Math.floor(105 + Math.random() * 80)}`,
      companyName,
      contactPerson,
      phone,
      email,
      chemicalNeeded,
      estimatedQty: Number(estimatedQty),
      uom: 'MT',
      targetPrice: Number(targetPrice),
      stage: 'New Inquiry',
      assignedTo: 'Sales Desk Staff',
      source,
      leadScore: 80,
      nextFollowUp: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
      notes
    };
    addLead(newLead);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E3E8DF]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#C6A66A]" />
            <h2 className="text-base font-bold text-[#17372F]">Register Chemical Lead / Inquiry</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Company / Enterprise Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Gujarat Dyestuffs Ltd"
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
              <input
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                placeholder="e.g. Ramesh Shah"
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98XXX XXXXX"
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="procurement@company.com"
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Inquiry Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
              >
                <option value="Direct RFQ Portal">Direct RFQ Portal</option>
                <option value="Phone Call Inquiry">Phone Call Inquiry</option>
                <option value="Trade Portal / B2B">Trade Portal / B2B</option>
                <option value="Existing Client Referral">Existing Client Referral</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Required Chemical</label>
              <select
                value={chemicalNeeded}
                onChange={(e) => setChemicalNeeded(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-semibold"
              >
                {chemicals.map(c => (
                  <option key={c.id} value={c.name}>{c.name} ({c.grade})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Estimated Qty (MT)</label>
              <input
                type="number"
                value={estimatedQty}
                onChange={(e) => setEstimatedQty(e.target.value)}
                className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Price (₹ / MT)</label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Inquiry Notes / Specific Requirements</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Dedicated SS tanker required, urgent delivery needed..."
              rows={2}
              className="w-full p-2.5 border border-[#E3E8DF] rounded-lg text-xs"
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
              className="px-4 py-2 bg-[#075C46] text-white rounded-lg font-bold hover:bg-[#063F32]"
            >
              Register Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

