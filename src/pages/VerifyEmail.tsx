import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, ChevronRight } from 'lucide-react';
import { Button, Input, Card, AuthFormHeader } from '@/components/ui';
import { auth } from '@/services/firebase/config';
import { sendEmailVerification } from 'firebase/auth';
import { getFirebaseErrorMessage } from '@/utils/firebaseError';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        setSuccess(true);
      } else {
        setError('No user is currently logged in');
      }
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
            title="Verify Your Email"
            subtitle="Please check your inbox for the verification email."
          />

          <div className="space-y-6 text-center">
            <p className="text-sm font-medium text-slate-500">
              We've sent a verification email to your inbox. Please click the link in the email to verify your account.
            </p>

            {success && (
              <p className="text-sm font-medium text-green-600">
                Verification email resent successfully!
              </p>
            )}

            {error && <p className="text-sm font-medium text-red-500">{error}</p>}

            <Button
              fullWidth
              endIcon={<ChevronRight size={20} />}
              disabled={loading}
              onClick={handleResend}
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </Button>

            <Button
              fullWidth
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;