# Higgsfield: kịch bản & prompt video quảng cáo Ms Van English

Mục tiêu: video dọc 9:16, 20–30 giây, cho TikTok / Reels / Shorts. Ghép các clip Higgsfield (người thật do AI tạo, chuyển động camera điện ảnh) với **màn hình thật** của web (`video/ad/shots/*.jpg`) và video dựng sẵn `public/video/msvan-ad-9x16.mp4`.

> Ghi chú: tên preset chuyển động trong Higgsfield có thể khác theo phiên bản (ví dụ *Crash Zoom In*, *Dolly In*, *Arc Left/Right*, *Handheld*, *Snorricam*, *FPV Drone*, *Bullet Time*). Chọn preset gần nhất với gợi ý bên dưới. Prompt viết bằng tiếng Anh vì mô hình hiểu tốt hơn, còn chữ trên màn hình thì thêm sau bằng CapCut.

## Bảng màu & chữ (dùng khi chèn chữ trong CapCut)
- Tím lavender `#C9C7F6`, tím đậm `#2F27A8`, cam đào `#F6A46E`, nâu chữ `#5A2A0C`, nền tối `#1C1B22`
- Font: **Be Vietnam Pro ExtraBold**; chữ trắng viền đen hoặc chữ trên nền khối cam/đen nghiêng ±2°
- Logo: khối vuông bo góc màu cam, chữ **V** nâu

## Ý tưởng chính: "POV: con tự học tiếng Anh mà mẹ không phải nhắc"
Trend POV + before/after. Nhịp nhạc 120 BPM, cắt cảnh theo phách (0,5 giây).

| # | Thời lượng | Loại | Ảnh khung đầu (Image-to-Video) | Prompt Higgsfield | Chuyển động camera | Chữ trên màn hình |
|---|---|---|---|---|---|---|
| 1 | 2s | Text-to-video | — | `Vertical 9:16. A Vietnamese mother in a cozy living room at night, peeking around a doorway with a surprised, delighted face, warm lamp light, shallow depth of field, cinematic, realistic skin texture` | Crash Zoom In vào khuôn mặt | **POV:** con tự học tiếng Anh 😮 |
| 2 | 2s | Text-to-video | — | `Vertical 9:16. A Vietnamese middle-school student in uniform sitting at a desk, focused, tapping answers on a smartphone, soft lavender and peach color grade, bokeh fairy lights, cinematic` | Dolly In chậm | mà mẹ không phải nhắc |
| 3 | 3s | Image-to-video | `shots/dashboard.jpg` (đặt trong mockup điện thoại) | `A smartphone screen showing an English learning dashboard, the phone floats and tilts slightly, glossy reflections, lavender gradient background, product commercial style` | Arc Right + nghiêng nhẹ | Mở web là biết **Hôm nay học gì?** |
| 4 | 3s | Image-to-video | `shots/toeic.jpg` hoặc `shots/thpt.jpg` | `Smartphone with exam practice app, numbers and cards burst out of the screen in 3D, energetic, studio lighting, peach and purple palette` | Crash Zoom Out | **195** đề TOEIC · **68** đề THPT · **40** đề vào 10 |
| 5 | 3s | Image-to-video | `shots/game.jpg` | `A phone game screen comes alive: colorful vocabulary balloons and a cartoon frog pop out of the phone, playful, kids-friendly 3D style, bright` | Handheld nhẹ | Học một chút · **chơi một lượt 🎮** |
| 6 | 3s | Text-to-video | — | `Vertical 9:16. A Vietnamese teenage girl wearing earphones, speaking English confidently to her phone, sound wave graphics glow around her, evening bedroom, cinematic, natural smile` | Snorricam / Dolly In | Ngại nói? **Nói với AI 🎙️** (Maya · Alex · Sam · Milo) |
| 7 | 2s | Image-to-video | `shots/truyen.jpg` | `Pages of an English picture book fly out of a phone screen and flutter in the air, warm golden light, magical, storybook feel` | Arc Left | Đọc truyện **có giọng đọc 🔊** |
| 8 | 3s | Text-to-video | — | `Vertical 9:16. A student taking an online exam on a laptop in a quiet room, a green face-tracking box and a small red REC dot overlay, serious but calm, cinematic thriller lighting` | Dolly In nhanh | **Thi thật** có giám thị AI 👀 |
| 9 | 3s | Text-to-video | — | `Vertical 9:16. The same student jumps happily holding a test paper with a high score, mother hugs from the side, confetti, warm living room, joyful, cinematic` | Bullet Time / Crash Zoom In | Điểm tăng thật sự 🎉 |
| 10 | 3s | Ghép sẵn | Cảnh cuối của `public/video/msvan-ad-9x16.mp4` (27–31s) | — | — | **msvanhomework.site** · 💬 Nhắn cô để nhận tài khoản |

### Cách dựng nhanh
1. Tạo clip 1, 2, 6, 8, 9 bằng **Text-to-Video** (9:16, 5 giây, chọn đoạn đẹp nhất).
2. Clip 3, 4, 5, 7: đặt ảnh `video/ad/shots/*.jpg` vào khung điện thoại (Canva/Figma), xuất ảnh 1080×1920 rồi dùng **Image-to-Video**.
3. Ghép trong CapCut: nhạc trend 120 BPM (hoặc `video/ad/music.wav`), cắt mỗi clip trên phách, thêm hiệu ứng *zoom punch* và *flash* ở mỗi lần đổi cảnh, phụ đề tự động kiểu "highlight từng từ".
4. Kết bằng 3 giây CTA lấy từ `public/video/msvan-ad-9x16.mp4`.

## Ý tưởng trend khác (dùng lại các prompt trên)
- **"Một ngày của học sinh lớp 9 ôn thi vào 10"**: vlog nhanh 6 cảnh (sáng đi học → chiều làm đề vào 10 → tối chơi game từ vựng → nói với AI).
- **Before / After**: nửa trái "lật sách mãi không vào", nửa phải "15 phút trên Ms Van English". Prompt: `split screen, left side gloomy desaturated student bored with textbook, right side bright colorful student smiling with phone`.
- **"Đố mẹ biết con học gì hôm nay"**: phụ huynh mở tài khoản phụ huynh xem kết quả. Prompt: `a Vietnamese mother reading her child's progress on a phone, proud smile, morning kitchen, soft light`.
- **Thử thách 7 ngày liên tiếp**: dùng chuỗi ngày học và "Vườn từ" trong phần trò chơi, mỗi ngày một clip 2 giây.

## Lưu ý
- Không dùng ảnh thật của các bé trong lớp nếu chưa có đồng ý của phụ huynh. Nhân vật do AI tạo thì không gặp vấn đề này.
- Số lượng đề và truyện lấy từ web ngày 21/11/2026, cần cập nhật nếu kho đề thay đổi.
- Ảnh màn hình chụp từ tài khoản học sinh thử nên đều là trạng thái chưa làm bài (0 đề, 0 phút). Muốn quảng cáo đẹp hơn thì chụp lại sau khi làm vài đề.
