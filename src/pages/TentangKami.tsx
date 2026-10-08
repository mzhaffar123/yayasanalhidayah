// src/pages/TentangKami.tsx
import { Award, History, Shield, Users } from 'lucide-react';

export default function TentangKami() {
  const pengurus = [
    { role: 'Dewan Pembina', name: 'FAWAIDATU ZUHDAH', desc: 'Ulama & Akademisi' },
    { role: 'Ketua Yayasan', name: 'DRS. WIWIET PRIHATMADJI M.M', desc: 'Penanggung Jawab Program' },
    { role: 'Sekretaris', name: 'KHANSA ZUHAIDAH ABDULLAH SP.D.', desc: 'Administrasi & Keanggotaan' },
    { role: 'Bendahara', name: 'MUHAMMAD CHASIN ABDULLAH S.S', desc: 'Manajemen Keuangan & Donasi' },
    { role: 'Kepala Bidang Pendidikan', name: 'KHANSA ZUHAIDAH ABDULLAH SP.D.', desc: 'Pengawas TK, TPA & Kelas Online' },
    { role: 'Kepala Bidang Sosial', name: 'MUHAMMAD HARIS ABDULLAH SP.D', desc: 'Pengawas Penyaluran Santunan & Wakaf' }
  ];

  return (
    <div className="tentang-kami-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Tentang Yayasan Al Hidayah</h1>
          <p>Mengenal lebih dekat visi, misi, legalitas, dan tim di balik pengabdian kami.</p>
        </div>
      </section>

      {/* Profil Singkat & Sejarah */}
      <section className="profile-history section-padding">
        <div className="container history-grid">
          <div className="history-text" data-reveal>
            <span className="section-subtitle"><History size={14} /> Sejarah & Kiprah</span>
            <h2 className="section-title">Melayani Umat Sejak Tahun 2006</h2>
            <p className="section-desc">
              Yayasan Al Hidayah berawal dari sebuah majelis ta'lim kecil di teras Masjid Al Hidayah pada tahun 2016. Melihat banyaknya anak-anak usia sekolah yang belum lancar membaca Al-Qur'an dan minimnya sarana belajar Islami di lingkungan Sukadamai, para tokoh masyarakat setempat sepakat untuk mendirikan lembaga formal.
            </p>
            <p>
              Dengan bermodalkan semangat gotong royong, didirikanlah Taman Pendidikan Al-Qur'an (TPA) Al Hidayah dengan 15 santri awal. Seiring berjalannya waktu, kepercayaan masyarakat meningkat, mendorong pendirian Taman Kanak-Kanak (TK) Islam pada tahun 2019, disusul dengan program beasiswa yatim dhuafa dan penyaluran wakaf sarana prasarana ibadah.
            </p>
            <p>
              Kini, di tahun 2026, Yayasan Al Hidayah telah berbadan hukum resmi di bawah SK Kemenkumham RI, mengasuh lebih dari 150 santri aktif, meluncurkan kelas keislaman online berskala nasional, serta rutin menyalurkan santunan sosial kepada ratusan penerima manfaat setiap bulannya.
            </p>
          </div>
          <div className="history-info-cards" data-reveal-stagger>
            <div className="info-stat-card info-card-slide" data-reveal>
              <span className="card-val number-pulse">500+</span>
              <span className="card-lbl">Penerima Manfaat Bulanan</span>
            </div>
            <div className="info-stat-card info-card-slide" data-reveal>
              <span className="card-val number-pulse">200±</span>
              <span className="card-lbl">Santri Aktif Terdaftar</span>
            </div>
            <div className="info-stat-card info-card-slide" data-reveal>
              <span className="card-val number-pulse">100%</span>
              <span className="card-lbl">Penyaluran Amanah & Terbuka</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="vision-mission section-padding bg-sage">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle">  Arah Perjuangan</span>
            <h2 className="section-title">Visi & Misi Kami</h2>
          </div>

          <div className="v-m-grid" data-reveal-stagger>
            <div className="card v-card" data-reveal>
              <h3>Visi Utama</h3>
              <p className="v-text">
                "Menjadi lembaga Islam yang unggul, terpercaya, dan amanah dalam membangun masyarakat yang cerdas secara spiritual-intelektual, relijius secara akhlak, dan mandiri secara sosial-ekonomi."
              </p>
            </div>
            
            <div className="card m-card" data-reveal>
              
              <h3>Misi Yayasan</h3>
              <ul className="m-list">
                <li>Menyelenggarakan pendidikan anak usia dini dan pengajaran Al-Qur'an dengan metodologi modern, ceria, dan menyenangkan.</li>
                <li>Meningkatkan kualitas dakwah islamiyah melalui kajian rutin, majelis dzikir/sholawat, serta pembinaan da'i muda berakhlakul karimah.</li>
                <li>Mengelola dan menyalurkan dana donasi (zakat, infak, sedekah, wakaf) secara profesional, transparan, serta tepat sasaran kepada dhuafa.</li>
                <li>Mengembangkan jejaring kepedulian sosial untuk membantu sarana ibadah masyarakat serta kesejahteraan para pejuang Qur'an.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Bagan Pengurus */}
      <section className="org-structure section-padding">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle"><Users size={14} /> Struktur Organisasi</span>
            <h2 className="section-title">Susunan Pengurus Yayasan</h2>
            <p className="section-desc">Diisi oleh individu-individu yang berdedikasi tinggi dan amanah dalam menjalankan setiap pilar kegiatan yayasan.</p>
          </div>

          <div className="org-chart-grid" data-reveal-stagger>
            {pengurus.map((p, i) => (
              <div key={i} className="card org-member-card org-card-bounce" data-reveal>
                <div className="org-icon-badge icon-bounce">
                  <Users size={18} />
                </div>
                <span className="member-role">{p.role}</span>
                <h4 className="member-name">{p.name}</h4>
                <p className="member-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legalitas Yayasan */}
      <section className="legalities section-padding bg-dark-green">
        <div className="container text-center">
          <span className="section-subtitle text-gold" data-reveal><Shield size={14} /> Kepercayaan Publik</span>
          <h2 className="section-title text-white" data-reveal>Legalitas & Izin Resmi</h2>
          <p className="legal-intro" data-reveal>Untuk kenyamanan dan membangun kepercayaan para donatur, berikut adalah izin serta legalitas formal yang diakui negara:</p>
          
          <div className="legal-badges-grid" data-reveal-stagger>
            <div className="legal-badge-card glow-hover" data-reveal>
              <Award className="legal-card-icon icon-bounce" size={32} />
              <h4>Akte Notaris Pendirian</h4>
              <p className="legal-no">No. 24 Tanggal 15 Mei 2016</p>
              <span className="legal-issuer">Notaris Syarifah, SH., M.Kn.</span>
            </div>
            <div className="legal-badge-card glow-hover" data-reveal>
              <Award className="legal-card-icon icon-bounce" size={32} />
              <h4>SK Kemenkumham RI</h4>
              <p className="legal-no">No. AHU-0012345.AH.01.04.Tahun 2016</p>
              <span className="legal-issuer">Kementerian Hukum dan HAM RI</span>
            </div>
            <div className="legal-badge-card glow-hover" data-reveal>
              <Award className="legal-card-icon icon-bounce" size={32} />
              <h4>Izin Operasional Kemenag</h4>
              <p className="legal-no">No. Kd.10.04/5/PP.00.7/4321/2019</p>
              <span className="legal-issuer">Kantor Kementerian Agama Kota</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Banner Styles */
        .page-banner {
          position: relative;
          background-color: var(--color-primary-dark);
          background-image: linear-gradient(135deg, rgba(6, 60, 37, 0.95) 0%, rgba(13, 92, 58, 0.8) 100%);
          color: white;
          padding: 4.5rem 0;
        }
        
        .banner-content h1 {
          color: white;
          font-size: clamp(2rem, 4vw, 2.75rem);
          font-weight: 800;
          margin-bottom: 0.5rem;
        }
        
        .banner-content p {
          color: rgba(255, 255, 255, 0.8);
          font-size: 1.05rem;
          margin: 0;
        }
        
        /* Profile History Grid */
        .history-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }
        
        @media (min-width: 1024px) {
          .history-grid {
            grid-template-columns: 1.3fr 0.9fr;
          }
        }
        
        .history-info-cards {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .info-stat-card {
          background-color: white;
          border: 1px solid var(--color-border);
          padding: 2rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          text-align: center;
          border-left: 5px solid var(--color-primary);
          transition: transform var(--transition-fast);
        }
        
        .info-stat-card:hover {
          transform: translateX(6px);
        }
        
        .card-val {
          display: block;
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--color-primary-dark);
          font-family: var(--font-heading);
          margin-bottom: 0.25rem;
        }
        
        .card-lbl {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          font-weight: 600;
        }
        
        /* Vision Mission */
        .v-m-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
        }
        
        @media (min-width: 768px) {
          .v-m-grid {
            grid-template-columns: 1fr 1.2fr;
          }
        }
        
        .v-card, .m-card {
          background-color: white;
          padding: 2.5rem;
        }
        
        .v-icon-wrap, .m-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-md);
          background-color: var(--color-primary-soft);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        
        .m-icon-wrap {
          background-color: var(--color-secondary-soft);
          color: var(--color-secondary-dark);
        }
        
        .v-text {
          font-size: 1.15rem;
          font-style: italic;
          line-height: 1.6;
          color: var(--color-primary-dark);
        }
        
        .m-list {
          padding-left: 1.25rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .m-list li {
          font-size: 0.95rem;
          line-height: 1.5;
        }
        
        /* Org chart */
        .org-chart-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        @media (min-width: 640px) {
          .org-chart-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .org-chart-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .org-member-card {
          background-color: white;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        
        .org-icon-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          color: var(--color-primary-light);
          opacity: 0.3;
        }
        
        .member-role {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--color-secondary-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
          display: block;
        }
        
        .member-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.25rem;
        }
        
        .member-desc {
          font-size: 0.825rem;
          color: var(--color-text-muted);
          margin: 0;
        }
        
        /* Legalities section */
        .bg-dark-green {
          background-color: var(--color-primary-dark);
          color: rgba(255,255,255,0.8);
        }
        
        .text-gold {
          color: var(--color-secondary) !important;
        }
        
        .text-white {
          color: white !important;
        }
        
        .legal-intro {
          max-width: 600px;
          margin-right: auto;
          margin-left: auto;
          margin-bottom: 3rem;
        }
        
        .legal-badges-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }
        
        @media (min-width: 768px) {
          .legal-badges-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        .legal-badge-card {
          background-color: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: var(--radius-lg);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: background-color var(--transition-fast);
        }
        
        .legal-badge-card:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
        
        .legal-card-icon {
          color: var(--color-secondary);
          margin-bottom: 1.25rem;
        }
        
        .legal-badge-card h4 {
          color: white;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }
        
        .legal-no {
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-secondary);
          margin-bottom: 0.25rem;
        }
        
        .legal-issuer {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
        }
      `}</style>
    </div>
  );
}
