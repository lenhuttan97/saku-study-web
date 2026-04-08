import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, ChevronRight } from 'lucide-react';
import { Button, Input, Card, AuthFormHeader } from '@/components/ui';
import { auth } from '@/firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getFirebaseErrorMessage } from '@/utils/firebaseError';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
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
            icon={<Mail size={32} />}
            title="Reset Password"
            subtitle="Enter your email to receive a reset link."
          />

          {success ? (
            <div className="space-y-6 text-center">
              <p className="text-sm font-medium text-green-600">
                Password reset email sent. Check your inbox.
              </p>
              <Button
                fullWidth
                endIcon={<ChevronRight size={20} />}
                onClick={() => navigate('/login')}
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {error && <p className="text-sm font-medium text-red-500 px-1">{error}</p>}

              <Button
                type="submit"
                fullWidth
                endIcon={<ChevronRight size={20} />}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}

          <p className="text-center text-sm font-medium text-slate-500">
            Remember your password?{' '}
            <Link to="/login" className="text-brand-purple font-bold hover:underline">
              Login here
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
