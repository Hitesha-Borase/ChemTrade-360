import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import HazardBadge from '../../common/HazardBadge';
import Badge from '../../common/Badge';
import {
  FlaskConical,
  Plus,
  FileText,
  ShieldAlert,
  Flame,
  Boxes,
  Download
} from 'lucide-react';

export default function ChemicalCatalogModule() {
  const { chemicals, openModal, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredChemicals = chemicals.filter(c => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  const columns = [
    {
      header: 'Chemical Name & Formula',
      accessor: 'name',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#101828] text-sm">{row.name}</div>
          <div className="text-[11px] text-[#667085] font-mono">{row.chemicalFormula} • {row.category}</div>
          <div className="mt-1">
            <HazardBadge cas={row.casNumber} hsn={row.hsnCode} compact={true} />
          </div>
        </div>
      )
    },
    {
      header: 'Grade & Purity',
      accessor: 'grade',
      cell: (row) => (
        <div>
          <span className="font-semibold text-slate-800">{row.grade}</span>
          <span className="block text-xs font-mono text-[#16805D] font-bold">{row.purity}</span>
        </div>
      )
    },
    {
      header: 'Physical Form & Packaging',
      accessor: 'form',
      cell: (row) => (
        <div className="text-xs">
          <span className="font-medium text-slate-700">{row.form}</span>
          <span className="block text-[11px] text-slate-500">{row.packaging}</span>
        </div>
      )
    },
    {
      header: 'Hazard Classification',
      accessor: 'hazardClass',
      cell: (row) => (
        <div className="space-y-1">
          <HazardBadge hazardClass={row.hazardClass} />
          {row.isRestricted && (
            <span className="inline-block text-[10px] bg-red-50 text-red-700 font-bold px-1.5 py-0.2 rounded border border-red-200">
              Restricted Precursor / License Mandatory
            </span>
          )}
        </div>
      )
    },
    {
      header: 'Current Stock',
      accessor: 'currentStock',
      cell: (row) => (
        <div>
          <span className="font-mono font-bold text-sm text-[#101828]">{row.currentStock} {row.uom}</span>
          {row.currentStock <= row.reorderLevel ? (
            <span className="block text-[10px] text-amber-700 font-semibold">Low Stock Alert (&lt;{row.reorderLevel})</span>
          ) : (
            <span className="block text-[10px] text-emerald-700">Healthy Stock</span>
          )}
        </div>
      )
    },
    {
      header: 'Base Benchmark Price',
      accessor: 'basePricePerUnit',
      cell: (row) => (
        <span className="font-mono font-bold text-[#101828]">
          ₹{row.basePricePerUnit.toLocaleString('en-IN')}/{row.uom}
        </span>
      )
    },
    {
      header: 'Documents & Compliance',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast(`Opening SDS (16-Section) for ${row.name}`, 'info')}
            className="p-1.5 rounded border border-[#E4E7EC] hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1"
            title="Safety Data Sheet"
          >
            <FileText className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span className="text-[11px]">SDS</span>
          </button>
          <button
            onClick={() => showToast(`Opening Certificate of Analysis for ${row.name}`, 'info')}
            className="p-1.5 rounded border border-[#E4E7EC] hover:bg-slate-50 text-slate-700 text-xs flex items-center gap-1"
            title="Certificate of Analysis"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px]">COA</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Chemical Master Catalog</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Verified chemical specifications, CAS numbers, HS/HSN codes, GHS hazard pictograms, and certified SDS/COA links.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_chemical')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Add Chemical Master</span>
          </button>
        </div>
      </div>

      {/* Chemical Master Table */}
      <DataTable
        columns={columns}
        data={filteredChemicals}
        searchPlaceholder="Search chemicals by name, CAS number, formula, HSN code..."
        filterOptions={[
          { label: 'All Categories', value: 'all' },
          { label: 'Alkali / Basic', value: 'Alkali / Basic Chemicals' },
          { label: 'Solvents', value: 'Solvents & Alcohols' },
          { label: 'Inorganic Acids', value: 'Inorganic Acids' },
          { label: 'Pigments', value: 'Pigments & Coatings' }
        ]}
        activeFilter={selectedCategory}
        onFilterChange={setSelectedCategory}
      />
    </div>
  );
}

