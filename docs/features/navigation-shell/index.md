# Navigation Shell

## Status
done

## Description
Layout shell with Sidebar navigation and TopNav header bar. React Router nested routes configured.

## Pages
- `src/components/layout/Layout.tsx` - Main layout with Outlet
- `src/components/layout/Sidebar.tsx` - Navigation sidebar
- `src/components/layout/TopNav.tsx` - Top header bar

## Components Used
| Component | File | Purpose |
|-----------|------|---------|
| Layout | `src/components/layout/Layout.tsx` | Main shell with Outlet |
| Sidebar | `src/components/layout/Sidebar.tsx` | Navigation sidebar |
| TopNav | `src/components/layout/TopNav.tsx` | Top header bar |

## Routes
| Route | Component | Access |
|-------|-----------|--------|
| `/` | Layout (protected) | Protected |
| Nested routes | Various | Protected |

## Features
- [x] Nested route structure with Layout
- [x] Sidebar with navigation items (Dashboard, Courses, Tasks, Schedule, Settings)
- [x] Sidebar active state indicator
- [x] Sidebar collapse/expand
- [x] TopNav with page title
- [x] User avatar in TopNav
- [x] Logout button in Sidebar
- [ ] Auth guard for protected routes

## Next Steps
1. Add auth guard (redirect to login if not authenticated)
2. Persist sidebar collapsed state
3. Add mobile responsive sidebar
4. Add notifications dropdown in TopNav

## Dependencies
- React Router v7
- MUI components
- lucide-react icons
