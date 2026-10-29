import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import RoleBanner from './components/layout/RoleBanner';
import Toast from './components/common/Toast';
import ModalManager from './components/modals/ModalManager';

// Modules
import OverviewModule from './components/modules/overview/OverviewModule';
import CRMModule from './components/modules/crm/CRMModule';
import ChemicalCatalogModule from './components/modules/catalog/ChemicalCatalogModule';
import QuotationsModule from './components/modules/quotations/QuotationsModule';
import SalesModule from './components/modules/sales/SalesModule';
import InventoryModule from './components/modules/inventory/InventoryModule';
import ProcurementModule from './components/modules/procurement/ProcurementModule';
import FinanceModule from './components/modules/finance/FinanceModule';
import LogisticsModule from './components/modules/logistics/LogisticsModule';
import QualityComplianceModule from './components/modules/quality/QualityComplianceModule';
import ReportsModule from './components/modules/reports/ReportsModule';
import AIAutomationModule from './components/modules/ai/AIAutomationModule';
import AdminModule from './components/modules/admin/AdminModule';

// Portals
import CustomerPortal from './components/portals/CustomerPortal';
import SupplierPortal from './components/portals/SupplierPortal';

function MainLayout() {
  const { activeNav, currentRole } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
    // If currently in an external portal perspective
    if (currentRole === 'customer_portal' && activeNav === 'customer_portal') {
      return <CustomerPortal />;
    }
    if (currentRole === 'supplier_portal' && activeNav === 'supplier_portal') {
      return <SupplierPortal />;
    }

    switch (activeNav) {
      case 'overview':
        return <OverviewModule />;
      case 'crm':
        return <CRMModule />;
      case 'catalog':
        return <ChemicalCatalogModule />;
      case 'quotations':
        return <QuotationsModule />;
      case 'sales':
        return <SalesModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'procurement':
        return <ProcurementModule />;
      case 'finance':
        return <FinanceModule />;
      case 'logistics':
        return <LogisticsModule />;
      case 'quality':
        return <QualityComplianceModule />;
      case 'reports':
        return <ReportsModule />;
      case 'ai':
        return <AIAutomationModule />;
      case 'admin':
        return <AdminModule />;
      case 'customer_portal':
        return <CustomerPortal />;
      case 'supplier_portal':
        return <SupplierPortal />;
      default:
        return <OverviewModule />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col antialiased selection:bg-[#C6A66B]/20">
      {/* Top Application Bar */}
      <Topbar />

      {/* Role & Access Perspective Ribbon */}
      <RoleBanner />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActiveModule()}
        </main>
      </div>

      {/* Persistent Components */}
      <Toast />
      <ModalManager />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

