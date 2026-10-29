import React from 'react';
import { useApp } from '../../../context/AppContext';
import BusinessOwnerDashboard from './BusinessOwnerDashboard';
import SalesManagerDashboard from './SalesManagerDashboard';
import WarehouseManagerDashboard from './WarehouseManagerDashboard';

export default function OverviewModule() {
  const { currentRole } = useApp();

  const renderDashboard = () => {
    switch (currentRole) {
      // 1. Admin Dashboard (Full business, revenue, customers, suppliers, inventory alerts)
      case 'admin':
      case 'business_owner':
      case 'super_admin':
      case 'accountant':
        return <BusinessOwnerDashboard />;

      // 2. Sales Staff Dashboard (Inquiries, customer follow-up, quotations, sales orders)
      case 'sales_staff':
      case 'sales_manager':
      case 'sales_executive':
        return <SalesManagerDashboard />;

      // 3. Inventory Staff Dashboard (Chemical stock, stock-in GRN, available stock, alerts)
      case 'inventory_staff':
      case 'warehouse_manager':
      case 'purchase_manager':
      case 'logistics_manager':
        return <WarehouseManagerDashboard />;

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
