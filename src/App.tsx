import React, { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Users, 
  Code2, 
  Terminal, 
  Briefcase, 
  ChevronRight, 
  Star, 
  Quote, 
  Clock, 
  Target, 
  Zap, 
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Monitor,
  ShieldCheck,
  Award
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-brand-accent p-1.5 rounded-lg">
            <Terminal className="text-brand-dark w-6 h-6" />
          </div>
          <span className={`text-xl font-bold font-display ${isScrolled ? 'text-brand-dark' : 'text-white md:text-brand-dark'}`}>
            IT <span className="text-brand-accent">English</span> Mastery
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#pain-points" className="text-sm font-medium hover:text-brand-accent transition-colors">Vấn đề</a>
          <a href="#outcomes" className="text-sm font-medium hover:text-brand-accent transition-colors">Kết quả</a>
          <a href="#curriculum" className="text-sm font-medium hover:text-brand-accent transition-colors">Lộ trình</a>
          <a href="#testimonials" className="text-sm font-medium hover:text-brand-accent transition-colors">Cảm nhận</a>
          <a href="#register" className="bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-brand-accent/20">
            Đăng ký ngay
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-brand-dark' : 'text-white'}`} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <a href="#pain-points" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Vấn đề</a>
              <a href="#outcomes" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Kết quả</a>
              <a href="#curriculum" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Lộ trình</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Cảm nhận</a>
              <a href="#register" onClick={() => setIsMenuOpen(false)} className="bg-brand-accent text-brand-dark px-6 py-3 rounded-xl text-center font-bold">
                Đăng ký học thử
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-dark">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-accent/20 via-transparent to-transparent"></div>
      <div className="grid grid-cols-12 h-full w-full">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="border-r border-white/5 h-full"></div>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full text-brand-accent text-sm font-bold mb-6">
            <Zap className="w-4 h-4" />
            <span>Dành riêng cho Developer, Tester, PM</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Đập tan rào cản tiếng Anh - <span className="text-brand-accent">Tự tin</span> làm việc trong môi trường Global
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
            Khóa học giao tiếp tiếng Anh thực chiến tập trung 100% vào phản xạ công việc. Không học ngữ pháp hàn lâm, chỉ học những gì IT cần để làm việc với khách hàng quốc tế.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#register" className="bg-brand-accent hover:bg-brand-accent-hover text-brand-dark px-8 py-4 rounded-xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-brand-accent/20">
              Đăng ký học thử miễn phí
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#register" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all flex items-center justify-center gap-2">
              Nhận tư vấn lộ trình
            </a>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img 
                  key={i} 
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  alt="Student" 
                  className="w-10 h-10 rounded-full border-2 border-brand-dark" 
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-white font-bold">500+</span> IT Professionals đã tham gia
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <img 
              src="https://picsum.photos/seed/it-meeting/800/600" 
              alt="IT Meeting with Japanese Clients" 
              className="w-full h-auto"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-card p-4 rounded-xl bg-white/10 border-white/20 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-bold uppercase tracking-wider">Live Session</span>
                </div>
                <p className="text-sm font-medium">"Làm thế nào để giải thích Bug logic một cách khéo léo?"</p>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-accent/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const PainPointsSection = () => {
  const points = [
    { icon: <MessageCircle className="w-6 h-6" />, text: "Đọc hiểu tài liệu (Documentation) tốt nhưng không thể mở lời trong các buổi họp" },
    { icon: <Code2 className="w-6 h-6" />, text: "Lúng túng trong các buổi Standup, Daily, Sprint Review vì không biết diễn đạt ý tưởng" },
    { icon: <Users className="w-6 h-6" />, text: "Thiếu tự tin khi làm việc trực tiếp với khách hàng hoặc đồng nghiệp nước ngoài" },
    { icon: <ShieldCheck className="w-6 h-6" />, text: "Không thể giải thích Bug hoặc các vấn đề kỹ thuật phức tạp một cách rõ ràng, mạch lạc" },
    { icon: <Briefcase className="w-6 h-6" />, text: "Giao tiếp qua Email/Chat còn lủng củng, sợ dùng sai từ khiến đối tác hiểu lầm" },
    { icon: <Clock className="w-6 h-6" />, text: "Sợ phỏng vấn bằng tiếng Anh cho các dự án Global hoặc các công ty Big Tech" },
  ];

  return (
    <section id="pain-points" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn có đang gặp phải những <span className="text-red-500">nỗi đau</span> này?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Đừng để rào cản ngôn ngữ giới hạn tiềm năng sự nghiệp của một lập trình viên giỏi.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-start"
            >
              <div className="bg-red-50 p-3 rounded-xl text-red-500 shrink-0">
                {point.icon}
              </div>
              <p className="text-slate-700 font-medium leading-relaxed">{point.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const OutcomesSection = () => {
  const outcomes = [
    { title: "Làm chủ Daily Standup", desc: "Tự tin báo cáo 'What I did yesterday', 'What I'll do today' và 'Blockers' một cách trôi chảy.", icon: <Calendar /> },
    { title: "Giải thích Bug chuyên nghiệp", desc: "Biết cách trình bày 'Steps to reproduce', 'Expected result' và 'Actual result' mạch lạc.", icon: <ShieldCheck /> },
    { title: "Kỹ năng Q&A & Clarification", desc: "Sử dụng các cấu trúc 'Let me clarify...', 'Can you confirm...?' để xác nhận yêu cầu chuẩn xác.", icon: <MessageCircle /> },
    { title: "Email & Chat chuẩn quốc tế", desc: "Viết Email, Slack message chuyên nghiệp, ngắn gọn và hiệu quả theo phong cách Global.", icon: <Award /> },
    { title: "Đàm phán & Thương lượng", desc: "Kỹ năng đàm phán deadline, nguồn lực và giải quyết conflict trong team bằng tiếng Anh.", icon: <Clock /> },
    { title: "Phỏng vấn tự tin", desc: "Vượt qua các vòng phỏng vấn kỹ thuật và văn hóa tại các tập đoàn đa quốc gia.", icon: <Target /> },
  ];

  return (
    <section id="outcomes" className="section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sau khóa học, bạn sẽ <span className="text-brand-accent">làm được gì?</span></h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Chúng tôi cam kết đầu ra dựa trên năng lực phản xạ thực tế, không chỉ là lý thuyết suông.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outcomes.map((item, index) => (
            <div key={index} className="group p-8 rounded-3xl border border-slate-100 hover:border-brand-accent/30 hover:bg-brand-accent/5 transition-all duration-300">
              <div className="w-14 h-14 bg-slate-100 group-hover:bg-brand-accent rounded-2xl flex items-center justify-center mb-6 text-brand-dark group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CurriculumSection = () => {
  const modules = [
    { id: 1, title: "Workplace Communication Basics", desc: "Small talk, văn hóa làm việc Global, cách viết Email/Slack chuyên nghiệp." },
    { id: 2, title: "IT Vocabulary & Expressions", desc: "Hệ thống thuật ngữ IT thông dụng và các cấu trúc diễn đạt logic lập trình." },
    { id: 3, title: "Daily Standup & Reporting", desc: "Mô phỏng Standup, báo cáo tiến độ và trình bày vấn đề (Blockers) hiệu quả." },
    { id: 4, title: "Explaining Bugs & Technical Issues", desc: "Kỹ năng trình bày lỗi, nguyên nhân và đề xuất phương án xử lý kỹ thuật." },
    { id: 5, title: "Asking Questions & Clarifying", desc: "Kỹ năng Q&A, xác nhận Spec, xử lý khi chưa hiểu rõ yêu cầu từ khách hàng." },
    { id: 6, title: "Client Communication & Meetings", desc: "Giao tiếp trực tiếp trong các buổi họp Sprint Planning, Review và Demo." },
    { id: 7, title: "Interview & Self-Introduction", desc: "Xây dựng Profile IT ấn tượng và luyện tập phỏng vấn chuyên sâu bằng tiếng Anh." },
  ];

  return (
    <section id="curriculum" className="section-padding bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Lộ trình học tập <br /><span className="text-brand-accent">chuẩn thực chiến</span></h2>
            <p className="text-slate-400 text-lg mb-12 max-w-md">
              7 Module được thiết kế khoa học, đi từ nền tảng đến các tình huống phức tạp nhất trong dự án IT.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="bg-brand-accent p-2 rounded-lg text-brand-dark">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Lớp học quy mô nhỏ</h4>
                  <p className="text-sm text-slate-400">Tối đa 10 học viên để đảm bảo tương tác.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <div className="bg-brand-accent p-2 rounded-lg text-brand-dark">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold">Học qua Role-play</h4>
                  <p className="text-sm text-slate-400">80% thời lượng là thực hành hội thoại.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {modules.map((mod) => (
              <motion.div 
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-white/5 hover:bg-white/10 p-6 rounded-2xl border border-white/10 transition-all"
              >
                <div className="flex gap-6">
                  <span className="text-3xl font-black text-white/10 group-hover:text-brand-accent/30 transition-colors">0{mod.id}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-brand-accent transition-colors">{mod.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const USPSection = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-slate-900 rounded-[3rem] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 pointer-events-none"></div>
        <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Tại sao chọn <span className="text-brand-accent">IT English Mastery?</span></h2>
            <div className="space-y-8">
              {[
                { title: "Chuyên biệt cho IT", desc: "Không dạy tiếng Anh giao tiếp đại trà. Mọi tình huống đều xoay quanh dự án phần mềm thực tế." },
                { title: "Giảng viên là Senior/Lead", desc: "Những người có kinh nghiệm làm việc lâu năm trong các dự án Global và Big Tech." },
                { title: "Học qua mô phỏng", desc: "Mỗi buổi học là một buổi Standup, một buổi Sprint Review thực tế." },
                { title: "Tập trung phản xạ", desc: "Loại bỏ thói quen dịch từ Việt sang Anh. Hình thành tư duy phản xạ trực tiếp bằng tiếng Anh." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="mt-1">
                    <CheckCircle2 className="text-brand-accent w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="bg-white p-8 rounded-3xl shadow-2xl">
              <h3 className="text-brand-dark font-bold text-xl mb-6 text-center">So sánh với học truyền thống</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-sm font-medium">Học ngữ pháp & từ vựng hàn lâm</span>
                  <X className="text-red-500 w-5 h-5" />
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-sm font-bold text-green-700">Học phản xạ dự án IT thực tế</span>
                  <CheckCircle2 className="text-green-600 w-5 h-5" />
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-sm font-medium">Chủ đề giao tiếp chung chung</span>
                  <X className="text-red-500 w-5 h-5" />
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-sm font-bold text-green-700">Thuật ngữ & Scenario IT</span>
                  <CheckCircle2 className="text-green-600 w-5 h-5" />
                </div>
                <div className="flex justify-between items-center p-3 bg-red-50 rounded-xl">
                  <span className="text-sm font-medium">Ngại nói, sợ sai ngữ pháp</span>
                  <X className="text-red-500 w-5 h-5" />
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <span className="text-sm font-bold text-green-700">80% thời lượng thực hành nói</span>
                  <CheckCircle2 className="text-green-600 w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => {
  const reviews = [
    { name: "Nguyễn Minh", role: "Senior Developer", content: "Trước đây mình rất ngại nói tiếng Anh trong các buổi Sprint Review. Sau khóa học, mình đã có thể tự tin trình bày giải pháp và thảo luận trực tiếp với khách hàng US.", img: "https://picsum.photos/seed/dev1/100/100" },
    { name: "Trần Lan", role: "QA / Tester", content: "Cách giải thích bug bằng tiếng Anh giờ đây trở nên tự nhiên hơn rất nhiều. Mình không còn phải dùng Google Translate cho mọi Email hay Slack message nữa.", img: "https://picsum.photos/seed/qa1/100/100" },
    { name: "Lê Hoàng", role: "Project Manager", content: "Lộ trình cực kỳ sát thực tế. Những cấu trúc như 'Let me clarify...' hay 'The issue occurs when...' giúp mình điều phối cuộc họp chuyên nghiệp hơn hẳn.", img: "https://picsum.photos/seed/brse1/100/100" },
  ];

  return (
    <section id="testimonials" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Học viên nói gì về chúng tôi?</h2>
          <p className="text-slate-600">Câu chuyện thành công từ những người đã thay đổi sự nghiệp nhờ tiếng Nhật IT.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 relative">
              <Quote className="absolute top-6 right-8 text-slate-100 w-12 h-12" />
              <div className="flex gap-1 text-brand-accent mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-slate-700 italic mb-8 relative z-10">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-brand-dark">{review.name}</h4>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RegistrationSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    goal: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 800);
  };

  return (
    <section id="register" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-brand-primary opacity-[0.02] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">Bắt đầu hành trình <br /><span className="text-brand-accent">chinh phục</span> dự án Global</h2>
            <p className="text-slate-600 text-lg mb-8">
              Chỉ còn 5 suất ưu đãi giảm 30% học phí cho khóa học tháng tới. Đăng ký ngay để nhận tư vấn lộ trình cá nhân hóa miễn phí.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-medium">Kiểm tra trình độ & Phản xạ miễn phí</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-medium">Học thử 1 buổi thực chiến không mất phí</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-medium">Tặng bộ tài liệu English for IT độc quyền</span>
              </div>
            </div>

            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 inline-block">
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Hotline tư vấn 24/7</p>
              <div className="flex items-center gap-3 text-2xl font-bold text-brand-dark">
                <Phone className="text-brand-accent" />
                <span>1900 8888 XX</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Đăng ký thành công!</h3>
                  <p className="text-slate-600">Cảm ơn bạn đã quan tâm. Đội ngũ tư vấn sẽ liên hệ với bạn trong vòng 24h tới.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-brand-accent font-bold hover:underline"
                  >
                    Gửi lại form khác
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold mb-8">Thông tin đăng ký</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Họ và tên *</label>
                      <input 
                        required
                        type="text" 
                        placeholder="VD: Nguyễn Văn A"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Số điện thoại *</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="090..."
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                          value={formState.phone}
                          onChange={(e) => setFormState({...formState, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Email *</label>
                        <input 
                          required
                          type="email" 
                          placeholder="email@company.com"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                          value={formState.email}
                          onChange={(e) => setFormState({...formState, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Vị trí công việc</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all bg-white"
                        value={formState.role}
                        onChange={(e) => setFormState({...formState, role: e.target.value})}
                      >
                        <option value="">Chọn vị trí</option>
                        <option value="dev">Developer</option>
                        <option value="tester">Tester / QA</option>
                        <option value="brse">BrSE / Comtor</option>
                        <option value="pm">PM / Manager</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Mục tiêu học tập</label>
                      <textarea 
                        rows={3}
                        placeholder="VD: Muốn tự tin họp Daily với khách hàng..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
                        value={formState.goal}
                        onChange={(e) => setFormState({...formState, goal: e.target.value})}
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-brand-accent hover:bg-brand-accent-hover text-brand-dark py-4 rounded-xl text-lg font-bold transition-all shadow-xl shadow-brand-accent/20 mt-4"
                    >
                      Đăng ký ngay
                    </button>
                    <p className="text-center text-xs text-slate-400 mt-4">
                      Bằng cách đăng ký, bạn đồng ý với chính sách bảo mật của chúng tôi.
                    </p>
                  </form>
                </>
              )}
            </div>
            {/* Decorative blobs */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/10 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark text-white pt-20 pb-10 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-brand-accent p-1.5 rounded-lg">
              <Terminal className="text-brand-dark w-6 h-6" />
            </div>
            <span className="text-xl font-bold font-display">
              IT <span className="text-brand-accent">English</span> Mastery
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Hệ thống đào tạo tiếng Anh giao tiếp thực chiến hàng đầu cho nhân sự ngành IT tại Việt Nam.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-accent hover:text-brand-dark transition-all">
              <Users className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Khóa học</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-brand-accent transition-colors">Tiếng Anh IT Cơ bản</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Giao tiếp Global thực chiến</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Luyện phỏng vấn IT English</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">English for QA/Tester</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Liên kết</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#pain-points" className="hover:text-brand-accent transition-colors">Về chúng tôi</a></li>
            <li><a href="#curriculum" className="hover:text-brand-accent transition-colors">Lộ trình học</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Blog chia sẻ</a></li>
            <li><a href="#" className="hover:text-brand-accent transition-colors">Chính sách bảo mật</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-6">Liên hệ</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
              <span>Tòa nhà IT Hub, Duy Tân, Cầu Giấy, Hà Nội</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-accent shrink-0" />
              <span>1900 8888 XX</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-accent shrink-0" />
              <span>contact@itenglish.edu.vn</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
        <p>© 2026 IT English Mastery. All rights reserved. Designed for high-performing IT professionals.</p>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-brand-dark">
      <Navbar />
      <main>
        <HeroSection />
        <PainPointsSection />
        <OutcomesSection />
        <CurriculumSection />
        <USPSection />
        <TestimonialsSection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
}
