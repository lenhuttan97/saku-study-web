import React from 'react';
import { Button as MuiButton } from '@mui/material';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: {
    bgcolor: 'primary.main',
    color: 'white',
    '&:hover': { bgcolor: 'primary.dark' },
  },
  secondary: {
    bgcolor: 'secondary.main',
    color: 'white',
    '&:hover': { bgcolor: 'secondary.dark' },
  },
  outline: {
    bgcolor: 'transparent',
    color: 'primary.main',
    border: '1.5px solid',
    borderColor: 'primary.main',
    '&:hover': { bgcolor: 'primary.main', color: 'white' },
  },
  ghost: {
    bgcolor: 'transparent',
    color: 'text.secondary',
    '&:hover': { bgcolor: 'action.hover' },
  },
};

const sizeStyles = {
  small: { padding: '6px 14px', fontSize: '0.8125rem' },
  medium: { padding: '10px 24px', fontSize: '0.875rem' },
  large: { padding: '14px 32px', fontSize: '1rem' },
};

export function Button({ 
  variant = 'primary', 
  size = 'medium', 
  className,
  children,
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <MuiButton
      type={type}
      onClick={onClick}
      disabled={disabled}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      className={cn('transition-all hover:scale-105 active:scale-95', className)}
      variant="contained"
      sx={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        boxShadow: variant === 'primary' ? '0 4px 14px 0 rgba(124, 58, 237, 0.25)' : undefined,
        fontWeight: 600,
        borderRadius: '12px',
        textTransform: 'none',
        '&.Mui-disabled': {
          bgcolor: 'action.disabledBackground',
          color: 'action.disabled',
        },
      }}
    >
      {children}
    </MuiButton>
  );
}

export default Button;