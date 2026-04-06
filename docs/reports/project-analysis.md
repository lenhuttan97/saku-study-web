# Project Analysis Report: Sanctuary (saku_study_web)

**Date**: April 6, 2026  
**Analyst**: Explore Agent  
**Project**: saku_study_web (Sanctuary - Academic Planner)

---

## 1. Project Structure Overview

```
saku_study_web/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Router configuration
│   ├── index.css             # Tailwind v4 + design tokens
│   ├── components/           # 12 flat components
│   │   ├── Layout.tsx       # Shell (Sidebar + TopNav + Outlet)
│   │   ├── Dashboard.tsx    # Homepage
│   │   ├── Courses.tsx      # Course list
│   │   ├── CourseDetail.tsx # Course detail with tabs
│   │   ├── Tasks.tsx        # Kanban task board
│   │   ├── Settings.tsx     # Profile/appearance/security
│   │   ├── Login.tsx        # Login page
│   │   ├── Register.tsx     # Registration page
│   │   ├── SetupSemester.tsx # Onboarding wizard (4 steps)
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   └── TopNav.tsx        # Top header with search
│   └── lib/
│       └── utils.ts         # cn() utility only
├── design-mockup/            # 17 Vietnamese UI mockups
├── package.json             # Dependencies
├── vite.config.ts           # Vite + Tailwind config
├── tsconfig.json            # TypeScript config
├── AGENTS.md                # Agent workflow rules
└── .env.example             # Environment template
```

---

## 2. Technology Stack Analysis

| Layer | Tech | Status | Notes |
|-------|------|--------|-------|
| Framework | React 19 + Vite 6 | ✅ Working | React 19.0.0, Vite 6.2.0 |
| Language | TypeScript 5.8 | ✅ Working | Strict-ish, noEmit, skipLibCheck |
| Routing | React Router v7 | ✅ Working | v7.14.0, all routes defined |
| Styling | Tailwind CSS v4 | ✅ Working | v4.1.14, @theme blocks |
| State | React local state | ✅ Used | useState in all components |
| Animations | Framer Motion | ✅ Used | motion/react (v12.23.24) |
| Icons | lucide-react | ✅ Used | v0.546.0 |
| UI Library | MUI | ❌ Not used | In docs but not in code |
| State Management | Redux Toolkit | ❌ Not used | In docs but not in package |
| Backend | Firebase | ❌ Not integrated | In docs but no code |

**Critical Finding**: The AGENTS.md lists Redux Toolkit and Firebase as dependencies, but:
- Redux is NOT in package.json
- No `src/store/` directory exists
- No Firebase SDK installed
- No Firebase config or auth code

---

## 3. Current Implementation Status

### Fully Implemented (UI Wireframes with Mock Data):

| Component | Status | Details |
|-----------|--------|---------|
| `Dashboard.tsx` | 🟡 Wireframe | Hardcoded schedule, to-do, focus mode, quote, streak |
| `Courses.tsx` | 🟡 Wireframe | Mock course list + create modal (no submission) |
| `CourseDetail.tsx` | 🟡 Wireframe | Tabs work, mock data, no real actions |
| `Tasks.tsx` | 🟡 Wireframe | Kanban board with mock tasks |
| `Settings.tsx` | 🟡 Wireframe | Profile edit, theme toggle (non-functional), security |
| `Login.tsx` | 🟡 Wireframe | Form UI, social buttons (non-functional) |
| `Register.tsx` | 🟡 Wireframe | Form UI, no validation/submission |
| `SetupSemester.tsx` | 🟡 Wireframe | 4-step wizard, no data persistence |
| `Layout.tsx` | ✅ Functional | Responsive shell with Sidebar + TopNav |
| `Sidebar.tsx` | ✅ Functional | Navigation links, logout button |
| `TopNav.tsx` | ✅ Functional | Search bar, notifications, user avatar |

### Placeholder/Coming Soon:

| Route | Status | Details |
|-------|--------|---------|
| `/calendar` | 🔴 Placeholder | Shows "Calendar view coming soon..." text |

---

## 4. Features Implemented vs Planned

### ✅ Implemented:
- [x] Login/Register pages (UI only)
- [x] Dashboard with schedule, to-do, focus mode (UI only)
- [x] Course list with card UI and progress bars (UI only)
- [x] Course detail with 4 tabs (info, schedule, materials, tasks)
- [x] Tasks kanban board (Upcoming, In Progress, Completed)
- [x] Settings (profile, appearance, security sections)
- [x] Setup semester wizard (4 steps)
- [x] Responsive sidebar navigation
- [x] Top navigation with search
- [x] Animations (Framer Motion)
- [x] Design system (colors, typography, utility classes)

### ❌ Not Implemented:
- [ ] Firebase Authentication
- [ ] Firebase Firestore (database)
- [ ] Redux state management
- [ ] Calendar view
- [ ] Real form submissions (all forms submit to nowhere)
- [ ] Dark mode toggle functionality
- [ ] User profile management
- [ ] Course CRUD operations
- [ ] Task CRUD operations
- [ ] File upload for course materials
- [ ] Focus mode timer functionality
- [ ] Streak tracking
- [ ] Notification system
- [ ] Any API integration

---

## 5. Architecture Patterns

