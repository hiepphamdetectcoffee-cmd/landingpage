# Ms Van English · Landing page & video giới thiệu

Landing page giới thiệu [msvanhomework.site](https://msvanhomework.site) (React + Vite + Tailwind) và video giới thiệu 46 giây.

## Chạy landing page

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # xuất ra dist/
```

- Nội dung chính: `src/App.tsx` (hero, video, 3 vai trò HS/PH/GV, tính năng, lớp học, cách bắt đầu, phụ huynh nói gì, hỏi đáp, form đăng ký tư vấn).
- Màu và font lấy theo msvanhomework.site (`src/index.css`).
- Form đăng ký lưu vào Firestore, collection `consultations`. Cần deploy rules mới: `firebase deploy --only firestore:rules`.

## Video giới thiệu

- File xuất: `public/video/msvan-intro.mp4` (1920×1080, 30fps, có nhạc nền) và ảnh bìa `public/video/msvan-intro-poster.jpg`.
- Kịch bản/hoạt hình: `video/intro.html` (mở trực tiếp trong trình duyệt để xem trước, thêm `?t=12` để dừng ở giây 12).
- Xuất lại video (cần `ffmpeg` và Playwright/Chromium):

```bash
python3 video/music.py      # tạo nhạc nền video/music.wav (tổng hợp, không bản quyền)
node video/render.mjs       # render ra public/video/
```

| Thời gian | Cảnh |
|---|---|
| 0–5s | Logo Ms Van English |
| 5–11s | “Trên lớp học cùng cô. Về nhà luyện tiếp cùng Ms Van English.” |
| 11–18s | Học sinh làm bài cô giao, điểm và nhận xét |
| 18–25s | Kho đề: TOEIC, IELTS, THPT, vào 10, theo lớp, HSG |
| 25–31s | Luyện nói với AI, truyện tranh, trò chơi, sổ từ |
| 31–38s | Phụ huynh & giáo viên, thông báo Zalo |
| 38–41s | Tài khoản riêng, an toàn dữ liệu |
| 41–46s | Kêu gọi: msvanhomework.site |
