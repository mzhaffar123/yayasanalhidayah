// src/pages/Home.tsx
import { useState } from 'react';
import { Heart, Calendar, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getPrograms, getDonations, getNews, getActivities } from '../data/mockData';
import type { TestimonialItem } from '../data/mockData';
import ProgramCard from '../components/ProgramCard';
import DonationCard from '../components/DonationCard';
import CountUp from '../components/CountUp';
import heroImage from '../assets/homepage.jpeg';
import aboutImage from '../assets/tk.jpeg';

interface HomeProps {
  onNavigate: (page: string) => void,
  onSelectProgram: (id: string) => void,
  onSelectDonation: (id: string) => void,
  isLoading?: boolean,
}

export default function Home({ onNavigate, onSelectProgram, onSelectDonation, isLoading = true }: HomeProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pendidikan' | 'keagamaan' | 'sosial'>('all');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Load latest data from localStorage
  const allPrograms = getPrograms();
  const allDonations = getDonations();
  const allNews = getNews();
  const allActivities = getActivities();

  // Filter and limit data
  const filteredPrograms = activeTab === 'all' 
    ? allPrograms.slice(0, 4) 
    : allPrograms.filter(p => p.category === activeTab).slice(0, 4);

  const featuredDonations = allDonations.slice(0, 3);
  const latestNews = allNews.slice(0, 3);

  const testimonials: TestimonialItem[] = [
    {
      id: 't-1',
      name: 'Indri Mayasari',
      role: 'Murid Kelas Tahfidz Dewasa',
      quote: 'Alhamdulillah, belajar bersama Ustadz/ah sangat bermanfaat. Bacaan Al-Qur’an, tajwid, makhraj, dan hafalan saya menjadi lebih baik. Terima kasih atas bimbingan dan kesabarannya. Semoga Ustadz/ah dan Yayasan Bidayah Al Hidayah semakin sukses dalam berbagi. Aamiin.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 't-2',
      name: 'Naviati Wahidah',
      role: 'Murid Kelas Tahfidz Dewasa Offline',
      quote: 'Alhamdulillah, belajar bersama Ustadz/ah  sangat memberikan manfaat bagi saya. Bacaan Al-Qur’an menjadi lebih baik, lebih memahami tajwid, dan semakin mencintai Al-Qur’an. Jazakillāhu khairan atas ilmu, kesabaran, dan bimbingannya. Semoga menjadi amal jariyah yang terus mengalir. Aamiin. 🤲🏻🌷🌷',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 't-3',
      name: 'Bu Lisa Veronica',
      role: 'Murid Kelas Online Tahsin',
      quote: 'Saya merasa dlm belajar pengucapan makhroj, tajwid bila ada kesalahan langsung dibetulkan oleh guru dgn detail dan guru dlm mengajar sabar & selalu mengulang2',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 't-4',
      name: 'Bilqis',
      role: 'Murid Kelas Tahsin Remaja Online',
      quote: 'Alhamdulillah selama belajar di tahsin online ini banyak hal tentang tajwid yang saya ketahui, Pengajar yang mengajarkan nya pun sangat detail menjelaskannya dan sangat baik, trimakasih karena telah membuka tahsin online ini🙏🥰',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=150'
    },
    {
      id: 't-5',
      name: 'Azzam',
      role: 'Murid Kelas Tahfidz Anak Anak',
      quote: 'Aku senang ikut Ngaji Sore. Walaupun kadang aku suka bermain dan bercanda, Ustadz/ah tetap sabar mengajari aku baca nulis hafal Al-Qur’an. Sekarang aku jadi lebih rajin bermain dan ingin hafal lebih banyak surat. 😊📖',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
    }
  ];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className={`home-page ${!isLoading ? 'home-loaded' : ''}`}>
      {/* 1. HERO SECTION */}
      <section className="hero-slider">
        <div className="hero-gradient-overlay"></div>
        <img 
          src={heroImage}
          alt="Kegiatan Yayasan" 
          className="hero-bg-img" 
        />
        <div className="container hero-content-wrapper">
          <div className="hero-content">
            <span className="hero-label-badge hero-animate-1"><Heart size={14} fill="currentColor" /> Bersama Menebar Kebaikan</span>
            <h1 className="hero-title hero-animate-2">Wujudkan Kepedulian Nyata untuk Umat</h1>
            <p className="hero-subtitle hero-animate-3">
              Yayasan Al Hidayah mendampingi tumbuh kembang santri, menyalurkan amanah donatur secara transparan, dan membangun pusat dakwah yang berkah bagi masyarakat luas.
            </p>
            <div className="hero-cta hero-animate-4">
              <button onClick={() => onNavigate('donasi')} className="btn btn-secondary btn-lg cta-glow">
                Mulai Donasi
              </button>
              <button onClick={() => onNavigate('tentang-kami')} className="btn btn-outline btn-white btn-lg">
                Pelajari Profil Kami
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TENTANG SINGKAT YAYASAN */}
      <section className="about-brief section-padding">
        <div className="container brief-grid">
          <div className="brief-image-container arch-frame" data-reveal>
            <img 
              src={aboutImage}
              alt="Belajar Mengajar TPA" 
              className="brief-main-img" 
            />
            <div className="brief-floating-card float-card">
              <span className="floating-card-number">10+</span>
              <span className="floating-card-label">Tahun Mengabdi</span>
            </div>
          </div>
          <div className="brief-text-container" data-reveal data-reveal-delay="120">
            <span className="section-subtitle">Tentang Yayasan</span>
            <h2 className="section-title">Amanah, Transparan, & Profesional</h2>
            <p className="section-desc">
              Yayasan Al Hidayah didirikan sebagai wadah pengabdian sosial dan pendidikan berbasis nilai-nilai luhur keislaman. Kami menyelenggarakan pendidikan ramah anak melalui TK dan TPA, pembinaan mualaf dan da'i pelosok, serta penyaluran bantuan kemanusiaan secara berkala.
            </p>
            
            <div className="brief-points-list">
              <div className="brief-point">
                <CheckCircle2 className="point-icon" size={20} />
                <div>
                  <h4 className="point-title">Akreditasi & Legalitas Resmi</h4>
                  <p className="point-text">Telah terdaftar resmi dengan SK Kemenkumham RI No. AHU-0012345.AH.01.04.</p>
                </div>
              </div>
              <div className="brief-point">
                <CheckCircle2 className="point-icon" size={20} />
                <div>
                  <h4 className="point-title">Laporan Keuangan Terbuka</h4>
                  <p className="point-text">Audit dan publikasi penyaluran dana donatur secara rutin setiap bulan di website.</p>
                </div>
              </div>
            </div>

            <div className="brief-legal-badges">
              <div className="badge-item">
                <div className="badge-text">
                </div>
              </div>
              <div className="badge-item">
                <div className="badge-text">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. PITA AYAT */}
      <section className="ayat-band">
        <div className="ayat-band-inner">
          <div className="ayat-ornament">
            <span></span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <path d="M10 1 L19 10 L10 19 L1 10 Z" />
              <path d="M10 5 L15 10 L10 15 L5 10 Z" />
            </svg>
            <span></span>
          </div>
          <p className="ayat-arabic" lang="ar">
            مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِائَةُ حَبَّةٍ
          </p>
          <p className="ayat-translation">
            &ldquo;Perumpamaan orang-orang yang menafkahkan hartanya di jalan Allah
            seperti sebutir benih yang menumbuhkan tujuh bulir, pada tiap-tiap bulir
            seratus biji.&rdquo;
          </p>
          <span className="ayat-source">QS. Al-Baqarah &middot; 261</span>
        </div>
      </section>

      {/* 3. PROGRAM UNGGULAN (Tab selector) */}
      <section className="featured-programs section-padding bg-sage">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle title-reveal">Program Yayasan</span>
            <h2 className="section-title title-reveal">Pilar Program Kemaslahatan</h2>
            <p className="section-desc title-reveal">Kami bergerak di tiga pilar utama untuk membantu mewujudkan peradaban umat yang kokoh dan berdaya.</p>
          </div>

          <div className="tab-container">
            <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>Semua</button>
            <button className={`tab-btn ${activeTab === 'pendidikan' ? 'active' : ''}`} onClick={() => setActiveTab('pendidikan')}>Pendidikan</button>
            <button className={`tab-btn ${activeTab === 'keagamaan' ? 'active' : ''}`} onClick={() => setActiveTab('keagamaan')}>Keagamaan</button>
            <button className={`tab-btn ${activeTab === 'sosial' ? 'active' : ''}`} onClick={() => setActiveTab('sosial')}>Sosial</button>
          </div>

          <div className="grid-responsive grid-responsive-2 grid-responsive-4" data-reveal-stagger>
            {filteredPrograms.map(program => (
              <div key={program.id} data-reveal>
                <ProgramCard program={program} onSelect={onSelectProgram} />
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button onClick={() => onNavigate('program')} className="btn btn-outline">
              Lihat Semua Program <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. SECTION DONASI BERJALAN */}
      <section className="ongoing-donations section-padding">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle title-reveal">Donasi Aktif</span>
            <h2 className="section-title font-bold title-reveal">Salurkan Amal Jariyah Anda</h2>
            <p className="section-desc title-reveal">Pilih dan dukung program donasi pilihan Anda. Setiap rupiah sangat berharga untuk masa depan penerima manfaat.</p>
          </div>

          <div className="grid-responsive grid-responsive-3" data-reveal-stagger>
            {featuredDonations.map(donation => (
              <div key={donation.id} data-reveal>
                <DonationCard donation={donation} onSelect={onSelectDonation} />
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button onClick={() => onNavigate('donasi')} className="btn btn-primary">
              Lihat Seluruh Kategori Donasi <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 5. STATISTIK / DAMPAK YAYASAN */}
      <section className="stats-counter section-padding">
        <div className="stats-bg-overlay"></div>
        <div className="container stats-content-grid">
          <div className="stats-intro" data-reveal>
            <span className="stats-tag">Dampak Pengabdian</span>
            <h2 className="stats-heading">Hasil Gotong Royong Kita Bersama</h2>
            <p className="stats-para">
              Melalui bantuan donatur, pendidik, dan relawan, amanah yang tersalurkan telah memberikan manfaat riil di berbagai sektor.
            </p>
            <div className="stats-total-money">
              <span className="total-title">Total Dana Tersalurkan</span>
              <span className="total-val">{formatCurrency(20000000)}</span>
            </div>
          </div>
          <div className="stats-boxes-grid" data-reveal-stagger>
            <div className="stat-box" data-reveal>
              <div className="stat-number"><CountUp value="200±" /></div>
              <div className="stat-label">Santri TPA & TK Binaan</div>
            </div>
            <div className="stat-box" data-reveal>
              <div className="stat-number"><CountUp value="8+" /></div>
              <div className="stat-label">Donatur Terdaftar</div>
            </div>
            <div className="stat-box" data-reveal>
              <div className="stat-number"><CountUp value="11" /></div>
              <div className="stat-label">Guru & Da'i Pelosok</div>
            </div>
            <div className="stat-box" data-reveal>
              <div className="stat-number"><CountUp value="137+" /></div>
              <div className="stat-label">Penerima Manfaat Sosial</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. KEGIATAN TERBARU */}
      <section className="recent-activities section-padding bg-sage">
        <div className="container">
          <div className="flex-between flex-wrap gap-md mb-2" data-reveal>
            <div>
              <span className="section-subtitle">Galeri Kegiatan</span>
              <h2 className="section-title">Dokumentasi Kegiatan Terbaru</h2>
            </div>
            <button onClick={() => onNavigate('kegiatan')} className="btn btn-outline btn-sm">
              Lihat Agenda & Kegiatan <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid-responsive grid-responsive-2 grid-responsive-4" data-reveal-stagger>
            {allActivities.slice(0, 4).map(activity => (
              <div key={activity.id} className="card activity-card" data-reveal>
                <div className="activity-img-wrap">
                  <img src={activity.image} alt={activity.title} className="activity-img" loading="lazy" />
                  <span className="activity-date"><Calendar size={12} /> {activity.date}</span>
                </div>
                <div className="activity-details">
                  <span className="activity-category-tag">{activity.category}</span>
                  <h4 className="activity-title">{activity.title}</h4>
                  <p className="activity-text">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CERITA / DOKUMENTASI (Testimoni) */}
      <section className="testimonials-slider section-padding">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle title-reveal">Cerita Penerima Manfaat</span>
            <h2 className="section-title title-reveal">Mereka yang Merasakan Manfaat</h2>
          </div>

          <div className="testimonial-slider-container" data-reveal>
            <button className="slider-nav-btn prev-btn" onClick={handlePrevTestimonial} aria-label="Previous testimonial">
              <ChevronLeft size={24} />
            </button>
            
            <div className="testimonial-active-slide" key={testimonialIndex}>
              <p className="testimonial-quote">"{testimonials[testimonialIndex].quote}"</p>
              <h4 className="testimonial-name">{testimonials[testimonialIndex].name}</h4>
              <span className="testimonial-role">{testimonials[testimonialIndex].role}</span>
            </div>

            <button className="slider-nav-btn next-btn" onClick={handleNextTestimonial} aria-label="Next testimonial">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. BERITA & ARTIKEL */}
      <section className="news-articles section-padding bg-sage">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle title-reveal">Kabar Yayasan</span>
            <h2 className="section-title title-reveal">Artikel & Berita Terbaru</h2>
            <p className="section-desc title-reveal">Pantau terus kegiatan kami dan pelajari wawasan keislaman melalui artikel informatif kami.</p>
          </div>

          <div className="grid-responsive grid-responsive-3" data-reveal-stagger>
            {latestNews.map(news => (
              <div key={news.id} className="card news-card" data-reveal onClick={() => onNavigate('berita')}>
                <div className="card-img-wrapper">
                  <span className="card-badge" style={{ backgroundColor: '#0d5c3a' }}>{news.category}</span>
                  <img src={news.image} alt={news.title} className="card-img" loading="lazy" />
                </div>
                <div className="card-content">
                  <div className="news-meta">
                    <span>Oleh {news.author}</span>
                    <span>•</span>
                    <span>{news.date}</span>
                  </div>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-summary">{news.summary}</p>
                  <span className="news-readmore font-bold flex-center gap-xs" style={{ width: 'fit-content', color: 'var(--color-primary)' }}>
                    Baca Selengkapnya <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-3">
            <button onClick={() => onNavigate('berita')} className="btn btn-outline">
              Kunjungi Pusat Berita & Artikel <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 9. CTA PENUTUP */}
      <section className="bottom-cta-banner section-padding">
        <div className="cta-overlay"></div>
        <div className="container cta-content text-center">
          <span className="bismillah" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
          <h2 className="cta-heading">Mari Bersama Berbuat Baik</h2>
          <p className="cta-para">
            Setiap bantuan yang Anda berikan, baik dalam bentuk infak, sedekah, wakaf, maupun kesediaan menjadi pengajar/sukarelawan, adalah lentera penerang bagi mereka yang membutuhkan.
          </p>
          <div className="cta-buttons">
            <button onClick={() => onNavigate('donasi')} className="btn btn-secondary btn-lg">
              <Heart size={16} fill="currentColor" /> Donasi Sekarang
            </button>
            <button onClick={() => onNavigate('kontak')} className="btn btn-outline btn-white btn-lg">
              Hubungi Relawan
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .bg-sage {
          background-color: var(--color-primary-soft);
        }
        
        .mt-3 {
          margin-top: 3.5rem;
        }
        
        .hero-label-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(229, 178, 79, 0.18);
          border: 1px solid rgba(240, 204, 121, 0.4);
          color: #ffffff;
          padding: 0.45rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          letter-spacing: 0.03em;
        }
        
        /* 2. Brief Section Styling */
        .brief-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        @media (min-width: 1024px) {
          .brief-grid {
            grid-template-columns: 1.1fr 1.2fr;
          }
        }
        
        .brief-image-container {
          position: relative;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          padding-top: 70%; /* Aspect Ratio */
        }
        
        .brief-main-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .brief-floating-card {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          background: var(--color-secondary);
          color: var(--color-primary-dark);
          padding: 1.25rem 2rem;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          border: 2px solid rgba(255,255,255,0.6);
        }
        
        .floating-card-number {
          font-size: 2.25rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1;
          margin-bottom: 0.25rem;
        }
        
        .floating-card-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .brief-points-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-top: 2.5rem;
          margin-bottom: 2.5rem;
        }
        
        .brief-point {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        
        .point-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.25rem;
        }
        
        .point-title {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.25rem 0;
          color: var(--color-primary-dark);
        }
        
        .point-text {
          margin: 0;
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }
        
        .brief-legal-badges {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        
        .badge-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .badge-icon {
          color: var(--color-secondary-dark);
        }
        
        .badge-text {
          display: flex;
          flex-direction: column;
        }
        
        .b-title {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        
        .b-val {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--color-primary-dark);
        }
        
        /* Stats Counter Section */
        .stats-counter {
          position: relative;
          background-color: var(--color-primary-dark);
          color: white;
          overflow: hidden;
        }
        
        .stats-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-primary-dark);
          z-index: 1;
        }
        
        .stats-content-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }
        
        @media (min-width: 1024px) {
          .stats-content-grid {
            grid-template-columns: 1fr 1.2fr;
          }
        }
        
        .stats-intro {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .stats-tag {
          color: var(--color-secondary);
          font-weight: 700;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .stats-heading {
          color: white;
          font-size: clamp(2rem, 3.5vw, 2.5rem);
          font-family: var(--font-heading);
          margin: 0;
        }
        
        .stats-para {
          color: rgba(255,255,255,0.7);
          margin: 0;
          line-height: 1.7;
        }
        
        .stats-total-money {
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          border-left: 4px solid var(--color-secondary);
          width: fit-content;
          margin-top: 1rem;
        }
        
        .total-title {
          display: block;
          font-size: 0.825rem;
          color: rgba(255,255,255,0.6);
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .total-val {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--color-secondary);
          font-family: var(--font-heading);
        }
        
        .stats-boxes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.75rem;
        }
        
        /* Activity Card */
        .activity-card {
          background: white;
        }
        
        .activity-img-wrap {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        
        .activity-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .activity-date {
          position: absolute;
          bottom: 0.75rem;
          left: 0.75rem;
          background-color: rgba(0,0,0,0.7);
          color: white;
          font-size: 0.7rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 500;
        }
        
        .activity-details {
          padding: 1.25rem;
        }
        
        .activity-category-tag {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--color-secondary-dark);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.35rem;
        }
        
        .activity-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .activity-text {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Testimonial slider styling */
        .testimonial-slider-container {
          position: relative;
          max-width: 800px;
          margin-right: auto;
          margin-left: auto;
          background: white;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 3rem;
          box-shadow: var(--shadow-xs);
          text-align: center;
        }
        
        @media (max-width: 640px) {
          .testimonial-slider-container {
            padding: 2rem 1rem;
          }
        }
        
        .testimonial-quote {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          font-style: italic;
          color: var(--color-text);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-weight: 500;
        }
        
        .testimonial-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.15rem;
        }
        
        .testimonial-role {
          font-size: 0.825rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        
        .slider-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: white;
          border: 1px solid var(--color-border);
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          transition: all var(--transition-fast);
          z-index: 10;
        }
        
        .slider-nav-btn:hover {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }
        
        .prev-btn { left: -1.5rem; }
        .next-btn { right: -1.5rem; }
        
        @media (max-width: 768px) {
          .prev-btn { left: 0.25rem; }
          .next-btn { right: 0.25rem; }
        }
        
        /* News Card Styling */
        .news-card {
          cursor: pointer;
          background: white;
        }
        
        .news-meta {
          display: flex;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .news-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .news-summary {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin-bottom: 1.25rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* 9. Bottom CTA styling */
        .bottom-cta-banner {
          position: relative;
          background-color: #063c25;
          color: white;
          overflow: hidden;
        }
        
        .cta-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--color-primary-dark);
          background-image: var(--pattern-gold);
          z-index: 1;
        }
        
        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 750px;
          margin-right: auto;
          margin-left: auto;
        }
        
        .cta-heading {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          font-family: var(--font-heading);
          color: white;
          margin-bottom: 1rem;
        }
        
        .cta-para {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.8);
          line-height: 1.6;
          margin-bottom: 2.25rem;
        }
        
        .cta-buttons {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        
        .gap-md { gap: 1.75rem; }
        .mb-2 { margin-bottom: 2.75rem; }
      `}</style>
    </div>
  );
}
