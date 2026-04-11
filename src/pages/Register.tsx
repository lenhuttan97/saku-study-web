import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { Button, Input, Card, SocialLoginButtons, AuthFormHeader } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import { auth } from '@/services/firebase/config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirebaseErrorMessage } from '@/utils/firebaseError';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginWithGoogle, loginWithGithub, loginWithFacebook } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('Please accept the Terms of Service and Privacy Policy');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Send verification email after successful registration
      await sendEmailVerification(userCredential.user);
      
      // Redirect to email verification page
      navigate('/verify-email');
    } catch (err) {
      setError(getFirebaseErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github' | 'facebook') => {
    setLoading(true);
    setError('');

    try {
      if (provider === 'google') {
        await loginWithGoogle();
      } else if (provider === 'github') {
        await loginWithGithub();
      } else {
        await loginWithFacebook();
      }
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
            title="Begin Your Journey"
            subtitle="Create your academic sanctuary today."
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Full Name"
              placeholder="Sakura Tanaka"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input 
              label="Email Address"
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input 
              label="Password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center gap-3 px-1">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded-lg border-2 border-slate-200 text-brand-purple focus:ring-brand-purple/20 transition-all" 
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <span className="text-xs font-medium text-slate-500">I agree to the <button className="text-brand-purple font-bold hover:underline">Terms of Service</button> and <button className="text-brand-purple font-bold hover:underline">Privacy Policy</button></span>
            </div>

            {error && <p className="text-sm font-medium text-red-500 px-1">{error}</p>}

            <Button
              type="submit"
              fullWidth
              endIcon={<ChevronRight size={20} />}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <SocialLoginButtons
            onGoogleClick={() => handleSocialLogin('google')}
            onGithubClick={() => handleSocialLogin('github')}
            onFacebookClick={() => handleSocialLogin('facebook')}
          />

          <p className="text-center text-sm font-medium text-slate-500">
            Already have an account? <Link to="/login" className="text-brand-purple font-bold hover:underline">Welcome back</Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;