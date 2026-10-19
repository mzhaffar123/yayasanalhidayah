// src/pages/Berita.tsx
import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { getNews } from '../data/mockData';
import type { NewsItem } from '../data/mockData';

export default function Berita() {
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'berita' | 'artikel' | 'cerita' | 'pengumuman'>('all');
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [cmsError, setCmsError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getNews()
      .then(items => {
        if (isMounted) setNewsList(items);
      })
      .catch((error: unknown) => {
        if (isMounted) setCmsError(error instanceof Error ? error.message : 'Berita gagal dimuat.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  const selectedNews = newsList.find(n => n.id === selectedNewsId);

  const filteredNews = filter === 'all' 
    ? newsList 
    : newsList.filter(n => n.category === filter);

  const handleSelectNews = (id: string) => {
    setSelectedNewsId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedNewsId(null);
  };

  if (selectedNews) {
    // Detailed News View
    return (
      <div className="news-detail-page">
        {/* Banner */}
        <section className="detail-banner" style={{ backgroundImage: `linear-gradient(rgba(6, 60, 37, 0.9), rgba(13, 92, 58, 0.8)), url(${selectedNews.image})` }}>
          <div className="container">
            <button onClick={handleBackToList} className="btn-back">
              <ArrowLeft size={16} /> Kembali ke Pusat Berita
            </button>
            <span className="detail-cat-badge">{selectedNews.category}</span>
            <h1 className="detail-title">{selectedNews.title}</h1>
          </div>
        </section>

        {/* Content Body */}
        <section className="detail-body section-padding">
          <div className="container news-content-container">
            <div className="news-full-card">
              <img src={selectedNews.image} alt={selectedNews.title} className="news-full-img" />
              
              <div className="news-full-meta">
                <div className="meta-item">
                  <User size={16} className="meta-icon" />
                  <span>Ditulis oleh: <span className="font-semibold text-primary">{selectedNews.author}</span></span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} className="meta-icon" />
                  <span>Tanggal: <span className="font-semibold">{selectedNews.date}</span></span>
                </div>
              </div>

              <div className="news-full-content-body">
                {selectedNews.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="news-paragraph">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <style>{`
          .news-content-container {
            max-width: 800px;
            margin-right: auto;
            margin-left: auto;
          }
          .news-full-card {
            background-color: white;
            border: 1px solid var(--color-border);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            padding: 2.5rem;
          }
          @media (max-width: 640px) {
            .news-full-card {
              padding: 1.5rem;
            }
          }
          .news-full-img {
            width: 100%;
            height: 400px;
            object-fit: cover;
            border-radius: var(--radius-md);
            margin-bottom: 2rem;
            box-shadow: var(--shadow-sm);
          }
          @media (max-width: 640px) {
            .news-full-img {
              height: 250px;
            }
          }
          .news-full-meta {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
            border-bottom: 1px solid var(--color-border);
            padding-bottom: 1.25rem;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
            color: var(--color-text-muted);
          }
          .meta-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .news-full-content-body {
            font-size: 1.05rem;
            line-height: 1.8;
            color: var(--color-text);
          }
          .news-paragraph {
            margin-top: 0;
            margin-bottom: 1.5rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="news-list-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Pusat Informasi & Artikel Keislaman</h1>
          <p>Kumpulan info terkini, transparansi kegiatan yayasan, dan artikel keislaman yang menyejukkan.</p>
        </div>
      </section>

      {/* Grid List */}
      <section className="news-grid-section section-padding">
        <div className="container">
          {cmsError && <p role="alert" style={{ color: 'var(--color-danger)' }}>{cmsError}</p>}
          {isLoading && <p>Memuat berita...</p>}
          <div className="tab-container">
            <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Semua Tulisan</button>
            <button className={`tab-btn ${filter === 'berita' ? 'active' : ''}`} onClick={() => setFilter('berita')}>Berita Yayasan</button>
            <button className={`tab-btn ${filter === 'artikel' ? 'active' : ''}`} onClick={() => setFilter('artikel')}>Artikel Keislaman</button>
            <button className={`tab-btn ${filter === 'cerita' ? 'active' : ''}`} onClick={() => setFilter('cerita')}>Cerita Penerima Manfaat</button>
            <button className={`tab-btn ${filter === 'pengumuman' ? 'active' : ''}`} onClick={() => setFilter('pengumuman')}>Pengumuman</button>
          </div>

          <div className="grid-responsive grid-responsive-3 stagger-fade-in" data-reveal-stagger>
            {filteredNews.map(news => (
              <div key={news.id} className="card news-card card-glow" data-reveal onClick={() => handleSelectNews(news.id)}>
                <div className="card-img-wrapper">
                  <span className="card-badge" style={{
                    backgroundColor: news.category === 'pengumuman' ? '#dc2626' : news.category === 'artikel' ? '#c5a85c' : '#0d5c3a'
                  }}>
                    {news.category}
                  </span>
                  <img src={news.image} alt={news.title} className="card-img" loading="lazy" />
                </div>
                <div className="card-content">
                  <div className="news-meta">
                    <span className="flex-center gap-xs"><User size={12} /> {news.author}</span>
                    <span>•</span>
                    <span className="flex-center gap-xs"><Calendar size={12} /> {news.date}</span>
                  </div>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-summary">{news.summary}</p>
                  <span className="news-readmore font-bold flex-center gap-xs" style={{ width: 'fit-content', color: 'var(--color-primary)', fontSize: '0.85rem' }}>
                    Baca Artikel Lengkap <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
