# GitHub Sync Rules

## Mục đích
Quy tắc đồng bộ giữa local docs và GitHub issues để đảm bảo tính nhất quán trong quản lý task/bug.

## Quy trình chuẩn (GitHub Sync Workflow)

### 1. Tạo Task/Bug mới

#### Bước 1: Tạo local task/bug docs
- Tạo file task theo format: `docs/tasks/<feature>/TASK-XXXX-[SCOPE]-<title>.md`
- Tạo file bug theo format: `docs/bugs/<feature>/BUG-XXXX-[SCOPE]-<title>.md`
- Gán ID duy nhất theo thứ tự tăng dần

#### Bước 2: Tạo GitHub issue tương ứng
- Dùng `gh issue create` để tạo issue trên GitHub
- Sử dụng tiêu đề: `[TASK-XXXX] <title>` hoặc `[BUG-XXXX] <title>`
- Gán milestone tương ứng với feature
- Gán labels phù hợp (enhancement, bug, etc.)

#### Bước 3: Cập nhật local docs
- Thêm GitHub issue URL vào local task/bug docs
- Thêm cross-reference giữa local và GitHub

### 2. Đồng bộ trạng thái

#### Bước 1: Kiểm tra định kỳ
- Chạy `gh issue list --state all` để lấy trạng thái hiện tại
- So sánh với local docs status

#### Bước 2: Đồng bộ 2 chiều
- Nếu GitHub issue closed → cập nhật local status thành `done`
- Nếu local status thay đổi → cập nhật GitHub issue comment nếu cần

### 3. Quản lý ID duy nhất

#### ID Assignment Rules
- Task ID: tăng dần theo thứ tự tạo
- Bug ID: tăng dần theo thứ tự tạo
- Không nhảy ID, không trùng lặp
- Duy trì bảng INDEX.md cập nhật

#### Conflict Resolution
- Nếu local có ID nhưng GitHub không có → tạo lại GitHub issue
- Nếu GitHub có ID nhưng local không có → tạo lại local docs
- Nếu có bất kỳ mismatch nào → dừng quy trình và báo cáo

## Checklist kiểm tra

Trước khi kết thúc mỗi phiên làm việc, kiểm tra:

- [ ] Tất cả local tasks có GitHub issue tương ứng
- [ ] Tất cả GitHub issues có local docs tương ứng  
- [ ] IDs khớp giữa 2 hệ thống
- [ ] Milestones đúng với feature
- [ ] Status đồng bộ (open/closed ↔ pending/done)
- [ ] Cross-reference links hoạt động

## Tools hỗ trợ

- `gh issue list --state all` - kiểm tra tất cả issues
- `gh issue create` - tạo issue mới
- `gh issue edit` - cập nhật issue
- `grep` - tìm kiếm local docs theo ID

## Tự động hóa (Tương lai)

- Hook tự động tạo GitHub issue khi tạo local docs
- Hook tự động cập nhật local docs khi GitHub issue thay đổi
- Script kiểm tra định kỳ mismatch giữa 2 hệ thống