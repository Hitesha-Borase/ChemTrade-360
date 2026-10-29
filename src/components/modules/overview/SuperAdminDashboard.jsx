import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  Users,
  Shield,
  Building,
  Activity,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Plus,
  Key
} from 'lucide-react';

export default function SuperAdminDashboard() {
  const { auditLogs, showToast, logAudit } = useApp();
  const [testingIntegration, setTestingIntegration] = useState(false);

  const integrations = [
    { name: 'NIC GST E-Invoice & E-Way Bill Portal', type: 'Tax & Compliance', status: 'Connected', ping: '124ms', lastSync: '3 mins ago' },
    { name: 'Tally Prime Cloud ERP Sync', type: 'Accounting', status: 'Connected', ping: '89ms', lastSync: '12 mins ago' },
    { name: 'WhatsApp Business API (Gupshup Gateway)', type: 'Customer Messaging', status: 'Connected', ping: '210ms', lastSync: 'Just now' },
    { name: 'V-Trans Logistics GPS Webhook', type: 'Carrier Tracking', status: 'Connected', ping: '340ms', lastSync: '1 hour ago' },
    { name: 'Amazon S3 COA & SDS Document Vault', type: 'Secure Storage', status: 'Connected', ping: '65ms', lastSync: 'Continuous' },
    { name: 'PESO & NCB Regulatory Filing Gateway', type: 'Government Portal', status: 'Configured (Standby)', ping: '--', lastSync: 'Manual Trigger' }
  ];

  const handleTestAll = () => {
    setTestingIntegration(true);
    setTimeout(() => {
      setTestingIntegration(false);
      logAudit('Ran integration health diagnostic test. All 6 endpoints responsive.');
      showToast('All configured integration endpoints verified successfully!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Super Admin Governance Console</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            System configuration, multi-tenant parameters, integration status, and security audit log.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleTestAll}
            disabled={testingIntegration}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-[#E4E7EC] hover:bg-[#FAF9F6] text-[#101828] transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#667085] ${testingIntegration ? 'animate-spin' : ''}`} />
            <span>{testingIntegration ? 'Testing...' : 'Test Integrations'}</span>
          </button>
          <button
            onClick={() => showToast('Opening system user invite dialogue', 'info')}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Section 5.1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Active System Users"
          value="18 Users"
          subvalue="8 Internal / 10 Portal"
          change="+2"
          changeType="positive"
          icon={Users}
          accent={true}
        />
        <KPICard
          title="Configured Roles"
          value="10 Roles"
          subvalue="8 Internal + 2 Portals"
          change="0"
          changeType="neutral"
          icon={Shield}
          badgeText="RBAC Enforced"
        />
        <KPICard
          title="Operating Entities"
          value="2 Hubs"
          subvalue="Dahej Terminal + Bhiwandi"
          change="0"
          changeType="neutral"
          icon={Building}
          badgeText="Active Multi-Branch"
        />
        <KPICard
          title="Integration Health"
          value="100%"
          subvalue="5 Active / 1 Standby"
          change="Optimal"
          changeType="positive"
          icon={Activity}
          badgeText="All Services Green"
        />
      </div>

      {/* 2-Column Section: Integrations Status & Live Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Integration Status Panel */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
            <div>
              <h2 className="text-sm font-bold text-[#101828]">System & Integration Status</h2>
              <p className="text-[11px] text-[#667085]">Explicit connector health check (Rule 12)</p>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
              Live & Monitored
            </span>
          </div>

          <div className="divide-y divide-[#E4E7EC] mt-3">
            {integrations.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#101828]">{item.name}</span>
                    <Badge status={item.status} size="xs" />
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5">
                    <span>{item.type}</span>
                    <span>•</span>
                    <span>Latency: {item.ping}</span>
                    <span>•</span>
                    <span>Last Sync: {item.lastSync}</span>
                  </div>
                </div>
                <button
                  onClick={() => showToast(`Pinging ${item.name}... Response OK.`, 'success')}
                  className="p-1.5 rounded border border-[#E4E7EC] hover:bg-slate-50 text-slate-600"
                  title="Ping Connection"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audit Events */}
        <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
            <div>
              <h2 className="text-sm font-bold text-[#101828]">Immutable Security Audit Log</h2>
              <p className="text-[11px] text-[#667085]">Every financial, stock, & permission change logged</p>
            </div>
            <span className="text-[10px] bg-[#FAF7F0] text-[#8C6F3B] font-bold px-2 py-0.5 rounded border border-[#C6A66B]/40">
              Tamper-evident
            </span>
          </div>

          <div className="divide-y divide-[#E4E7EC] mt-3 max-h-[360px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#101828]">{log.userName} ({log.userRole})</span>
                  <span className="font-mono text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <p className="text-slate-700 mt-1 leading-snug">{log.action}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                  <span>IP: {log.ipAddress}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