### Current Architecture:
```
App.tsx (Router)
    ↓
Layout.tsx (Shell)
    ├── Sidebar.tsx
    ├── TopNav.tsx
    └── Outlet → Page Component
```

### Pattern Observations:

1. **Flat component structure** - All components in `src/components/` with no subfolders
2. **Mock data embedded** - Each component has hardcoded mock data arrays
3. **No state management** - Uses React `useState` only
4. **No TypeScript interfaces** - Uses `any` for mock data types
5. **No API layer** - No services, hooks, or API clients
6. **Tailwind v4** - Using `@theme` blocks and `@import "tailwindcss"`

### Missing Architecture Layers:

| Layer | Status |
|-------|--------|
| State Management | ❌ None (no Redux) |
| Data Fetching | ❌ None |
| API Client | ❌ None |
| Form Handling | ❌ None (just UI) |
| Authentication | ❌ None |
| Database | ❌ None |

---

## 6. Design Mockup Comparison

The `design-mockup/` folder contains 17 Vietnamese UI mockups that represent the target design:

| Mockup | Purpose | Implementation Status |
|--------|---------|----------------------|
| `ng_nh_p_serene_sakura` | Login page | ✅ Matched (Login.tsx) |
| `ng_k_serene_sakura` | Register page | ✅ Matched (Register.tsx) |
| `trang_dashboard_t_ng_quan` | Dashboard | ✅ Matched (Dashboard.tsx) |
| `qu_n_l_m_n_h_c` | Course management | ✅ Matched (Courses.tsx) |
| `t_o_m_n_h_c_m_i` | Create course | ✅ Matched (modal in Courses.tsx) |
| `chi_ti_t_m_n_h_c_th_ng_tin` | Course info | ✅ Matched (CourseDetail.tsx) |
| `chi_ti_t_m_n_h_c_nhi_m_v` | Course tasks | ✅ Matched (CourseDetail.tsx) |
| `chi_ti_t_m_n_h_c_t_i_li_u` | Course materials | ✅ Matched (CourseDetail.tsx) |
| `chi_ti_t_m_n_h_c_l_ch_h_c` | Course schedule | ✅ Matched (CourseDetail.tsx) |
| `danh_s_ch_b_i_t_p_to_do_list` | Task list | ✅ Matched (Tasks.tsx) |
| `th_i_kh_a_bi_u_tu_n` | Weekly schedule | ✅ Dashboard has schedule |
| `b_c_1_h_c_k_a_i_m_h_c` | Step 1 onboarding | ✅ Matched (SetupSemester.tsx) |
| `b_c_2_ph_ng_th_c_t_o_l_ch_tr_nh` | Step 2 planning | ✅ Matched (SetupSemester.tsx) |
| `b_c_3_chi_ti_t_l_ch_tr_nh` | Step 3 schedule | ✅ Matched (SetupSemester.tsx) |
| `b_c_4_xem_l_i_ho_n_t_t` | Step 4 completion | ✅ Matched (SetupSemester.tsx) |

**Conclusion**: All design mockups have corresponding implementation in the codebase.

---

## 7. Gaps and Areas Needing Work

### High Priority:

| Gap | Impact | Recommendation |
|-----|--------|----------------|
| No Firebase Auth | Cannot login/register for real | Integrate Firebase Auth |
| No Firestore | No data persistence | Set up Firestore collections |
| No state management | Can't share data between components | Add Redux Toolkit or Context |
| No form handlers | All forms non-functional | Implement form validation + API calls |
| Calendar missing | Major feature not implemented | Build calendar view |

### Medium Priority:

| Gap | Impact | Recommendation |
|-----|--------|----------------|
| No TypeScript types | Poor type safety | Add interfaces for Course, Task, User |
| No dark mode | Theme toggle doesn't work | Implement theme context + CSS variables |
| No file upload | Course materials UI only | Add Firebase Storage |
| No notifications | Bell icon non-functional | Add notification system |

### Low Priority:

| Gap | Impact | Recommendation |
|-----|--------|----------------|
| No API layer | All data is mock | Create service layer |
| No error handling | Poor UX on failure | Add error boundaries |
| No loading states | No feedback during actions | Add loading spinners |

---

## 8. Technical Observations

### Positive:
- Clean component structure (flat, focused)
- Good use of Framer Motion for animations
- Responsive design
- Consistent design tokens
- Path alias configured (`@/*` → `./*`)
- Modern React 19 patterns

### Concerns:
- **No environment variables handling** - `.env.example` exists but no code to use env vars
- **GEMINI_API_KEY in vite.config** - Already configured but no AI features implemented
- **Express in dependencies** - Listed in package.json but not used (server not needed for SPA)
- **No .gitignore for .env** - `.env.local` mentioned in docs but need to ensure it's gitignored

---

## 9. Next Steps Recommendation

Based on this analysis, recommended implementation order:

### Phase 1: Authentication (Firebase Auth)
- Set up Firebase configuration
- Implement login/register/logout
- Add auth guards to routes

### Phase 2: Data Layer (Firestore + Redux)
- Define Firestore schema
- Set up Redux store
- Create data fetching hooks

### Phase 3: Core Features
- Course CRUD operations
- Task CRUD operations
- Calendar view

### Phase 4: Polish
- Dark mode
- Notifications
- Focus mode timer
- File uploads

---

**Report Generated**: April 6, 2026