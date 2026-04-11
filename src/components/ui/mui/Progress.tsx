import React from 'react';
import { LinearProgress as MuiLinearProgress, LinearProgressProps } from '@mui/material';
import { cn } from '@/lib/utils';

interface ProgressBarProps extends Omit<LinearProgressProps, 'variant'> {
  value: number;
  showLabel?: boolean;
  size?: 'small' | 'medium';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  className?: string;
}

const colorMap = {
  primary: { bgcolor: 'primary.main', track: 'slate.200' },
  secondary: { bgcolor: 'secondary.main', track: 'slate.200' },
  success: { bgcolor: 'success.main', track: 'slate.200' },
  warning: { bgcolor: 'warning.main', track: 'slate.200' },
  error: { bgcolor: 'error.main', track: 'slate.200' },
};

export function ProgressBar({ 
  value, 
  showLabel = false, 
  size = 'medium',
  color = 'primary',
  className,
  ...props 
}: ProgressBarProps) {
  const colors = colorMap[color];

  return (
    <div className={cn('w-full', className)}>
      <MuiLinearProgress
        value={value}
        variant="determinate"
        sx={{
          height: size === 'small' ? 6 : 10,
          borderRadius: '9999px',
          bgcolor: 'slate.200',
          '& .MuiLinearProgress-bar': {
            borderRadius: '9999px',
            bgcolor: colors.bgcolor,
          },
          ...props.sx,
        }}
        {...props}
      />
      {showLabel && (
        <div className="flex justify-between text-xs font-bold text-slate-500 mt-1">
          <span>Progress</span>
          <span>{value}%</span>
        </div>
      )}
    </div>
  );
}

export default ProgressBar;