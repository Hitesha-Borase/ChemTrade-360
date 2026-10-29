import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Key,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Users,
  Shield,
  Boxes
} from 'lucide-react';

export default function LoginPage({ onBackToLanding }) {
  const { login, navigateToView } = useApp();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@chemtrade360.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      roleId: 'admin',
      label: 'Admin',
      name: 'Sunil Mehta',
      desc: 'Full CRM, inventory, orders, billing & settings',
      icon: Shield
    },
    {
      roleId: 'sales_staff',
      label: 'Sales Staff',
      name: 'Vikram Mehta',
      desc: 'Customer inquiries, quotations & sales orders',
      icon: Users
    },
    {
      roleId: 'inventory_staff',
      label: 'Inventory Staff',
      name: 'Dinesh Patel',
      desc: 'Chemical stock, GRN receipts & purchases',
      icon: Boxes
    }
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    if (roleId === 'admin') setEmail('admin@chemtrade360.com');
    else if (roleId === 'sales_staff') setEmail('sales@chemtrade360.com');
    else if (roleId === 'inventory_staff') setEmail('inventory@chemtrade360.com');
    else setEmail(`${roleId}@chemtrade360.com`);
  };

  const handleQuickLogin = (roleId) => {
    setIsLoading(true);
    handleRoleSelect(roleId);
    setTimeout(() => {
      login(roleId);
      setIsLoading(false);
    }, 350);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let role = selectedRole || 'admin';
    const lowerEmail = email.toLowerCase();
    if (lowerEmail.includes('sales')) {
      role = 'sales_staff';
    } else if (lowerEmail.includes('inventory') || lowerEmail.includes('warehouse') || lowerEmail.includes('stock')) {
      role = 'inventory_staff';
    } else if (lowerEmail.includes('admin') || lowerEmail.includes('owner')) {
      role = 'admin';
    }
    setTimeout(() => {
      login(role, email);
      setIsLoading(false);
    }, 350);
  };

  return (
    <div className="h-screen max-h-screen bg-[#F7F5EC] flex flex-col justify-between relative overflow-hidden select-none">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#063F32] to-transparent pointer-events-none opacity-95" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#C6A66A]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-48 -right-32 w-96 h-96 rounded-full bg-[#075C46]/20 blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-3 max-w-7xl mx-auto w-full flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#063F32] to-[#075C46] flex items-center justify-center shadow-md border border-[#C6A66A]/40">
            <span className="font-bold text-[#C6A66A] text-lg leading-none">⚗</span>
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">ChemTrade</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-[#C6A66A]" />
          <span className="hidden sm:inline">AES-256 Bit Encrypted Industrial Portal</span>
        </div>
      </header>

      {/* Main Authentication Box (Centered & Static) */}
      <main className="relative z-10 px-4 py-2 sm:py-3 max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center items-center my-auto overflow-hidden">
        {/* Back navigation pill above card */}
        <div className="w-full flex items-center justify-between mb-2 px-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => navigateToView ? navigateToView('landing') : onBackToLanding?.()}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#DDE9D9]/80 hover:text-white transition-colors group cursor-pointer"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C6A66A] group-hover:-translate-x-1 transition-transform" />
            <span>Back to Landing Page</span>
          </button>
          <span className="text-[11px] text-[#C6A66A] font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66A] animate-pulse" />
            Simple Chemical Trading CRM
          </span>
        </div>

        <div className="w-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-[#E3E8DF] overflow-hidden">
          {/* Top Banner inside card */}
          <div className="bg-[#063F32] text-white px-6 py-3.5 sm:px-8 sm:py-4 border-b border-[#042a22]">
            <span className="text-[10px] font-bold text-[#C6A66A] uppercase tracking-wider bg-[#C6A66A]/15 px-2 py-0.5 rounded-full border border-[#C6A66A]/30 inline-block mb-1">
              Operational Sign-In
            </span>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">Sign In to ChemTrade 360</h1>
            <p className="text-xs text-slate-300 mt-0.5">
              Enter your corporate credentials or use fast login to access your trade dashboard.
            </p>
          </div>

          <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Form (7 cols) */}
            <div className="lg:col-span-7 space-y-3.5">
              <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Corporate Email ID
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@chemtrade360.com"
                      className="w-full pl-9 pr-4 py-2 bg-[#F7F5EC] border border-[#E3E8DF] rounded-xl text-xs font-mono font-medium text-[#17372F] focus:outline-none focus:ring-2 focus:ring-[#075C46]/20"
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
                      className="w-full pl-9 pr-10 py-2 bg-[#F7F5EC] border border-[#E3E8DF] rounded-xl text-xs font-mono text-[#17372F] focus:outline-none focus:ring-2 focus:ring-[#075C46]/20"
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

                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#E3E8DF] text-[#17372F] focus:ring-[#C6A66A]"
                    />
                    <span>Remember session</span>
                  </label>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2FA Verified
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 px-4 bg-[#075C46] hover:bg-[#063F32] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 group mt-1"
                >
                  {isLoading ? (
                    <span>Authenticating Credentials...</span>
                  ) : (
                    <>
                      <span>Sign In to ChemTrade 360</span>
                      <ArrowRight className="w-4 h-4 text-[#C6A66A] group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="p-2.5 rounded-xl bg-[#DDE9D9] border border-[#C6A66A]/30 text-[11px] text-[#075C46] flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C6A66A] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Simple Role-Based Access:</strong> Admin gets full visibility; Sales Staff focuses on leads, quotes & orders; Inventory Staff manages stock in/out and batch records.
                </span>
              </div>
            </div>

            {/* Right Column: 1-Click Fast Demo Login Pills (5 cols) */}
            <div className="lg:col-span-5 bg-[#F7F5EC] p-4 rounded-xl border border-[#E3E8DF] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 pb-2 border-b border-[#E3E8DF] mb-2.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A66A]" />
                  <span className="text-xs font-bold text-[#17372F] uppercase tracking-wider">
                    1-Click Fast Login
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  Click any role below to instantly log in to that dashboard:
                </p>

                <div className="space-y-2">
                  {demoAccounts.map((acc) => {
                    const Icon = acc.icon;
                    const isCurrent = selectedRole === acc.roleId;

                    return (
                      <button
                        key={acc.roleId}
                        type="button"
                        onClick={() => handleQuickLogin(acc.roleId)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex items-center justify-between group ${
                          isCurrent
                            ? 'bg-[#075C46] text-white border-[#075C46] shadow-md'
                            : 'bg-white border-[#E3E8DF] hover:border-[#C6A66A] text-slate-800 hover:shadow-xs'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <div className={`p-1.5 rounded-lg mt-0.5 ${isCurrent ? 'bg-[#063F32] text-[#C6A66A]' : 'bg-[#DDE9D9] text-[#075C46]'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold flex items-center gap-1.5">
                              <span>{acc.label}</span>
                              <span className={`text-[10px] font-normal ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                                ({acc.name})
                              </span>
                            </div>
                            <div className={`text-[10px] mt-0.5 leading-tight ${isCurrent ? 'text-[#C6A66A]' : 'text-slate-400'}`}>
                              {acc.desc}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 flex-shrink-0 ${
                          isCurrent ? 'text-[#C6A66A]' : 'text-slate-400'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#E3E8DF] mt-3 text-[10px] text-slate-400 text-center">
                ChemTrade 360 Simple CRM • Version 1.0.0
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-2.5 px-6 text-center text-xs text-slate-500 border-t border-[#E3E8DF] bg-white/60 backdrop-blur-sm flex-shrink-0">
        <p>© 2026 ChemTrade 360 Distribution Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}
