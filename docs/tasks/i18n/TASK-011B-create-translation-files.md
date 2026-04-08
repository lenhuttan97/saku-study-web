# TASK-011B: Create Translation Files

**Feature**: FT-011: Internationalization (i18n)  
**Status**: pending  
**Estimate**: 1h  
**Priority**: Medium

## Description

Create Vietnamese and English translation files with all UI text keys.

## Requirements

### 1. Create Vietnamese translations (`src/locales/vi.json`)

Structure translations by feature:

```json
{
  "common": {
    "save": "Lưu",
    "cancel": "Hủy",
    "delete": "Xóa",
    "edit": "Sửa",
    "add": "Thêm",
    "search": "Tìm kiếm",
    "loading": "Đang tải...",
    "error": "Lỗi"
  },
  "auth": {
    "login": "Đăng nhập",
    "register": "Đăng ký",
    "email": "Email",
    "password": "Mật khẩu",
    "forgotPassword": "Quên mật khẩu?"
  },
  "navigation": {
    "dashboard": "Trang chủ",
    "courses": "Môn học",
    "tasks": "Bài tập",
    "schedule": "Lịch học",
    "settings": "Cài đặt"
  },
  "dashboard": {
    "welcome": "Chào buổi sáng",
    "todaySchedule": "Lịch học hôm nay",
    "todoList": "Danh sách cần làm",
    "focusMode": "Chế độ tập trung",
    "studyStreak": "Ngày học liên tiếp"
  },
  "courses": {
    "title": "Quản lý môn học",
    "addCourse": "Thêm môn học",
    "courseName": "Tên môn học",
    "teacher": "Giáo viên",
    "semester": "Học kỳ",
    "location": "Nơi học",
    "description": "Mô tả"
  },
  "tasks": {
    "title": "Danh sách bài tập",
    "upcoming": "Sắp tới",
    "inProgress": "Đang làm",
    "completed": "Đã xong",
    "deadline": "Hạn chót"
  },
  "schedule": {
    "title": "Thời khóa biểu",
    "weeklyView": "Tuần này",
    "monthlyView": "Tháng",
    "exportPdf": "Xuất PDF"
  },
  "settings": {
    "title": "Cài đặt",
    "profile": "Hồ sơ",
    "appearance": "Giao diện",
    "language": "Ngôn ngữ",
    "security": "Bảo mật"
  },
  "setup": {
    "step1": "Khởi tạo học kỳ",
    "step2": "Phương pháp lập kế hoạch",
    "step3": "Chi tiết lịch trình",
    "step4": "Xem lại & Hoàn tất"
  }
}
```

### 2. Create English translations (`src/locales/en.json`)

Same structure with English text:

```json
{
  "common": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "add": "Add",
    "search": "Search",
    "loading": "Loading...",
    "error": "Error"
  },
  "auth": {
    "login": "Login",
    "register": "Register",
    "email": "Email",
    "password": "Password",
    "forgotPassword": "Forgot password?"
  },
  ...
}
```

## Reference Files

- Vietnamese UI text from `/design-mockup/` HTML files
- English translations should match semantic meaning

## Acceptance Criteria

- [ ] vi.json created with all UI keys
- [ ] en.json created with all English translations
- [ ] All design mockup text is covered
- [ ] Keys organized by feature