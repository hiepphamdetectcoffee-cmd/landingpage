# Ms Van English · Landing page & video giới thiệu

Landing page giới thiệu [msvanhomework.site](https://msvanhomework.site) (React + Vite + Tailwind) và video giới thiệu 54 giây.

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

- File xuất: `public/video/msvan-intro.mp4` (53 giây, 1920×1080, 30fps, có nhạc nền) và ảnh bìa `public/video/msvan-intro-poster.jpg`.
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
| 25–32s | Thi thật có giám thị AI (camera AI, cảnh báo, điểm + mức tập trung) |
| 32–38s | Luyện nói với AI, truyện tranh, trò chơi, sổ từ |
| 38–45s | Phụ huynh & giáo viên, thông báo Zalo |
| 45–48s | Tài khoản riêng, an toàn dữ liệu |
| 48–53s | Kêu gọi: msvanhomework.site |

## Video quảng cáo dọc 9:16 (TikTok / Reels / Shorts)

- File xuất: `public/video/msvan-ad-9x16.mp4` (1080×1920, 31 giây, nhạc 120 BPM tự tổng hợp) và ảnh bìa `public/video/msvan-ad-9x16-poster.jpg`.
- Kịch bản: `video/ad/ad.html`. Dùng ảnh màn hình thật trong `video/ad/shots/` (chụp từ tài khoản học sinh thử, gói Pro).
- Xuất lại:

```bash
python3 video/ad/music.py
node video/render.mjs --src video/ad/ad.html --name msvan-ad-9x16 --w 1080 --h 1920 --poster 1.2 --music video/ad/music.wav
```

- Prompt và kịch bản cho Higgsfield: `video/ad/higgsfield-prompts.md`.
