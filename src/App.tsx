import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gamepad2,
  GraduationCap,
  Heart,
  Library,
  LineChart,
  LogIn,
  Menu,
  MessageCircle,
  Mic,
  Play,
  Presentation,
  Quote,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  X,
  AlertCircle,
  BookMarked,
  Smile,
} from 'lucide-react';

import { db, auth } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const SITE = 'https://msvanhomework.site';
const LINKS = {
  student: `${SITE}/login/student`,
  parent: `${SITE}/login/parent`,
  teacher: `${SITE}/login/teacher`,
  about: `${SITE}/ve-chung-toi`,
  privacy: `${SITE}/chinh-sach-bao-mat`,
};

const VIDEO_SRC = '/video/msvan-intro.mp4';
const VIDEO_POSTER = '/video/msvan-intro-poster.jpg';

// ---------------------------------------------------------------------------
// Small building blocks
// ---------------------------------------------------------------------------

const BrandMark = ({ className = '' }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`inline-grid place-items-center rounded-xl bg-peach text-peach-ink font-extrabold ${className}`}
  >
    V
  </span>
);

const Eyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <span
    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
      dark ? 'bg-white/10 text-lav' : 'bg-primary-soft text-primary-ink'
    }`}
  >
    {children}
  </span>
);

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const NAV = [
  { href: '#video', label: 'Video' },
  { href: '#tinh-nang', label: 'Tính năng' },
  { href: '#lop-hoc', label: 'Lớp học' },
  { href: '#bat-dau', label: 'Cách bắt đầu' },
  { href: '#hoi-dap', label: 'Hỏi đáp' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors ${
        scrolled ? 'bg-frame/95 backdrop-blur shadow-lg' : 'bg-frame'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2.5 text-lg font-bold text-white">
          <BrandMark className="h-9 w-9 text-lg" />
          Ms Van English
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={LINKS.student}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white/85 hover:text-white"
          >
            <LogIn className="h-4 w-4" /> Đăng nhập
          </a>
          <a
            href="#dang-ky"
            className="rounded-full bg-peach px-5 py-2.5 text-sm font-bold text-peach-ink transition hover:brightness-105"
          >
            Đăng ký tư vấn
          </a>
        </div>

        <button
          className="rounded-lg p-2 text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Đóng menu' : 'Mở menu'}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-frame md:hidden"
            aria-label="Điều hướng di động"
          >
            <div className="space-y-1 px-4 py-4">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 font-medium text-white/85 hover:bg-white/10"
                >
                  {n.label}
                </a>
              ))}
              <div className="grid grid-cols-2 gap-2 pt-3">
                <a href={LINKS.student} className="rounded-full border border-white/20 py-3 text-center text-sm font-semibold text-white">
                  Đăng nhập
                </a>
                <a
                  href="#dang-ky"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-peach py-3 text-center text-sm font-bold text-peach-ink"
                >
                  Đăng ký tư vấn
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

const HeroMockup = () => (
  <div className="relative mx-auto w-full max-w-md">
    <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/30 blur-2xl" aria-hidden="true" />
    <div className="rounded-[2rem] bg-frame p-3 shadow-2xl">
      <div className="rounded-[1.5rem] bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold">
            <BrandMark className="h-7 w-7 text-sm" /> Ms Van
          </div>
          <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-primary-ink">Tổng quan</span>
        </div>

        <div className="card mb-3 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">Bài cô giao hôm nay</p>
          <p className="mt-1 font-bold">Unit 5 · Reading &amp; Vocabulary</p>
          <div className="mt-3 h-2 rounded-full bg-primary-soft">
            <div className="h-2 w-2/3 rounded-full bg-primary" />
          </div>
          <p className="mt-2 text-xs text-muted">Đã làm 8/12 câu</p>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="card p-4">
            <LineChart className="mb-2 h-5 w-5 text-primary-ink" />
            <p className="text-sm font-bold">Luyện TOEIC</p>
            <p className="text-xs text-muted">Lưu tiến độ giữa chừng</p>
          </div>
          <div className="card p-4">
            <Mic className="mb-2 h-5 w-5 text-peach-ink" />
            <p className="text-sm font-bold">Nói với AI</p>
            <p className="text-xs text-muted">Luyện phát âm, phản xạ</p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-peach-soft p-4">
          <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-peach-ink" />
          <div>
            <p className="text-xs font-semibold text-peach-ink">Nhận xét của cô</p>
            <p className="text-sm text-peach-ink/90">“Con đọc to và rõ hơn rồi đó! Cố gắng thêm phần từ vựng nhé.”</p>
          </div>
        </div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 }}
      className="absolute -right-6 -top-5 hidden rounded-2xl bg-white px-4 py-3 shadow-xl sm:block"
    >
      <p className="flex items-center gap-2 text-sm font-bold">
        <CalendarCheck className="h-4 w-4 text-primary-ink" /> Đã điểm danh
      </p>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8 }}
      className="absolute -left-8 -bottom-6 hidden rounded-2xl bg-white px-4 py-3 shadow-xl sm:block"
    >
      <p className="flex items-center gap-2 text-sm font-bold">
        <Smartphone className="h-4 w-4 text-peach-ink" /> Báo về Zalo phụ huynh
      </p>
    </motion.div>
  </div>
);

const Hero = () => (
  <section id="top" className="relative overflow-hidden bg-lav pt-28 pb-16 md:pt-36 md:pb-24">
    <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Eyebrow>
          <Sparkles className="h-3.5 w-3.5" /> Lớp tiếng Anh của Ms Van
        </Eyebrow>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-6xl">
          Trên lớp học cùng cô.
          <br />
          <span className="text-primary-ink">Về nhà luyện tiếp</span> cùng Ms Van English.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-ink/75">
          Không gian học tiếng Anh trực tuyến cho học sinh, phụ huynh và giáo viên: làm bài cô giao, luyện đề TOEIC, IELTS,
          THPT, đọc truyện tranh có giọng đọc, chơi trò chơi từ vựng và luyện nói với AI. Phụ huynh theo dõi được kết quả của con
          mỗi ngày.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href="#dang-ky"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-frame px-7 py-4 font-bold text-white transition hover:bg-frame-2"
          >
            Đăng ký tư vấn lớp học <ArrowRight className="h-5 w-5" />
          </a>
          <a
            href="#video"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-bold text-ink transition hover:bg-white/80"
          >
            <Play className="h-5 w-5 fill-current" /> Xem video giới thiệu
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-ink/75">
          {['Tài khoản riêng do cô cấp', 'Học trên điện thoại & máy tính', 'Kết nối Zalo'].map((t) => (
            <li key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary-ink" /> {t}
            </li>
          ))}
        </ul>
      </motion.div>

      <HeroMockup />
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Video
// ---------------------------------------------------------------------------

const VideoSection = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    ref.current?.play();
  };

  return (
    <section id="video" className="section bg-frame text-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <Eyebrow dark>Video giới thiệu · 0:46</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Một vòng Ms Van English</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Xem cách các con làm bài, luyện đề, luyện nói và cách phụ huynh, giáo viên đồng hành trên cùng một nền tảng.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="relative overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
          <video
            ref={ref}
            className="aspect-video w-full"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            controls={playing}
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
          >
            Trình duyệt của bạn không hỗ trợ video.
          </video>
          {!playing && (
            <button
              onClick={play}
              className="group absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/45 via-transparent to-transparent p-4 md:p-8"
              aria-label="Phát video giới thiệu"
            >
              <span className="inline-flex items-center gap-3 rounded-full bg-peach py-2 pl-2 pr-5 font-bold text-peach-ink shadow-xl transition group-hover:scale-105 md:gap-4 md:pr-7 md:text-lg">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-peach-ink text-peach md:h-14 md:w-14">
                  <Play className="ml-0.5 h-5 w-5 fill-current md:h-6 md:w-6" />
                </span>
                Xem video · 0:46
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

const ROLES = [
  {
    tag: 'HS',
    title: 'Học sinh',
    desc: 'Bài được giao, luyện TOEIC và IELTS, điểm danh và nhận xét của giáo viên.',
    points: ['Làm bài cô giao mỗi tuần', 'Luyện đề trắc nghiệm có chấm điểm', 'Luyện nói với AI', 'Sổ từ của tôi'],
    href: LINKS.student,
    cta: 'Đăng nhập học sinh',
    tone: 'bg-primary-soft text-primary-ink',
  },
  {
    tag: 'PH',
    title: 'Phụ huynh',
    desc: 'Theo dõi bài tập, kết quả, điểm danh và lộ trình học của con.',
    points: ['Xem con đã làm bài chưa', 'Điểm số và nhận xét của cô', 'Lịch sử điểm danh', 'Nhận thông báo qua Zalo'],
    href: LINKS.parent,
    cta: 'Dành cho phụ huynh',
    tone: 'bg-peach-soft text-peach-ink',
  },
  {
    tag: 'GV',
    title: 'Giáo viên',
    desc: 'Giao bài, chấm bài, điểm danh, kết nối Zalo và quản lý lớp.',
    points: ['Giao bài theo lớp', 'Chấm bài, nhận xét từng bạn', 'Điểm danh nhanh', 'Xem lịch sử luyện nói'],
    href: LINKS.teacher,
    cta: 'Không gian giáo viên',
    tone: 'bg-lav text-ink',
  },
];

const RolesSection = () => (
  <section className="section">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
        <Eyebrow>Một nền tảng · ba góc nhìn</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Ai cũng có chỗ của mình</h2>
        <p className="mt-4 text-muted">
          Mỗi người dùng có tài khoản riêng do giáo viên cấp. Dữ liệu học tập chỉ người có quyền mới xem được.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {ROLES.map((r, i) => (
          <motion.article
            key={r.tag}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="card flex flex-col p-7"
          >
            <span className={`grid h-14 w-14 place-items-center rounded-2xl text-lg font-extrabold ${r.tone}`}>{r.tag}</span>
            <h3 className="mt-5 text-2xl font-bold">Tôi là {r.title.toLowerCase()}</h3>
            <p className="mt-2 text-muted">{r.desc}</p>
            <ul className="mt-5 flex-1 space-y-2.5">
              {r.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-ink" /> {p}
                </li>
              ))}
            </ul>
            <a
              href={r.href}
              className="mt-7 inline-flex items-center gap-1.5 font-bold text-link hover:text-primary-ink"
            >
              {r.cta} <ArrowRight className="h-4 w-4" />
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

const FEATURES = [
  { icon: ClipboardCheck, title: 'Bài cô giao', desc: 'Làm bài tập về nhà ngay trên web, nộp bài và nhận kết quả, nhận xét của cô.' },
  { icon: LineChart, title: 'Luyện thi TOEIC', desc: 'Làm đề có chấm điểm, lưu tiến độ giữa chừng và xem lại từng phần sau khi nộp.' },
  { icon: GraduationCap, title: 'Luyện thi IELTS', desc: 'Luyện từng kỹ năng theo thời gian gợi ý. Bản nháp lưu trên máy chủ, làm tiếp trên thiết bị khác.' },
  { icon: FileText, title: 'Kho đề phong phú', desc: 'Đề THPT, đề vào 10, đề theo lớp, đề học sinh giỏi và đề trắc nghiệm do giáo viên chuẩn bị.' },
  { icon: Mic, title: 'Luyện nói với AI', desc: 'Trò chuyện, luyện phát âm và phản xạ bất cứ lúc nào. Giáo viên xem lại được lịch sử luyện nói.' },
  { icon: BookOpen, title: 'Truyện tranh có giọng đọc', desc: 'Đọc truyện kèm giọng đọc chuẩn, vừa nghe vừa học từ mới theo ngữ cảnh.' },
  { icon: Gamepad2, title: 'Trò chơi từ vựng', desc: 'Học mà chơi, chơi mà học. Ôn từ vựng nhẹ nhàng để các con nhớ lâu hơn.' },
  { icon: BookMarked, title: 'Sổ từ của tôi', desc: 'Lưu lại những từ mới của riêng mình để ôn tập bất cứ lúc nào.' },
  { icon: CalendarCheck, title: 'Điểm danh & lịch sử học', desc: 'Theo dõi chuyên cần và toàn bộ quá trình học của từng bạn theo lộ trình.' },
  { icon: MessageCircle, title: 'Kết nối Zalo', desc: 'Giáo viên kết nối Zalo để thông tin học tập đến với phụ huynh nhanh hơn.' },
];

const FeaturesSection = () => (
  <section id="tinh-nang" className="section bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mb-12 max-w-2xl">
        <Eyebrow>Tính năng</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Mọi thứ để luyện tiếng Anh mỗi ngày</h2>
        <p className="mt-4 text-muted">
          Ngoài giờ trên lớp, các con luyện tiếp trên website: làm bài cô giao, đọc truyện tranh có giọng đọc, chơi trò chơi từ
          vựng và luyện đề.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            {...fadeUp}
            transition={{ duration: 0.4, delay: (i % 5) * 0.06 }}
            className="rounded-3xl bg-surface p-6 transition hover:-translate-y-1 hover:bg-primary-soft"
          >
            <f.icon className="h-7 w-7 text-primary-ink" />
            <h3 className="mt-4 font-bold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Classroom
// ---------------------------------------------------------------------------

const CLASSROOM = [
  { icon: BookOpen, title: 'Học bằng câu chuyện', desc: 'Các con ngồi quanh cô, nghe kể, trả lời câu hỏi và đoán xem chuyện gì xảy ra tiếp theo. Tiếng Anh đi vào tự nhiên qua từng trang sách.' },
  { icon: Users, title: 'Nói cùng giáo viên bản ngữ', desc: 'Giáo viên nước ngoài đứng lớp giúp các con quen giọng chuẩn, mạnh dạn hỏi và trả lời bằng tiếng Anh ngay trong giờ học.' },
  { icon: Presentation, title: 'Làm việc nhóm, tự tin thuyết trình', desc: 'Các con thảo luận theo nhóm, cùng làm phiếu bài tập và tự đứng lên trình bày bài trước lớp.' },
  { icon: Smile, title: 'Vui để nhớ lâu', desc: 'Trò chơi, tô màu, vẽ và những buổi sinh nhật nhỏ giữ cho giờ học luôn rộn ràng, để các con mong đến buổi học tiếp theo.' },
];

const ClassroomSection = () => (
  <section id="lop-hoc" className="section">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
      <motion.div {...fadeUp}>
        <Eyebrow>Các con học như thế nào</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Một lớp học nhỏ, ấm áp</h2>
        <p className="mt-5 text-lg text-muted">
          Nơi các con học tiếng Anh qua câu chuyện, trò chơi và những cuộc trò chuyện thật mỗi ngày. Cô theo sát từng bạn, khen
          đúng lúc và nhắc nhở khi con cần cố gắng hơn.
        </p>
        <a href={LINKS.about} className="mt-6 inline-flex items-center gap-1.5 font-bold text-link hover:text-primary-ink">
          Xem khoảnh khắc ở lớp <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CLASSROOM.map((c, i) => (
          <motion.div key={c.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.08 }} className="card p-6">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-peach-soft">
              <c.icon className="h-5 w-5 text-peach-ink" />
            </span>
            <h3 className="mt-4 text-lg font-bold">{c.title}</h3>
            <p className="mt-2 text-sm text-muted">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// How to start
// ---------------------------------------------------------------------------

const STEPS = [
  { n: '01', title: 'Đăng ký tư vấn', desc: 'Để lại thông tin, cô sẽ liên hệ để tư vấn lớp phù hợp với trình độ và mục tiêu của con.' },
  { n: '02', title: 'Cô cấp tài khoản', desc: 'Mỗi học sinh có tên đăng nhập và mật khẩu riêng do cô cấp. Phụ huynh có tài khoản để theo dõi.' },
  { n: '03', title: 'Học và theo dõi mỗi ngày', desc: 'Con làm bài, luyện đề, luyện nói. Kết quả, điểm danh và nhận xét được lưu theo tài khoản.' },
];

const StepsSection = () => (
  <section id="bat-dau" className="section bg-lav">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
        <Eyebrow>Cách bắt đầu</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Ba bước để vào lớp</h2>
      </motion.div>
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <motion.li key={s.n} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-3xl bg-white p-7">
            <span className="text-4xl font-extrabold text-primary">{s.n}</span>
            <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
            <p className="mt-2 text-muted">{s.desc}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// Testimonials + trust
// ---------------------------------------------------------------------------

const QUOTES = [
  'Chị thấy tiếng Anh ở trường con tiến bộ rõ rệt từ khi theo học bên em.',
  'Các con rất thích học cô luôn ý, đến giờ học là nhớ lắm. Nhờ cô dìu dắt con ạ.',
];

const TestimonialsSection = () => (
  <section className="section bg-frame text-white">
    <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
      <div>
        <Eyebrow dark>Phụ huynh nói gì</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Niềm vui của con là động lực của cô</h2>
        <div className="mt-8 space-y-4">
          {QUOTES.map((q) => (
            <motion.figure key={q} {...fadeUp} className="rounded-3xl bg-frame-2 p-6">
              <Quote className="h-6 w-6 text-peach" />
              <blockquote className="mt-3 text-lg">“{q}”</blockquote>
              <figcaption className="mt-3 text-sm text-white/55">Phụ huynh học sinh · tên đã được che</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <motion.div {...fadeUp} className="self-center rounded-3xl bg-white/5 p-8 ring-1 ring-white/10">
        <ShieldCheck className="h-10 w-10 text-lav" />
        <h3 className="mt-4 text-2xl font-bold">An toàn dữ liệu của con</h3>
        <ul className="mt-5 space-y-4 text-white/80">
          {[
            'Tài khoản do giáo viên cấp, không đăng ký tràn lan.',
            'Dữ liệu học tập lưu riêng theo từng tài khoản, chỉ người có quyền mới xem được.',
            'Mỗi tài khoản chỉ dùng trên một trình duyệt: đăng nhập ở máy mới sẽ đăng xuất máy cũ.',
            'Có chính sách bảo vệ dữ liệu cá nhân rõ ràng.',
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-lav" /> {t}
            </li>
          ))}
        </ul>
        <a href={LINKS.privacy} className="mt-6 inline-flex items-center gap-1.5 font-bold text-lav hover:text-white">
          Đọc chính sách bảo mật <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

const FAQS = [
  {
    q: 'Làm sao để có tài khoản Ms Van English?',
    a: 'Tài khoản do giáo viên cấp cho học sinh trong lớp. Phụ huynh hãy đăng ký tư vấn ở cuối trang hoặc liên hệ trực tiếp cô để được xếp lớp và nhận tài khoản.',
  },
  {
    q: 'Con học trên thiết bị nào?',
    a: 'Website chạy trên trình duyệt của điện thoại, máy tính bảng và máy tính. Mỗi tài khoản dùng trên một trình duyệt tại một thời điểm để bảo vệ dữ liệu.',
  },
  {
    q: 'Có những loại đề nào để luyện?',
    a: 'TOEIC, IELTS, đề THPT, đề vào 10, đề theo lớp, đề học sinh giỏi và các đề trắc nghiệm do giáo viên chuẩn bị. Kết quả được lưu theo tài khoản.',
  },
  {
    q: 'Phụ huynh theo dõi con như thế nào?',
    a: 'Phụ huynh đăng nhập bằng tài khoản riêng để xem bài tập, kết quả, điểm danh và lộ trình học của con. Giáo viên có thể kết nối Zalo để thông tin đến nhanh hơn.',
  },
  {
    q: 'Quên mật khẩu thì làm sao?',
    a: 'Hãy nhắn giáo viên để được đặt lại mật khẩu.',
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="hoi-dap" className="section bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <Eyebrow>Hỏi đáp</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Câu hỏi thường gặp</h2>
        </motion.div>
        <div className="space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="rounded-2xl bg-surface">
                <button
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-bold"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Registration (Firestore: consultations)
// ---------------------------------------------------------------------------

function logFirestoreError(error: unknown, path: string) {
  console.error(
    'Firestore error:',
    JSON.stringify({
      error: error instanceof Error ? error.message : String(error),
      operationType: 'create',
      path,
      userId: auth.currentUser?.uid,
    }),
  );
}

const ROLE_OPTIONS = [
  { value: 'parent', label: 'Phụ huynh' },
  { value: 'student', label: 'Học sinh' },
  { value: 'other', label: 'Khác' },
];

const RegistrationSection = () => {
  const [form, setForm] = useState({ name: '', phone: '', role: 'parent', grade: '', goal: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const phone = form.phone.replace(/[\s.-]/g, '');
    if (!/^\+?\d{9,15}$/.test(phone)) {
      setError('Số điện thoại chưa đúng. Vui lòng kiểm tra lại.');
      return;
    }
    setSubmitting(true);
    setError(null);
    const path = 'consultations';
    try {
      const data: Record<string, unknown> = {
        name: form.name.trim(),
        phone,
        role: form.role,
        createdAt: serverTimestamp(),
      };
      if (form.grade.trim()) data.grade = form.grade.trim();
      if (form.goal.trim()) data.goal = form.goal.trim();
      await addDoc(collection(db, path), data);
      setSubmitted(true);
    } catch (err) {
      setError('Đã có lỗi xảy ra. Vui lòng thử lại sau hoặc nhắn trực tiếp cho cô.');
      logFirestoreError(err, path);
    } finally {
      setSubmitting(false);
    }
  };

  const input =
    'w-full rounded-xl border border-line bg-white px-4 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary-soft';

  return (
    <section id="dang-ky" className="section bg-lav">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div {...fadeUp}>
          <Eyebrow>Học cùng Ms Van</Eyebrow>
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Đăng ký tư vấn lớp phù hợp với con</h2>
          <p className="mt-5 text-lg text-ink/75">
            Mỗi học sinh có tài khoản riêng do cô cấp. Để lại thông tin, cô sẽ liên hệ tư vấn lớp và lộ trình phù hợp.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: Heart, t: 'Lớp nhỏ, cô theo sát từng bạn' },
              { icon: Library, t: 'Kho đề và bài luyện dùng cả năm' },
              { icon: Users, t: 'Phụ huynh đồng hành cùng con' },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-3 font-semibold">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white">
                  <Icon className="h-5 w-5 text-primary-ink" />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp} className="rounded-[2rem] bg-white p-6 shadow-xl sm:p-8">
          {submitted ? (
            <div className="py-10 text-center" role="status">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft">
                <CheckCircle2 className="h-8 w-8 text-primary-ink" />
              </span>
              <h3 className="mt-5 text-2xl font-bold">Cảm ơn bạn!</h3>
              <p className="mt-2 text-muted">Cô đã nhận được thông tin và sẽ liên hệ sớm.</p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', phone: '', role: 'parent', grade: '', goal: '' });
                }}
                className="mt-6 font-bold text-link"
              >
                Gửi thêm một đăng ký
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">Họ và tên *</label>
                <input id="name" required maxLength={100} className={input} placeholder="Nguyễn Thị Hoa"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold">Số điện thoại / Zalo *</label>
                  <input id="phone" required type="tel" inputMode="tel" maxLength={20} className={input} placeholder="09xx xxx xxx"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="role" className="mb-1.5 block text-sm font-semibold">Bạn là *</label>
                  <select id="role" className={input} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    {ROLE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="grade" className="mb-1.5 block text-sm font-semibold">Con đang học lớp mấy?</label>
                <input id="grade" maxLength={50} className={input} placeholder="Ví dụ: Lớp 4, lớp 9 ôn thi vào 10…"
                  value={form.grade} onChange={(e) => setForm({ ...form, grade: e.target.value })} />
              </div>
              <div>
                <label htmlFor="goal" className="mb-1.5 block text-sm font-semibold">Mong muốn của bạn</label>
                <textarea id="goal" rows={3} maxLength={1000} className={input} placeholder="Ví dụ: con muốn tự tin giao tiếp, ôn thi TOEIC…"
                  value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} />
              </div>

              {error && (
                <p className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-sm text-red-700" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                </p>
              )}

              <button type="submit" disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-frame py-4 font-bold text-white transition hover:bg-frame-2 disabled:opacity-60">
                {submitting ? 'Đang gửi…' : <>Gửi đăng ký <ArrowRight className="h-5 w-5" /></>}
              </button>
              <p className="text-center text-xs text-muted">
                Thông tin chỉ dùng để cô liên hệ tư vấn. Xem{' '}
                <a href={LINKS.privacy} className="underline">chính sách bảo vệ dữ liệu cá nhân</a>.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const Footer = () => (
  <footer className="bg-frame py-12 text-white/70">
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
      <div>
        <a href="#top" className="flex items-center gap-2.5 text-lg font-bold text-white">
          <BrandMark className="h-9 w-9 text-lg" /> Ms Van English
        </a>
        <p className="mt-3 max-w-sm text-sm">Không gian học tiếng Anh của Ms Van cho học sinh, phụ huynh và giáo viên.</p>
      </div>
      <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm" aria-label="Liên kết chân trang">
        <a href={LINKS.student} className="hover:text-white">Đăng nhập học sinh</a>
        <a href={LINKS.parent} className="hover:text-white">Phụ huynh</a>
        <a href={LINKS.teacher} className="hover:text-white">Giáo viên</a>
        <a href={LINKS.about} className="hover:text-white">Về chúng tôi</a>
        <a href={LINKS.privacy} className="hover:text-white">Chính sách bảo mật</a>
      </nav>
    </div>
    <p className="mx-auto mt-10 max-w-7xl px-4 text-xs text-white/40 sm:px-6 lg:px-8">
      © {new Date().getFullYear()} Ms Van English · msvanhomework.site
    </p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">
        Đến nội dung chính
      </a>
      <Header />
      <main id="main">
        <Hero />
        <VideoSection />
        <RolesSection />
        <FeaturesSection />
        <ClassroomSection />
        <StepsSection />
        <TestimonialsSection />
        <FaqSection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
}
