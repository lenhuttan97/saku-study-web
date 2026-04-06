import React from 'react';
import { Chip as MuiChip, ChipProps } from '@mui/material';
import { cn } from '@/lib/utils';

type ChipVariant = 'filled' | 'outlined';
type ChipColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

interface BadgeProps extends Omit<ChipProps, 'color'> {
  label: string;
  color?: ChipColor;
  variant?: ChipVariant;
  size?: 'small' | 'medium';
}

const colorStyles = {
  primary: { bgcolor: 'primary.main', color: 'white' },
  secondary: { bgcolor: 'secondary.main', color: 'white' },
  success: { bgcolor: '#10B981', color: 'white' }, // emerald-500
  warning: { bgcolor: '#F59E0B', color: 'white' }, // amber-500
  error: { bgcolor: '#EF4444', color: 'white' }, // red-500
  info: { bgcolor: '#3B82F6', color: 'white' }, // blue-500
};

const sizeStyles = {
  small: { height: 24, fontSize: '0.6875rem', px: 1.5 },
  medium: { height: 28, fontSize: '0.75rem', px: 2 },
};

export function Badge({ 
  label, 
  color = 'primary', 
  variant = 'filled',
  size = 'small',
  className,
  ...props 
}: BadgeProps) {
  return (
    <MuiChip
      label={label}
      size={size}
      className={cn('font-bold uppercase tracking-wider', className)}
      sx={{
        ...(variant === 'filled' ? colorStyles[color] : {}),
        borderRadius: '9999px',
        fontWeight: 600,
        ...sizeStyles[size],
        ...(props.sx as object),
      }}
      {...props}
    />
  );
}

export default Badge;