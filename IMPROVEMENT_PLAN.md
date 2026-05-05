# Kế hoạch Cải tiến Dự án (Improvement Plan)

Dưới đây là danh sách các đầu việc cần thực hiện để tối ưu hóa dự án. Trạng thái sẽ được cập nhật khi hoàn thành.

## Giai đoạn 1: Tối ưu hóa Cấu trúc & Bảo mật Cơ bản
- [x] **1.1. Cập nhật Dependencies & Dọn dẹp Code:**
  - Loại bỏ `body-parser` trong `package.json`.
  - Cập nhật các gói thư viện lên bản ổn định mới nhất nếu cần.
  - Xóa code comment rác trong `api/routes.js`.
- [x] **1.2. Thay thế middleware mặc định:**
  - Chuyển sang dùng `express.json()` và `express.urlencoded({ extended: true })` trong `index.js`.
- [x] **1.3. Tích hợp Helmet:**
  - Cài đặt `helmet`.
  - Cấu hình trong `index.js` để tăng cường bảo mật HTTP headers.

## Giai đoạn 2: Nâng cấp Xử lý Lỗi & Logic
- [x] **2.1. Centralized Error Handling:**
  - Tạo `api/libs/error-handler.js`.
  - Định nghĩa format lỗi chuẩn (JSON).
  - Áp dụng vào luồng xử lý chính của ứng dụng.
- [ ] **2.2. Cải thiện Database Connection:**
  - Kiểm tra và đảm bảo các kết nối được đóng/mở hợp lý.

## Giai đoạn 3: Xác minh & Kiểm thử
- [ ] **3.1. Manual Testing:**
  - Chạy `npm run dev` và kiểm tra các endpoint chính qua Postman/Curl.
- [ ] **3.2. Verification:**
  - Đảm bảo các thay đổi không làm gãy các tính năng hiện có.

---
*Lưu ý: Kế hoạch này có thể được điều chỉnh tùy theo quá trình thực hiện.*
