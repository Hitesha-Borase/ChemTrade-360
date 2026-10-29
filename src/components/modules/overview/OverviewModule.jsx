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

export default function OverviewModule() {
  const { currentRole } = useApp();

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
      {renderDashboard()}
    </div>
  );
}

