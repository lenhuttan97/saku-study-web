import React from 'react';
import { ToggleButtonGroup as MuiToggleButtonGroup, ToggleButton as MuiToggleButton } from '@mui/material';
import { cn } from '@/lib/utils';

interface ToggleButtonProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function ToggleButtonGroup({ value, onChange, options, className }: ToggleButtonProps) {
  return (
    <MuiToggleButtonGroup
      value={value}
      exclusive
      onChange={(_, newValue) => {
        if (newValue !== null) {
          onChange(newValue);
        }
      }}
      className={cn('bg-white border border-slate-100 rounded-2xl p-1 shadow-sm', className)}
      sx={{
        '& .MuiToggleButton-root': {
          border: 'none',
          borderRadius: '12px !important',
          px: 3,
          py: 1.5,
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'text.secondary',
          textTransform: 'none',
          '&.Mui-selected': {
            bgcolor: 'primary.main',
            color: 'white',
            boxShadow: '0 2px 8px rgba(124, 58, 237, 0.3)',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          },
          '&:hover': {
            bgcolor: 'action.hover',
          },
        },
      }}
    >
      {options.map((option) => (
        <MuiToggleButton key={option.value} value={option.value}>
          {option.label}
        </MuiToggleButton>
      ))}
    </MuiToggleButtonGroup>
  );
}

export default ToggleButtonGroup;