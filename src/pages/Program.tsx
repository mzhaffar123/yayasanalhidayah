// src/pages/Program.tsx
import { useState, useEffect } from 'react';
import { Heart, ArrowLeft, Check, Phone, ArrowRight, Shield } from 'lucide-react';
import { getPrograms, contactInfo } from '../data/mockData';
import ProgramCard from '../components/ProgramCard';

interface ProgramProps {
  selectedProgramId: string | null;
  setSelectedProgramId: (id: string | null) => void;
  onNavigate: (page: string) => void;
  initialFilter?: string | null;
}

export default function Program({ selectedProgramId, setSelectedProgramId, onNavigate, initialFilter }: ProgramProps) {
  const [filter, setFilter] = useState<'all' | 'pendidikan' | 'keagamaan' | 'sosial'>('all');
  const programs = getPrograms();

  useEffect(() => {
    if (initialFilter === 'pendidikan' || initialFilter === 'keagamaan' || initialFilter === 'sosial') {
      setFilter(initialFilter);
    } else {
      setFilter('all');
    }
  }, [initialFilter]);

  const handleSelectProgram = (id: string) => {
    setSelectedProgramId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedProgramId(null);
  };

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  // Filter programs list
  const filteredPrograms = filter === 'all' 
    ? programs 
    : programs.filter(p => p.category === filter);

  if (selectedProgram) {
    // Program Detail View
    return (
      <div className="program-detail-page">
        {/* Banner Detail */}
        <section className="detail-banner" style={{ backgroundImage: `linear-gradient(rgba(6, 60, 37, 0.9), rgba(13, 92, 58, 0.8)), url(${selectedProgram.image})` }}>
          <div className="container">
            <button onClick={handleBackToList} className="btn-back">
              <ArrowLeft size={16} /> Kembali ke Daftar Program
            </button>
            <span className="detail-cat-badge">{selectedProgram.category}</span>
            <h1 className="detail-title">{selectedProgram.title}</h1>
          </div>
        </section>

        {/* Content Layout */}
        <section className="detail-body section-padding">
          <div className="container detail-layout">
            {/* Main content */}
            <div className="detail-main">
              <img src={selectedProgram.image} alt={selectedProgram.title} className="detail-hero-img" />
              <h3>Deskripsi Program</h3>
              <p className="detail-text">{selectedProgram.fullDescription}</p>
              
              <h3>Mengapa Memilih Program Ini?</h3>
              <ul className="detail-benefits-list">
                <li><Check size={16} className="benefit-icon" /> Tenaga pengajar / fasilitator yang kompeten & bersertifikat.</li>
                <li><Check size={16} className="benefit-icon" /> Fasilitas belajar yang bersih, memadai, dan kondusif.</li>
                <li><Check size={16} className="benefit-icon" /> Laporan perkembangan berkala dan koordinasi aktif dengan orang tua/mitra.</li>
                <li><Check size={16} className="benefit-icon" /> Kurikulum terintegrasi dengan pembiasaan adab dan akhlak mulia.</li>
              </ul>
            </div>

            {/* Sidebar CTA */}
            <div className="detail-sidebar">
              <h4 className="sidebar-title">Partisipasi & Pendaftaran</h4>
              <p className="sidebar-desc">Tertarik untuk mendaftarkan putra-putri Anda, bergabung kelas, atau menyalurkan bantuan untuk menyukseskan program ini?</p>
              
              <div className="sidebar-actions">
                {selectedProgram.category === 'pendidikan' ? (
                  <a
                    href="#kelas-online"
                    onClick={(e) => { e.preventDefault(); window.location.hash = 'kelas-online'; }}
                    className="btn btn-primary btn-full"
                  >
                    Daftar Kelas Sekarang <ArrowRight size={16} />
                  </a>
                ) : selectedProgram.category === 'sosial' ? (
                  <button onClick={() => onNavigate('donasi')} className="btn btn-secondary btn-full">
                    Salurkan Donasi <Heart size={16} fill="currentColor" />
                  </button>
                ) : (
                  <a 
                    href={`https://wa.me/${contactInfo.whatsapp}?text=Tanya%20mengenai%20program%20${encodeURIComponent(selectedProgram.title)}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-full"
                  >
                    <Phone size={16} /> Tanya Via WhatsApp
                  </a>
                )}
                
                <a 
                  href={`https://wa.me/${contactInfo.whatsapp}?text=Tanya%20relawan%20program%20${encodeURIComponent(selectedProgram.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-outline btn-full mt-sm"
                >
                  Hubungi Layanan Konsultasi
                </a>
              </div>

              <div className="sidebar-trust-box">
                <Shield size={24} className="trust-icon" />
                <div>
                  <h5>Amanah & Transparan</h5>
                  <p>Seluruh program di bawah pengawasan Kemenag & Dewan Pembina Yayasan.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <style>{`
          .btn-back {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 600;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            padding: 0;
            margin-bottom: 1.5rem;
            transition: color var(--transition-fast);
          }
          .btn-back:hover {
            color: white;
          }
          .detail-banner {
            background-size: cover;
            background-position: center;
            color: white;
            padding: 4rem 0;
          }
          .detail-cat-badge {
            background-color: var(--color-secondary);
            color: var(--color-primary-dark);
            padding: 0.25rem 0.75rem;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            border-radius: var(--radius-sm);
            width: fit-content;
            display: block;
            margin-bottom: 0.75rem;
          }
          .detail-title {
            color: white;
            font-size: clamp(1.85rem, 3.5vw, 2.5rem);
            margin: 0;
          }
          .detail-hero-img {
            width: 100%;
            height: 350px;
            object-fit: cover;
            border-radius: var(--radius-lg);
            margin-bottom: 2rem;
            box-shadow: var(--shadow-md);
          }
          .detail-text {
            font-size: 1.05rem;
            line-height: 1.7;
            margin-bottom: 2rem;
            color: var(--color-text);
          }
          .detail-benefits-list {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
          }
          .detail-benefits-list li {
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
            font-size: 0.95rem;
            line-height: 1.5;
          }
          .benefit-icon {
            color: var(--color-primary);
            margin-top: 0.15rem;
            flex-shrink: 0;
          }
          .sidebar-title {
            margin-top: 0;
            font-size: 1.15rem;
            color: var(--color-primary-dark);
            font-family: var(--font-heading);
          }
          .sidebar-desc {
            font-size: 0.85rem;
            color: var(--color-text-muted);
            line-height: 1.5;
            margin-bottom: 1.5rem;
          }
          .mt-sm { margin-top: 0.75rem; }
          .sidebar-trust-box {
            display: flex;
            gap: 0.75rem;
            align-items: flex-start;
            margin-top: 2rem;
            padding-top: 1.5rem;
            border-top: 1px solid var(--color-border);
          }
          .sidebar-trust-box h5 {
            margin: 0 0 0.15rem 0;
            font-size: 0.875rem;
            color: var(--color-primary-dark);
          }
          .sidebar-trust-box p {
            margin: 0;
            font-size: 0.75rem;
            color: var(--color-text-muted);
            line-height: 1.4;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="programs-list-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Program Pengabdian & Pendidikan</h1>
          <p>Mendukung kemandirian umat, pemahaman keagamaan yang lurus, serta generasi Qur'ani.</p>
        </div>
      </section>

      {/* Filterable Programs List */}
      <section className="programs-grid-section section-padding">
        <div className="container">
          <div className="tab-container">
            <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Semua Program</button>
            <button className={`tab-btn ${filter === 'pendidikan' ? 'active' : ''}`} onClick={() => setFilter('pendidikan')}>Pendidikan (TK & TPA)</button>
            <button className={`tab-btn ${filter === 'keagamaan' ? 'active' : ''}`} onClick={() => setFilter('keagamaan')}>Keagamaan (Kajian & Dakwah)</button>
            <button className={`tab-btn ${filter === 'sosial' ? 'active' : ''}`} onClick={() => setFilter('sosial')}>Sosial (Yatim & Dhuafa)</button>
          </div>

          <div className="grid-responsive grid-responsive-2 grid-responsive-3 stagger-fade-in" data-reveal-stagger>
            {filteredPrograms.map(program => (
              <div key={program.id} data-reveal>
                <ProgramCard program={program} onSelect={handleSelectProgram} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
