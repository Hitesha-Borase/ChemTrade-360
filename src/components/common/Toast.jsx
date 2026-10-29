import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-[#16805D]" />,
    danger: <AlertCircle className="w-5 h-5 text-[#C43232]" />,
    warning: <AlertTriangle className="w-5 h-5 text-[#B7791F]" />,
    info: <Info className="w-5 h-5 text-[#2E6FBB]" />
  };

  const borders = {
    success: 'border-l-4 border-l-[#16805D]',
    danger: 'border-l-4 border-l-[#C43232]',
    warning: 'border-l-4 border-l-[#B7791F]',
    info: 'border-l-4 border-l-[#2E6FBB]'
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-[#E4E7EC] ${borders[toast.type] || borders.info} transition-all duration-300 animate-slide-in`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {icons[toast.type] || icons.info}
          </div>
          <div className="flex-1 text-xs font-medium text-[#101828] leading-relaxed">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-600 p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

