import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import DataTable from '../../common/DataTable';
import Badge from '../../common/Badge';
import { ROLE_DEFINITIONS } from '../../../data/mockData';
import {
  Settings,
  Users,
  Shield,
  Building,
  Key,
  CheckCircle2,
  Lock,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function AdminModule() {
  const { auditLogs, currentRole, switchRole, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'company' | 'audit'

  const modulesList = [
    'User / role configuration',
    'Business-wide analytics',
    'Leads & CRM accounts',
    'Quotations & Pricing',
    'Sales Orders',
    'Procurement & Supplier RFQs',
    'Stock & Batches',
    'Invoices & Payments',
    'Dispatch & POD',
    'Compliance Documents',
    'Audit Trail'
  ];

  const auditColumns = [
    {
      header: 'Timestamp',
      accessor: 'timestamp',
      cell: (row) => <span className="font-mono text-xs text-slate-500">{row.timestamp}</span>
    },
    {
      header: 'User & Role',
      accessor: 'userName',
      cell: (row) => (
        <div>
          <span className="font-bold text-[#101828] text-xs">{row.userName}</span>
          <span className="block text-[11px] text-slate-500">{row.userRole}</span>
        </div>
      )
    },
    {
      header: 'Action Performed',
      accessor: 'action',
      cell: (row) => <span className="text-xs text-slate-800 leading-snug">{row.action}</span>
    },
    {
      header: 'IP Address',
      accessor: 'ipAddress',
      cell: (row) => <span className="font-mono text-xs text-slate-400">{row.ipAddress}</span>
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <Badge status={row.status} size="xs" />
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">System Administration & Access Governance</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Role-based access matrix (RBAC), multi-branch setup, approval thresholds, and tamper-evident audit ledger.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Saved system configuration update', 'success')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            Save Configuration
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E4E7EC] pb-2">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'matrix' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Role Access Matrix (Section 11)
        </button>
        <button
          onClick={() => setActiveTab('company')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'company' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Company & Hub Settings
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
            activeTab === 'audit' ? 'bg-[#101828] text-white' : 'text-slate-600 hover:bg-[#FAF9F6]'
          }`}
        >
          Security Audit Trail ({auditLogs.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'matrix' && (
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
            <div>
              <h2 className="text-sm font-bold text-[#101828]">10-Role Permission Matrix & Isolation Guardrails</h2>
              <p className="text-xs text-[#667085]">Least privilege security model (Wireframe Section 11)</p>
            </div>
            <span className="text-xs bg-[#FAF7F0] text-[#8C6F3B] font-bold px-2.5 py-1 rounded border border-[#C6A66B]/30">
              RBAC Verified
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#E4E7EC] text-slate-700 font-semibold uppercase">
                  <th className="py-2 px-3">Module / Capability</th>
                  <th className="py-2 px-2 text-center">Super Admin</th>
                  <th className="py-2 px-2 text-center">Business Owner</th>
                  <th className="py-2 px-2 text-center">Sales Mgr</th>
                  <th className="py-2 px-2 text-center">Sales Exec</th>
                  <th className="py-2 px-2 text-center">Purchase Mgr</th>
                  <th className="py-2 px-2 text-center">Warehouse Mgr</th>
                  <th className="py-2 px-2 text-center">Accountant</th>
                  <th className="py-2 px-2 text-center">Logistics Mgr</th>
                  <th className="py-2 px-2 text-center bg-blue-50/60">Customer Portal</th>
                  <th className="py-2 px-2 text-center bg-amber-50/60">Supplier Portal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E7EC]">
                {modulesList.map((mod, idx) => (
                  <tr key={idx} className="hover:bg-[#FAF9F6]">
                    <td className="py-2.5 px-3 font-semibold text-[#101828]">{mod}</td>
                    <td className="py-2.5 px-2 text-center text-emerald-700 font-bold">Configure</td>
                    <td className="py-2.5 px-2 text-center text-blue-700">View All</td>
                    <td className="py-2.5 px-2 text-center">{mod.includes('Sales') || mod.includes('Quote') || mod.includes('Lead') ? 'Manage' : 'No'}</td>
                    <td className="py-2.5 px-2 text-center">{mod.includes('Lead') || mod.includes('Quote') ? 'Assigned' : 'No'}</td>
                    <td className="py-2.5 px-2 text-center">{mod.includes('Procurement') ? 'Manage' : 'No'}</td>
                    <td className="py-2.5 px-2 text-center">{mod.includes('Stock') ? 'Manage' : 'No'}</td>
                    <td className="py-2.5 px-2 text-center">{mod.includes('Invoice') ? 'Manage' : 'No'}</td>
                    <td className="py-2.5 px-2 text-center">{mod.includes('Dispatch') ? 'Manage' : 'No'}</td>
                    <td className="py-2.5 px-2 text-center bg-blue-50/30">
                      {mod.includes('Quote') || mod.includes('Sales') || mod.includes('Invoice') ? 'Own Records' : <Lock className="w-3 h-3 text-slate-300 inline" />}
                    </td>
                    <td className="py-2.5 px-2 text-center bg-amber-50/30">
                      {mod.includes('Procurement') || mod.includes('Dispatch') ? 'Assigned RFQs' : <Lock className="w-3 h-3 text-slate-300 inline" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'company' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-[#101828] text-sm pb-2 border-b border-[#E4E7EC]">Operating Company Profile</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-0.5 font-medium">Company Name</label>
                <input type="text" defaultValue="ChemTrade 360 Distribution Private Limited" className="w-full p-2 border border-[#E4E7EC] rounded-lg bg-slate-50 font-semibold" readOnly />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-500 block mb-0.5 font-medium">GSTIN</label>
                  <input type="text" defaultValue="24AAACD4490M1Z2" className="w-full p-2 border border-[#E4E7EC] rounded-lg bg-slate-50 font-mono" readOnly />
                </div>
                <div>
                  <label className="text-slate-500 block mb-0.5 font-medium">PAN</label>
                  <input type="text" defaultValue="AAACD4490M" className="w-full p-2 border border-[#E4E7EC] rounded-lg bg-slate-50 font-mono" readOnly />
                </div>
              </div>
              <div>
                <label className="text-slate-500 block mb-0.5 font-medium">Registered Office</label>
                <input type="text" defaultValue="Plot 104, GIDC Dahej Industrial Zone, Bharuch, Gujarat 392130" className="w-full p-2 border border-[#E4E7EC] rounded-lg bg-slate-50" readOnly />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-[#101828] text-sm pb-2 border-b border-[#E4E7EC]">Approval & Commercial Safeguards</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E4E7EC] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#101828]">Minimum Gross Margin Threshold</p>
                  <p className="text-[11px] text-slate-500">Requires Sales Manager sign-off if below</p>
                </div>
                <span className="font-mono font-bold text-sm text-[#101828] bg-white px-2.5 py-1 rounded border border-[#E4E7EC]">
                  7.0%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E4E7EC] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#101828]">Auto-Lock Quarantine Stock</p>
                  <p className="text-[11px] text-slate-500">Prevent allocation of unreleased lots</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Enforced ✓
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E4E7EC] flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#101828]">NIC E-Invoice Auto-IRN</p>
                  <p className="text-[11px] text-slate-500">Trigger on invoice status changed to Issued</p>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Active ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <DataTable
          columns={auditColumns}
          data={auditLogs}
          searchPlaceholder="Search audit log by user, role, action keywords..."
        />
      )}
    </div>
  );
}

