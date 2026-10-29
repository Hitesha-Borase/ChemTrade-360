import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Topbar from './components/layout/Topbar';
import Sidebar from './components/layout/Sidebar';
import Toast from './components/common/Toast';
import ModalManager from './components/modals/ModalManager';

// Landing Page
import LandingPage from './components/landing/LandingPage';

// 10 Core Business Modules
import OverviewModule from './components/modules/overview/OverviewModule';
import CRMModule from './components/modules/crm/CRMModule';
import ChemicalCatalogModule from './components/modules/catalog/ChemicalCatalogModule';
import QuotationsModule from './components/modules/quotations/QuotationsModule';
import SalesModule from './components/modules/sales/SalesModule';
import InventoryModule from './components/modules/inventory/InventoryModule';
import ProcurementModule from './components/modules/procurement/ProcurementModule';
import FinanceModule from './components/modules/finance/FinanceModule';
import ReportsModule from './components/modules/reports/ReportsModule';
import AdminModule from './components/modules/admin/AdminModule';

// Authentication
import LoginPage from './components/auth/LoginPage';

function MainLayout() {
  const { activeNav } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderActiveModule = () => {
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
      case 'reports':
        return <ReportsModule />;
      case 'admin':
        return <AdminModule />;
      default:
        return <OverviewModule />;
    }
  };

  return (
    <div className="h-screen bg-[#F7F5EC] flex flex-col overflow-hidden antialiased selection:bg-[#075C46]/20">
      {/* Top Application Bar */}
      <div className="flex-shrink-0">
        <Topbar />
      </div>

      {/* Main Workspace Body */}
      <div className="flex-1 min-h-0 flex overflow-hidden">
        {/* Navigation Sidebar (Static) */}
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

function AppContent() {
  const { isAuthenticated, currentView, navigateToView } = useApp();

  // If user requested to view the public landing page (or default unauthenticated)
  if (currentView === 'landing') {
    return (
      <LandingPage
        onLaunchApp={() => navigateToView(isAuthenticated ? 'app' : 'login')}
      />
    );
  }

  // If user requested login or not authenticated
  if (!isAuthenticated || currentView === 'login') {
    return (
      <div className="min-h-screen bg-[#F7F5EC]">
        <LoginPage onBackToLanding={() => navigateToView('landing')} />
        <Toast />
      </div>
    );
  }

  // Otherwise, user is in the active ERP workspace
  return <MainLayout />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
