# Settings

## Status
ui-done

## Description
Settings page with sidebar navigation for Profile, Appearance, Localization, and Security sections. Backend integration pending.

## Pages
- `src/pages/Settings.tsx` - Settings page with sidebar

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| Card | `src/components/ui/Card.tsx` | Section containers |
| Button | `src/components/ui/Button.tsx` | Action buttons |
| Input | `src/components/ui/Input.tsx` | Form fields |
| List | `src/components/ui/List.tsx` | Sidebar navigation |
| ListItem, ListItemButton, ListItemIcon, ListItemText | `src/components/ui/List.tsx` | Nav items |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/settings` | Settings.tsx | Protected |

## Features
- [x] Sidebar navigation (Profile, Appearance, Localization, Security)
- [x] Profile section: avatar, username, email
- [x] Appearance section: theme toggle (Light/Dark), background atmosphere (Serenity/Focus/Midnight)
- [x] Security section: change password UI, two-factor authentication toggle
- [x] Sign out button
- [x] Save changes button
- [ ] Firebase user data sync
- [ ] Theme persistence
- [ ] Real password change
- [ ] Two-factor auth integration

## Next Steps
1. Connect to Firebase Auth for profile
2. Add theme preference to Firestore
3. Implement password change flow
4. Add two-factor auth setup
5. Theme persistence with localStorage

## Dependencies
- Firebase Auth (pending)
- React Router v7
- MUI components
- lucide-react icons
