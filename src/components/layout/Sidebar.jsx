import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  FileSpreadsheet,
  ShoppingBag,
  Boxes,
  Truck,
  Receipt,
  FileCheck2,
  BarChart3,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building2,
  PackageCheck,
  Lock,
  Compass,
  LogOut
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed }) {
  const { activeNav, setActiveNav, currentRole, roleMeta, logout } = useApp();

  // Internal Navigation Items (Section 3 of wireframe)
  const internalNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'crm', label: 'CRM & Accounts', icon: Users, badge: '4 Leads' },
    { id: 'catalog', label: 'Chemical Catalog', icon: FlaskConical, badge: null },
    { id: 'quotations', label: 'Quotations', icon: FileSpreadsheet, badge: '1 Approval' },
    { id: 'sales', label: 'Sales Orders', icon: ShoppingBag, badge: null },
    { id: 'inventory', label: 'Inventory & Batches', icon: Boxes, badge: '1 Alert' },
    { id: 'procurement', label: 'Procurement & POs', icon: PackageCheck, badge: null },
    { id: 'finance', label: 'Finance & GST', icon: Receipt, badge: 'Overdue' },
    { id: 'logistics', label: 'Logistics & Dispatch', icon: Truck, badge: null },
    { id: 'quality', label: 'Quality & Compliance', icon: FileCheck2, badge: 'Quarantine' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, badge: null },
    { id: 'ai', label: 'AI & Automation', icon: Bot, badge: 'Smart' },
    { id: 'admin', label: 'Administration', icon: Settings, badge: null }
  ];

  // External Portal Navigation Items
  const customerPortalItems = [
    { id: 'customer_portal', label: 'Customer Portal', icon: LayoutDashboard, badge: 'Active' },
    { id: 'quotations', label: 'Quotations & RFQs', icon: FileSpreadsheet, badge: null },
    { id: 'sales', label: 'My Sales Orders', icon: ShoppingBag, badge: null },
    { id: 'finance', label: 'Invoices & Ledger', icon: Receipt, badge: null },
    { id: 'quality', label: 'Approved SDS / COA', icon: FileCheck2, badge: null }
  ];

  const supplierPortalItems = [
    { id: 'supplier_portal', label: 'Supplier Portal', icon: LayoutDashboard, badge: 'Active' },
    { id: 'procurement', label: 'RFQs & Quotes', icon: PackageCheck, badge: null },
    { id: 'sales', label: 'Purchase Orders', icon: ShoppingBag, badge: null },
    { id: 'logistics', label: 'Dispatch & GRN', icon: Truck, badge: null },
    { id: 'quality', label: 'COA Uploads', icon: FileCheck2, badge: null }
  ];

  const isCustomerPortal = currentRole === 'customer_portal';
  const isSupplierPortal = currentRole === 'supplier_portal';

  let currentNavList = internalNavItems;
  if (isCustomerPortal) currentNavList = customerPortalItems;
  if (isSupplierPortal) currentNavList = supplierPortalItems;

  return (
    <aside
      className={`relative z-30 flex flex-col bg-[#063F32] text-white transition-all duration-300 ease-in-out border-r border-[#042a22] select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header / Brand Strip */}
      <div className="p-4 flex items-center justify-between border-b border-[#042a22]">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-[#0F795C]" />
            <span className="text-[11px] font-semibold text-[#DDE9D9] tracking-wider uppercase">
              {isCustomerPortal ? 'Customer Portal' : isSupplierPortal ? 'Supplier Portal' : 'Enterprise ERP'}
            </span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-lg text-[#DDE9D9]/80 hover:text-white hover:bg-[#075C46]/60 transition-colors ml-auto"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {currentNavList.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          const isPermitted = roleMeta.allowedNav.includes(item.id) || isCustomerPortal || isSupplierPortal;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (isPermitted) setActiveNav(item.id);
              }}
              disabled={!isPermitted}
              title={collapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all group relative ${
                isActive
                  ? 'bg-[#0F795C] text-white shadow-sm font-semibold border border-[#0F795C]'
                  : isPermitted
                  ? 'text-[#DDE9D9] hover:bg-[#075C46]/60 hover:text-white'
                  : 'text-[#7A8980]/60 cursor-not-allowed opacity-50'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : isPermitted ? 'text-[#DDE9D9] group-hover:text-white' : 'text-[#7A8980]/60'}`} />

              {!collapsed && (
                <div className="flex-1 flex items-center justify-between overflow-hidden">
                  <span className="truncate text-left">{item.label}</span>
                  {item.badge && isPermitted && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold bg-[#DDE9D9]/20 text-[#DDE9D9] border border-[#DDE9D9]/30">
                      {item.badge}
                    </span>
                  )}
                  {!isPermitted && (
                    <Lock className="w-3 h-3 text-[#7A8980]/60 flex-shrink-0" />
                  )}
                </div>
              )}

              {/* Active Indicator Bar on Left */}
              {isActive && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-[#C6A66A]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Logout Action in Sidebar */}
      <div className="p-2 border-t border-[#042a22]">
        <button
          onClick={logout}
          title="Sign Out"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold text-red-300 hover:text-red-200 hover:bg-red-900/30 transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0 text-red-300" />
          {!collapsed && <span>Log Out Session</span>}
        </button>
      </div>

      {/* Sidebar Footer with Division / Branch */}
      <div className="p-3 border-t border-[#042a22] bg-[#042a22]/80">
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#075C46] flex items-center justify-center text-[#C6A66A] text-xs font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] font-semibold text-white truncate">Dahej Chemicals Hub</p>
              <p className="text-[9px] text-[#DDE9D9]/70 truncate">GSTIN: 24AAACD4490M1Z2</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center" title="Dahej Chemicals Hub">
            <Building2 className="w-4 h-4 text-[#C6A66A]" />
          </div>
        )}
      </div>
    </aside>
  );
}

