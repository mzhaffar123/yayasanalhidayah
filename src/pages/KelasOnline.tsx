// src/pages/KelasOnline.tsx
import { useState } from 'react';
import { Calendar, DollarSign, GraduationCap, ArrowLeft, ArrowRight, ShieldCheck, Check, Users } from 'lucide-react';
import { getClasses, contactInfo } from '../data/mockData';

export default function KelasOnline() {
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  
  // Registration Form States
  const [studentName, setStudentName] = useState<string>('');
  const [studentContact, setStudentContact] = useState<string>('');
  const [studentAge, setStudentAge] = useState<string>('');
  const [studentReason, setStudentReason] = useState<string>('');

  const classes = getClasses();
  const selectedClass = classes.find(c => c.id === selectedClassId);

  const handleSelectClass = (id: string) => {
    setSelectedClassId(id);
    setRegisterSuccess(false);
    setStudentName('');
    setStudentContact('');
    setStudentAge('');
    setStudentReason('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedClassId(null);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !studentContact.trim()) {
      alert('Nama Lengkap dan Nomor WhatsApp wajib diisi.');
      return;
    }

    setRegisterSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatCurrency = (value: number) => {
    if (value === 0) return 'Gratis (Infaq Sukarela)';
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value) + ' / Bulan';
  };

  if (selectedClass) {
    if (registerSuccess) {
      // Success Registration Receipt
      return (
        <div className="registration-success-page section-padding">
          <div className="container text-center success-receipt-container">
            <div className="success-icon-badge">
              <Check size={48} />
            </div>
            <h2 className="success-title">Pendaftaran Berhasil!</h2>
            <p className="success-desc">
              Pendaftaran Anda untuk kelas <span className="font-bold text-primary">{selectedClass.title}</span> telah kami terima.  telah kami terima. Untuk proses verifikasi data, informasi lebih lanjut, dan pembagian kelompok belajar, silakan klik fitur “Hubungi Admin Kelas via WhatsApp” di bawah ini. Segera hubungi Admin Kelas melalui WhatsApp untuk melanjutkan proses pendaftaran Anda.
            </p>

            <div className="card receipt-card">
              <div className="receipt-header">
                <h3>BUKTI PENDAFTARAN KELAS</h3>
                <span className="receipt-no">No. Pendaftaran: REG-CLS-{Math.floor(1000 + Math.random() * 9000)}</span>
              </div>
              <div className="receipt-body">
                <div className="receipt-row">
                  <span>Nama Calon Santri:</span>
                  <span className="font-bold">{studentName}</span>
                </div>
                <div className="receipt-row">
                  <span>Kelas Pilihan:</span>
                  <span className="font-bold">{selectedClass.title}</span>
                </div>
                <div className="receipt-row">
                  <span>Pengajar (Ustadz):</span>
                  <span className="font-bold">{selectedClass.instructor}</span>
                </div>
                <div className="receipt-row">
                  <span>Jadwal Kelas:</span>
                  <span className="font-bold">{selectedClass.schedule}</span>
                </div>
                <div className="receipt-row">
                  <span>Biaya Infaq:</span>
                  <span className="font-bold text-primary">{formatCurrency(selectedClass.price)}</span>
                </div>
              </div>
              <div className="receipt-footer text-muted">
                Silakan bergabung ke grup WhatsApp koordinasi awal di bawah ini.
              </div>
            </div>

            <div className="receipt-actions">
              <a 
                href={`https://wa.me/${contactInfo.whatsapp}?text=Assalamu%27alaikum%20Admin%20Yayasan%2C%20saya%20sudah%20mendaftar%20kelas%20online%20${encodeURIComponent(selectedClass.title)}%20atas%20nama%20${encodeURIComponent(studentName)}.%20Mohon%20info%20kelompok%20belajar.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                Hubungi Admin Kelas via WhatsApp
              </a>
              <button onClick={handleBackToList} className="btn btn-outline ml-sm">
                Kembali ke Daftar Kelas
              </button>
            </div>
          </div>
          
          <style>{`
            .success-receipt-container {
              max-width: 600px;
              margin-right: auto;
              margin-left: auto;
            }
            .success-icon-badge {
              width: 80px;
              height: 80px;
              border-radius: 9999px;
              background-color: var(--color-primary-soft);
              color: var(--color-primary);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: auto;
              margin-left: auto;
              margin-bottom: 1.5rem;
            }
            .success-title {
              font-family: var(--font-heading);
              color: var(--color-primary-dark);
              font-weight: 800;
              margin-bottom: 0.5rem;
            }
            .success-desc {
              font-size: 0.95rem;
              color: var(--color-text-muted);
              margin-bottom: 2rem;
              line-height: 1.6;
            }
            .receipt-card {
              text-align: left;
              background-color: white;
              padding: 2rem;
              margin-bottom: 2rem;
              border: 1px solid var(--color-border);
              box-shadow: var(--shadow-sm);
            }
            .receipt-header {
              border-bottom: 2px dashed var(--color-border);
              padding-bottom: 1.25rem;
              margin-bottom: 1.25rem;
            }
            .receipt-header h3 {
              margin: 0 0 0.25rem 0;
              font-size: 1.15rem;
              color: var(--color-primary-dark);
              letter-spacing: 0.05em;
            }
            .receipt-no {
              font-size: 0.8rem;
              color: var(--color-text-muted);
              font-weight: 600;
            }
            .receipt-body {
              display: flex;
              flex-direction: column;
              gap: 0.85rem;
              border-bottom: 1px solid var(--color-border);
              padding-bottom: 1.25rem;
              margin-bottom: 1.25rem;
            }
            .receipt-row {
              display: flex;
              justify-content: space-between;
              font-size: 0.9rem;
              gap: 1.5rem;
            }
            .receipt-footer {
              text-align: center;
              font-size: 0.75rem;
              font-weight: 600;
            }
            .receipt-actions {
              display: flex;
              justify-content: center;
              gap: 1rem;
              flex-wrap: wrap;
            }
          `}</style>
        </div>
      );
    }

    // Class Detail & Registration Form View
    return (
      <div className="class-detail-page">
        <section className="detail-banner" style={{ backgroundImage: `linear-gradient(rgba(6, 60, 37, 0.9), rgba(13, 92, 58, 0.8)), url(${selectedClass.image})` }}>
          <div className="container">
            <button onClick={handleBackToList} className="btn-back">
              <ArrowLeft size={16} /> Kembali ke Semua Kelas
            </button>
            <h1 className="detail-title">{selectedClass.title}</h1>
          </div>
        </section>

        <section className="detail-body section-padding">
          <div className="container detail-layout">
            {/* Left Column: Syllabus & info */}
            <div className="detail-main">
              <img src={selectedClass.image} alt={selectedClass.title} className="detail-hero-img" />
              
              <h3>Deskripsi Kelas</h3>
              <p className="detail-text">{selectedClass.description}</p>
              
              {/* Class Info Cards Grid */}
              <div className="class-quick-info-grid">
                <div className="quick-info-card">
                  <GraduationCap className="info-card-icon" size={24} />
                  <div>
                    <span className="card-lbl">Pengajar (Mudaris)</span>
                    <span className="card-val">{selectedClass.instructor}</span>
                  </div>
                </div>
                <div className="quick-info-card">
                  <Calendar className="info-card-icon" size={24} />
                  <div>
                    <span className="card-lbl">Jadwal Kelas</span>
                    <span className="card-val">{selectedClass.schedule}</span>
                  </div>
                </div>
                <div className="quick-info-card">
                  <DollarSign className="info-card-icon" size={24} />
                  <div>
                    <span className="card-lbl">Infaq Bulanan</span>
                    <span className="card-val text-primary font-bold">{formatCurrency(selectedClass.price)}</span>
                  </div>
                </div>
              </div>

              <h3>Silabus & Kurikulum</h3>
              <p className="detail-text-sm text-muted">Materi belajar disusun secara bertahap selama 1 semester (6 bulan) untuk memastikan pemahaman optimal:</p>
              <div className="syllabus-timeline">
                {selectedClass.syllabus.map((item, idx) => (
                  <div key={idx} className="syllabus-item">
                    <div className="syllabus-number">0{idx + 1}</div>
                    <div className="syllabus-detail">
                      <h4>Modul Pembelajaran {idx + 1}</h4>
                      <p>{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="detail-sidebar class-registration-sidebar">
              <h4 className="sidebar-title">Formulir Pendaftaran Kelas</h4>
              <p className="sidebar-desc">Silakan isi formulir di bawah ini dengan lengkap untuk mengamankan slot belajar Anda di angkatan terbaru.</p>
              
              <form onSubmit={handleRegisterSubmit}>
                <div className="form-group">
                  <label className="form-label">Nama Lengkap Santri</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Contoh: Muhammad Ilham"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor WhatsApp Aktif</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Contoh: 08123456789"
                    required
                    value={studentContact}
                    onChange={(e) => setStudentContact(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Usia Santri (Tahun)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Contoh: 23"
                    value={studentAge}
                    onChange={(e) => setStudentAge(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Motivasi Bergabung (Opsional)</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Tuliskan alasan Anda ingin mengikuti kelas ini..."
                    value={studentReason}
                    onChange={(e) => setStudentReason(e.target.value)}
                  />
                </div>

                <div className="sidebar-actions mt-3">
                  <button type="submit" className="btn btn-primary btn-full btn-lg">
                    Daftar Kelas Online <ArrowRight size={16} />
                  </button>
                  <div className="sidebar-trust-box" style={{ border: 'none', padding: 0 }}>
                    <ShieldCheck size={20} className="trust-icon" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      Kelas interaktif dibimbing via Zoom/Meet.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <style>{`
          .class-quick-info-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-bottom: 2rem;
          }
          @media (min-width: 640px) {
            .class-quick-info-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
          .quick-info-card {
            background-color: white;
            border: 1px solid var(--color-border);
            padding: 1.25rem;
            border-radius: var(--radius-md);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            box-shadow: var(--shadow-sm);
          }
          .info-card-icon {
            color: var(--color-secondary-dark);
            flex-shrink: 0;
          }
          .card-lbl {
            display: block;
            font-size: 0.7rem;
            color: var(--color-text-muted);
            font-weight: 500;
            text-transform: uppercase;
          }
          .card-val {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--color-primary-dark);
            line-height: 1.2;
            display: block;
          }
          .syllabus-timeline {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            position: relative;
            margin-bottom: 2rem;
            padding-left: 0.5rem;
          }
          .syllabus-timeline::before {
            content: '';
            position: absolute;
            top: 1rem;
            bottom: 1rem;
            left: 20px;
            width: 2px;
            background-color: var(--color-border);
          }
          .syllabus-item {
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
            position: relative;
            z-index: 2;
          }
          .syllabus-number {
            width: 32px;
            height: 32px;
            border-radius: 9999px;
            background-color: var(--color-primary);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 0.875rem;
            flex-shrink: 0;
            border: 4px solid var(--color-bg);
            box-shadow: var(--shadow-sm);
          }
          .syllabus-detail h4 {
            margin: 0 0 0.25rem 0;
            font-size: 0.95rem;
            color: var(--color-primary-dark);
          }
          .syllabus-detail p {
            margin: 0;
            font-size: 0.85rem;
            color: var(--color-text-muted);
            line-height: 1.4;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="classes-list-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Kelas Keislaman Online</h1>
          <p>Meningkatkan pemahaman dinul Islam, membenarkan bacaan Quran, dan bahasa Arab dari mana saja.</p>
        </div>
      </section>

      {/* Grid Kelas */}
      <section className="classes-grid-section section-padding">
        <div className="container">
          <div className="grid-responsive grid-responsive-3 stagger-fade-in" data-reveal-stagger>
            {classes.map(cls => (
              <div key={cls.id} className="card class-card card-glow" data-reveal>
                <div className="card-img-wrapper">
                  <span className="card-badge" style={{ backgroundColor: cls.price === 0 ? '#0d5c3a' : '#c5a85c' }}>
                    {cls.price === 0 ? 'Gratis' : 'Premium'}
                  </span>
                  <img src={cls.image} alt={cls.title} className="card-img" loading="lazy" />
                </div>
                <div className="card-content">
                  <h3 className="class-card-title">{cls.title}</h3>
                  <p className="class-card-instructor text-muted"><Users size={14} style={{ marginRight: '0.25rem' }} /> Pengajar: {cls.instructor}</p>
                  <p className="class-card-desc">{cls.description}</p>
                  
                  <div className="class-card-footer">
                    <span className="class-card-price text-primary font-bold">{formatCurrency(cls.price).replace(',00', '')}</span>
                    <button onClick={() => handleSelectClass(cls.id)} className="btn btn-outline btn-sm">
                      Detail & Daftar <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .class-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .class-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.35rem;
          color: var(--color-primary-dark);
          line-height: 1.3;
        }
        .class-card-instructor {
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
        }
        .class-card-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }
        .class-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--color-border);
          padding-top: 0.75rem;
        }
        .class-card-price {
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
