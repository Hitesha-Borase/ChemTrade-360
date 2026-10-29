import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Plus, Trash2, Calculator, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function CreateQuotationModal() {
  const { closeModal, addQuotation, chemicals, batches, customers, modalData } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState(
    modalData?.customerName ? (customers.find(c => c.companyName.includes(modalData.customerName))?.id || customers[0].id) : customers[0].id
  );
  const [rfqRef, setRfqRef] = useState(`RFQ-${Math.floor(1000 + Math.random() * 9000)}`);
  const [validUntil, setValidUntil] = useState(
    new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0]
  );
  const [paymentTerms, setPaymentTerms] = useState('30 Days from Invoice Date');
  const [deliveryTerms, setDeliveryTerms] = useState('FOR Customer Plant (Freight Paid)');
  const [freightCharges, setFreightCharges] = useState(25000);

  // Line items state
  const [items, setItems] = useState([
    {
      chemicalId: modalData?.chemicalNeeded ? (chemicals.find(c => c.name.includes(modalData.chemicalNeeded))?.id || chemicals[0].id) : chemicals[0].id,
      name: modalData?.chemicalNeeded || chemicals[0].name,
      cas: chemicals[0].casNumber,
      grade: chemicals[0].grade,
      qty: modalData?.qty || 20.0,
      uom: chemicals[0].uom,
      internalCostRate: Math.round(chemicals[0].basePricePerUnit * 0.9),
      quotedRate: chemicals[0].basePricePerUnit,
      discountPercent: 0,
      taxPercent: 18,
      allocatedBatch: batches[0]?.batchNo || 'Auto-FEFO'
    }
  ]);

  const handleChemicalChange = (index, chemId) => {
    const chem = chemicals.find(c => c.id === chemId);
    if (!chem) return;
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      chemicalId: chem.id,
      name: chem.name,
      cas: chem.casNumber,
      grade: chem.grade,
      uom: chem.uom,
      internalCostRate: Math.round(chem.basePricePerUnit * 0.9),
      quotedRate: chem.basePricePerUnit
    };
    setItems(updated);
  };

  const handleItemFieldChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: Number(value) || 0 };
    setItems(updated);
  };

  const addItem = () => {
    const chem = chemicals[0];
    setItems([
      ...items,
      {
        chemicalId: chem.id,
        name: chem.name,
        cas: chem.casNumber,
        grade: chem.grade,
        qty: 10.0,
        uom: chem.uom,
        internalCostRate: Math.round(chem.basePricePerUnit * 0.9),
        quotedRate: chem.basePricePerUnit,
        discountPercent: 0,
        taxPercent: 18,
        allocatedBatch: 'Auto-FEFO'
      }
    ]);
  };

  const removeItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculations
  const calculatedItems = items.map(it => {
    const discountedRate = it.quotedRate * (1 - (it.discountPercent || 0) / 100);
    const itemTotal = it.qty * discountedRate;
    const internalCost = it.qty * it.internalCostRate;
    const margin = itemTotal - internalCost;
    const marginPct = itemTotal > 0 ? (margin / itemTotal) * 100 : 0;
    return {
      ...it,
      itemTotal,
      internalCost,
      margin,
      marginPct
    };
  });

  const subtotal = calculatedItems.reduce((acc, it) => acc + it.itemTotal, 0);
  const totalInternalCost = calculatedItems.reduce((acc, it) => acc + it.internalCost, 0);
  const totalTax = Math.round((subtotal + Number(freightCharges)) * 0.18);
  const grandTotal = Math.round(subtotal + Number(freightCharges) + totalTax);

  const overallMargin = subtotal - totalInternalCost;
  const overallMarginPercent = subtotal > 0 ? Number(((overallMargin / subtotal) * 100).toFixed(2)) : 0;
  const requiresApproval = overallMarginPercent < 7.0 || items.some(it => it.discountPercent > 2.0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cust = customers.find(c => c.id === selectedCustomerId) || customers[0];
    const newQuoteId = `QT-2026-0${Math.floor(895 + Math.random() * 90)}`;

    const newQuote = {
      id: newQuoteId,
      rfqRef,
      customerId: cust.id,
      customerName: cust.companyName,
      customerContact: cust.contactPerson,
      date: new Date().toISOString().split('T')[0],
      validUntil,
      paymentTerms,
      deliveryTerms,
      items: calculatedItems,
      subtotal,
      freightCharges: Number(freightCharges),
      taxTotal: totalTax,
      grandTotal,
      internalTotalCost,
      grossMarginAmount: overallMargin,
      grossMarginPercent: overallMarginPercent,
      status: requiresApproval ? 'Pending Approval' : 'Approved',
      createdBy: 'Sales Desk Staff',
      approvedBy: requiresApproval ? null : 'Auto-Authorized (Margin ≥ 7%)',
      approvalNote: requiresApproval ? `Margin is ${overallMarginPercent}% (<7% threshold trigger)` : null,
      pdfReady: true
    };

    addQuotation(newQuote);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl border border-[#E4E7EC] my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <div>
            <h2 className="text-lg font-bold text-[#101828]">Commercial Chemical Quotation Builder</h2>
            <p className="text-xs text-[#667085]">Wireframe Section 6.4: Interactive pricing, margin controls & FEFO lot allocation</p>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5 text-xs">
          {/* Header Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#FAF9F6] p-4 rounded-xl border border-[#E4E7EC]">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer Account</label>
              <select
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
                className="w-full p-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-medium"
              >
                {customers.map(c => (
                  <option key={c.id} value={c.id}>{c.companyName} ({c.city})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Customer RFQ Reference</label>
              <input
                type="text"
                value={rfqRef}
                onChange={(e) => setRfqRef(e.target.value)}
                className="w-full p-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Offer Valid Until</label>
              <input
                type="date"
                value={validUntil}
                onChange={(e) => setValidUntil(e.target.value)}
                className="w-full p-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-mono"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Terms</label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full p-2 bg-white border border-[#E4E7EC] rounded-lg text-xs"
              >
                <option value="45 Days from Invoice Date">45 Days from Invoice Date</option>
                <option value="30 Days Net">30 Days Net</option>
                <option value="Advance against Proforma">Advance against Proforma</option>
                <option value="15 Days LC">15 Days LC</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Delivery Terms</label>
              <input
                type="text"
                value={deliveryTerms}
                onChange={(e) => setDeliveryTerms(e.target.value)}
                className="w-full p-2 bg-white border border-[#E4E7EC] rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Freight Charges (₹)</label>
              <input
                type="number"
                value={freightCharges}
                onChange={(e) => setFreightCharges(Number(e.target.value))}
                className="w-full p-2 bg-white border border-[#E4E7EC] rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          {/* Dynamic Line Items */}
          <div>
            <div className="flex items-center justify-between pb-2">
              <h3 className="font-bold text-[#101828] text-sm">Chemical Commodities & Pricing</h3>
              <button
                type="button"
                onClick={addItem}
                className="flex items-center gap-1 text-xs font-semibold text-[#101828] hover:text-[#C6A66B]"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-[#E4E7EC] bg-white shadow-subtle space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold text-slate-700 mb-1">Chemical Commodity</label>
                      <select
                        value={item.chemicalId}
                        onChange={(e) => handleChemicalChange(idx, e.target.value)}
                        className="w-full p-2 border border-[#E4E7EC] rounded-lg text-xs font-semibold"
                      >
                        {chemicals.map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} — CAS: {c.casNumber} ({c.grade})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Quantity ({item.uom})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={item.qty}
                        onChange={(e) => handleItemFieldChange(idx, 'qty', e.target.value)}
                        className="w-full p-2 border border-[#E4E7EC] rounded-lg text-xs font-mono font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Quoted Rate (₹ / {item.uom})</label>
                      <input
                        type="number"
                        value={item.quotedRate}
                        onChange={(e) => handleItemFieldChange(idx, 'quotedRate', e.target.value)}
                        className="w-full p-2 border border-[#E4E7EC] rounded-lg text-xs font-mono font-bold text-[#101828]"
                      />
                    </div>
                  </div>

                  {/* Commercial Safeguards / Internal Staff Rates */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-slate-600 bg-[#FAF9F6] p-2.5 rounded-lg">
                    <div className="flex items-center gap-4 flex-wrap">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Internal Cost Rate</span>
                        <span className="font-mono font-bold text-slate-700">₹{item.internalCostRate.toLocaleString('en-IN')}/{item.uom}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Discount %</span>
                        <input
                          type="number"
                          step="0.5"
                          value={item.discountPercent}
                          onChange={(e) => handleItemFieldChange(idx, 'discountPercent', e.target.value)}
                          className="w-16 p-1 bg-white border border-[#E4E7EC] rounded text-xs font-mono"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">FEFO Batch Lot</span>
                        <select
                          value={item.allocatedBatch}
                          onChange={(e) => {
                            const updated = [...items];
                            updated[idx].allocatedBatch = e.target.value;
                            setItems(updated);
                          }}
                          className="p-1 bg-white border border-[#E4E7EC] rounded text-xs font-mono"
                        >
                          <option value="Auto-FEFO">Auto-FEFO Allocation</option>
                          {batches.filter(b => b.qualityStatus === 'Approved').map(b => (
                            <option key={b.batchNo} value={b.batchNo}>{b.batchNo} ({b.warehouse})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Item Total (Ex-Tax)</span>
                        <span className="font-mono font-bold text-sm text-[#101828]">
                          ₹{(item.qty * item.quotedRate * (1 - item.discountPercent / 100)).toLocaleString('en-IN')}
                        </span>
                      </div>
                      {items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals & Internal Margin Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#E4E7EC]">
            {/* Left: Internal Margin Analysis (Authorized Staff) */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-[#C6A66B]" /> Internal Staff Margin Calculation
                </span>
                <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                  requiresApproval ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {overallMarginPercent}% Margin
                </span>
              </div>
              <div className="text-slate-600 space-y-1 pt-1 text-[11px]">
                <div className="flex justify-between">
                  <span>Total Direct Landed Cost:</span>
                  <span className="font-mono font-semibold">₹{totalInternalCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Profit Margin:</span>
                  <span className="font-mono font-bold text-[#16805D]">₹{overallMargin.toLocaleString('en-IN')}</span>
                </div>
                {requiresApproval && (
                  <div className="p-2 rounded bg-amber-50 border border-amber-200 text-amber-800 font-medium text-[11px] mt-2 flex items-start gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>Rule Trigger: Overall margin is below 7.0%. Quotation will route to Sales Manager for approval before customer dispatch.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Customer-Facing Totals */}
            <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E4E7EC] space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Commodities Subtotal:</span>
                <span className="font-mono font-bold text-[#101828]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Freight Charges:</span>
                <span className="font-mono">₹{Number(freightCharges).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax (18% IGST / CGST+SGST):</span>
                <span className="font-mono">₹{totalTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E4E7EC] text-base font-bold text-[#101828]">
                <span>Grand Total (Payable):</span>
                <span className="font-mono text-lg text-[#101828]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E4E7EC]">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-[#E4E7EC] rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#101828] text-white font-bold rounded-xl hover:bg-[#101828]/90 transition-all shadow-md"
            >
              {requiresApproval ? 'Submit for Sales Manager Approval' : 'Generate & Authorize Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

