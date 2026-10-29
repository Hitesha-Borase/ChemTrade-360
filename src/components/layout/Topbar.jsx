import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_DEFINITIONS } from '../../data/mockData';
import {
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Plus,
  Shield,
  User,
  ExternalLink,
  Layers,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  LogOut,
  Building2
} from 'lucide-react';

export default function Topbar() {
  const {
    currentRole,
    roleMeta,
    currentUser,
    logout,
    switchRole,
    searchQuery,
    setSearchQuery,
    notifications,
    openModal
  } = useApp();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const roleMenuRef = useRef(null);
  const notifMenuRef = useRef(null);
  const createMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (roleMenuRef.current && !roleMenuRef.current.contains(event.target)) {
        setRoleMenuOpen(false);
      }
      if (notifMenuRef.current && !notifMenuRef.current.contains(event.target)) {
        setNotifMenuOpen(false);
      }
      if (createMenuRef.current && !createMenuRef.current.contains(event.target)) {
        setCreateMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const internalRoles = ROLE_DEFINITIONS.filter(r => r.type === 'internal');
  const externalPortals = ROLE_DEFINITIONS.filter(r => r.type === 'external');

  return (
    <header className="sticky top-0 z-40 glass-header px-4 sm:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Perspective Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#101828] flex items-center justify-center shadow-md border border-[#C6A66B]/30">
              <span className="font-bold text-[#C6A66B] text-lg leading-none">⚗</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#101828] text-base tracking-tight">ChemTrade</span>
                <span className="text-[#C6A66B] font-bold text-xs px-1.5 py-0.2 rounded bg-[#FAF7F0] border border-[#C6A66B]/40">360</span>
              </div>
              <p className="text-[10px] text-[#667085] hidden sm:block font-medium">B2B Chemical Trading CRM + ERP</p>
            </div>
          </div>

          <div className="h-6 w-px bg-[#E4E7EC] hidden md:block mx-1" />

          {/* Role Perspective Dropdown */}
          <div className="relative" ref={roleMenuRef}>
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E4E7EC] hover:border-[#C6A66B] text-xs transition-all shadow-subtle group"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C6A66B] animate-pulse" />
                <span className="text-[#667085] hidden lg:inline">Active Role:</span>
                <span className="font-bold text-[#101828]">{roleMeta.name}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#101828] transition-transform" />
            </button>

            {roleMenuOpen && (
              <div className="absolute left-0 mt-2 w-72 glass-dropdown rounded-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 border-b border-[#E4E7EC]">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#667085]">
                    Switch Perspective (10 Roles)
                  </p>
                  <p className="text-[10px] text-slate-500">Live preview of all wireframe experiences</p>
                </div>

                <div className="max-h-80 overflow-y-auto py-1">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#667085] uppercase">Internal Dashboards (8)</div>
                  {internalRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        switchRole(role.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#FAF9F6] transition-colors ${
                        currentRole === role.id ? 'bg-[#FAF7F0] text-[#101828] font-bold border-l-2 border-[#C6A66B]' : 'text-slate-700'
                      }`}
                    >
                      <div>
                        <div>{role.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal truncate max-w-[210px]">{role.description}</div>
                      </div>
                      {currentRole === role.id && <span className="text-[10px] text-[#C6A66B] font-semibold">Active</span>}
                    </button>
                  ))}

                  <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-[#667085] uppercase border-t border-[#E4E7EC] mt-1">
                    External Portals (2)
                  </div>
                  {externalPortals.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        switchRole(role.id);
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#FAF9F6] transition-colors ${
                        currentRole === role.id ? 'bg-[#FAF7F0] text-[#101828] font-bold border-l-2 border-[#C6A66B]' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <ExternalLink className="w-3 h-3 text-[#2E6FBB]" />
                        <div>
                          <div>{role.name}</div>
                          <div className="text-[10px] text-slate-400 font-normal truncate max-w-[200px]">{role.description}</div>
                        </div>
                      </div>
                      {currentRole === role.id && <span className="text-[10px] text-[#C6A66B] font-semibold">Active</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chemicals, CAS no., RFQs, batches, customers..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white/80 border border-[#E4E7EC] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C6A66B]/30 focus:border-[#C6A66B] text-[#101828] placeholder-slate-400"
            />
          </div>
        </div>

        {/* Action Controls & Notifications */}
        <div className="flex items-center gap-2.5">
          {/* Quick Create Dropdown */}
          <div className="relative" ref={createMenuRef}>
            <button
              onClick={() => setCreateMenuOpen(!createMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101828] hover:bg-[#101828]/90 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#C6A66B]" />
              <span className="hidden sm:inline">Quick Action</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {createMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 glass-dropdown rounded-xl py-1.5 z-50 animate-in fade-in">
                <button
                  onClick={() => {
                    openModal('create_quote');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#FAF9F6] flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C6A66B]" />
                  <span>Build Chemical Quotation</span>
                </button>
                <button
                  onClick={() => {
                    openModal('create_lead');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#FAF9F6] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#2E6FBB]" />
                  <span>Add Lead / Customer RFQ</span>
                </button>
                <button
                  onClick={() => {
                    openModal('create_chemical');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#FAF9F6] flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#16805D]" />
                  <span>New Chemical Master (CAS/HSN)</span>
                </button>
                <button
                  onClick={() => {
                    openModal('schedule_dispatch');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#FAF9F6] flex items-center gap-2"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Schedule Tanker / Dispatch</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Popover */}
          <div className="relative" ref={notifMenuRef}>
            <button
              onClick={() => setNotifMenuOpen(!notifMenuOpen)}
              className="relative p-2 rounded-lg bg-white border border-[#E4E7EC] hover:bg-[#FAF9F6] text-[#667085] hover:text-[#101828] transition-colors"
              title="Operational Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C43232] text-white text-[9px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 glass-dropdown rounded-xl p-3 z-50 animate-in fade-in shadow-xl">
                <div className="flex items-center justify-between pb-2 border-b border-[#E4E7EC]">
                  <p className="text-xs font-bold text-[#101828]">System & Operational Alerts</p>
                  <span className="text-[10px] bg-[#FAF7F0] text-[#8C6F3B] font-semibold px-2 py-0.5 rounded border border-[#C6A66B]/30">
                    {unreadCount} Active
                  </span>
                </div>
                <div className="divide-y divide-[#E4E7EC] max-h-72 overflow-y-auto mt-1">
                  {notifications.map((n) => (
                    <div key={n.id} className="py-2.5 text-xs">
                      <div className="flex items-start gap-2">
                        {n.type === 'warning' && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />}
                        {n.type === 'danger' && <AlertTriangle className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />}
                        {n.type === 'success' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />}
                        {n.type === 'info' && <Bell className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <p className="text-slate-800 leading-snug">{n.text}</p>
                          <span className="text-[10px] text-slate-400 mt-1 inline-block">{n.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu & Logout */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-xl hover:bg-white/80 transition-all border border-transparent hover:border-[#E4E7EC]"
              title="User Account & Security"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#101828] to-[#1e293b] text-[#C6A66B] flex items-center justify-center font-bold text-xs border border-[#C6A66B]/40 shadow-sm">
                {currentUser?.avatar || 'CT'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-[#101828] leading-tight truncate max-w-[130px]">
                  {currentUser?.name || 'Authorized Staff'}
                </p>
                <p className="text-[10px] text-[#667085] truncate max-w-[130px]">
                  {roleMeta.name}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#667085] hidden xl:block" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 glass-dropdown rounded-2xl p-3 z-50 animate-in fade-in shadow-2xl">
                {/* Profile Header */}
                <div className="p-3 bg-[#FAF9F6] rounded-xl border border-[#E4E7EC] mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#101828] text-[#C6A66B] font-bold text-sm flex items-center justify-center border border-[#C6A66B]/40 shadow-sm">
                      {currentUser?.avatar || 'CT'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#101828] truncate">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser?.email}</p>
                      <span className="inline-block text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.2 rounded-full border border-emerald-200 mt-1">
                        Active Terminal Session
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200 text-[10px] text-slate-500">
                    <div>Role: <strong className="text-[#101828]">{roleMeta.name}</strong></div>
                    <div>Terminal: <span className="text-slate-700">{currentUser?.hub || 'Dahej Hub'}</span></div>
                  </div>
                </div>

                {/* Profile Actions */}
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      setRoleMenuOpen(true);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#FAF9F6] text-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#C6A66B]" />
                    <span>Switch Role Perspective</span>
                  </button>

                  <div className="h-px bg-[#E4E7EC] my-1" />

                  {/* Prominent Red Logout Button */}
                  <button
                    onClick={() => {
                      setProfileMenuOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-[#C43232] font-bold flex items-center justify-between transition-colors border border-red-200"
                  >
                    <div className="flex items-center gap-2">
                      <LogOut className="w-4 h-4 text-[#C43232]" />
                      <span>Log Out of Session</span>
                    </div>
                    <span className="text-[10px] text-red-500 font-normal">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Direct One-Click Logout Header Button */}
          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-[#C43232] text-xs font-bold transition-all shadow-subtle group"
            title="Sign Out of ChemTrade 360"
          >
            <LogOut className="w-3.5 h-3.5 text-[#C43232] group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

