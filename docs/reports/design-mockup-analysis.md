# Design Mockup Analysis Report: Sanctuary

**Date**: April 7, 2026  
**Analyst**: Orchestrator Agent  
**Project**: saku_study_web (Sanctuary - Academic Planner)  
**Source**: `/design-mockup/`

---

## 1. Design System - "Digital Sanctuary"

### 1.1 Creative North Star

**Tên gọi:** "The Digital Sanctuary" - Biến công việc lập kế hoạch thành ritual tự chăm sóc bản thân

**Đặc điểm:**
- Sử dụng **intentional asymmetry** (bất đối xứng có chủ đích)
- **Organic layering** - như các bề mặt giấy cao cấp xếp chồng
- Giao diện nhẹ nhàng, thoáng đãng, không nặng nề - như "floating on a cloud of organized calm"

---

### 1.2 Color Palette

| Token | Hex | Mô tả |
|-------|-----|-------|
| **Primary** | `#795465` | Màu chủ đạo - Dusty pink/mauve |
| **Primary Container** | `#f8c8dc` | Nhạt hơn primary |
| **Secondary** | `#40627b` | Blue accent |
| **Secondary Container** | `#bee1ff` | Light blue |
| **Tertiary** | `#5e5f56` | Olive/grey |
| **Tertiary Container** | `#d6d6ca` | Light olive |
| **Surface** | `#fef8fa` | Background chính - nhạt |
| **Surface Container Low** | `#f8f2f4` | Sidebar |
| **Surface Container Lowest** | `#ffffff` | Cards |
| **On Surface** | `#1d1b1d` | Text chính |
| **On Surface Variant** | `#4f4448` | Text phụ |
| **Outline Variant** | `#d2c3c7` | Đường viền nhạt |
| **Error** | `#ba1a1a` | Error messages |

**Signature Gradient:** `linear-gradient(135deg, #795465 0%, #f8c8dc 100%)`

---

### 1.3 Typography

| Font | Sử dụng |
|------|---------|
| **Plus Jakarta Sans** | Headlines, Display, Labels |
| **Be Vietnam Pro** | Body text |

---

### 1.4 Quy tắc đặc biệt (Design Rules)

| Rule | Mô tả |
|------|-------|
| **"No-Line" Rule** | Nghiêm cấm dùng đường viền 1px để phân cách sections → Dùng chuyển đổi màu nền |
| **Glassmorphism** | Modal, floating nav, menu → `surface-container-lowest @ 70% opacity + 24px blur` |
| **Ambient Shadows** | Cho elevated elements → `0px 10px 40px rgba(121, 84, 101, 0.08)` (màu tint từ primary, không phải đen) |
| **Ghost Border** | Nếu cần border vì lý do accessibility → `outline-variant @ 15% opacity` |

---

### 1.5 Border Radius

| Token | Value |
|-------|-------|
| DEFAULT | 1rem (16px) |
| lg | 2rem (32px) |
| xl | 3rem (48px) |
| full | 9999px |

---

## 2. Các màn hình thiết kế (Screens)

### 2.1 Authentication Pages

| File | Mô tả |
|------|-------|
| `đăng_nhập_serene_sakura/code.html` | Login page - Glass panel, form email/password, social login (Google/Facebook), link đăng ký |
| `đăng_ký_serene_sakura/code.html` | Register page - Full name, email, password + confirm, terms checkbox |

**Components:**
- Glass panel với backdrop blur
- Form fields với background `surface-container-high`
- Social login buttons (Google, Facebook)
- Floating dock cho mobile (bottom navigation)

---

### 2.2 Setup Wizard (4 bước)

| Step | File | Nội dung |
|------|------|----------|
| **1** | `bước_1_khởi_tạo_học_kỳ/` | Chọn semester, nơi học, địa chỉ |
| **2** | `bước_2_phương_thức_tạo_lịch_trình_cấp_nhất/` | 4 options: By Subject, Weekly Schedule, Free Form, Import từ file |
| **3** | `bước_3_chi_tiết_lịch_trình/` | Weekly grid view (7 ngày), thêm môn vào từng slot |
| **4** | `bước_4_xem_lại_hoàn_tất_v2/` | Preview lịch, stats (weekly workload, credits), Confirm/Save/Export |

