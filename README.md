# Sanctuary - Academic Planner

<div align="center">
  <img width="1200" height="475" alt="Sanctuary Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

> Academic planner / course management web app - Find your focus.

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
- **MUI (Material UI)**: Complex components - Dialog, Tabs, List, Progress, Cards, Buttons, Badges
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