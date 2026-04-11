import React from 'react';

interface AuthFormHeaderProps {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
}

export function AuthFormHeader({ icon, title, subtitle }: AuthFormHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-purple/20 mx-auto mb-6">
        {icon}
      </div>
      <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
      <p className="text-slate-500 font-medium">{subtitle}</p>
    </div>
  );
}

export default AuthFormHeader;
