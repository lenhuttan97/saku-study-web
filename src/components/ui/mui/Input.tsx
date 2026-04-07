import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<MuiTextFieldProps, 'variant'> {
  label?: string;
  error?: boolean;
  helperText?: string;
  className?: string;
}

export function Input({ 
  className, 
  label, 
  error, 
  helperText,
  ...props 
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-bold text-slate-500 mb-2 ml-1">
          {label}
        </label>
      )}
      <MuiTextField
        {...props}
        fullWidth
        error={error}
        helperText={helperText}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '16px',
            bgcolor: 'slate.50',
            '& fieldset': {
              borderColor: 'slate.200',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
              borderWidth: '2px',
              boxShadow: '0 0 0 3px rgba(124, 58, 237, 0.1)',
            },
          },
          '& .MuiInputLabel-root': {
            fontWeight: 500,
            color: 'slate.600',
          },
          '& .MuiFormHelperText-root': {
            fontWeight: 500,
            ml: 1,
          },
        }}
      />
    </div>
  );
}

export default Input;