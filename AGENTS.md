# AGENTS.md — saku_study_web

## Project

**Sanctuary** — Academic planner / course management web app.
Origin: Google AI Studio template. Frontend-only SPA.

## Stack

| Layer | Tech |
|-------|------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 (strict-ish, `noEmit`, `skipLibCheck`) |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + MUI (Material UI) |
| State | Redux Toolkit |
| Animations | Framer Motion (`motion`) |
| Icons | lucide-react |
| Backend/Auth | Firebase (Firestore + Auth) |
| Utils | clsx + tailwind-merge (`cn()` in `src/lib/utils.ts`) |

## Commands

```bash
npm run dev       # dev server on :3000, binds 0.0.0.0
npm run build     # production build → dist/
npm run preview   # preview production build
npm run clean     # rm -rf dist
npm run lint      # tsc --noEmit (no ESLint configured)
```

**No test framework is configured.** Do not invent one without asking.

## Architecture

```
src/
  main.tsx            # entry point
  App.tsx             # router — routes defined here
  index.css           # Tailwind v4 + custom theme + utility classes
  components/         # reusable UI components
    layout/           # shell/layout components
      Layout.tsx      # shell with Sidebar + TopNav + <Outlet>
      Sidebar.tsx     # navigation sidebar
      TopNav.tsx      # top header bar
    ui/               # small reusable UI primitives (Button, Card, etc.) — future
  pages/              # page components (route-level)
    Dashboard.tsx     # home page
    Courses.tsx       # course list + create modal
    CourseDetail.tsx  # course detail with tabs
    Tasks.tsx         # task kanban board
    Settings.tsx      # user settings
    Login.tsx         # login form (public)
    Register.tsx      # registration form (public)
    SetupSemester.tsx # first-time setup wizard
  features/           # feature-specific modules (future)
    auth/             # authentication feature
    courses/          # course management feature
    tasks/            # task management feature
    calendar/         # calendar feature
  hooks/              # shared custom hooks — future
  lib/
    utils.ts          # cn() helper (clsx + tailwind-merge)
  types/              # TypeScript interfaces/types — future
  services/           # API clients (Firebase, etc.) — future
  store/              # Redux store — future
```

- **Path alias**: `@/*` → `./*` (project root). Import as `@/src/lib/utils` or `@/src/components/layout/Layout`.
- **No backend** — all logic is client-side. Express is a dependency but unused.
- **No state management library** — uses React local state.

## Design System (in `src/index.css`)

| Token | Value |
|-------|-------|
| `--color-brand-purple` | `#7C3AED` |
| `--color-brand-pink` | `#EC4899` |
| `--color-brand-blue` | `#3B82F6` |
| `--color-bg-main` | `#FDF8FF` |
| `--color-bg-card` | `#FFFFFF` |
| Fonts | Plus Jakarta Sans + Be Vietnam Pro |

Utility classes defined: `.glass`, `.card-shadow`, `.sidebar-item-active`.

## MUI + Tailwind CSS (Dual Styling System)

This project uses **BOTH** MUI (Material UI) and Tailwind CSS v4 together.

### When to Use Each

| Use MUI For | Use Tailwind For |
|-------------|-----------------|
| Complex components: Dialog, Table, DataGrid | Layout: flex, grid, spacing |
| Form controls: TextField, Select, Autocomplete | Custom styling, utility classes |
| Navigation: AppBar, Drawer, Tabs | Responsive design (sm:, md:, lg:) |
| Feedback: Snackbar, Alert, Progress | Typography utilities, colors |
| Data display: Chip, Avatar, Badge | Custom animations, transitions |

### MUI Theme

- **Location**: `src/theme/muiTheme.ts`
- **Primary color**: `#7C3AED` (brand purple)
- **Secondary color**: `#EC4899` (brand pink)
- **Border radius**: `12px` (~`rounded-xl` in Tailwind)
- **Shadows**: Custom 25-level shadow scale matching project aesthetic
- **Typography**: Plus Jakarta Sans + Be Vietnam Pro (same as Tailwind)
- **cssVariables**: `true` — enables MUI CSS variables for better Tailwind coexistence

### How to Extend MUI Theme

```typescript
// In src/theme/muiTheme.ts, add to the `components` object:
MuiYourComponent: {
  defaultProps: { /* default props */ },
  styleOverrides: {
    root: { /* styles for root element */ },
    // other slot overrides...
  },
}
```

### Gotchas

- **MUI uses Emotion** for CSS injection, Tailwind uses utility classes — they coexist fine
- **MUI's CssBaseline** is applied in `main.tsx` — it sets box-sizing and resets margins
- **Tailwind's `@layer base`** styles are applied AFTER CssBaseline, so they take precedence
- **Use `cn()`** from `src/lib/utils.ts` to merge Tailwind + MUI classes safely
- **MUI `sx` prop** generates inline styles — prefer Tailwind classes when possible for consistency
- **Do NOT use MUI's `styled()`** for simple layout — use Tailwind classes instead
- **MUI components accept `className`** — pass Tailwind classes via `className` prop
- **Specificity**: MUI's Emotion styles have higher specificity than Tailwind utilities — use `!important` via Tailwind (`!px-4`) if needed, or use `sx` prop

## Environment

- `GEMINI_API_KEY` — required for Gemini AI calls. Set in `.env.local` (gitignored).
- `DISABLE_HMR` — set to `true` to disable HMR (AI Studio default).
- `APP_URL` — host URL (auto-injected by AI Studio).
- **Never read `.env` files** — use `.env.example` for structure.

## Gotchas

- **Tailwind v4** uses `@import "tailwindcss"` (not `@tailwind` directives) and `@theme` blocks.
- **No ESLint** — `npm run lint` is just `tsc --noEmit`.
- **No test runner** — skip test commands unless one is added.
- **HMR disabled by default** in AI Studio via `DISABLE_HMR=true`.
- **`design-mockup/`** contains Vietnamese UI mockup screenshots — reference for design decisions.
- **Pages vs Components**: Pages live in `src/pages/`, reusable components in `src/components/`. Layout shell components are in `src/components/layout/`.

## Workflow Conventions

- Page components (route-level) live in `src/pages/`.
- Reusable UI components live in `src/components/`. Layout shell components are in `src/components/layout/`.
- Feature-specific modules go in `src/features/<feature>/` (future use).
- Routes defined directly in `App.tsx`.
- No auth backend yet — Login/Register/Setup are placeholder pages.
