import React from 'react';
import { Chrome as Google, Github, Facebook } from 'lucide-react';
import { Button } from '@/components/ui';

interface SocialLoginButtonsProps {
  onGoogleClick?: () => void;
  onGithubClick?: () => void;
  onFacebookClick?: () => void;
  className?: string;
}

export function SocialLoginButtons({ onGoogleClick, onGithubClick, onFacebookClick, className }: SocialLoginButtonsProps) {
  const buttons = [
    { icon: Google, onClick: onGoogleClick, label: 'Google' },
    { icon: Github, onClick: onGithubClick, label: 'GitHub' },
    { icon: Facebook, onClick: onFacebookClick, label: 'Facebook' },
  ];

  return (
    <div className={className}>
      <div className="relative flex items-center justify-center mb-6">
        <div className="w-full h-px bg-slate-100"></div>
        <span className="absolute bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {buttons.map(({ icon: Icon, onClick, label }) => (
          <Button key={label} variant="outline" onClick={onClick} className="p-4 h-auto" aria-label={`Login with ${label}`}>
            <Icon size={20} className="text-slate-600" />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default SocialLoginButtons;
