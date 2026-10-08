// src/pages/Kegiatan.tsx
import { useState } from 'react';
import { Calendar, Camera, Clock, MapPin, Tag } from 'lucide-react';
import { getActivities } from '../data/mockData';

export default function Kegiatan() {
  const [filter, setFilter] = useState<'all' | 'tk' | 'tpa' | 'kajian' | 'umum'>('all');
  const activities = getActivities();

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.category === filter);

  // Mock Calendar Events for the current month
  const agendaList = [
    {
      title: 'Kajian Parenting Islami: Mendidik Generasi Shalih',
      date: 'Sabtu, 5 September 2026',
      time: '09.00 - 11.30 WIB',
      location: 'Aula Gedung TPA Yayasan',
      speaker: 'Ustadzah Kiki Barkiah, M.Si',
      badge: 'Kajian'
    },
    {
      title: 'Munaqosyah Jilid Iqra Semester Ganjil',
      date: 'Senin - Rabu, 14-16 September 2026',
      time: '16.00 - 17.30 WIB',
      location: 'Gedung TPA Al Hidayah',
      speaker: 'Dewan Asatidzah TPA',
      badge: 'TPA'
    },
    {
      title: 'Pemberian Paket Santunan Yatim & Sembako Dhuafa',
      date: 'Ahad, 20 September 2026',
      time: '08.00 - selesai',
      location: 'Halaman Utama Kantor Yayasan',
      speaker: 'Panitia Bidang Sosial',
      badge: 'Umum'
    },
    {
      title: 'Outbound & Belajar Alam Santri TK Islam',
      date: 'Kamis, 24 September 2026',
      time: '08.00 - 12.00 WIB',
      location: 'Taman Hutan Raya Juanda',
      speaker: 'Guru-Guru TK Islam',
      badge: 'TK'
    }
  ];

  return (
    <div className="kegiatan-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Kegiatan & Agenda Yayasan</h1>
          <p>Dokumentasi aksi nyata dan jadwal agenda kebaikan terdekat kami.</p>
        </div>
      </section>

      {/* Agenda/Jadwal Terdekat */}
      <section className="agenda-section section-padding">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle"><Calendar size={14} /> Kalender Kegiatan</span>
            <h2 className="section-title">Agenda Terdekat Yayasan</h2>
            <p className="section-desc">Ikuti dan hadiri rangkaian program edukasi, kajian, serta sosial kemasyarakatan yang akan dilaksanakan dalam waktu dekat.</p>
          </div>

          <div className="agenda-list" data-reveal-stagger>
            {agendaList.map((agenda, index) => (
              <div key={index} className="card agenda-card agenda-slide" data-reveal>
                <div className="agenda-badge-col">
                  <span className="agenda-badge" style={{
                    backgroundColor: agenda.badge === 'TPA' ? '#0d5c3a' : agenda.badge === 'TK' ? '#2563eb' : agenda.badge === 'Kajian' ? '#c5a85c' : '#64748b'
                  }}>
                    {agenda.badge}
                  </span>
                </div>
                <div className="agenda-info-col">
                  <h3 className="agenda-card-title">{agenda.title}</h3>
                  <div className="agenda-meta-grid">
                    <div className="agenda-meta-item">
                      <Calendar size={14} className="meta-icon" />
                      <span>{agenda.date}</span>
                    </div>
                    <div className="agenda-meta-item">
                      <Clock size={14} className="meta-icon" />
                      <span>{agenda.time}</span>
                    </div>
                    <div className="agenda-meta-item">
                      <MapPin size={14} className="meta-icon" />
                      <span>{agenda.location}</span>
                    </div>
                  </div>
                  <p className="agenda-speaker">Fasilitator/Pemateri: <span className="font-semibold text-primary">{agenda.speaker}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dokumentasi Galeri */}
      <section className="gallery-section section-padding bg-sage">
        <div className="container">
          <div className="section-title-wrapper" data-reveal>
            <span className="section-subtitle"><Camera size={14} /> Dokumentasi</span>
            <h2 className="section-title">Galeri Foto Aksi Nyata</h2>
            <p className="section-desc">Melihat potret keceriaan santri dan ketulusan para sukarelawan dalam menjalankan amanah kebaikan Anda.</p>
          </div>

          <div className="tab-container">
            <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Semua Kegiatan</button>
            <button className={`tab-btn ${filter === 'tk' ? 'active' : ''}`} onClick={() => setFilter('tk')}>Kegiatan TK</button>
            <button className={`tab-btn ${filter === 'tpa' ? 'active' : ''}`} onClick={() => setFilter('tpa')}>Kegiatan TPA</button>
            <button className={`tab-btn ${filter === 'kajian' ? 'active' : ''}`} onClick={() => setFilter('kajian')}>Kajian Ibu-Ibu</button>
            <button className={`tab-btn ${filter === 'umum' ? 'active' : ''}`} onClick={() => setFilter('umum')}>Kegiatan Umum</button>
          </div>

          <div className="grid-responsive grid-responsive-2 grid-responsive-4 stagger-fade-in" data-reveal-stagger>
            {filteredActivities.map(activity => (
              <div key={activity.id} className="card gallery-card gallery-zoom" data-reveal>
                <div className="gallery-img-wrapper">
                  <img src={activity.image} alt={activity.title} className="gallery-img" loading="lazy" />
                  <div className="gallery-hover-overlay">
                    <Camera size={24} className="hover-camera-icon" />
                  </div>
                </div>
                <div className="gallery-content">
                  <div className="gallery-date-flex">
                    <span className="act-cat-label"><Tag size={12} /> {activity.category}</span>
                    <span className="act-date-label">{activity.date}</span>
                  </div>
                  <h4 className="gallery-title">{activity.title}</h4>
                  <p className="gallery-text">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* Agenda Layout */
        .agenda-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 900px;
          margin-right: auto;
          margin-left: auto;
        }
        
        .agenda-card {
          background-color: white;
          padding: 1.5rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          border-left: 5px solid var(--color-primary);
        }
        
        @media (min-width: 640px) {
          .agenda-card {
            flex-direction: row;
            align-items: center;
          }
        }
        
        .agenda-badge-col {
          flex-shrink: 0;
        }
        
        .agenda-badge {
          display: inline-block;
          color: white;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .agenda-info-col {
          flex-grow: 1;
        }
        
        .agenda-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }
        
        .agenda-meta-grid {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 0.5rem;
        }
        
        .agenda-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        
        .meta-icon {
          color: var(--color-secondary-dark);
        }
        
        .agenda-speaker {
          margin: 0;
          font-size: 0.875rem;
          color: var(--color-text-muted);
        }
        
        /* Gallery Card Styles */
        .gallery-card {
          background-color: white;
        }
        
        .gallery-img-wrapper {
          position: relative;
          height: 180px;
          overflow: hidden;
        }
        
        .gallery-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-normal);
        }
        
        .gallery-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(6, 60, 37, 0.4);
          opacity: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: opacity var(--transition-fast);
          z-index: 1;
        }
        
        .gallery-card:hover .gallery-img {
          transform: scale(1.05);
        }
        
        .gallery-card:hover .gallery-hover-overlay {
          opacity: 1;
        }
        
        .gallery-content {
          padding: 1.25rem;
        }
        
        .gallery-date-flex {
          display: flex;
          justify-content: space-between;
          font-size: 0.725rem;
          color: var(--color-text-muted);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .act-cat-label {
          text-transform: uppercase;
          font-weight: 700;
          color: var(--color-secondary-dark);
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .gallery-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-primary-dark);
          margin-bottom: 0.5rem;
          line-height: 1.35;
        }
        
        .gallery-text {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
