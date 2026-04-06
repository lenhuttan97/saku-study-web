import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, User, ChevronRight, Github, Chrome as Google, Facebook } from 'lucide-react';

const Register = () => {
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
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Begin Your Journey</h1>
          <p className="text-slate-500 font-medium">Create your academic sanctuary today.</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Sakura Tanaka"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
              />
            </div>
          </div>

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
            <label className="text-sm font-bold text-slate-500 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 px-1">
            <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-purple focus:ring-brand-purple/20 transition-all" />
            <span className="text-xs font-medium text-slate-500">I agree to the <button className="text-brand-purple font-bold hover:underline">Terms of Service</button> and <button className="text-brand-purple font-bold hover:underline">Privacy Policy</button></span>
          </div>

          <Link to="/" className="block w-full bg-brand-purple text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-brand-purple/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            Create Account <ChevronRight size={20} />
          </Link>
        </form>

        <p className="text-center text-sm font-medium text-slate-500">
          Already have an account? <Link to="/login" className="text-brand-purple font-bold hover:underline">Welcome back</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
