import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  TrendingUp,
  Layers,
  FlaskConical,
  Sparkles
} from 'lucide-react';

export default function LoginPage({ onBackToLanding }) {
  const { login, navigateToView } = useApp();

  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('admin@chemtrade360.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const demoAccounts = [
    {
      roleId: 'admin',
      label: 'Admin',
      name: 'Sunil Mehta',
      email: 'admin@chemtrade360.com'
    },
    {
      roleId: 'sales_staff',
      label: 'Sales Staff',
      name: 'Vikram Mehta',
      email: 'sales@chemtrade360.com'
    },
    {
      roleId: 'inventory_staff',
      label: 'Inventory Staff',
      name: 'Dinesh Patel',
      email: 'inventory@chemtrade360.com'
    }
  ];

  const handleQuickLogin = (roleId) => {
    setIsLoading(true);
    const acc = demoAccounts.find(a => a.roleId === roleId);
    if (acc) {
      setSelectedRole(roleId);
      setEmail(acc.email);
    }
    setTimeout(() => {
      login(roleId);
      setIsLoading(false);
    }, 300);
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
    }, 300);
  };

  return (
    <div className="h-screen w-screen max-h-screen overflow-hidden bg-[#F7F5EC] flex flex-col items-center justify-center p-4 relative select-none">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#075C46]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#C6A66A]/15 blur-3xl pointer-events-none" />

      {/* Top Left Back Navigation Link */}
      <div className="w-full max-w-4xl mb-3 flex items-center justify-between px-1 flex-shrink-0">
        <button
          type="button"
          onClick={() => navigateToView ? navigateToView('landing') : onBackToLanding?.()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#075C46] hover:text-[#063F32] transition-colors group cursor-pointer"
          title="Back to Landing Page"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C6A66A] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Landing Page</span>
        </button>
        <span className="text-[11px] text-[#7A8980] font-medium hidden sm:inline">
          AES-256 Bit Encrypted Industrial Portal
        </span>
      </div>

      {/* Main 2-Column Split Card (Matches Reference Wireframe Image) */}
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 flex-shrink-0">
        {/* Left Column: Dark Emerald Brand Experience (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#042a22] via-[#063F32] to-[#075C46] text-white p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Glows inside left container */}
          <div className="absolute top-0 right-0 w-56 h-56 bg-[#0F795C]/30 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#C6A66A]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Brand Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xs">
                <FlaskConical className="w-5 h-5 text-[#C6A66A]" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base tracking-tight block leading-tight">
                  ChemTrade
                </span>
                <span className="text-[10px] text-emerald-200/70 tracking-wide block">
                  CRM • ERP for Chemical Trading
                </span>
              </div>
            </div>

            {/* Greeting */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Welcome Back!
            </h1>
            <p className="text-xs text-[#DDE9D9]/80 mt-2 leading-relaxed max-w-xs">
              Sign in to your account to continue your chemical trading journey.
            </p>
          </div>

          {/* 3 Core Value Features with Circular Icons */}
          <div className="relative z-10 space-y-4 my-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Secure Access</p>
                <p className="text-[11px] text-emerald-200/70">Your data, always protected</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Smart Analytics</p>
                <p className="text-[11px] text-emerald-200/70">Make better business decisions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center flex-shrink-0 text-emerald-300">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Seamless Integration</p>
                <p className="text-[11px] text-emerald-200/70">Connect with your ecosystem</p>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Molecule Graphic */}
          <div className="relative z-10 flex items-center justify-between text-[10px] text-emerald-200/50 pt-2 border-t border-white/10">
            <span>Dahej Central Node</span>
            <span className="flex items-center gap-1 text-[#C6A66A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66A] animate-pulse" />
              Live Gateway
            </span>
          </div>
        </div>

        {/* Right Column: Clean White Sign-In Card (7 cols) */}
        <div className="md:col-span-7 bg-white p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#17372F] tracking-tight">Sign In</h2>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Enter your credentials to access your account
            </p>

            {/* Login Form */}
            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#075C46]/20 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-semibold text-slate-700">Password</label>
                  <a
                    href="#forgot"
                    onClick={(e) => { e.preventDefault(); alert('Demo password reset instructions sent.'); }}
                    className="text-[11px] text-[#C6A66A] hover:underline font-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#075C46]/20 focus:bg-white"
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-[#075C46] hover:bg-[#063F32] text-white font-semibold rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 mt-2"
              >
                {isLoading ? (
                  <span>Authenticating Credentials...</span>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Divider: Demo Credentials (1-Click Login) */}
            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-2.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                1-Click Fast Login Personas
              </span>
            </div>

            {/* 3 Fast Login Demo Cards */}
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((acc) => {
                const isSelected = email === acc.email;
                return (
                  <button
                    key={acc.roleId}
                    type="button"
                    onClick={() => handleQuickLogin(acc.roleId)}
                    className={`p-2.5 rounded-xl border text-center transition-all group flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-[#075C46] bg-[#DDE9D9]/30 text-[#075C46] shadow-xs'
                        : 'border-slate-200 hover:border-[#075C46] bg-slate-50/70 hover:bg-slate-50 text-slate-700'
                    }`}
                    title={`Click to log in as ${acc.label} (${acc.name})`}
                  >
                    <span className="text-[11px] font-bold block leading-tight group-hover:text-[#075C46]">
                      {acc.label}
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5 truncate max-w-full">
                      {acc.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <p className="text-[10px] text-slate-400 text-center mt-3 pt-2 border-t border-slate-100">
            Don't have an account? <span className="font-semibold text-slate-600">Contact Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}
