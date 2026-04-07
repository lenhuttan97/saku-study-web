import React from 'react';
import { ChevronRight, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@/components/ui';

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SettingsSidebarProps {
  sections: SettingsSection[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export const SettingsSidebar = ({ sections, activeSection, onSectionChange }: SettingsSidebarProps) => {
  return (
    <Card elevation="low" className="p-2">
      <List
        component="nav"
        sx={{ width: '100%', padding: 0 }}
        subheader={
          <ListSubheader 
            sx={{ 
              bgcolor: 'transparent', 
              fontWeight: 700, 
              fontSize: '0.75rem',
              color: 'text.secondary',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            Settings
          </ListSubheader>
        }
      >
        {sections.map((section) => (
          <ListItem key={section.id} disablePadding>
            <ListItemButton
              selected={activeSection === section.id}
              onClick={() => onSectionChange(section.id)}
              sx={{
                borderRadius: '12px',
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: 'text.secondary' }}>
                {section.icon}
              </ListItemIcon>
              <ListItemText 
                primary={section.label} 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              <ChevronRight size={18} className={cn(
                "transition-transform",
                activeSection === section.id ? "rotate-90" : ""
              )} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
      <div className="pt-4 px-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
          startIcon={<LogOut size={20} />}
        >
          Sign Out
        </Button>
      </div>
    </Card>
  );
};