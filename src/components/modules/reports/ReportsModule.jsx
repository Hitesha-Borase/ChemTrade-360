import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import KPICard from '../../common/KPICard';
import Badge from '../../common/Badge';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  PieChart,
  Calendar,
  Download,
  FileSpreadsheet
} from 'lucide-react';

export default function ReportsModule() {
  const { showToast } = useApp();
  const [reportPeriod, setReportPeriod] = useState('q3');

  const productProfitability = [
    { chemical: 'Caustic Soda Lye (48%)', revenue: '₹ 1.84 Cr', cogs: '₹ 1.62 Cr', grossMargin: '₹ 22.0 L', marginPct: '11.9%', volume: '530 MT' },
    { chemical: 'Titanium Dioxide Rutile', revenue: '₹ 96.8 L', cogs: '₹ 84.0 L', grossMargin: '₹ 12.8 L', marginPct: '13.2%', volume: '40 MT' },
    { chemical: 'Isopropyl Alcohol (IPA)', revenue: '₹ 78.4 L', cogs: '₹ 71.0 L', grossMargin: '₹ 7.4 L', marginPct: '9.4%', volume: '80 MT' },
    { chemical: 'Methanol Pure (99.85%)', revenue: '₹ 68.4 L', cogs: '₹ 61.2 L', grossMargin: '₹ 7.2 L', marginPct: '10.5%', volume: '240 MT' }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E4E7EC]">
        <div>
          <h1 className="text-xl font-bold text-[#101828]">Executive Trading Analytics & Profitability</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Operational Gross Margin definitions, product-line profitability, trade volume turnover, and inventory valuation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={reportPeriod}
            onChange={(e) => setReportPeriod(e.target.value)}
            className="text-xs bg-white border border-[#E4E7EC] rounded-lg px-3 py-1.5 font-medium text-[#101828]"
          >
            <option value="q3">Q3 FY 2026-27 (Current)</option>
            <option value="oct">October 2026</option>
            <option value="ytd">Year to Date (FY 2026-27)</option>
          </select>
          <button
            onClick={() => showToast('Exported Executive MIS Financial Report (Excel / PDF)', 'success')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#101828] text-white hover:bg-[#101828]/90 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-[#C6A66B]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Consolidated Net Revenue"
          value="₹ 4.28 Cr"
          subvalue="Trade Invoiced"
          change="+14.2%"
          changeType="positive"
          icon={TrendingUp}
          accent={true}
        />
        <KPICard
          title="Trading Gross Margin"
          value="₹ 49.4 L"
          subvalue="11.54% Realized Margin"
          change="+1.8%"
          changeType="positive"
          icon={DollarSign}
          badgeText="Above Benchmark"
        />
        <KPICard
          title="Operating Profit (EBITDA)"
          value="₹ 31.8 L"
          subvalue="7.42% Net EBITDA"
          change="+0.9%"
          changeType="positive"
          icon={BarChart3}
          badgeText="Post Storage/Logistics"
        />
        <KPICard
          title="Inventory Capital Turnover"
          value="4.2x"
          subvalue="Avg Holding: 21 Days"
          icon={PieChart}
          badgeText="High Liquidity"
        />
      </div>

      {/* Chemical Product-Wise Profitability Breakdown */}
      <div className="bg-white rounded-xl border border-[#E4E7EC] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E4E7EC]">
          <div>
            <h2 className="text-sm font-bold text-[#101828]">Chemical Commodity Line-Wise Profitability</h2>
            <p className="text-xs text-[#667085]">
              Strict Accounting Rule 379: Gross Margin = Revenue minus Direct Sourcing Landed Cost (Ex-works + Freight + Terminal Handling).
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Realized Margin Matrix
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#E4E7EC] text-slate-600 font-semibold uppercase">
                <th className="py-2.5 px-3">Chemical Commodity</th>
                <th className="py-2.5 px-3">Sales Volume</th>
                <th className="py-2.5 px-3">Billed Revenue</th>
                <th className="py-2.5 px-3">Landed COGS</th>
                <th className="py-2.5 px-3">Gross Margin (₹)</th>
                <th className="py-2.5 px-3 text-right">Margin %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7EC]">
              {productProfitability.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#FAF9F6]">
                  <td className="py-3 px-3 font-bold text-[#101828]">{p.chemical}</td>
                  <td className="py-3 px-3 font-mono font-medium">{p.volume}</td>
                  <td className="py-3 px-3 font-mono font-semibold">{p.revenue}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{p.cogs}</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#16805D]">{p.grossMargin}</td>
                  <td className="py-3 px-3 font-mono font-bold text-right text-emerald-800">
                    <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {p.marginPct}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

