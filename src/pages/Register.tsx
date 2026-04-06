import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button, Input, Card, SocialLoginButtons, AuthFormHeader } from '@/components/ui';

const Register = () => {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card elevation="medium" className="p-10 space-y-10">
          <AuthFormHeader
            icon={<Sparkles size={32} />}
            title="Begin Your Journey"
            subtitle="Create your academic sanctuary today."
          />

          <form className="space-y-6">
            <Input 
              label="Full Name"
              placeholder="Sakura Tanaka"
            />

            <Input 
              label="Email Address"
              placeholder="name@example.com"
              type="email"
            />

            <Input 
              label="Password"
              type="password" 
              placeholder="••••••••"
            />

            <div className="flex items-center gap-3 px-1">
              <input type="checkbox" className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-purple focus:ring-brand-purple/20 transition-all" />
              <span className="text-xs font-medium text-slate-500">I agree to the <button className="text-brand-purple font-bold hover:underline">Terms of Service</button> and <button className="text-brand-purple font-bold hover:underline">Privacy Policy</button></span>
            </div>

            <Link to="/">
              <Button fullWidth endIcon={<ChevronRight size={20} />}>
                Create Account
              </Button>
            </Link>
          </form>

          <SocialLoginButtons />

          <p className="text-center text-sm font-medium text-slate-500">
            Already have an account? <Link to="/login" className="text-brand-purple font-bold hover:underline">Welcome back</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;