---

### 2.3 Main Layout (Shell)

| Component | File | Mô tả |
|-----------|------|-------|
| **Sidebar** | `quản_lý_môn_học/` | Fixed bên trái (w-64), màu `surface-container-low`, nav items với icon + label uppercase |
| **TopNav** | Multiple | Fixed top, backdrop-blur, search bar, notifications, user avatar |
| **BottomNav (Mobile)** | `cài_đặt_light_mode_không_sidebar/` | Floating dock với glassmorphism |
| **FAB** | Multiple | Floating action button góc phải dưới |

---

### 2.4 Dashboard

**File:** `trang_dashboard_tổng_quan/code.html`

**Components:**
- **Hero Section:** Lời chào buổi sáng + ngày hiện tại
- **Bento Grid Layout:**
  - **Daily Schedule (col-span-8):** Danh sách lịch học hôm nay
  - **To-do Widget (col-span-4):** Checklist bài tập với deadline
  - **Inspirational Quote:** Signature gradient card
  - **Focus Mode Suggestion:** Đề xuất học tập + ảnh minh họa
  - **Study Streak:** Số ngày học liên tiếp
- **FAB:** Floating action button

---

### 2.5 Courses (Quản lý môn học)

**File:** `quản_lý_môn_học/code.html`

**Components:**
- **Header:** Tiêu đề + nút "Thêm môn học mới"
- **Bento Grid Cards:**
  - Card có màu theo môn (primary/secondary/tertiary)
  - Icon subject, mã môn, tên môn, giáo viên
  - Progress bar, member count, tags
  - Card trống cuối để thêm môn mới
- **Stats Footer:** Số môn, số tín chỉ, GPA

---

### 2.6 Tasks (Danh sách bài tập - Kanban)

**File:** `danh_sách_bài_tập_to_do_list/code.html`

**3 Columns:**
1. **Sắp tới (Upcoming):** Task chưa làm, có deadline + priority
2. **Đang làm (In Progress):** Task đang làm, có progress bar, "Live" badge
3. **Đã xong (Completed):** Task hoàn thành, opacity thấp hơn

---

### 2.7 Calendar (Thời khóa biểu tuần)

**File:** `thời_khóa_biểu_tuần/code.html`

**Layout:**
- **5-Column Layout (Thứ 2 - Thứ 6):** Mỗi cột có header ngày + date
- **Cards môn học:** Thời gian, tên môn, phòng, border-left màu theo subject
- **Filters:** Tuần này / Tháng, prev/next, export PDF
- **Side Cards:** Tiến độ tuần, Mẹo học tập, Quote

---

### 2.8 Course Detail Pages

| File | Mô tả |
|------|-------|
| `chi_tiết_môn_học_lịch_học_v5_tại_giảng/` | Tab Lịch học |
| `chi_tiết_môn_học_nhiệm_vụ_v2/` | Tab Nhiệm vụ |
| `chi_tiết_môn_học_tài_liệu_v2/` | Tab Tài liệu |
| `chi_tiết_môn_học_thông_tin_v2/` | Tab Thông tin |

---

### 2.9 Create Course

**File:** `tạo_môn_học_mới/code.html`

**Form fields:**
- Tên môn học (*)
- Giáo viên
- Học kỳ
- Nơi học
- Mô tả môn học
- Tải tài liệu (drag & drop)

---

### 2.10 Settings

**File:** `cài_đặt_light_mode_không_sidebar/code.html`

**Sections:**
- **User Profile:** Username, email (display only)
- **Appearance:** Theme toggle (Light/Dark), Background Atmosphere picker
- **Localization:** Language dropdown
- **Security:** Change password, 2FA toggle

---

## 3. Component Patterns

### 3.1 Buttons

| Type | Style |
|------|-------|
| **Primary** | Signature gradient, full/rounded corners |
| **Secondary** | Ghost border (outline-variant @ 20%) |
| **States** | Hover → translate-y[-2px] + tăng shadow |

