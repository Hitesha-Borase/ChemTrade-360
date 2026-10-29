import React from 'react';
import { useApp } from '../../context/AppContext';
import { ROLE_DEFINITIONS } from '../../data/mockData';
import { Shield, Eye, Lock, ArrowRight, UserCheck } from 'lucide-react';

export default function RoleBanner() {
  const { currentRole, switchRole, roleMeta } = useApp();

  const isExternal = roleMeta.type === 'external';

  return (
    <div className={`px-4 sm:px-6 py-2.5 border-b text-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${
      isExternal
        ? 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-950'
        : 'bg-[#FAF7F0] border-[#E4E7EC] text-[#101828]'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`p-1 rounded-md ${isExternal ? 'bg-amber-200 text-amber-900' : 'bg-[#101828] text-[#C6A66B]'}`}>
          {isExternal ? <Lock className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
        </div>
        <div>
          <span className="font-bold">
            {roleMeta.name} Perspective Active:
          </span>{' '}
          <span className="text-[#667085] hidden sm:inline">
            {roleMeta.description}
          </span>
          {isExternal && (
            <span className="ml-2 font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full text-[10px]">
              Internal Margins & Costs Masked
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-auto">
        <span className="text-[11px] text-[#667085] font-medium hidden lg:inline">Quick Test:</span>
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => switchRole('business_owner')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              currentRole === 'business_owner' ? 'bg-[#101828] text-white' : 'bg-white border border-[#E4E7EC] text-slate-700 hover:bg-slate-50'
            }`}
          >
            Owner
          </button>
          <button
            onClick={() => switchRole('sales_manager')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              currentRole === 'sales_manager' ? 'bg-[#101828] text-white' : 'bg-white border border-[#E4E7EC] text-slate-700 hover:bg-slate-50'
            }`}
          >
            Sales Mgr
          </button>
          <button
            onClick={() => switchRole('warehouse_manager')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              currentRole === 'warehouse_manager' ? 'bg-[#101828] text-white' : 'bg-white border border-[#E4E7EC] text-slate-700 hover:bg-slate-50'
            }`}
          >
            Warehouse
          </button>
          <button
            onClick={() => switchRole('customer_portal')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              currentRole === 'customer_portal' ? 'bg-amber-600 text-white' : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Customer Portal
          </button>
          <button
            onClick={() => switchRole('supplier_portal')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
              currentRole === 'supplier_portal' ? 'bg-amber-600 text-white' : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
            }`}
          >
            Supplier Portal
          </button>
        </div>
      </div>
    </div>
  );
}

