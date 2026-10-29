import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FlaskConical } from 'lucide-react';

export default function CreateChemicalModal() {
  const { closeModal, addChemical } = useApp();

  const [name, setName] = useState('');
  const [chemicalFormula, setChemicalFormula] = useState('');
  const [casNumber, setCasNumber] = useState('');
  const [hsnCode, setHsnCode] = useState('');
  const [category, setCategory] = useState('Alkali / Basic Chemicals');
  const [grade, setGrade] = useState('Technical Grade');
  const [purity, setPurity] = useState('99.0% Min');
  const [form, setForm] = useState('Liquid');
  const [packaging, setPackaging] = useState('SS Road Tanker');
  const [uom, setUom] = useState('MT');
  const [basePricePerUnit, setBasePricePerUnit] = useState('45000');
  const [manufacturer, setManufacturer] = useState('');
  const [hazardClass, setHazardClass] = useState('Class 8: Corrosive');
  const [storageConditions, setStorageConditions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChem = {
      id: `CHEM-00${Math.floor(10 + Math.random() * 89)}`,
      name,
      chemicalFormula,
      casNumber,
      hsnCode,
      category,
      grade,
      purity,
      form,
      packaging,
      uom,
      basePricePerUnit: Number(basePricePerUnit),
      manufacturer,
      hazardClass,
      storageConditions,
      isRestricted: false,
      requiresCOA: true,
      sdsAvailable: true,
      currentStock: 0,
      reorderLevel: 25,
      status: 'Active'
    };
    addChemical(newChem);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E4E7EC] max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-[#C6A66B]" />
            <h2 className="text-base font-bold text-[#101828]">Register Chemical Master Item</h2>
          </div>
          <button onClick={closeModal} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Chemical Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Nitric Acid 68%"
              className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-semibold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chemical Formula</label>
              <input
                type="text"
                value={chemicalFormula}
                onChange={(e) => setChemicalFormula(e.target.value)}
                placeholder="e.g. HNO3"
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">CAS Registry Number</label>
              <input
                type="text"
                value={casNumber}
                onChange={(e) => setCasNumber(e.target.value)}
                placeholder="e.g. 7697-37-2"
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-mono font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">HSN / Custom Tariff Code</label>
              <input
                type="text"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
                placeholder="e.g. 28080000"
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-mono"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs"
              >
                <option value="Alkali / Basic Chemicals">Alkali / Basic Chemicals</option>
                <option value="Solvents & Alcohols">Solvents & Alcohols</option>
                <option value="Inorganic Acids">Inorganic Acids</option>
                <option value="Pigments & Coatings">Pigments & Coatings</option>
                <option value="Inorganic Salts">Inorganic Salts</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Grade</label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Purity (%)</label>
              <input
                type="text"
                value={purity}
                onChange={(e) => setPurity(e.target.value)}
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Base Price (₹/MT)</label>
              <input
                type="number"
                value={basePricePerUnit}
                onChange={(e) => setBasePricePerUnit(e.target.value)}
                className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Hazard Classification</label>
            <select
              value={hazardClass}
              onChange={(e) => setHazardClass(e.target.value)}
              className="w-full p-2.5 border border-[#E4E7EC] rounded-lg text-xs font-semibold"
            >
              <option value="Class 8: Corrosive">Class 8: Corrosive</option>
              <option value="Class 3: Flammable Liquid">Class 3: Flammable Liquid</option>
              <option value="Class 6.1: Toxic">Class 6.1: Toxic</option>
              <option value="Class 5.1: Oxidizer">Class 5.1: Oxidizer</option>
              <option value="Non-Hazardous / Regulated">Non-Hazardous / Regulated</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E4E7EC]">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 border border-[#E4E7EC] rounded-lg text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#101828] text-white rounded-lg font-bold hover:bg-[#101828]/90"
            >
              Save Chemical Master
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

