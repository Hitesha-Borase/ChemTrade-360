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
          <div className="font-bold text-[#17372F] text-sm">{row.name}</div>
          <div className="text-[11px] text-[#7A8980] font-mono">{row.chemicalFormula} • {row.category}</div>
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
          <span className="block text-xs font-mono text-[#0F795C] font-bold">{row.purity}</span>
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
          <span className="font-mono font-bold text-sm text-[#17372F]">{row.currentStock} {row.uom}</span>
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
        <span className="font-mono font-bold text-[#17372F]">
          ₹{row.basePricePerUnit.toLocaleString('en-IN')}/{row.uom}
        </span>
      )
    },
    {
      header: 'Documents & Compliance',
      sortable: false,
      cell: (row) => (
        <div className="flex items-center gap-2 whitespace-nowrap">
          <button
            onClick={() => openModal('view_sds', row)}
            className="px-2 py-1 rounded-lg border border-[#E3E8DF] hover:bg-emerald-50 hover:border-emerald-300 text-slate-700 text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
            title="View & Download 16-Section GHS Safety Data Sheet (SDS PDF)"
          >
            <FileText className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span className="text-[11px] font-semibold">SDS</span>
          </button>
          <button
            onClick={() => openModal('view_coa', row)}
            className="px-2 py-1 rounded-lg border border-[#E3E8DF] hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-xs flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
            title="View & Download Certified Certificate of Analysis (COA PDF)"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[11px] font-semibold">COA</span>
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Chemical Master Catalog</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            Verified chemical specifications, CAS numbers, HS/HSN codes, GHS hazard pictograms, and certified SDS/COA links.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('create_chemical')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
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

