import React from 'react';
import { Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';

interface FocusWidgetProps {
  className?: string;
}

export const FocusWidget = ({ className }: FocusWidgetProps) => {
  return (
    <div className={cn("bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white card-shadow relative overflow-hidden group", className)}>
      <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
        <Timer size={160} />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
          <Timer size={24} className="text-brand-purple" />
        </div>
        <h2 className="text-xl font-bold mb-2">Focus Mode</h2>
        <p className="text-slate-400 text-sm mb-6">Block distractions and get things done.</p>
        <Button fullWidth className="bg-white text-slate-900 hover:bg-slate-100">
          Start Session
        </Button>
      </div>
    </div>
  );
};