import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FileSpreadsheet,
  ShoppingBag,
  Boxes,
  PackageCheck,
  Receipt,
  BarChart3,
  Settings,
  X,
  Building2,
  LogOut
} from 'lucide-react';

export default function Sidebar() {
  const {
    activeNav,
    setActiveNav,
    currentRole,
    roleMeta,
    logout,
    sidebarOpen,
    closeSidebar
  } = useApp();

  // Simple 10 Core Business Modules with Exact Matching Routes
  const navItems = [
    { id: 'dashboard', legacyId: 'overview', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'customers', legacyId: 'crm', label: 'Customers', icon: Users, badge: '4 Leads' },
    { id: 'chemicals', legacyId: 'catalog', label: 'Chemicals', icon: FlaskConical, badge: null },
    { id: 'quotations', legacyId: 'quotations', label: 'Quotations', icon: FileSpreadsheet, badge: '1 Approval' },
    { id: 'sales-orders', legacyId: 'sales', label: 'Sales Orders', icon: ShoppingBag, badge: null },
    { id: 'inventory', legacyId: 'inventory', label: 'Inventory', icon: Boxes, badge: '1 Alert' },
    { id: 'purchases', legacyId: 'procurement', label: 'Purchases', icon: PackageCheck, badge: null },
    { id: 'billing', legacyId: 'finance', label: 'Billing', icon: Receipt, badge: 'Overdue' },
    { id: 'reports', legacyId: 'reports', label: 'Reports', icon: BarChart3, badge: null },
    { id: 'settings', legacyId: 'admin', label: 'Settings', icon: Settings, badge: null }
  ];

  // Role-based navigation: ONLY show menus that this role is permitted to access!
  const visibleNavList = navItems.filter((item) => {
    if (!roleMeta?.allowedNav) return true;
    return roleMeta.allowedNav.includes(item.id) || roleMeta.allowedNav.includes(item.legacyId);
  });

  useEffect(() => {
    if (visibleNavList.length > 0) {
      const isCurrentVisible = visibleNavList.some(
        (item) => item.id === activeNav || item.legacyId === activeNav
      );
      if (!isCurrentVisible) {
        setActiveNav(visibleNavList[0].id);
      }
    }
  }, [currentRole, visibleNavList, activeNav, setActiveNav]);

  const handleNavClick = (navId) => {
    setActiveNav(navId);
    // On mobile, auto close drawer after selecting a route
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container: Drawer on Mobile (< md), Collapsible Panel on Desktop (>= md) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 md:static md:z-30 flex flex-col h-full flex-shrink-0 bg-[#063F32] text-white border-r border-[#042a22] select-none transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? 'w-64 translate-x-0 shadow-2xl md:shadow-none'
            : '-translate-x-full md:translate-x-0 md:w-0 md:border-r-0 md:overflow-hidden md:opacity-0 pointer-events-none'
        }`}
      >
        {/* Sidebar Header: Role Badge + Mobile Close Button */}
        <div className="p-4 flex items-center justify-between border-b border-[#042a22] flex-shrink-0">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#0F795C]" />
            <span className="text-[11px] font-semibold text-[#DDE9D9] tracking-wider uppercase truncate">
              {roleMeta?.name || 'ChemTrade'}
            </span>
          </div>

          {/* Mobile Close Button (X) */}
          <button
            type="button"
            onClick={closeSidebar}
            className="p-1.5 rounded-lg text-[#DDE9D9]/80 hover:text-white hover:bg-[#075C46]/60 transition-colors md:hidden ml-auto"
            title="Close navigation menu"
            aria-label="Close navigation menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {visibleNavList.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id || activeNav === item.legacyId;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                  isActive
                    ? 'bg-[#0F795C] text-white shadow-sm font-semibold border border-[#0F795C]'
                    : 'text-[#DDE9D9] hover:bg-[#075C46]/60 hover:text-white'
                }`}
              >
                <Icon
                  className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-white' : 'text-[#DDE9D9] group-hover:text-white'
                  }`}
                />

                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate text-left">{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#DDE9D9]/20 text-[#DDE9D9] border border-[#DDE9D9]/30">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Active Indicator Bar on Left */}
                {isActive && (
                  <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#C6A66A]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer with Division / Branch & Inline Logout Arrow */}
        <div className="p-3 border-t border-[#042a22] bg-[#042a22]/80 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-[#075C46] flex items-center justify-center text-[#C6A66A] text-xs font-bold flex-shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-[11px] font-semibold text-white truncate">Dahej Chemicals Hub</p>
                <p className="text-[9px] text-[#DDE9D9]/70 truncate">GSTIN: 24AAACD4490M1Z2</p>
              </div>
            </div>

            {/* Logout Arrow Button */}
            <button
              onClick={logout}
              title="Sign Out to Login Page"
              className="p-1.5 rounded-lg text-[#DDE9D9]/70 hover:text-red-300 hover:bg-red-950/40 transition-colors flex-shrink-0 group"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4 group-hover:scale-110 group-hover:-translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
