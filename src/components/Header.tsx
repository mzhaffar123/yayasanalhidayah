// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Heart, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo Yayasan.jpeg';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Header({ activePage, setActivePage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateTo = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    setIsOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (name: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const menuItems = [
    { name: 'Home', path: 'home' },
    { name: 'Tentang Kami', path: 'tentang-kami' },
    {
      name: 'Program',
      path: 'program',
      dropdown: [
        { name: 'Semua Program', path: 'program' },
        { name: 'Pendidikan', path: 'program?cat=pendidikan' },
        { name: 'Keagamaan', path: 'program?cat=keagamaan' },
        { name: 'Sosial', path: 'program?cat=sosial' }
      ]
    },
    {
      name: 'Donasi',
      path: 'donasi',
      dropdown: [
        { name: 'Semua Donasi', path: 'donasi' },
        { name: 'Wakaf Pembangunan', path: 'donasi?cat=pembangunan' },
        { name: 'Santunan Yatim/Dhuafa', path: 'donasi?cat=sosial' },
        { name: 'Dakwah Keagamaan', path: 'donasi?cat=keagamaan' }
      ]
    },
    { name: 'Kelas Online', path: 'kelas-online' },
    { name: 'Kegiatan', path: 'kegiatan' },
    {
      name: 'Layanan',
      path: 'layanan',
      dropdown: [
        { name: 'Sertifikat Halal', path: 'layanan?type=halal' },
        { name: 'Konsultasi Online', path: 'layanan?type=konsultasi' }
      ]
    },
    { name: 'Berita', path: 'berita' },
    { name: 'Kontak', path: 'kontak' }
  ];

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo & Brand Name */}
        <div className="brand" onClick={() => navigateTo('home')}>
          <div className="logo-wrapper">
            <img src={logo} alt="Yayasan Al Hidayah" className="logo-img" />
          </div>
          <div className="brand-info">
            <span className="brand-name">Yayasan Al Hidayah</span>
            <span className="brand-tagline">Pendidikan, Agama & Sosial</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {menuItems.map((item) => (
              <li key={item.name} className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`}>
                {item.dropdown ? (
                  <>
                    <a
                      href={`#${item.path}`}
                      className={`nav-link ${activePage.split('?')[0] === item.path ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(item.name, e)}
                    >
                      {item.name} <ChevronDown size={14} className="chevron" />
                    </a>
                    <ul className={`dropdown-menu ${activeDropdown === item.name ? 'show' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={`#${sub.path}`}
                            className="dropdown-link"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo(sub.path);
                            }}
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a
                    href={`#${item.path}`}
                    className={`nav-link ${activePage.split('?')[0] === item.path ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.path);
                    }}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button & Hamburger */}
        <div className="header-actions">
          <button onClick={() => navigateTo('donasi')} className="btn btn-secondary btn-sm donate-header-btn">
            <Heart size={16} fill="currentColor" /> Donasi Sekarang
          </button>
          
          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer-overlay ${isOpen ? 'show' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="brand">
            <div className="logo-wrapper">
              <img src={logo} alt="Yayasan Al Hidayah" className="logo-img" />
            </div>
            <span className="brand-name">Al Hidayah</span>
          </div>
          <button className="drawer-close" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {menuItems.map((item) => (
              <li key={item.name} className="mobile-nav-item">
                {item.dropdown ? (
                  <div>
                    <button
                      className={`mobile-nav-link-btn ${activePage.split('?')[0] === item.path ? 'active' : ''}`}
                      onClick={(e) => toggleDropdown(item.name, e)}
                    >
                      {item.name} <ChevronDown size={16} className={`chevron ${activeDropdown === item.name ? 'rotate' : ''}`} />
                    </button>
                    <ul className={`mobile-dropdown-menu ${activeDropdown === item.name ? 'show' : ''}`}>
                      {item.dropdown.map((sub) => (
                        <li key={sub.name}>
                          <a
                            href={`#${sub.path}`}
                            className="mobile-dropdown-link"
                            onClick={(e) => {
                              e.preventDefault();
                              navigateTo(sub.path);
                            }}
                          >
                            {sub.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <a
                    href={`#${item.path}`}
                    className={`mobile-nav-link ${activePage === item.path ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(item.path);
                    }}
                  >
                    {item.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer-footer">
          <button onClick={() => navigateTo('donasi')} className="btn btn-secondary btn-full">
            <Heart size={16} fill="currentColor" /> Donasi Sekarang
          </button>
          
          <div className="legal-badge" onClick={() => navigateTo('admin')}>
            <ShieldCheck size={16} /> Panel Admin (Demo)
          </div>
        </div>
      </div>

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: var(--color-bg);
          border-bottom: 1px solid var(--color-border);
          transition: padding var(--transition-normal), background-color var(--transition-normal), box-shadow var(--transition-normal);
          padding-top: 0.85rem;
          padding-bottom: 0.85rem;
        }
        
        .site-header.scrolled {
          padding-top: 0.55rem;
          padding-bottom: 0.55rem;
          background: #fff;
          box-shadow: var(--shadow-sm);
          border-bottom-color: var(--color-border);
        }
        
        .header-container {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 1rem;
          width: 100%;
        }

        .desktop-nav {
          justify-self: center;
          display: block;
        }
        
        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: opacity var(--transition-fast);
        }
        .brand:hover { opacity: 0.85; }
        
        .logo-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-family: var(--font-heading);
          flex-shrink: 0;
        }
        
        .logo-img {
          width: 38px;
          height: 38px;
          object-fit: contain;
          border-radius: 8px;
          display: block;
        }
        
        .brand-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        
        .brand-name {
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--color-primary-dark);
          font-family: var(--font-heading);
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        
        .brand-tagline {
          font-size: 0.7rem;
          color: var(--color-text-light);
          font-weight: 500;
          letter-spacing: 0.02em;
        }
        
        /* Desktop Menu */
        .desktop-nav {
          display: none;
        }
        
        @media (min-width: 1024px) {
          .desktop-nav {
            display: block;
          }
        }
        
        .nav-list {
          list-style: none;
          display: flex;
          gap: 0.25rem;
          margin: 0;
          padding: 0;
        }
        
        .nav-item {
          position: relative;
          flex-shrink: 0;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--color-text-muted);
          padding: 0.4rem 0.45rem;
          border-radius: 7px;
          transition: all var(--transition-fast);
          letter-spacing: 0.01em;
          white-space: nowrap;
        }
        
        .nav-link:hover {
          color: var(--color-primary);
          background: var(--color-primary-soft);
        }
        
        .nav-link.active {
          color: var(--color-primary);
          background: var(--color-primary-soft);
          font-weight: 700;
        }
        
        .nav-link .chevron { transition: transform var(--transition-fast); }
        .nav-item:hover .nav-link .chevron { transform: rotate(180deg); }
        
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(6px);
          background: #fff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 0.5rem;
          list-style: none;
          min-width: 210px;
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-normal);
          z-index: 50;
        }
        
        .nav-item:hover .dropdown-menu, .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        
        .dropdown-link {
          display: block;
          padding: 0.55rem 1rem;
          color: var(--color-text);
          font-size: 0.85rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }
        
        .dropdown-link:hover { background: var(--color-primary-soft); color: var(--color-primary); }
        
        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          justify-self: end;
        }
        
        .donate-header-btn { display: none; }
        @media (min-width: 640px) { .donate-header-btn { display: inline-flex; } }
        
        .mobile-toggle {
          background: none;
          border: none;
          color: var(--color-primary-dark);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
        }
        
        @media (min-width: 1024px) {
          .mobile-toggle {
            display: none;
          }
        }
        
        /* Drawer Mobile */
        .mobile-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(6, 60, 37, 0.4);
          opacity: 0;
          visibility: hidden;
          transition: all var(--transition-normal);
          z-index: 998;
        }
        
        .mobile-drawer-overlay.show {
          opacity: 1;
          visibility: visible;
        }
        
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0; bottom: 0;
          width: 88%;
          max-width: 340px;
          background: #fff;
          box-shadow: -20px 0 60px rgba(6,60,37,0.15);
          z-index: 999;
          transform: translateX(100%);
          transition: transform var(--transition-slow);
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          border-left: 1px solid var(--color-border);
        }
        
        .mobile-drawer.open {
          transform: translateX(0);
        }
        
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .drawer-close {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
        }
        
        .mobile-nav {
          flex: 1;
          overflow-y: auto;
        }
        
        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .mobile-nav-link {
          display: block;
          padding: 0.75rem 0.5rem;
          font-weight: 600;
          color: var(--color-text);
          border-radius: var(--radius-sm);
        }
        
        .mobile-nav-link.active, .mobile-nav-link:hover {
          color: var(--color-primary);
          background-color: rgba(13, 92, 58, 0.05);
        }
        
        .mobile-nav-link-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 0.5rem;
          font-weight: 600;
          color: var(--color-text);
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
          border-radius: var(--radius-sm);
          font-family: var(--font-body);
        }
        
        .mobile-nav-link-btn.active, .mobile-nav-link-btn:hover {
          color: var(--color-primary);
          background-color: rgba(13, 92, 58, 0.05);
        }
        
        .mobile-nav-link-btn .chevron {
          transition: transform var(--transition-fast);
        }
        
        .mobile-nav-link-btn .chevron.rotate {
          transform: rotate(180deg);
        }
        
        .mobile-dropdown-menu {
          list-style: none;
          padding-left: 1.5rem;
          margin: 0.25rem 0 0.75rem;
          display: none;
          flex-direction: column;
          gap: 0.25rem;
        }
        
        .mobile-dropdown-menu.show {
          display: flex;
        }
        
        .mobile-dropdown-link {
          display: block;
          padding: 0.5rem;
          font-size: 0.875rem;
          color: var(--color-text-muted);
          font-weight: 500;
        }
        
        .mobile-dropdown-link:hover {
          color: var(--color-primary);
        }
        
        .drawer-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .legal-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: var(--color-text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.5rem;
          border: 1px dashed var(--color-border);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .legal-badge:hover {
          background-color: var(--color-bg-secondary);
          color: var(--color-primary);
          border-color: var(--color-primary);
        }
      `}</style>
    </header>
  );
}
