import React from 'react';
import { ShieldCheck, Award, Lock, ExternalLink, Heart } from 'lucide-react';

export default function LandingFooter({ onLaunchApp }) {
  return (
    <footer id="contact" className="bg-white border-t border-[#E3E8DF] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E3E8DF]">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-[#E3E8DF] flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
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
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg text-[#063F32]">ChemTrade</span>
                  <span className="text-[10px] font-bold text-[#C6A66A] bg-[#C6A66A]/15 border border-[#C6A66A]/40 px-1.5 py-0.2 rounded-full">
                    360
                  </span>
                </div>
                <p className="text-[11px] text-[#7A8980]">Smart ERP for Chemical Industry</p>
              </div>
            </div>

            <p className="text-xs text-[#4B5E55] max-w-sm leading-relaxed mb-6">
              The premier integrated trading, inventory management, and regulatory compliance platform engineered specifically for chemical trading desks, stockists, and liquid terminal operators.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold text-[#075C46] bg-[#F7F5EC] px-2.5 py-1 rounded-full border border-[#E3E8DF] flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#C6A66A]" /> ISO 27001 Data Security
              </span>
              <span className="text-[10px] font-bold text-[#075C46] bg-[#F7F5EC] px-2.5 py-1 rounded-full border border-[#E3E8DF] flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#075C46]" /> AES-256 Encrypted
              </span>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h4 className="text-xs font-bold text-[#063F32] uppercase tracking-wider mb-4">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4B5E55]">
              <li>
                <a href="#showcase" className="hover:text-[#075C46] transition-colors">
                  Inquiry & RFQ CRM
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#075C46] transition-colors">
                  FEFO Hazchem Inventory
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#075C46] transition-colors">
                  Automated COA Engine
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#075C46] transition-colors">
                  GPS Chemical Tanker Fleet
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#075C46] transition-colors">
                  Customer & Supplier Portals
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="text-xs font-bold text-[#063F32] uppercase tracking-wider mb-4">
              Regulatory Standards
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4B5E55]">
              <li>
                <span className="hover:text-[#075C46] cursor-pointer">
                  PESO Storage Licensing
                </span>
              </li>
              <li>
                <span className="hover:text-[#075C46] cursor-pointer">
                  GHS Safety Data Sheets (SDS)
                </span>
              </li>
              <li>
                <span className="hover:text-[#075C46] cursor-pointer">
                  Form 13 Manifest Automation
                </span>
              </li>
              <li>
                <span className="hover:text-[#075C46] cursor-pointer">
                  NIC GST e-Invoice & e-Way Bill
                </span>
              </li>
              <li>
                <span className="hover:text-[#075C46] cursor-pointer">
                  EU REACH Chemical Registry
                </span>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h4 className="text-xs font-bold text-[#063F32] uppercase tracking-wider mb-4">
              Operations Hubs
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4B5E55]">
              <li>
                <p className="font-bold text-[#063F32]">Corporate & Tech HQ:</p>
                <p className="text-[11px] text-[#7A8980]">Bandra Kurla Complex, Mumbai</p>
              </li>
              <li>
                <p className="font-bold text-[#063F32]">Terminal Logistics Desk:</p>
                <p className="text-[11px] text-[#7A8980]">Dahej PCPIR Complex, Gujarat</p>
              </li>
              <li className="pt-2">
                <button
                  type="button"
                  onClick={onLaunchApp}
                  className="px-3.5 py-1.5 rounded-full bg-[#063F32] text-white text-[11px] font-bold hover:bg-[#075C46] transition-all"
                >
                  Direct Desk Sign-In →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A8980]">
          <p>© 2026 ChemTrade 360 Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#063F32] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#063F32] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#063F32] cursor-pointer">Security Certifications</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

