import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  CheckSquare, 
  Settings, 
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calendar, label: 'Calendar', path: '/calendar' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
          <Sparkles size={24} />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-800">Sanctuary</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-brand-purple/10 text-brand-purple font-semibold" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )
            }
          >
            <item.icon size={20} className={cn("transition-transform group-hover:scale-110")} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              isActive 
                ? "bg-brand-purple/10 text-brand-purple font-semibold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            )
          }
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 mt-1">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
