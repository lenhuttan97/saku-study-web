import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button, Input, Card, SocialLoginButtons, AuthFormHeader } from '@/components/ui';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getFirebaseErrorMessage } from '@/utils/firebaseError';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard on successful login
      navigate('/');
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-500">Password</label>
                <button type="button" className="text-xs font-bold text-brand-purple hover:underline">Forgot?</button>
              </div>
              <Input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-sm font-medium text-red-500 px-1">{error}</p>}

            <Button
              type="submit"
              fullWidth
              endIcon={<ChevronRight size={20} />}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login to Sanctuary'}
            </Button>
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