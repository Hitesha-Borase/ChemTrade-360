import React from 'react';

export default function Badge({ children, status, variant, size = 'sm', className = '' }) {
  // Determine variant based on status text or explicit variant
  let styleVariant = variant;

  if (!styleVariant && status) {
    const s = String(status).toLowerCase();
    if (s.includes('approved') || s.includes('active') || s.includes('delivered') || s.includes('won') || s.includes('success') || s.includes('verified') || s.includes('paid')) {
      styleVariant = 'success';
    } else if (s.includes('pending') || s.includes('review') || s.includes('warning') || s.includes('due') || s.includes('transit') || s.includes('quote')) {
      styleVariant = 'warning';
    } else if (s.includes('quarantined') || s.includes('expired') || s.includes('danger') || s.includes('overdue') || s.includes('lost') || s.includes('rejected') || s.includes('cancelled')) {
      styleVariant = 'danger';
    } else if (s.includes('draft') || s.includes('new') || s.includes('info') || s.includes('planned')) {
      styleVariant = 'info';
    } else if (s.includes('gold') || s.includes('tier 1') || s.includes('premium')) {
      styleVariant = 'gold';
    } else {
      styleVariant = 'neutral';
    }
  }

  const variantStyles = {
    success: 'bg-[#0F795C]/10 text-[#0F795C] border-[#0F795C]/25',
    warning: 'bg-[#B7791F]/10 text-[#B7791F] border-[#B7791F]/30',
    danger: 'bg-[#C43232]/10 text-[#C43232] border-[#C43232]/25',
    info: 'bg-[#2E6FBB]/10 text-[#2E6FBB] border-[#2E6FBB]/25',
    gold: 'bg-[#C6A66A]/15 text-[#075C46] border-[#C6A66A]/40',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200'
  };

  const dotColors = {
    success: 'bg-[#0F795C]',
    warning: 'bg-[#B7791F]',
    danger: 'bg-[#C43232]',
    info: 'bg-[#2E6FBB]',
    gold: 'bg-[#C6A66A]',
    neutral: 'bg-slate-400'
  };

  const sizeStyles = {
    xs: 'text-[11px] px-2 py-0.5 font-medium',
    sm: 'text-xs px-2.5 py-1 font-medium',
    md: 'text-sm px-3 py-1.5 font-semibold'
  };

  const chosenStyle = variantStyles[styleVariant] || variantStyles.neutral;
  const dotColor = dotColors[styleVariant] || dotColors.neutral;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border ${chosenStyle} ${sizeStyles[size]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{children || status}</span>
    </span>
  );
}

