import React from 'react';
import { Dialog as MuiDialog, DialogProps } from '@mui/material';
import { cn } from '@/lib/utils';

interface DialogPropsExtended extends Omit<DialogProps, 'PaperProps'> {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  PaperProps?: object;
}

export function Dialog({ 
  title,
  children, 
  open, 
  onClose,
  maxWidth = 'md',
  PaperProps,
  ...props 
}: DialogPropsExtended) {
  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          p: 5,
          maxHeight: '90vh',
          ...(PaperProps as object),
        },
        ...PaperProps,
      }}
      slots={{ backdrop: 'div' }}
      slotProps={{
        backdrop: {
          sx: {
            bgcolor: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
          },
        },
      }}
      {...props}
    >
      {children}
    </MuiDialog>
  );
}

export function DialogHeader({ 
  className, 
  children 
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex items-center justify-between mb-6', className)}>
      {children}
    </div>
  );
}

export function DialogContent({ 
  className, 
  children 
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('', className)}>
      {children}
    </div>
  );
}

export function DialogActions({ 
  className, 
  children 
}: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex justify-end gap-3 pt-4', className)}>
      {children}
    </div>
  );
}

export default Dialog;