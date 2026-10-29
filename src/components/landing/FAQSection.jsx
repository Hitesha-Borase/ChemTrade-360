import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'Does ChemTrade 360 integrate with Indian GST e-Invoicing & e-Way Bill?',
      a: 'Yes! ChemTrade 360 natively connects with the NIC GST e-Invoice portal and e-Way Bill APIs. As soon as a chemical tanker is dispatched with weighbridge slips, the e-Way Bill JSON and QR code are automatically generated and attached to the shipment.'
    },
    {
      q: 'How are hazardous chemicals, CAS numbers, and GHS pictograms managed?',
      a: 'Our platform includes a pre-populated industrial chemical dictionary of over 1,200 commercial solvents, acids, monomers, and polymers with verified CAS numbers, UN hazard classes, and GHS safety pictograms for instant SDS generation.'
    },
    {
      q: 'Can our customers and suppliers access dedicated self-service portals?',
      a: 'Yes. ChemTrade 360 includes separate role-gated customer and supplier portals. Buyers can submit RFQs, track tanker dispatches in real-time, and download verified batch COAs without calling your sales desk.'
    },
    {
      q: 'How long does migration from Excel sheets or Tally take?',
      a: 'Most chemical trading enterprises are up and running in under 48 hours. Our automated CSV importer pulls your historical buyer lists, active chemical batches, supplier master data, and opening balances effortlessly.'
    },
    {
      q: 'Is our trading margin and supplier pricing data confidential?',
      a: 'Absolutely. ChemTrade 360 enforces AES-256 bit database encryption, strict multi-tenant schema isolation, and granular role-based permissions ensuring executives only see what their clearance permits.'
    }
  ];

  return (
    <section id="faq" className="py-20 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3E8DF] text-xs font-bold text-[#075C46] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#C6A66A]" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#063F32] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#4B5E55]">
            Everything you need to know about implementing ChemTrade 360 in your operations.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-[#E3E8DF] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#063F32] hover:bg-[#F7F5EC]/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#7A8980] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#075C46]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#4B5E55] leading-relaxed border-t border-[#F7F5EC] animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

