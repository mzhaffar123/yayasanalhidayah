// src/components/Footer.tsx
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/mockData';
import logo from '../assets/logo Yayasan.jpeg';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const navigateTo = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-bismillah">
        <span className="bismillah" lang="ar">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
        <p>Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang</p>
      </div>

      <div className="container footer-grid">
        {/* Column 1: Info Yayasan */}
        <div className="footer-col info-col">
          <div className="footer-brand" onClick={() => navigateTo('home')}>
            <div className="logo-wrapper">
              <img src={logo} alt="Logo Yayasan Al Hidayah" className="footer-logo" />
            </div>
            <span className="footer-brand-name">Yayasan Al Hidayah</span>
          </div>
          <p className="footer-desc">
            Mewujudkan masyarakat yang cerdas, relijius, dan mandiri melalui program pendidikan berkualitas, pembinaan keagamaan, serta kepedulian sosial yang nyata dan amanah.
          </p>
          
          <div className="legal-trust-badge">

            <div className="trust-text">
            </div>
          </div>
        </div>

        {/* Column 2: Sitemap Quick Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Navigasi Halaman</h4>
          <ul className="footer-links">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Beranda</a></li>
            <li><a href="#tentang-kami" onClick={(e) => { e.preventDefault(); navigateTo('tentang-kami'); }}>Tentang Kami</a></li>
            <li><a href="#program" onClick={(e) => { e.preventDefault(); navigateTo('program'); }}>Program & Kelas</a></li>
            <li><a href="#donasi" onClick={(e) => { e.preventDefault(); navigateTo('donasi'); }}>Donasi Program</a></li>
            <li><a href="#kegiatan" onClick={(e) => { e.preventDefault(); navigateTo('kegiatan'); }}>Galeri & Agenda</a></li>
            <li><a href="#layanan" onClick={(e) => { e.preventDefault(); navigateTo('layanan'); }}>Layanan Yayasan</a></li>
            <li><a href="#berita" onClick={(e) => { e.preventDefault(); navigateTo('berita'); }}>Berita & Artikel</a></li>
            <li><a href="#kontak" onClick={(e) => { e.preventDefault(); navigateTo('kontak'); }}>Hubungi Kami</a></li>
          </ul>
        </div>

        {/* Column 3: Program Utama */}
        <div className="footer-col">
          <h4 className="footer-col-title">Program Utama</h4>
          <ul className="footer-links">
            <li><a href="#program?cat=pendidikan" onClick={(e) => { e.preventDefault(); navigateTo('program?cat=pendidikan'); }}>Taman Pendidikan Quran (TPA)</a></li>
            <li><a href="#program?cat=pendidikan" onClick={(e) => { e.preventDefault(); navigateTo('program?cat=pendidikan'); }}>Tahfidz Al-Qur'an Remaja</a></li>
            <li><a href="#program?cat=keagamaan" onClick={(e) => { e.preventDefault(); navigateTo('program?cat=keagamaan'); }}>Kajian Rutin Ahad Pagi</a></li>
            <li><a href="#donasi?cat=sosial" onClick={(e) => { e.preventDefault(); navigateTo('donasi?cat=sosial'); }}>Santunan Anak Yatim</a></li>
            <li><a href="#donasi?cat=pembangunan" onClick={(e) => { e.preventDefault(); navigateTo('donasi?cat=pembangunan'); }}>Wakaf Gedung Baru</a></li>
            <li><a href="#kelas-online" onClick={(e) => { e.preventDefault(); navigateTo('kelas-online'); }}>Kelas Online Tahsin</a></li>
          </ul>
        </div>

        {/* Column 4: Kontak Info */}
        <div className="footer-col kontak-col">
          <h4 className="footer-col-title">Hubungi Kami</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} className="contact-icon" />
              <span>{contactInfo.address}</span>
            </li>
            <li>
              <Phone size={18} className="contact-icon" />
              <a href={`https://wa.me/${contactInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
                +{contactInfo.whatsapp.slice(0,2)} {contactInfo.whatsapp.slice(2,5)}-{contactInfo.whatsapp.slice(5,9)}-{contactInfo.whatsapp.slice(9)} (WhatsApp)
              </a>
            </li>
            <li>
              <Mail size={18} className="contact-icon" />
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="copyright-text">&copy; {new Date().getFullYear()} Yayasan Al Hidayah. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="footer-bottom-links">
            <span onClick={() => navigateTo('admin')} style={{ cursor: 'pointer', opacity: 0.7 }}>CMS Admin</span>
            <span>|</span>
            <span onClick={() => navigateTo('tentang-kami')} style={{ cursor: 'pointer', opacity: 0.7 }}>Tentang Kami</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background: var(--color-primary-dark);
          color: rgba(255, 255, 255, 0.85);
          padding-top: 4.5rem;
          margin-top: auto;
          border-top: 4px solid var(--color-secondary);
          position: relative;
          overflow: hidden;
        }
        
        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(ellipse at 20% 50%, rgba(197,168,92,0.08) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%);
          pointer-events: none;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          padding-bottom: 4rem;
        }
        
        @media (min-width: 640px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
          }
        }
        
        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }
        
        .footer-logo {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-sm);
          object-fit: cover;
          background-color: white;
        }
        
        .footer-brand-name {
          color: white;
          font-size: 1.25rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }
        
        .footer-desc {
          font-size: 0.875rem;
          line-height: 1.6;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }
        
        
        .trust-icon {
          color: var(--color-secondary);
        }
        
        .trust-text {
          display: flex;
          flex-direction: column;
        }
        
        .trust-title {
          font-weight: 700;
          font-size: 0.85rem;
          color: white;
        }
        
        .trust-desc {
          font-size: 0.725rem;
          color: rgba(255, 255, 255, 0.6);
        }
        
        .footer-col-title {
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 30px;
          height: 2px;
          background-color: var(--color-secondary);
        }
        
        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all var(--transition-fast);
        }
        
        .footer-links a:hover {
          color: var(--color-secondary);
          padding-left: 4px;
        }
        
        .footer-contact-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          font-size: 0.875rem;
        }
        
        .footer-contact-list li {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          line-height: 1.5;
        }
        
        .contact-icon {
          color: var(--color-secondary);
          flex-shrink: 0;
          margin-top: 0.15rem;
        }
        
        .footer-contact-list a {
          color: rgba(255, 255, 255, 0.7);
          transition: color var(--transition-fast);
        }
        
        .footer-contact-list a:hover {
          color: var(--color-secondary);
        }
        
        .footer-social-wrapper {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }
        
        .social-icon-btn {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          background-color: rgba(255, 255, 255, 0.08);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        
        .social-icon-btn:hover {
          background-color: var(--color-secondary);
          color: var(--color-primary-dark);
          transform: translateY(-2px);
        }
        
        .footer-bottom {
          background: rgba(0, 0, 0, 0.2);
          padding: 1.5rem 0;
          font-size: 0.825rem;
          color: rgba(255, 255, 255, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        
        .footer-bottom-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        
        @media (min-width: 640px) {
          .footer-bottom-container {
            flex-direction: row;
          }
        }
        
        .copyright-text {
          margin: 0;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: 0.5rem;
        }
      `}</style>
    </footer>
  );
}
