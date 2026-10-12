import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'indigo' | 'rose';
}

export const Badge: React.FC<BadgeProps> = ({
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide transition-colors';

  const variants = {
    default: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    secondary: 'bg-slate-800 text-slate-300 border border-slate-700',
    outline: 'text-slate-300 border border-slate-700',
    success: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    warning: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    indigo: 'bg-indigo-600 text-white',
    rose: 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};
