// src/pages/Kontak.tsx
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2,} from 'lucide-react';
import { contactInfo } from '../data/mockData';

export default function Kontak() {
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formSubject, setFormSubject] = useState('Pertanyaan Umum');
  const [formMessage, setFormMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim() || !formMessage.trim()) {
      alert('Harap isi Nama, Kontak Hubung, dan Isi Pesan.');
      return;
    }

    const whatsappMessage = `Assalamu'alaikum Admin Yayasan Al Hidayah,

Nama: ${formName.trim()}
Kontak: ${formContact.trim()}
Subjek: ${formSubject}

Pesan:
${formMessage.trim()}`;
    const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (whatsappWindow) {
      setSuccess(true);
    } else {
      alert('WhatsApp tidak dapat dibuka. Silakan izinkan pop-up pada browser Anda.');
    }
  };

  return (
    <div className="kontak-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Hubungi Kami</h1>
          <p>Pintu kami selalu terbuka untuk masukan, kerja sama, pendaftaran, dan silaturahmi.</p>
        </div>
      </section>

      {/* Main Grid: Info vs Form */}
      <section className="contact-main-section section-padding">
        <div className="container contact-grid">
          {/* Left Column: Info Kontak */}
          <div className="contact-info-col" data-reveal>
            <span className="section-subtitle">Hubungi Relawan</span>
            <h2 className="section-title">Kantor Layanan Yayasan</h2>
            <p className="section-desc">Silakan hubungi kami melalui media di bawah ini untuk konsultasi, informasi pendaftaran kelas, konfirmasi donasi, atau info kunjungan.</p>
            
            <ul className="contact-detail-list">
              <li className="slide-up-fade">
                <div className="contact-icon-wrapper icon-bounce">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4>Alamat Kantor</h4>
                  <p>{contactInfo.address}</p>
                </div>
              </li>
              <li className="slide-up-fade">
                <div className="contact-icon-wrapper icon-bounce">
                  <Phone size={22} />
                </div>
                <div>
                  <h4>WhatsApp (Hotline)</h4>
                  <p>
                    <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer" className="contact-link text-primary font-bold">
                      +{contactInfo.whatsapp.slice(0,2)} {contactInfo.whatsapp.slice(2,5)}-{contactInfo.whatsapp.slice(5,9)}-{contactInfo.whatsapp.slice(9)}
                    </a>
                  </p>
                </div>
              </li>
              <li className="slide-up-fade">
                <div className="contact-icon-wrapper icon-bounce">
                  <Mail size={22} />
                </div>
                <div>
                  <h4>Alamat Email</h4>
                  <p>
                    <a href={`mailto:${contactInfo.email}`} className="contact-link">
                      {contactInfo.email}
                    </a>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right Column: Form Kontak */}
          <div className="contact-form-col" data-reveal data-reveal-delay="120">
            <div className="card form-card-padding">
              {success ? (
                <div className="text-center contact-success-box">
                  <CheckCircle2 size={56} className="text-primary" />
                  <h3>Pesan Terkirim!</h3>
                  <p>Terima kasih atas pesan yang Anda kirimkan. Pengurus yayasan akan membaca dan merespons pesan Anda sesegera mungkin melalui nomor WhatsApp atau email yang tertera.</p>
                  <button onClick={() => setSuccess(false)} className="btn btn-outline mt-2">Kirim Pesan Lain</button>
                </div>
              ) : (
                <>
                  <h4 className="form-card-title">Kirim Pesan/Pertanyaan</h4>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Nama Lengkap</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Contoh: Budi Santoso" 
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nomor WhatsApp / Email</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Contoh: 0812xxxxxxxx / budi@email.com" 
                        required
                        value={formContact}
                        onChange={(e) => setFormContact(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subjek Pertanyaan</label>
                      <select 
                        className="form-control"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                      >
                        <option value="Pertanyaan Umum">Pertanyaan Umum / Info Yayasan</option>
                        <option value="Pendaftaran Kelas">Pendaftaran Kelas TK / TPA / Online</option>
                        <option value="Donasi / Wakaf">Konfirmasi Donasi / Wakaf</option>
                        <option value="Kerja Sama">Kerja Sama / Media Pengabdian</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Isi Pesan Anda</label>
                      <textarea 
                        className="form-control" 
                        placeholder="Tuliskan pesan, saran, atau pertanyaan Anda di sini secara detail..." 
                        required
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary btn-full mt-sm">
                      <Send size={16} /> Kirim Pesan Sekarang
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed Section */}
      <section className="maps-section">
        <div className="container">
          <div className="section-title-wrapper" style={{ marginBottom: '2rem' }}>
            <h2 className="section-title text-center">Lokasi Google Maps</h2>
          </div>
          <div className="maps-wrapper card">
            <iframe 
              src={contactInfo.mapsEmbedUrl} 
              width="100%" 
              height="400" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Maps Yayasan Al Hidayah"
            ></iframe>
          </div>
        </div>
      </section>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-form-col {
          min-width: 0;
        }

        .contact-form-col .form-card-padding {
          padding: 2rem;
        }

        .form-card-title {
          margin: 0 0 1.5rem;
          font-size: 1.35rem;
          color: var(--color-primary-dark);
        }

        .contact-form-col .form-label {
          color: var(--color-text);
        }

        .contact-form-col .form-control {
          min-height: 48px;
          background-color: #fff;
        }

        .contact-form-col textarea.form-control {
          min-height: 140px;
        }
        
        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1.1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .contact-form-col .form-card-padding {
            padding: 1.25rem;
          }

          .form-card-title {
            font-size: 1.15rem;
            margin-bottom: 1.25rem;
          }
        }
        
        .contact-detail-list {
          list-style: none;
          padding: 0;
          margin: 2rem 0;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .contact-detail-list li {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }
        
        .contact-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background-color: var(--color-primary-soft);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .contact-detail-list h4 {
          margin: 0 0 0.25rem 0;
          font-size: 0.95rem;
          color: var(--color-primary-dark);
        }
        
        .contact-detail-list p {
          margin: 0;
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.45;
        }
        
        .contact-link {
          color: var(--color-text);
          transition: color var(--transition-fast);
        }
        
        .contact-link:hover {
          color: var(--color-primary);
        }
        
        .follow-socials-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        
        .contact-social-flex {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        
        .c-social-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.85rem;
          color: white;
        }
        
        .c-social-btn.inst { background-color: #e1306c; }
        .c-social-btn.yt { background-color: #ff0000; }
        .c-social-btn.fb { background-color: #1877f2; }
        
        .contact-success-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 0;
        }
        
        .contact-success-box h3 {
          margin-top: 1rem;
          color: var(--color-primary-dark);
        }
        
        .maps-wrapper {
          overflow: hidden;
          line-height: 0;
          margin-bottom: 4rem;
        }
      `}</style>
    </div>
  );
}
