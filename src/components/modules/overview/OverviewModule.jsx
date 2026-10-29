import React from 'react';
import { useApp } from '../../../context/AppContext';
import BusinessOwnerDashboard from './BusinessOwnerDashboard';
import SuperAdminDashboard from './SuperAdminDashboard';
import SalesManagerDashboard from './SalesManagerDashboard';
import SalesExecutiveDashboard from './SalesExecutiveDashboard';
import PurchaseManagerDashboard from './PurchaseManagerDashboard';
import WarehouseManagerDashboard from './WarehouseManagerDashboard';
import AccountantDashboard from './AccountantDashboard';
import LogisticsManagerDashboard from './LogisticsManagerDashboard';
import { ROLE_DEFINITIONS } from '../../../data/mockData';
import { Eye, Shield } from 'lucide-react';

export default function OverviewModule() {
  const { currentRole, switchRole } = useApp();

  const internalRoles = ROLE_DEFINITIONS.filter(r => r.type === 'internal');

  const renderDashboard = () => {
    switch (currentRole) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'business_owner':
        return <BusinessOwnerDashboard />;
      case 'sales_manager':
        return <SalesManagerDashboard />;
      case 'sales_executive':
        return <SalesExecutiveDashboard />;
      case 'purchase_manager':
        return <PurchaseManagerDashboard />;
      case 'warehouse_manager':
        return <WarehouseManagerDashboard />;
      case 'accountant':
        return <AccountantDashboard />;
      case 'logistics_manager':
        return <LogisticsManagerDashboard />;
      default:
        return <BusinessOwnerDashboard />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Perspective Quick-Switcher Ribbon */}
      <div className="bg-white/90 backdrop-blur-md border border-[#E3E8DF] rounded-xl p-2.5 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-[#075C46] text-[#C6A66A]">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#17372F]">Role Dashboards (Wireframe Section 5)</p>
            <p className="text-[10px] text-[#7A8980]">Switch live between all 8 internal operational roles</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {internalRoles.map((role) => (
            <button
              key={role.id}
              onClick={() => switchRole(role.id)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium whitespace-nowrap transition-all border ${
                currentRole === role.id
                  ? 'bg-[#075C46] text-white border-[#075C46] shadow-sm font-semibold'
                  : 'bg-[#F7F5EC] text-[#7A8980] border-[#E3E8DF] hover:bg-white hover:text-[#17372F]'
              }`}
            >
              {role.name}
            </button>
          ))}
        </div>
      </div>

      {/* Render Selected Role Dashboard */}
      {renderDashboard()}
    </div>
  );
}

