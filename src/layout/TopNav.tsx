import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bell, 
  Search, 
  User,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

const TopNav = () => {
  return (
    <header className="h-20 px-8 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-brand-pink rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-100"></div>
        
        <button className="flex items-center gap-3 pl-2 pr-4 py-1.5 rounded-2xl hover:bg-slate-50 transition-all group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-sm font-bold shadow-md">
            S
          </div>
          <div className="text-left hidden lg:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">Sakura</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Premium</p>
          </div>
          <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
        </button>
      </div>
    </header>
  );
};

export default TopNav;
