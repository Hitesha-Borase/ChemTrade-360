import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Play,
  Shield,
  Layers,
  Sparkles,
  ChevronRight,
  LogIn
} from 'lucide-react';

export default function LandingNavbar({ onLaunchApp, onOpenDemo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'Live ERP Tour', href: '#showcase' },
    { name: 'ROI Calculator', href: '#calculator' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F7F5EC]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(6,63,50,0.06)] border-b border-[#E3E8DF]'
          : 'bg-[#F7F5EC]/70 backdrop-blur-md border-b border-[#E3E8DF]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo matching uploaded image */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-[#E3E8DF] flex items-center justify-center transition-transform group-hover:scale-105">
              <svg className="w-7 h-7" viewBox="0 0 32 32" fill="none">
                <path
                  d="M13 4h6v6l6 11a3 3 0 0 1-2.6 4.5H9.6A3 3 0 0 1 7 21l6-11V4z"
                  stroke="#063F32"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.5 20h13l-2.2-4.5H11.7L9.5 20z"
                  fill="#075C46"
                  opacity="0.9"
                />
                <path
                  d="M10 21.5h12l-1.5 2.5H11.5L10 21.5z"
                  fill="#0F795C"
                />
                <line
                  x1="12"
                  y1="4"
                  x2="20"
                  y2="4"
                  stroke="#C6A66A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="14" cy="18" r="1" fill="#DDE9D9" />
                <circle cx="18" cy="16.5" r="1.3" fill="#DDE9D9" />
                <circle cx="15.5" cy="14" r="0.8" fill="#DDE9D9" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-[#063F32]">
                  ChemTrade
                </span>
                <span className="text-[10px] font-bold text-[#C6A66A] bg-[#C6A66A]/15 border border-[#C6A66A]/40 px-1.5 py-0.5 rounded-full">
                  360
                </span>
              </div>
              <p className="text-[11px] text-[#7A8980] font-medium tracking-tight">
                Smart ERP for Chemical Industry
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/80 shadow-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-semibold text-[#17372F] hover:text-[#075C46] hover:bg-[#DDE9D9]/30 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenDemo}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#075C46] hover:text-[#063F32] bg-white/80 hover:bg-white rounded-full border border-[#E3E8DF] shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-[#075C46]" />
              <span>Watch Demo</span>
            </button>

            <button
              type="button"
              onClick={onLaunchApp}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-[#063F32] to-[#075C46] hover:from-[#042a22] hover:to-[#063F32] rounded-full shadow-[0_4px_14px_rgba(6,63,50,0.25)] hover:shadow-[0_6px_20px_rgba(6,63,50,0.35)] transition-all hover:scale-105 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onLaunchApp}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-[#063F32] rounded-full"
            >
              Start
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#063F32] hover:bg-white/80 border border-[#E3E8DF] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#E3E8DF] px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2.5 text-sm font-semibold text-[#17372F] hover:bg-[#F7F5EC] rounded-xl flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-[#7A8980]" />
              </a>
            ))}
            <div className="pt-4 border-t border-[#E3E8DF] flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemo();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-[#075C46] bg-[#F7F5EC] border border-[#E3E8DF] rounded-xl"
              >
                <Play className="w-4 h-4 fill-[#075C46]" />
                <span>Watch Interactive Demo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLaunchApp();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-gradient-to-r from-[#063F32] to-[#075C46] rounded-xl shadow-md"
              >
                <span>Launch ChemTrade 360</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

