import React from 'react';
import { Paper, PaperProps } from '@mui/material';
import { cn } from '@/lib/utils';

interface CardProps extends Omit<PaperProps, 'elevation'> {
  elevation?: 'none' | 'low' | 'medium' | 'high';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
}

const elevationStyles = {
  none: { boxShadow: 'none' },
  low: { boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)' },
  medium: { boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)' },
  high: { boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)' },
};

export function Card({ 
  elevation = 'low', 
  hoverable = false,
  className, 
  children,
  sx,
  ...props 
}: CardProps) {
  // Check if className contains a padding class (p-x)
  const hasCustomPadding = className?.match(/p-\d+|p-x|p-y|px-|py-/);

  return (
    <Paper
      className={cn(
        'rounded-3xl border border-slate-100 transition-all',
        !hasCustomPadding && 'p-6', // Add default padding only if no custom padding in className
        hoverable && 'hover:border-primary/20 hover:shadow-lg cursor-pointer',
        className
      )}
      sx={{
        ...elevationStyles[elevation],
        bgcolor: 'white',
        ...(sx as object),
      }}
      elevation={0}
      {...props}
    >
      {children}
    </Paper>
  );
}

export function CardHeader({ 
  className, 
  children 
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  );
}

export function CardContent({ 
  className, 
  children 
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

export default Card;