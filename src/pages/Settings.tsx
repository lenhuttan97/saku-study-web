import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Palette, 
  Globe, 
  Shield, 
  ChevronRight,
  Camera,
  Moon,
  Sun,
  Lock,
  Bell,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Your Profile', icon: User },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'localization', label: 'Localization', icon: Globe },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Sanctuary</h1>
        <p className="text-slate-500 mt-1">Personalize your space and manage your account.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={cn(
                "w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all group",
                activeSection === section.id 
                  ? "bg-brand-purple text-white shadow-lg shadow-brand-purple/20" 
                  : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <div className="flex items-center gap-3">
                <section.icon size={20} />
                <span className="font-bold">{section.label}</span>
              </div>
              <ChevronRight size={18} className={cn("transition-transform", activeSection === section.id ? "translate-x-1" : "group-hover:translate-x-1")} />
            </button>
          ))}
          
          <div className="pt-6">
            <button className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-500 font-bold hover:bg-red-50 transition-all">
              <LogOut size={20} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="md:col-span-8 bg-white rounded-3xl border border-slate-100 card-shadow p-8">
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                    S
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-slate-100 text-brand-purple hover:scale-110 transition-transform">
                    <Camera size={20} />
                  </button>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-2xl font-bold text-slate-800">Sakura</h3>
                  <p className="text-slate-500">Premium Member since April 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Username</label>
                  <input 
                    type="text" 
                    defaultValue="sakura_design"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="sakura@example.com"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button className="bg-brand-purple text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all active:scale-95">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeSection === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Theme Toggle</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-3 p-6 rounded-2xl border-2 border-brand-purple bg-brand-purple/5 text-brand-purple font-bold">
                    <Sun size={24} />
                    <span>Light Mode</span>
                  </button>
                  <button className="flex items-center justify-center gap-3 p-6 rounded-2xl border-2 border-slate-100 bg-slate-50 text-slate-400 font-bold hover:border-slate-200 transition-all">
                    <Moon size={24} />
                    <span>Dark Mode</span>
                  </button>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Background Atmosphere</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['Serenity', 'Focus', 'Midnight'].map((bg) => (
                    <button key={bg} className="p-4 rounded-2xl border border-slate-100 text-center hover:border-brand-purple transition-all group">
                      <div className={cn(
                        "h-20 rounded-xl mb-3 transition-transform group-hover:scale-105",
                        bg === 'Serenity' ? 'bg-bg-main' : bg === 'Focus' ? 'bg-slate-100' : 'bg-slate-900'
                      )}></div>
                      <span className="text-sm font-bold text-slate-600">{bg}</span>
                    </button>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-purple shadow-sm">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Change Password</h4>
                    <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="text-brand-purple font-bold hover:underline">Update</button>
              </div>

              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
                    <p className="text-xs text-slate-500">Currently enabled for your account</p>
                  </div>
                </div>
                <button className="text-red-500 font-bold hover:underline">Disable</button>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;
