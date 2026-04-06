import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button, Input, Card, SocialLoginButtons, AuthFormHeader } from '@/components/ui';

const Login = () => {
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
            title="Welcome Back"
            subtitle="Continue your journey to serenity."
          />

          <form className="space-y-6">
            <Input 
              label="Email Address"
              placeholder="name@example.com"
              type="email"
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-500">Password</label>
                <button type="button" className="text-xs font-bold text-brand-purple hover:underline">Forgot?</button>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••"
              />
            </div>

            <Link to="/">
              <Button fullWidth endIcon={<ChevronRight size={20} />}>
                Login to Sanctuary
              </Button>
            </Link>
          </form>

          <SocialLoginButtons />

          <p className="text-center text-sm font-medium text-slate-500">
            New here? <Link to="/register" className="text-brand-purple font-bold hover:underline">Begin your journey</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;