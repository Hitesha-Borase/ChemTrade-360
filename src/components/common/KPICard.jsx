import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function KPICard({
  title,
  value,
  subvalue,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  badgeText,
  accent = false,
  onClick
}) {
  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-xl transition-all duration-200 border ${
        accent
          ? 'glass-card-accent shadow-sm hover:shadow-md'
          : 'bg-white border-[#E3E8DF] hover:border-[#C6A66A]/50 hover:shadow-subtle'
      } ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#7A8980]">
          {title}
        </p>
        {Icon && (
          <div className="p-2 rounded-lg bg-[#F7F5EC] border border-[#E3E8DF] text-[#17372F]">
            <Icon className="w-5 h-5 text-[#C6A66A]" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-[#17372F] tracking-tight">
          {value}
        </h3>
        {subvalue && (
          <span className="text-xs text-[#7A8980] font-medium">
            {subvalue}
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {change !== undefined && (
          <div className="flex items-center gap-1 font-medium">
            {changeType === 'positive' && (
              <span className="inline-flex items-center text-[#0F795C] bg-[#0F795C]/10 px-1.5 py-0.5 rounded">
                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                {change}
              </span>
            )}
            {changeType === 'negative' && (
              <span className="inline-flex items-center text-[#C43232] bg-[#C43232]/10 px-1.5 py-0.5 rounded">
                <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
                {change}
              </span>
            )}
            {changeType === 'neutral' && (
              <span className="inline-flex items-center text-[#7A8980] bg-slate-100 px-1.5 py-0.5 rounded">
                <Minus className="w-3.5 h-3.5 mr-0.5" />
                {change}
              </span>
            )}
            <span className="text-[#7A8980] text-[11px] ml-1">vs last period</span>
          </div>
        )}

        {badgeText && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F7F5EC] border border-[#E3E8DF] text-[#17372F]">
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}

