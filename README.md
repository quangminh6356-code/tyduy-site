# Supply Control Academy (MVP)

Website frontend thuần để đăng tải và làm bài test học việc cho nhân sự mới của Bộ phận Kiểm soát Cung ứng.

> **Lưu ý quan trọng:** Nội dung câu hỏi hiện tại là **Dữ liệu mẫu** (không phải dữ liệu nghiệp vụ thực tế).

## 1) Công nghệ sử dụng

- HTML
- CSS
- JavaScript thuần
- Không backend (MVP)

## 2) Cấu trúc file

- `index.html`
- `style.css`
- `script.js`
- `data/questions.json`
- `bai-hoc/index.html`
- `on-bai/index.html`
- `assets/supply-hero.svg`

## 3) Chạy local

### Cách nhanh bằng VS Code Live Server
1. Mở thư mục dự án.
2. Cài extension **Live Server** (nếu chưa có).
3. Chuột phải `index.html` → **Open with Live Server**.

### Cách dùng Python
```bash
python3 -m http.server 5500
```
Mở: `http://localhost:5500`

## 4) Deploy lên GitHub Pages

1. Push code lên GitHub repository.
2. Vào **Settings** → **Pages**.
3. Tại mục **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: chọn `main` (hoặc branch bạn dùng), thư mục `/ (root)`
4. Nhấn **Save**.
5. Chờ 1-3 phút, GitHub sẽ cấp URL dạng:
   - `https://<username>.github.io/<repository>/`

## 5) Quản lý câu hỏi

Sửa file `data/questions.json` theo cấu trúc:

```json
{
  "tests": [
    {
      "id": "ten-bai-test",
      "name": "Tên hiển thị",
      "questions": [
        {
          "question": "Nội dung câu hỏi",
          "options": ["A", "B", "C", "D"],
          "answer": 0
        }
      ]
    }
  ]
}
```

- `answer` là index đáp án đúng (0 = A, 1 = B, 2 = C, 3 = D).


## 6) Bổ sung theo phản hồi
- Đã thêm thư mục `bai-hoc/` và `on-bai/` để tách khu vực học và ôn tập.
- Đã thêm hình minh họa trực quan hơn tại `assets/supply-hero.svg` ở trang chủ.