### 3.2 Cards

- Không dùng dividers
- Dùng `surface-container-low` cho mỗi item thứ hai (zebra effect)
- Dùng spacing (1rem) để tách biệt

### 3.3 Input Fields

- Background: `surface-container-highest`
- Border radius: md (1.5rem)
- Label: uppercase, tracking-widest, phía trên (không placeholder)

### 3.4 Checkboxes

- Khi check → icon "favorite" (sparkle/heart) thay vì tick

### 3.5 Navigation

- Active state: Border-right 4px primary color, bold text
- Hover: translate-y[-2px] transition

---

## 4. Responsive Behavior

| Screen Size | Layout |
|-------------|--------|
| **Desktop** | Sidebar cố định (w-64), TopNav full width |
| **Mobile** | Hide sidebar, Bottom floating dock (glassmorphism), Single column |

---

## 5. Design Files Summary

### Files tìm thấy trong `/design-mockup/`:

```
design-mockup/
├── serene_sakura/DESIGN.md           # Light mode design system
├── serene_sakura_night/DESIGN.md     # Dark mode design system
├── product_requirements_document.html # PRD template
├── logo.png                          # App logo
├── đăng_nhập_serene_sakura/          # Login page
├── đăng_ký_serene_sakura/            # Register page
├── trang_dashboard_tổng_quan/         # Dashboard
├── quản_lý_môn_học/                  # Course management
├── danh_sách_bài_tập_to_do_list/      # Kanban tasks
├── thời_khóa_biểu_tuần/              # Weekly schedule
├── bước_1_khởi_tạo_học_kỳ/           # Setup step 1
├── bước_2_phương_thức_tạo_lịch_trình_cấp_nhất/ # Setup step 2
├── bước_3_chi_tiết_lịch_trình/       # Setup step 3
├── bước_4_xem_lại_hoàn_tất_v2/       # Setup step 4
├── tạo_môn_học_mới/                  # Create course
├── chi_tiết_môn_học_thông_tin_v2/    # Course info tab
├── chi_tiết_môn_học_lịch_học_v5_tại_giảng/ # Course schedule tab
├── chi_tiết_môn_học_nhiệm_vụ_v2/     # Course tasks tab
├── chi_tiết_môn_học_tài_liệu_v2/     # Course materials tab
└── cài_đặt_light_mode_không_sidebar/ # Settings page
```

---

## 6. Implementation Status

### So sánh Design Mockup vs Implementation

| Mockup | Component | Status |
|--------|-----------|--------|
| Login page | `Login.tsx` | ✅ Matched |
| Register page | `Register.tsx` | ✅ Matched |
| Dashboard | `Dashboard.tsx` | ✅ Matched |
| Course management | `Courses.tsx` | ✅ Matched |
| Create course | MUI Dialog in `Courses.tsx` | ✅ Matched |
| Course detail tabs | `CourseDetail.tsx` | ✅ Matched |
| Task kanban | `Tasks.tsx` | ✅ Matched |
| Weekly schedule | `Schedule.tsx` | ✅ Matched |
| Setup wizard (4 steps) | `SetupSemester.tsx` | ✅ Matched |
| Settings | `Settings.tsx` | ✅ Matched |

**Kết luận:** Tất cả design mockups đều có corresponding implementation trong codebase.

---

## 7. Key Insights

### Design Principles cần follow:

1. **No-Line Rule**: Không dùng 1px borders để phân cách → dùng background shifts
2. **Tonal Surface Hierarchy**: Background → Surface-Low → Surface-Lowest
3. **Glassmorphism**: 70% opacity + 24px blur cho floating elements
4. **Sanctuary Shadows**: Primary-tinted shadows (không đen)
5. **Full Rounding**: Border radius cho soft, approachable UI
6. **Dark Mode**: "Night Sanctuary" với deep Navy/Slate foundation

### Fonts cần sử dụng:

- **Plus Jakarta Sans**: Headlines, Display, Labels
- **Be Vietnam Pro**: Body text
- **Material Symbols Outlined**: Icons

---

**Report Generated**: April 7, 2026
