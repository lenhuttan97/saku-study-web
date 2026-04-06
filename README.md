# Sanctuary - Academic Planner

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 19 + Vite 6 |
| Language | TypeScript 5.8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 + MUI (Material UI) |
| State | Redux Toolkit |
| Animations | Framer Motion (`motion`) |
| Icons | lucide-react |
| Backend | Firebase (Firestore + Auth) |

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/           # Layout shell components
│   │   ├── Layout.tsx    # Main layout with Sidebar + TopNav
│   │   ├── Sidebar.tsx   # Navigation sidebar
│   │   └── TopNav.tsx    # Top header bar
│   └── ui/               # Reusable UI components (MUI wrappers)
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Card.tsx
│       ├── Dialog.tsx
│       ├── Tabs.tsx
│       ├── Badge.tsx
│       ├── List.tsx
│       ├── ToggleButton.tsx
│       └── Progress.tsx
├── pages/                # Page components
│   ├── Dashboard.tsx    # Home page
│   ├── Courses.tsx       # Course list + create modal
│   ├── CourseDetail.tsx  # Course detail with tabs
│   ├── Tasks.tsx         # Task kanban board
│   ├── Schedule.tsx      # Weekly schedule calendar
│   ├── Settings.tsx      # User settings
│   ├── Login.tsx         # Login form (public)
│   ├── Register.tsx      # Registration form (public)
│   └── SetupSemester.tsx # First-time setup wizard
├── lib/
│   └── utils.ts          # cn() helper (clsx + tailwind-merge)
├── theme/
│   └── muiTheme.ts       # MUI theme configuration
├── App.tsx               # Router configuration
├── main.tsx              # Entry point
└── index.css            # Tailwind v4 + custom theme
```

## 🎨 Design System

### Brand Colors
| Token | Value |
|-------|-------|
| `--color-brand-purple` | `#7C3AED` |
| `--color-brand-pink` | `#EC4899` |
| `--color-brand-blue` | `#3B82F6` |
| `--color-bg-main` | `#FDF8FF` |
| `--color-bg-card` | `#FFFFFF` |

### Typography
- **Plus Jakarta Sans** - Headings
- **Be Vietnam Pro** - Body text

### Styling Strategy (Dual System)
- **MUI (Material UI)**: Complex components - Dialog, Tabs, List, Progress, Cards, Buttons
- **Tailwind CSS**: Layout, spacing, typography, custom styling

## 🛠️ Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# TypeScript check
npm run lint
```

## 🔧 Environment Variables

Create `.env.local` with:

```env
GEMINI_API_KEY=your_api_key_here
APP_URL=http://localhost:3000
```

## 📱 Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | Home with schedule, tasks, streak |
| `/courses` | Courses | Course list with progress tracking |
| `/courses/:id` | CourseDetail | Course info, materials, tasks, schedule |
| `/schedule` | Schedule | Weekly timetable calendar view |
| `/tasks` | Tasks | Kanban board for task management |
| `/settings` | Settings | Profile, appearance, security |
| `/login` | Login | Authentication page |
| `/register` | Register | Registration page |

## 🎯 Features

- 📚 **Course Management** - Track courses with progress
- 📅 **Weekly Schedule** - Visual timetable with day/week/month views
- ✅ **Task Management** - Kanban board with priority badges
- 🎨 **UI/UX** - Beautiful design with brand colors and smooth animations
- 🌙 **Theming** - Light mode support with customizable backgrounds

## 📄 License

MIT License