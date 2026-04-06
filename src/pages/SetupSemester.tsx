import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  MapPin, 
  Calendar, 
  BookOpen, 
  CheckCircle2,
  Clock,
  LayoutGrid,
  FileUp,
  MousePointer2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const SetupSemester = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    { id: 1, label: 'Identity', icon: User },
    { id: 2, label: 'Schedule', icon: Calendar },
    { id: 3, label: 'Courses', icon: BookOpen },
    { id: 4, label: 'Finish', icon: CheckCircle2 },
  ];

  const nextStep = () => setStep(s => Math.min(s + 1, 4));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[40px] border border-slate-100 card-shadow overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Sidebar Progress */}
        <aside className="w-full md:w-72 bg-slate-900 p-10 text-white flex flex-col justify-between">
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-purple/20">
                <Sparkles size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">Sanctuary</span>
            </div>

            <nav className="space-y-8">
              {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-4 group">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all",
                    step === s.id ? "bg-brand-purple border-brand-purple text-white scale-110" : 
                    step > s.id ? "bg-emerald-500 border-emerald-500 text-white" : "border-slate-700 text-slate-500"
                  )}>
                    {step > s.id ? <CheckCircle2 size={14} /> : s.id}
                  </div>
                  <span className={cn(
                    "font-bold transition-colors",
                    step === s.id ? "text-white" : "text-slate-500"
                  )}>{s.label}</span>
                </div>
              ))}
            </nav>
          </div>

          <div className="text-slate-500 text-xs font-medium">
            Step {step} of 4 • Your Academic Sanctuary
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-12 flex flex-col">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-8"
              >
                <header>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome to Your Sanctuary</h2>
                  <p className="text-slate-500 mt-2">Let's set up your academic environment for the new term.</p>
                </header>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Choose Semester</label>
                    <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all appearance-none">
                      <option>Spring 2026</option>
                      <option>Summer 2026</option>
                      <option>Fall 2026</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-500 ml-1">Study Place</label>
                    <div className="relative group">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-purple transition-colors" size={18} />
                      <input 
                        type="text" 
                        placeholder="Main Library, Room 402..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-800 focus:ring-2 focus:ring-brand-purple/20 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-8"
              >
                <header>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How do you prefer to plan?</h2>
                  <p className="text-slate-500 mt-2">Choose the method that best fits your workflow.</p>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'By Subject', icon: BookOpen, desc: 'Focus on one course at a time.' },
                    { title: 'Weekly Schedule', icon: Calendar, desc: 'Plan your entire week at once.' },
                    { title: 'Free Form', icon: MousePointer2, desc: 'Flexible planning as you go.' },
                    { title: 'Import from File', icon: FileUp, desc: 'Upload your existing syllabus.' },
                  ].map((method, idx) => (
                    <button key={idx} className="p-6 bg-white border border-slate-100 rounded-3xl text-left hover:border-brand-purple hover:bg-brand-purple/5 transition-all group card-shadow">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-brand-purple group-hover:bg-white transition-all mb-4">
                        <method.icon size={24} />
                      </div>
                      <h3 className="font-bold text-slate-800 mb-1">{method.title}</h3>
                      <p className="text-xs text-slate-500">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-8"
              >
                <header>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Design Your Week</h2>
                  <p className="text-slate-500 mt-2">Allocate time for your study sessions.</p>
                </header>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 overflow-x-auto">
                  <div className="min-w-[400px] grid grid-cols-6 gap-2">
                    <div className="col-span-1"></div>
                    {['M', 'T', 'W', 'T', 'F'].map(day => (
                      <div key={day} className="text-center font-bold text-slate-400 text-xs py-2">{day}</div>
                    ))}
                    {['09:00', '11:00', '13:00', '15:00'].map(time => (
                      <React.Fragment key={time}>
                        <div className="text-right pr-2 text-[10px] font-bold text-slate-400 py-3">{time}</div>
                        {[1, 2, 3, 4, 5].map(day => (
                          <div key={`${day}-${time}`} className="bg-white rounded-lg border border-slate-100 h-10 hover:bg-brand-purple/5 cursor-pointer transition-colors"></div>
                        ))}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 space-y-8 text-center"
              >
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8">
                  <CheckCircle2 size={48} />
                </div>
                <header>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Your New Ritual</h2>
                  <p className="text-slate-500 mt-2">Everything is set up. Welcome to your sanctuary.</p>
                </header>

                <div className="max-w-xs mx-auto p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Semester</span>
                    <span className="font-bold text-slate-800">Spring 2026</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Study Place</span>
                    <span className="font-bold text-slate-800">Room 402</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 text-sm">Workload</span>
                    <span className="font-bold text-brand-purple">Balanced</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
            <button 
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-colors",
                step === 1 && "invisible"
              )}
            >
              <ChevronLeft size={20} /> Back
            </button>
            <button 
              onClick={step === 4 ? () => navigate('/') : nextStep}
              className="bg-brand-purple text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-brand-purple/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              {step === 4 ? 'Enter Sanctuary' : 'Continue'} <ChevronRight size={20} />
            </button>
          </footer>
        </main>
      </div>
    </div>
  );
};

const User = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default SetupSemester;
