// src/App.tsx
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TentangKami from './pages/TentangKami';
import Program from './pages/Program';
import Donasi from './pages/Donasi';
import Kegiatan from './pages/Kegiatan';
import KelasOnline from './pages/KelasOnline';
import Layanan from './pages/Layanan';
import Berita from './pages/Berita';
import Kontak from './pages/Kontak';
import AdminCMS from './components/AdminCMS';
import AdminLogin from './components/AdminLogin';
import LoadingScreen from './components/LoadingScreen';
import Topbar from './components/Topbar';
import { initializeDB } from './data/mockData';
import { useScrollReveal } from './hooks/useScrollReveal';
import { Heart } from 'lucide-react';
import { supabase } from './lib/supabase';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [layananType, setLayananType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Detail item selectors
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(Boolean(supabase));
  const [authError, setAuthError] = useState('');

  // Global scroll-reveal animations
  useScrollReveal();

  // Initial DB loading
  useEffect(() => {
    initializeDB();
    
    // Initial route check
    handleRouting();

    // Listen for hash change routing
    window.addEventListener('hashchange', handleRouting);
    return () => window.removeEventListener('hashchange', handleRouting);
  }, []);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    let isMounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setIsAdmin(Boolean(session));
        setAuthError('');
        setIsAuthLoading(false);
      }
    });

    void supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!isMounted) return;
        if (error) {
          setAuthError(`Gagal memeriksa sesi admin: ${error.message}`);
          setIsAdmin(false);
        } else {
          setIsAdmin(Boolean(data.session));
        }
        setIsAuthLoading(false);
      })
      .catch((error: unknown) => {
        if (!isMounted) return;
        setAuthError(`Gagal memeriksa sesi admin: ${error instanceof Error ? error.message : 'Terjadi kesalahan jaringan.'}`);
        setIsAdmin(false);
        setIsAuthLoading(false);
      });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleRouting = () => {
    const hash = window.location.hash.slice(1) || 'home';
    const [path, queryString] = hash.split('?');
    
    // Parse query params
    const params: { [key: string]: string } = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, val] = pair.split('=');
        if (key && val) {
          params[key] = decodeURIComponent(val);
        }
      });
    }

    setActivePage(path);

    // Contextual handling for specific pages
    if (path === 'program') {
      setCategoryFilter(params.cat || null);
      if (!params.id) setSelectedProgramId(null);
      else setSelectedProgramId(params.id);
    } else if (path === 'donasi') {
      setCategoryFilter(params.cat || null);
      if (!params.id) setSelectedDonationId(null);
      else setSelectedDonationId(params.id);
    } else if (path === 'layanan') {
      setLayananType(params.type || null);
    } else {
      setCategoryFilter(null);
      setLayananType(null);
    }
  };

  const handlePageChange = (page: string) => {
    window.location.hash = page;
  };

  const handleSelectProgram = (id: string) => {
    setSelectedProgramId(id);
    window.location.hash = `program?id=${id}`;
  };

  const handleSelectDonation = (id: string) => {
    setSelectedDonationId(id);
    window.location.hash = `donasi?id=${id}`;
  };

  const refreshAppStates = () => {
    // Triggers local component reload
    handleRouting();
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setAuthError('');
    handleRouting();
  };

  const handleAdminLogout = async () => {
    if (!supabase) {
      setAuthError('Konfigurasi Supabase tidak tersedia.');
      return;
    }
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setAuthError(`Gagal keluar dari akun admin: ${error.message}`);
        return;
      }
      setIsAdmin(false);
      window.location.hash = 'home';
    } catch (error: unknown) {
      setAuthError(`Gagal keluar dari akun admin: ${error instanceof Error ? error.message : 'Terjadi kesalahan jaringan.'}`);
    }
  };

  // Render proper page view
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home 
            onNavigate={handlePageChange} 
            onSelectProgram={handleSelectProgram} 
            onSelectDonation={handleSelectDonation}
            isLoading={isLoading}
          />
        );
      case 'tentang-kami':
        return <TentangKami />;
      case 'program':
        return (
          <Program 
            selectedProgramId={selectedProgramId} 
            setSelectedProgramId={(id) => {
              setSelectedProgramId(id);
              if (!id) window.location.hash = 'program';
            }} 
            onNavigate={handlePageChange}
            initialFilter={categoryFilter}
          />
        );
      case 'donasi':
        return (
          <Donasi 
            selectedDonationId={selectedDonationId} 
            setSelectedDonationId={(id) => {
              setSelectedDonationId(id);
              if (!id) window.location.hash = 'donasi';
            }}
            initialFilter={categoryFilter}
          />
        );
      case 'kelas-online':
        return <KelasOnline />;
      case 'kegiatan':
        return <Kegiatan />;
      case 'layanan':
        return <Layanan initialType={layananType} />;
      case 'berita':
        return <Berita />;
      case 'kontak':
        return <Kontak />;
      case 'admin':
          return (
            <>
              {authError && (
                <div role="alert" className="container" style={{ paddingTop: '1rem', color: 'var(--color-danger)' }}>
                  {authError}
                </div>
              )}
              {isAuthLoading ? (
                <div className="container section-padding">Memeriksa sesi admin...</div>
              ) : isAdmin ? (
                <AdminCMS onRefreshData={refreshAppStates} onLogout={handleAdminLogout} />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} />
              )}
            </>
          );
      default:
        return (
          <Home 
            onNavigate={handlePageChange} 
            onSelectProgram={handleSelectProgram} 
            onSelectDonation={handleSelectDonation}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Topbar: salam + kontak (disembunyikan di panel admin) */}
      {activePage !== 'admin' && <Topbar />}

      {/* Navbar Header */}
      <div className={!isLoading ? 'app-loaded-wrapper' : ''}>
        <Header activePage={activePage} setActivePage={handlePageChange} />
      </div>

      {/* Main Pages Content */}
      <main className={`main-content-area ${!isLoading ? 'app-loaded' : ''}`} style={{ flex: 1 }}>
        {/* Keyed wrapper replays the enter animation on every route change */}
        <div
          key={`${activePage}-${selectedProgramId ?? ''}-${selectedDonationId ?? ''}`}
          className="page-transition"
        >
          {renderPage()}
        </div>
      </main>

      {/* Footer Sitemap */}
      <div className={!isLoading ? 'app-loaded-wrapper' : ''}>
        <Footer setActivePage={handlePageChange} />
      </div>

      {/* Floating Sticky Donate Button (hidden on checkout screens for focus) */}
      {activePage !== 'home' && !(activePage === 'donasi' && selectedDonationId) && (
        <a href="#donasi" className={`sticky-donate-btn ${!isLoading ? 'app-loaded' : ''}`} onClick={(e) => {
          e.preventDefault();
          handlePageChange('donasi');
        }}>
          <Heart size={18} fill="currentColor" /> Donasi Sekarang
        </a>
      )}
    </>
  );
}
