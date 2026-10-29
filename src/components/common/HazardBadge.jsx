import React, { useState } from 'react';
import { AlertTriangle, Flame, Skull, ShieldAlert, Check, Copy } from 'lucide-react';

export default function HazardBadge({
  cas,
  hsn,
  hazardClass,
  purity,
  grade,
  compact = false
}) {
  const [copiedCas, setCopiedCas] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedCas(true);
    setTimeout(() => setCopiedCas(false), 2000);
  };

  const getHazardIcon = (hazard) => {
    if (!hazard) return null;
    const h = hazard.toLowerCase();
    if (h.includes('flammable')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200" title={hazard}>
          <Flame className="w-3.5 h-3.5 text-amber-600" />
          <span>Flammable</span>
        </span>
      );
    }
    if (h.includes('corrosive') || h.includes('acid')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200" title={hazard}>
          <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
          <span>Corrosive (Class 8)</span>
        </span>
      );
    }
    if (h.includes('toxic')) {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200" title={hazard}>
          <Skull className="w-3.5 h-3.5 text-purple-600" />
          <span>Toxic (6.1)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200" title={hazard}>
        <span>Non-Regulated</span>
      </span>
    );
  };

  if (compact) {
    return (
      <div className="flex items-center gap-1.5 flex-wrap">
        {cas && (
          <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
            CAS: {cas}
          </span>
        )}
        {hsn && (
          <span className="font-mono text-[11px] bg-amber-50/80 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200/80">
            HSN: {hsn}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {cas && (
        <div className="inline-flex items-center gap-1 bg-[#075C46]/5 hover:bg-[#075C46]/10 text-[#17372F] text-xs font-mono px-2 py-1 rounded border border-[#E3E8DF] transition-colors">
          <span className="text-[#7A8980] text-[10px] uppercase font-sans font-bold">CAS</span>
          <span className="font-semibold">{cas}</span>
          <button
            type="button"
            onClick={() => copyToClipboard(cas)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
            title="Copy CAS"
          >
            {copiedCas ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      )}

      {hsn && (
        <div className="inline-flex items-center gap-1 bg-amber-50/80 text-amber-900 text-xs font-mono px-2 py-1 rounded border border-amber-200">
          <span className="text-amber-700 text-[10px] uppercase font-sans font-bold">HSN</span>
          <span>{hsn}</span>
        </div>
      )}

      {purity && (
        <span className="inline-flex items-center text-xs font-medium text-[#0F795C] bg-[#0F795C]/10 px-2 py-1 rounded border border-[#0F795C]/20">
          {purity}
        </span>
      )}

      {hazardClass && getHazardIcon(hazardClass)}
    </div>
  );
}

