import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import {
  FileCheck2,
  ShieldAlert,
  AlertTriangle,
  Download,
  Calendar,
  CheckCircle2,
  Lock,
  FileText
} from 'lucide-react';

export default function QualityComplianceModule() {
  const { complianceDocs, batches, openModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('regulatory'); // 'regulatory' | 'batches'

  const docColumns = [
    {
      header: 'License / Document Title',
      accessor: 'title',
      cell: (row) => (
        <div>
          <div className="font-bold text-[#17372F] text-sm">{row.title}</div>
          <div className="text-[11px] text-slate-500 font-mono">Reg No: {row.licenseNumber}</div>
        </div>
      )
    },
    {
      header: 'Authority & Body',
      accessor: 'authority',
      cell: (row) => <span className="text-xs font-semibold text-slate-800">{row.authority}</span>
    },
    {
      header: 'Operating Facility',
      accessor: 'facility',
      cell: (row) => <span className="text-xs text-slate-600">{row.facility}</span>
    },
    {
      header: 'Validity Period',
      accessor: 'validUntil',
      cell: (row) => (
        <div className="text-xs font-mono">
          <span className="text-slate-500">From: {row.validFrom}</span>
          <span className="block font-bold text-[#17372F]">Until: {row.validUntil}</span>
        </div>
      )
    },
    {
      header: 'Compliance Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} />
    },
    {
      header: 'Action',
      sortable: false,
      cell: (row) => (
        <button
          onClick={() => showToast(`Opening certified license document for ${row.title}`, 'info')}
          className="flex items-center gap-1 px-2.5 py-1 text-xs border border-[#E3E8DF] rounded-lg hover:bg-[#F7F5EC] text-slate-700 font-medium"
        >
          <Download className="w-3.5 h-3.5 text-[#C6A66A]" />
          <span>View PDF</span>
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E3E8DF]">
        <div>
          <h1 className="text-xl font-bold text-[#17372F]">Quality, Safety & Regulatory Compliance</h1>
          <p className="text-xs text-[#7A8980] mt-0.5">
            PESO bulk chemical storage licenses, NCB precursor quota authorizations, batch-wise COA verification, and laboratory quality releases.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Opening compliance document upload dialog', 'info')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#075C46] text-white hover:bg-[#063F32] transition-colors shadow-sm"
          >
            + Upload Compliance Doc
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E3E8DF] pb-2">
        <button
          onClick={() => setActiveTab('regulatory')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'regulatory' ? 'bg-[#075C46] text-white' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          Statutory Licenses & Clearances ({complianceDocs.length})
        </button>
        <button
          onClick={() => setActiveTab('batches')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'batches' ? 'bg-[#075C46] text-white' : 'text-slate-600 hover:bg-[#F7F5EC]'
          }`}
        >
          Batch QC & Laboratory COA Validation ({batches.length})
        </button>
      </div>

      {activeTab === 'regulatory' && (
        <DataTable
          columns={docColumns}
          data={complianceDocs}
          searchPlaceholder="Search license number, regulatory body..."
        />
      )}

      {activeTab === 'batches' && (
        <div className="bg-white rounded-xl border border-[#E3E8DF] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E3E8DF]">
            <div>
              <h2 className="text-sm font-bold text-[#17372F]">Batch Inspection & COA Document Status</h2>
              <p className="text-xs text-[#7A8980]">Every chemical lot received must possess an authorized manufacturer COA before commercial sale.</p>
            </div>
          </div>

          <div className="divide-y divide-[#E3E8DF]">
            {batches.map(b => (
              <div key={b.batchNo} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#17372F] font-mono">{b.batchNo}</span>
                    <span className="text-slate-700 font-semibold">• {b.chemicalName}</span>
                    <Badge status={b.qualityStatus} size="xs" />
                  </div>
                  <p className="text-slate-600 mt-0.5">
                    COA Verification: <strong>{b.coaStatus}</strong> • Document: <span className="font-mono text-blue-700">{b.coaDocument}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">QC Lab Notes: {b.notes}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => showToast(`Downloading ${b.coaDocument}`, 'success')}
                    className="flex items-center gap-1 px-2.5 py-1 border border-[#E3E8DF] rounded hover:bg-[#F7F5EC] text-xs font-medium text-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-[#C6A66A]" />
                    <span>Download COA</span>
                  </button>
                  {b.qualityStatus === 'Quarantined' && (
                    <button
                      onClick={() => openModal('quarantine_review', b)}
                      className="px-3 py-1 bg-[#B7791F] text-white rounded font-bold text-xs hover:bg-amber-700"
                    >
                      QC Release Check
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

