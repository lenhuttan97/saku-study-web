import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, ChevronRight, Github, Chrome as Google, Facebook } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] p-10 border border-slate-100 card-shadow space-y-10"
      >
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-brand-purple rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-purple/20 mx-auto mb-6">
            <Sparkles size={32} />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">Continue your journey to serenity.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={18} />
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-bold text-slate-500">Password</label>
              <button type="button" className="text-xs font-bold text-brand-purple hover:underline">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
              />
            </div>
          </div>

          <Link to="/" className="block w-full bg-brand-purple text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            Login to Sanctuary <ChevronRight size={20} />
          </Link>
        </form>

        <div className="space-y-6">
          <div className="relative flex items-center justify-center">
            <div className="w-full h-px bg-slate-100"></div>
            <span className="absolute bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Or continue with</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[Google, Github, Facebook].map((Icon, idx) => (
              <button key={idx} className="flex items-center justify-center p-4 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm">
                <Icon size={20} className="text-slate-600" />
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-sm font-medium text-slate-500">
          New here? <Link to="/register" className="text-brand-purple font-bold hover:underline">Begin your journey</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
