// src/pages/Kegiatan.tsx
import { useEffect, useState } from 'react';
import { Calendar, Camera, Tag, X } from 'lucide-react';
import { getActivities } from '../data/mockData';
import type { ActivityItem } from '../data/mockData';

export default function Kegiatan() {
  const [filter, setFilter] = useState<'all' | 'tk' | 'tpa' | 'kajian' | 'umum'>('all');
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [cmsError, setCmsError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getActivities()
      .then(items => {
        if (isMounted) setActivities(items);
      })
      .catch((error: unknown) => {
        if (isMounted) setCmsError(error instanceof Error ? error.message : 'Kegiatan gagal dimuat.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(a => a.category === filter);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const agendaList = activities
    .filter(activity => new Date(`${activity.date}T00:00:00`) >= today)
    .sort((first, second) => first.date.localeCompare(second.date))
    .slice(0, 4);

  useEffect(() => {
    if (!selectedActivity) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedActivity(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedActivity]);

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
            {agendaList.map(agenda => (
              <div key={agenda.id} className="card agenda-card agenda-slide" data-reveal>
                <div className="agenda-badge-col">
                  <span className="agenda-badge" style={{
                    backgroundColor: agenda.category === 'tpa' ? '#0d5c3a' : agenda.category === 'tk' ? '#2563eb' : agenda.category === 'kajian' ? '#c5a85c' : '#64748b'
                  }}>
                    {agenda.category}
                  </span>
                </div>
                <div className="agenda-info-col">
                  <h3 className="agenda-card-title">{agenda.title}</h3>
                  <div className="agenda-meta-grid">
                    <div className="agenda-meta-item">
                      <Calendar size={14} className="meta-icon" />
                      <span>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(`${agenda.date}T00:00:00`))}</span>
                    </div>
                  </div>
                  <p className="agenda-speaker">{agenda.description}</p>
                </div>
              </div>
            ))}
            {!isLoading && agendaList.length === 0 && (
              <p>{cmsError || 'Belum ada agenda mendatang. Silakan cek kembali nanti.'}</p>
            )}
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
            {cmsError && <p role="alert" style={{ color: 'var(--color-danger)' }}>{cmsError}</p>}
            {isLoading && <p>Memuat kegiatan...</p>}
            {filteredActivities.map(activity => (
              <button
                key={activity.id}
                type="button"
                className="card gallery-card gallery-zoom"
                data-reveal
                onClick={() => setSelectedActivity(activity)}
                aria-label={`Lihat detail kegiatan: ${activity.title}`}
              >
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
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedActivity && (
        <div className="activity-modal-backdrop" onClick={() => setSelectedActivity(null)}>
          <section
            className="activity-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="activity-modal-title"
            onClick={event => event.stopPropagation()}
          >
            <button
              type="button"
              className="activity-modal-close"
              onClick={() => setSelectedActivity(null)}
              aria-label="Tutup detail kegiatan"
            >
              <X size={22} />
            </button>
            <img src={selectedActivity.image} alt={selectedActivity.title} className="activity-modal-image" />
            <div className="activity-modal-content">
              <div className="gallery-date-flex">
                <span className="act-cat-label"><Tag size={12} /> {selectedActivity.category}</span>
                <span className="act-date-label">
                  {new Intl.DateTimeFormat('id-ID', { dateStyle: 'long' }).format(new Date(`${selectedActivity.date}T00:00:00`))}
                </span>
              </div>
              <h2 id="activity-modal-title">{selectedActivity.title}</h2>
              <p>{selectedActivity.description}</p>
            </div>
          </section>
        </div>
      )}

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
          border: 0;
          padding: 0;
          width: 100%;
          text-align: left;
          cursor: pointer;
          color: inherit;
          font: inherit;
          overflow: hidden;
          border-radius: var(--radius-lg);
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

        .activity-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1200;
          display: grid;
          place-items: center;
          padding: 1rem;
          background: rgba(10, 24, 18, 0.72);
        }

        .activity-modal {
          position: relative;
          width: min(100%, 680px);
          max-height: min(90vh, 760px);
          overflow-y: auto;
          border-radius: var(--radius-lg);
          background: white;
          box-shadow: var(--shadow-lg);
        }

        .activity-modal-close {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          z-index: 1;
          display: grid;
          place-items: center;
          width: 2.5rem;
          height: 2.5rem;
          border: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.94);
          color: var(--color-primary-dark);
          cursor: pointer;
        }

        .activity-modal-image {
          display: block;
          width: 100%;
          max-height: 420px;
          object-fit: cover;
        }

        .activity-modal-content {
          padding: clamp(1.25rem, 4vw, 2rem);
        }

        .activity-modal-content h2 {
          margin: 0.75rem 0;
          font-size: clamp(1.25rem, 4vw, 1.75rem);
        }

        .activity-modal-content > p {
          margin: 0;
          color: var(--color-text-muted);
          line-height: 1.7;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
}
