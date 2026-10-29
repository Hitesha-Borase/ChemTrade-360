import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Plus,
  Shield,
  User,
  Layers,
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Building2,
} from 'lucide-react';

export default function Topbar() {
  const {
    currentRole,
    roleMeta,
    currentUser,
    searchQuery,
    setSearchQuery,
    notifications,
    openModal,
    navigateToView
  } = useApp();

  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [createMenuOpen, setCreateMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const notifMenuRef = useRef(null);
  const createMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event) {
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

  return (
    <header className="sticky top-0 z-40 glass-header px-4 sm:px-6 py-2.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Brand & Perspective Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#075C46] flex items-center justify-center shadow-md border border-[#C6A66A]/30">
              <span className="font-bold text-[#C6A66A] text-lg leading-none">⚗</span>
            </div>
            <div>
              <span className="font-extrabold text-[#17372F] text-base tracking-tight">ChemTrade</span>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A8980]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chemicals, CAS no., RFQs, batches, customers..."
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-white/80 border border-[#E3E8DF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#075C46]/20 focus:border-[#075C46] text-[#17372F] placeholder-slate-400"
            />
          </div>
        </div>

        {/* Action Controls & Notifications */}
        <div className="flex items-center gap-2.5">
          {/* Quick Create Dropdown */}

          <div className="relative" ref={createMenuRef}>
            <button
              onClick={() => setCreateMenuOpen(!createMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#075C46] hover:bg-[#063F32] text-white text-xs font-semibold shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#C6A66A]" />
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
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#F7F5EC] flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-[#C6A66A]" />
                  <span>Build Chemical Quotation</span>
                </button>
                <button
                  onClick={() => {
                    openModal('create_lead');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#F7F5EC] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#2E6FBB]" />
                  <span>Add Lead / Customer RFQ</span>
                </button>
                <button
                  onClick={() => {
                    openModal('create_chemical');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#F7F5EC] flex items-center gap-2"
                >
                  <Layers className="w-3.5 h-3.5 text-[#0F795C]" />
                  <span>New Chemical Master (CAS/HSN)</span>
                </button>
                <button
                  onClick={() => {
                    openModal('schedule_dispatch');
                    setCreateMenuOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-[#F7F5EC] flex items-center gap-2"
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
              className="relative p-2 rounded-lg bg-white border border-[#E3E8DF] hover:bg-[#F7F5EC] text-[#7A8980] hover:text-[#17372F] transition-colors"
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
                <div className="flex items-center justify-between pb-2 border-b border-[#E3E8DF]">
                  <p className="text-xs font-bold text-[#17372F]">System & Operational Alerts</p>
                  <span className="text-[10px] bg-[#DDE9D9] text-[#075C46] font-semibold px-2 py-0.5 rounded border border-[#C6A66A]/30">
                    {unreadCount} Active
                  </span>
                </div>
                <div className="divide-y divide-[#E3E8DF] max-h-72 overflow-y-auto mt-1">
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
              className="flex items-center gap-2 pl-1 pr-1.5 py-1 rounded-xl hover:bg-white/80 transition-all border border-transparent hover:border-[#E3E8DF]"
              title="User Account & Security"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#063F32] to-[#075C46] text-[#C6A66A] flex items-center justify-center font-bold text-xs border border-[#C6A66A]/40 shadow-sm">
                {currentUser?.avatar || 'CT'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-semibold text-[#17372F] leading-tight truncate max-w-[130px]">
                  {currentUser?.name || 'Authorized Staff'}
                </p>
                <p className="text-[10px] text-[#7A8980] truncate max-w-[130px]">
                  {roleMeta.name}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#7A8980] hidden xl:block" />
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 glass-dropdown rounded-2xl p-3 z-50 animate-in fade-in shadow-2xl">
                {/* Profile Header */}
                <div className="p-3 bg-[#F7F5EC] rounded-xl border border-[#E3E8DF] mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#075C46] text-[#C6A66A] font-bold text-sm flex items-center justify-center border border-[#C6A66A]/40 shadow-sm">
                      {currentUser?.avatar || 'CT'}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-[#17372F] truncate">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{currentUser?.email}</p>
                      <span className="inline-block text-[10px] bg-emerald-50 text-emerald-800 font-semibold px-2 py-0.2 rounded-full border border-emerald-200 mt-1">
                        Active Terminal Session
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-[#E3E8DF] text-[10px] text-slate-500">
                    <div>Role: <strong className="text-[#17372F]">{roleMeta.name}</strong></div>
                    <div>Terminal: <span className="text-slate-700">{currentUser?.hub || 'Dahej Hub'}</span></div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="pt-1 text-[11px] text-[#7A8980] flex items-center justify-between">
                  <span>Dahej Central Node</span>
                  <span className="text-[#075C46] font-semibold">Active Session</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

