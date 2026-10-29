import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_DEFINITIONS } from '../../data/mockData';
import {
  Lock,
  Mail,
  Key,
  ShieldCheck,
  Building2,
  ExternalLink,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  FlaskConical
} from 'lucide-react';

export default function LoginPage({ onBackToLanding }) {
  const { login, navigateToView } = useApp();

  const [selectedRole, setSelectedRole] = useState('business_owner');
  const [email, setEmail] = useState('s.mehta@chemtrade360.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activeTab, setActiveTab] = useState('internal'); // 'internal' | 'external'
  const [isLoading, setIsLoading] = useState(false);

  const internalRoles = ROLE_DEFINITIONS.filter(r => r.type === 'internal');
  const externalPortals = ROLE_DEFINITIONS.filter(r => r.type === 'external');

  const demoAccounts = [
    { roleId: 'business_owner', label: 'Business Owner', name: 'Sunil Mehta', desc: 'Revenue, margins, P&L' },
    { roleId: 'sales_manager', label: 'Sales Manager', name: 'Vikram Mehta', desc: 'Pipeline & quote approvals' },
    { roleId: 'sales_executive', label: 'Sales Executive', name: 'Rahul Sen', desc: 'Inquiries & daily follow-ups' },
    { roleId: 'purchase_manager', label: 'Purchase Manager', name: 'Kavita Shah', desc: 'Suppliers & quote comparison' },
    { roleId: 'warehouse_manager', label: 'Warehouse Manager', name: 'Dinesh Patel', desc: 'FEFO batches & quarantine' },
    { roleId: 'accountant', label: 'Accountant', name: 'Pooja Iyer', desc: 'GST e-invoices & aging' },
    { roleId: 'logistics_manager', label: 'Logistics Manager', name: 'Harish Nair', desc: 'Tankers, dispatch & POD' },
    { roleId: 'super_admin', label: 'Super Admin', name: 'Vikram Singhania', desc: 'System governance & audit' }
  ];

  const externalDemoAccounts = [
    { roleId: 'customer_portal', label: 'Asian Paints Ltd', name: 'Rajesh Sharma', desc: 'Self-service RFQs & COA downloads' },
    { roleId: 'supplier_portal', label: 'GACL Chemicals', name: 'Hiren Mehta', desc: 'Inbound RFQs & quote bids' }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'customer_portal') {
      setEmail('r.sharma@asianpaints.com');
      setActiveTab('external');
    } else if (roleId === 'supplier_portal') {
      setEmail('h.mehta@gacl.co.in');
      setActiveTab('external');
    } else {
      setEmail(`${roleId.replace('_', '.')}@chemtrade360.com`);
      setActiveTab('internal');
    }
  };

  const handleQuickLogin = (roleId) => {
    setIsLoading(true);
    handleRoleSelect(roleId);
    setTimeout(() => {
      login(roleId);
      setIsLoading(false);
    }, 400);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(selectedRole, email);
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F7F5EC] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#063F32] to-transparent pointer-events-none opacity-95" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C6A66A]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-48 -right-32 w-96 h-96 rounded-full bg-[#075C46]/20 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#063F32] to-[#075C46] flex items-center justify-center shadow-lg border border-[#C6A66A]/40">
            <span className="font-bold text-[#C6A66A] text-xl leading-none">⚗</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-lg tracking-tight">ChemTrade</span>
              <span className="text-[#C6A66A] font-bold text-xs px-1.5 py-0.2 rounded bg-[#DDE9D9]/10 border border-[#C6A66A]/40">360</span>
            </div>
            <p className="text-[11px] text-slate-300">Chemical Trading CRM + ERP Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateToView ? navigateToView('landing') : onBackToLanding?.()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/25 transition-all shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Back to Website</span>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#C6A66A]" />
            <span>AES-256 Bit Encrypted Industrial Portal</span>
          </div>
        </div>
      </header>

      {/* Main Authentication Box */}
      <main className="relative z-10 px-4 py-8 max-w-4xl mx-auto w-full flex flex-col items-center">
        <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#E3E8DF] overflow-hidden">
          {/* Top Banner inside card */}
          <div className="bg-[#063F32] text-white p-6 sm:p-8 border-b border-[#042a22] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#C6A66A] uppercase tracking-wider bg-[#C6A66A]/15 px-2.5 py-1 rounded-full border border-[#C6A66A]/30 inline-block mb-2">
                Operational Security Sign-In
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-white">Sign In to ChemTrade 360</h1>
              <p className="text-xs text-slate-300 mt-1">
                Access your role-based workstation, chemical inventory ledgers, and trade workflows.
              </p>
            </div>

            {/* Portal Switch Tabs */}
            <div className="bg-[#042a22] p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto border border-[#0F795C]/30">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('internal');
                  handleRoleSelect('business_owner');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'internal'
                    ? 'bg-[#075C46] text-white shadow-sm border border-[#0F795C]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Internal ERP (8 Roles)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('external');
                  handleRoleSelect('customer_portal');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                  activeTab === 'external'
                    ? 'bg-[#C6A66A] text-[#17372F] shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ExternalLink className="w-3 h-3" />
                <span>External Portals</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Your Operational Role / Persona
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => handleRoleSelect(e.target.value)}
                    className="w-full p-2.5 bg-[#F7F5EC] border border-[#E3E8DF] rounded-xl text-xs font-bold text-[#17372F] focus:outline-none focus:ring-2 focus:ring-[#075C46]/20"
                  >
                    <optgroup label="Internal ERP Dashboards">
                      {internalRoles.map(r => (
                        <option key={r.id} value={r.id}>{r.name} — {r.description}</option>
                      ))}
                    </optgroup>
                    <optgroup label="External Extranet Portals">
                      {externalPortals.map(r => (
                        <option key={r.id} value={r.id}>{r.name} — {r.description}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Corporate Email ID / Vendor Code
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. s.mehta@chemtrade360.com"
                      className="w-full pl-9 pr-4 py-2.5 bg-[#F7F5EC] border border-[#E3E8DF] rounded-xl text-xs font-mono font-medium text-[#17372F] focus:outline-none focus:ring-2 focus:ring-[#075C46]/20"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-semibold text-slate-700">Account Password</label>
                    <a href="#reset" onClick={(e) => { e.preventDefault(); alert('Demo password reset notification sent.'); }} className="text-[11px] text-[#C6A66A] hover:underline font-medium">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 bg-[#F7F5EC] border border-[#E3E8DF] rounded-xl text-xs font-mono text-[#17372F] focus:outline-none focus:ring-2 focus:ring-[#075C46]/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#E3E8DF] text-[#17372F] focus:ring-[#C6A66A]"
                    />
                    <span>Remember terminal session</span>
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2FA Verified
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-[#075C46] hover:bg-[#063F32] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <span>Authenticating Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In as {ROLE_DEFINITIONS.find(r => r.id === selectedRole)?.name}</span>
                      <ArrowRight className="w-4 h-4 text-[#C6A66A] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="p-3 rounded-xl bg-[#DDE9D9] border border-[#C6A66A]/30 text-[11px] text-[#075C46] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C6A66A] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Least Privilege Security:</strong> External Customer and Supplier accounts are strictly isolated. Internal gross margins and supplier costs are masked in customer views.
                </span>
              </div>
            </div>

            {/* Right Column: 1-Click Fast Demo Login Pills (5 cols) */}
            <div className="lg:col-span-5 bg-[#F7F5EC] p-5 rounded-xl border border-[#E3E8DF] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-[#E3E8DF] mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
                  <span className="text-xs font-bold text-[#17372F] uppercase tracking-wider">
                    1-Click Fast Login Personas
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-3">
                  Click any role below to instantly log in and experience that specific dashboard:
                </p>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {(activeTab === 'internal' ? demoAccounts : externalDemoAccounts).map((acc) => (
                    <button
                      key={acc.roleId}
                      type="button"
                      onClick={() => handleQuickLogin(acc.roleId)}
                      className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs flex items-center justify-between group ${
                        selectedRole === acc.roleId
                          ? 'bg-[#075C46] text-white border-[#075C46] shadow-sm'
                          : 'bg-white border-[#E3E8DF] hover:border-[#C6A66A] text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-1.5">
                          <span>{acc.label}</span>
                          <span className={`text-[10px] font-normal ${selectedRole === acc.roleId ? 'text-slate-300' : 'text-slate-500'}`}>
                            ({acc.name})
                          </span>
                        </div>
                        <div className={`text-[10px] truncate max-w-[190px] ${selectedRole === acc.roleId ? 'text-[#C6A66A]' : 'text-slate-400'}`}>
                          {acc.desc}
                        </div>
                      </div>
                      <ArrowRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${
                        selectedRole === acc.roleId ? 'text-[#C6A66A] opacity-100' : 'text-slate-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#E3E8DF] mt-3 text-[10px] text-slate-400 text-center">
                ChemTrade 360 Enterprise ERP • Version 1.0.0
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-4 px-6 text-center text-xs text-slate-500 border-t border-[#E3E8DF] bg-white/60 backdrop-blur-sm">
        <p>© 2026 ChemTrade 360 Distribution Private Limited. All rights reserved. Complies with PESO Bulk Storage & NCB Precursor Regulations.</p>
      </footer>
    </div>
  );
}

