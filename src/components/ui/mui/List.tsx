import React from 'react';
import { 
  List as MuiList, 
  ListItem as MuiListItem,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  ListSubheader as MuiListSubheader,
  ListItemIconProps,
  ListItemTextProps,
  ListItemButtonProps,
  ListProps
} from '@mui/material';
import { cn } from '@/lib/utils';

// Re-export MUI List components with custom styling
export function List({ className, ...props }: ListProps) {
  return (
    <MuiList 
      className={cn('', className)}
      {...props} 
    />
  );
}

export function ListItem({ className, ...props }: React.ComponentProps<typeof MuiListItem>) {
  return (
    <MuiListItem 
      className={cn('p-0', className)}
      {...props} 
    />
  );
}

export function ListItemButton({ className, ...props }: ListItemButtonProps) {
  return (
    <MuiListItemButton 
      className={cn('rounded-xl', className)}
      {...props} 
    />
  );
}

export function ListItemIcon({ className, ...props }: ListItemIconProps) {
  return (
    <MuiListItemIcon 
      className={cn('min-w-10', className)}
      {...props} 
    />
  );
}

export function ListItemText({ className, ...props }: ListItemTextProps) {
  return (
    <MuiListItemText 
      className={cn('', className)}
      {...props} 
    />
  );
}

export function ListSubheader({ className, ...props }: React.ComponentProps<typeof MuiListSubheader>) {
  return (
    <MuiListSubheader 
      className={cn('', className)}
      {...props} 
    />
  );
}