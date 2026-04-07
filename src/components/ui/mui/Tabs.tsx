import React from 'react';
import { Tabs as MuiTabs, Tab as MuiTab, TabsProps as MuiTabsProps } from '@mui/material';
import { cn } from '@/lib/utils';

interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactElement;
}

interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
}

export function Tabs({ tabs, value, onChange, className, ...props }: TabsProps) {
  return (
    <MuiTabs
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      className={cn('border-b border-slate-100', className)}
      sx={{
        minHeight: 'auto',
        '& .MuiTabs-indicator': {
          bgcolor: 'primary.main',
          height: '3px',
          borderRadius: '3px 3px 0 0',
        },
      }}
      {...props}
    >
      {tabs.map((tab) => (
        <MuiTab
          key={tab.id}
          value={tab.id}
          label={tab.label}
          icon={tab.icon}
          iconPosition="start"
          sx={{
            minHeight: 'auto',
            py: 2.5,
            px: 3,
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'text.secondary',
            textTransform: 'none',
            '&.Mui-selected': {
              color: 'primary.main',
            },
            '& .MuiTab-iconWrapper': {
              mr: 1,
            },
          }}
        />
      ))}
    </MuiTabs>
  );
}

export default Tabs;