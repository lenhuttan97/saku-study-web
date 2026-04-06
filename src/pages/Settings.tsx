import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Palette, 
  Globe, 
  Shield, 
  ChevronRight,
  Camera,
  Moon,
  Sun,
  Lock,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Card, Input, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@/components/ui';

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');

  const sections = [
    { id: 'profile', label: 'Your Profile', icon: <User size={20} /> },
    { id: 'appearance', label: 'Appearance', icon: <Palette size={20} /> },
    { id: 'localization', label: 'Localization', icon: <Globe size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Your Sanctuary</h1>
        <p className="text-slate-500 mt-1">Personalize your space and manage your account.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* MUI List Sidebar */}
        <aside className="md:col-span-4">
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
                    onClick={() => setActiveSection(section.id)}
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
        </aside>

        {/* Content */}
        <main className="md:col-span-8">
          {activeSection === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <Card elevation="medium">
                <div className="flex flex-col sm:flex-row items-center gap-8 p-6">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white text-4xl font-bold shadow-xl">
                      S
                    </div>
                    <Button 
                      variant="primary" 
                      size="small"
                      className="absolute -bottom-2 -right-2 p-2 rounded-xl"
                    >
                      <Camera size={20} />
                    </Button>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-2xl font-bold text-slate-800">Sakura</h3>
                    <p className="text-slate-500">Premium Member since April 2026</p>
                  </div>
                </div>
              </Card>

              <Card elevation="low">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input 
                      label="Username"
                      defaultValue="sakura_design"
                    />
                    <Input 
                      label="Email Address"
                      defaultValue="sakura@example.com"
                      type="email"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <Button>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeSection === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <Card elevation="low">
                <div className="p-6 space-y-6">
                  <section className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">Theme Toggle</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="primary"
                        startIcon={<Sun size={24} />}
                        className="flex-col h-auto py-6"
                      >
                        Light Mode
                      </Button>
                      <Button 
                        variant="outline"
                        startIcon={<Moon size={24} />}
                        className="flex-col h-auto py-6"
                      >
                        Dark Mode
                      </Button>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-800">Background Atmosphere</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {['Serenity', 'Focus', 'Midnight'].map((bg) => (
                        <button key={bg} className="p-4 rounded-2xl border border-slate-100 text-center hover:border-brand-purple transition-all group">
                          <div className={cn(
                            "h-20 rounded-xl mb-3 transition-transform group-hover:scale-105",
                            bg === 'Serenity' ? 'bg-bg-main' : bg === 'Focus' ? 'bg-slate-100' : 'bg-slate-900'
                          )}></div>
                          <span className="text-sm font-bold text-slate-600">{bg}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                </div>
              </Card>
            </motion.div>
          )}

          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card elevation="low">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-brand-purple shadow-sm">
                      <Lock size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Change Password</h4>
                      <p className="text-xs text-slate-500">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="small">
                    Update
                  </Button>
                </div>
              </Card>

              <Card elevation="low">
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                      <Shield size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500">Currently enabled for your account</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="small" className="text-red-500 hover:text-red-600">
                    Disable
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Settings;