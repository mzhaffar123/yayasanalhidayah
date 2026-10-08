// src/pages/Layanan.tsx
import { useState, useEffect } from 'react';
import { Award, Check, HelpCircle, MessageCircle, ShieldCheck } from 'lucide-react';
import { contactInfo } from '../data/mockData';

interface LayananProps {
  initialType?: string | null;
}

export default function Layanan({ initialType }: LayananProps) {
  const [activeTab, setActiveTab] = useState<'halal' | 'konsultasi'>('halal');
  
  // Halal Form States
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [nib, setNib] = useState('');
  const [productType, setProductType] = useState('Makanan');
  const [halalContact, setHalalContact] = useState('');
  const [halalSuccess, setHalalSuccess] = useState(false);

  // Consultation Form States
  const [consultantName, setConsultantName] = useState('');
  const [consultCategory, setConsultCategory] = useState('Fiqih Ibadah');
  const [consultQuestion, setConsultQuestion] = useState('');

  useEffect(() => {
    if (initialType === 'halal' || initialType === 'konsultasi') {
      setActiveTab(initialType);
    }
  }, [initialType]);

  const handleHalalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !ownerName || !halalContact) {
      alert('Harap isi Nama Usaha, Nama Pemilik, dan Kontak WhatsApp.');
      return;
    }
    setHalalSuccess(true);
  };

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consultantName || !consultQuestion) {
      alert('Harap isi Nama Anda dan Pertanyaan Konsultasi.');
      return;
    }

    const formattedText = `Halo Admin Yayasan Al Hidayah, saya ingin mengajukan Konsultasi Syariah.
Nama: ${consultantName}
Kategori: ${consultCategory}
Pertanyaan: ${consultQuestion}`;

    const waUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(formattedText)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="layanan-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Layanan Yayasan</h1>
          <p>Pelayanan publik untuk kemaslahatan ekonomi halal dan bimbingan keislaman umat.</p>
        </div>
      </section>

      {/* Tabs selector */}
      <section className="layanan-nav-section mt-3">
        <div className="container">
          <div className="tab-container">
            <button className={`tab-btn ${activeTab === 'halal' ? 'active' : ''}`} onClick={() => { setActiveTab('halal'); setHalalSuccess(false); }}>
              <Award size={16} /> Pembuatan Sertifikat Halal
            </button>
            <button className={`tab-btn ${activeTab === 'konsultasi' ? 'active' : ''}`} onClick={() => setActiveTab('konsultasi')}>
              <MessageCircle size={16} /> Konsultasi Online Syariah
            </button>
          </div>
        </div>
      </section>

      {/* Content Body */}
      <section className="layanan-body-section section-padding">
        <div className="container">
          {activeTab === 'halal' ? (
            /* 1. PEMBUATAN SERTIFIKAT HALAL */
            <div className="layanan-content-grid">
              <div className="layanan-desc-col" data-reveal>
                <span className="section-subtitle">Sertifikasi Halal Gratis (SEHATI)</span>
                <h2 className="section-title">Pendampingan Sertifikasi Halal UMKM</h2>
                <p className="section-desc">
                  Yayasan Al Hidayah bekerja sama dengan Badan Penyelenggara Jaminan Produk Halal (BPJPH) memfasilitasi pendampingan pembuatan Sertifikat Halal bagi pelaku usaha mikro dan kecil (UMKM) melalui skema **Self Declare** (gratis).
                </p>
                <p>
                  Kami membantu pelaku usaha dari penyusunan dokumen, pembuatan NIB (Nomor Induk Berusaha), pengisian SIHALAL, hingga pendampingan oleh auditor halal tersertifikasi sampai sertifikat terbit resmi.
                </p>

                <h4 className="requirements-title">Persyaratan Mengikuti Program:</h4>
                <ul className="requirements-list">
                  <li><Check size={16} className="req-icon" /> Memiliki Nomor Induk Berusaha (NIB) / Siap kami buatkan.</li>
                  <li><Check size={16} className="req-icon" /> Produk berupa makanan/minuman dengan olahan sederhana.</li>
                  <li><Check size={16} className="req-icon" /> Bahan baku sudah dipastikan kehalalannya (bersertifikat halal).</li>
                  <li><Check size={16} className="req-icon" /> bersedia didampingi proses verifikasi oleh Pendamping Proses Produk Halal (PPH).</li>
                </ul>

                <div className="legal-trust-badge mt-2">
                  <ShieldCheck className="trust-icon" size={24} />
                  <div className="trust-text">
                    <span className="trust-title">Program Resmi BPJPH Kemenag</span>
                    <span className="trust-desc">Pendamping PPH Yayasan Al Hidayah teregistrasi resmi.</span>
                  </div>
                </div>
              </div>

              <div className="layanan-form-col" data-reveal data-reveal-delay="120">
                <div className="card form-card-padding">
                  {halalSuccess ? (
                    <div className="text-center halal-success-box">
                      <div className="halal-success-icon"><Check size={32} /></div>
                      <h3>Permohonan Diterima!</h3>
                      <p>Terima kasih. Permohonan pendampingan sertifikasi halal Anda telah kami catat. Tim pendamping PPH kami akan segera menghubungi Anda dalam waktu 2x24 jam untuk verifikasi dokumen awal.</p>
                      <button onClick={() => setHalalSuccess(false)} className="btn btn-outline btn-full mt-2">Ajukan Permohonan Baru</button>
                    </div>
                  ) : (
                    <>
                      <h4 className="form-card-title">Daftar Pendampingan Halal</h4>
                      <form onSubmit={handleHalalSubmit}>
                        <div className="form-group">
                          <label className="form-label">Nama Pemilik Usaha</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Contoh: Ibu Siti Aminah" 
                            required
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Nama Merek / Usaha</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Contoh: Kripik Tempe Barokah" 
                            required
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Nomor Induk Berusaha (NIB) - Opsional</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Tulis NIB jika sudah ada" 
                            value={nib}
                            onChange={(e) => setNib(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Kategori Produk</label>
                          <select 
                            className="form-control"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                          >
                            <option value="Makanan">Makanan Kering / Basah</option>
                            <option value="Minuman">Minuman Olahan</option>
                            <option value="Jasa Penyembelihan">Jasa Penyembelihan Tradisional</option>
                            <option value="Lainnya">Lainnya</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="form-label">Nomor WhatsApp Hubung</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Contoh: 0812xxxxxxxx" 
                            required
                            value={halalContact}
                            onChange={(e) => setHalalContact(e.target.value)}
                          />
                        </div>
                        <button type="submit" className="btn btn-primary btn-full mt-sm">Ajukan Pendampingan Halal</button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* 2. KONSULTASI ONLINE */
            <div className="layanan-content-grid">
              <div className="layanan-desc-col" data-reveal>
                <span className="section-subtitle">Tanya Jawab Syariah</span>
                <h2 className="section-title">Layanan Konsultasi Online Syariah</h2>
                <p className="section-desc">
                  Mempunyai pertanyaan seputar fiqih sehari-hari, pembagian waris, masalah keluarga, zakat, atau kemushafan Al-Qur'an? Silakan ajukan secara langsung kepada Dewan Asatidzah Yayasan Al Hidayah.
                </p>
                <p>
                  Layanan ini bersifat rahasia dan gratis. Pertanyaan Anda akan direspons oleh ustadz yang kompeten di bidangnya. Kami akan memformulasikan pertanyaan Anda dan mengirimkannya langsung ke chat WhatsApp Ustadz pembimbing untuk konsultasi lebih intensif secara interaktif.
                </p>

                <div className="consultation-features">
                  <div className="c-feature-item">
                    <HelpCircle size={20} className="text-primary" />
                    <div>
                      <h5>Kategori Komprehensif</h5>
                      <p>Membahas Fiqih Ibadah, Fiqih Wanita, Waris, Muamalah Kontemporer, dan Zakat.</p>
                    </div>
                  </div>
                  <div className="c-feature-item">
                    <MessageCircle size={20} className="text-primary" />
                    <div>
                      <h5>Respons Cepat WhatsApp</h5>
                      <p>Konsultasi langsung dihubungkan ke nomor resmi WhatsApp pendamping syariah yayasan.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="layanan-form-col" data-reveal data-reveal-delay="120">
                <div className="card form-card-padding">
                  <h4 className="form-card-title">Ajukan Pertanyaan Konsultasi</h4>
                  <form onSubmit={handleConsultSubmit}>
                    <div className="form-group">
                      <label className="form-label">Nama Anda</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Contoh: Hamba Allah / Nama Asli" 
                        required
                        value={consultantName}
                        onChange={(e) => setConsultantName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Kategori Masalah</label>
                      <select 
                        className="form-control"
                        value={consultCategory}
                        onChange={(e) => setConsultCategory(e.target.value)}
                      >
                        <option value="Fiqih Ibadah">Fiqih Ibadah (Shalat/Wudhu/Puasa)</option>
                        <option value="Keluarga & Pernikahan">Keluarga & Pernikahan (Sakinah)</option>
                        <option value="Fiqih Waris">Fiqih Waris (Mawaris)</option>
                        <option value="Muamalah">Muamalah Ekonomi / Utang Piutang</option>
                        <option value="Konsultasi Al-Qur'an">Konsultasi Bacaan & Hafalan Qur'an</option>
                        <option value="Lainnya">Lainnya / Umum</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Uraian Pertanyaan Anda</label>
                      <textarea 
                        className="form-control" 
                        placeholder="Tulis pertanyaan Anda dengan lengkap dan jelas di sini agar memudahkan ustadz memahami konteks permasalahan..."
                        required
                        value={consultQuestion}
                        onChange={(e) => setConsultQuestion(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-full mt-sm">
                      <MessageCircle size={16} fill="currentColor" /> Kirim Pertanyaan ke WhatsApp
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .layanan-content-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        @media (min-width: 1024px) {
          .layanan-content-grid {
            grid-template-columns: 1.2fr 1fr;
          }
        }
        
        .requirements-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .requirements-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        
        .requirements-list li {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.95rem;
          line-height: 1.45;
        }
        
        .req-icon {
          color: var(--color-primary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        
        .form-card-padding {
          padding: 2rem;
          background-color: white;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }
        
        .form-card-title {
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: var(--color-primary-dark);
          font-family: var(--font-heading);
          font-size: 1.2rem;
        }
        
        .halal-success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1.5rem 0;
        }
        
        .halal-success-icon {
          width: 60px;
          height: 60px;
          border-radius: 9999px;
          background-color: var(--color-primary-soft);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        
        .consultation-features {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }
        
        .c-feature-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }
        
        .c-feature-item h5 {
          margin: 0 0 0.15rem 0;
          font-size: 0.95rem;
          color: var(--color-primary-dark);
        }
        
        .c-feature-item p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
