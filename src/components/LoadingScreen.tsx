import { useEffect, useState } from 'react';
import logo from '../assets/logo Yayasan.jpeg';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'loading' | 'fadeout' | 'done'>('loading');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Short, deterministic loading indicator — no random progress, no long hold.
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 40);

    // Start fade out once progress completes
    const fadeTimer = setTimeout(() => {
      setPhase('fadeout');
    }, 520);

    // Complete after fade animation
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 900);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`loading-screen ${phase === 'fadeout' ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* Logo with pulse animation */}
        <div className="loading-logo-wrapper">
          <div className="loading-logo-ring"></div>
          <div className="loading-logo-ring ring-2"></div>
          <img src={logo} alt="Yayasan Al Hidayah" className="loading-logo" />
        </div>

        {/* Brand name */}
        <h1 className="loading-brand-name">Yayasan Al Hidayah</h1>
        <p className="loading-tagline">Pendidikan, Agama & Sosial</p>

        {/* Progress bar */}
        <div className="loading-progress-wrapper">
          <div className="loading-progress-bar">
            <div
              className="loading-progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <span className="loading-progress-text">{Math.min(Math.round(progress), 100)}%</span>
        </div>

        {/* Loading text */}
        <p className="loading-text">Memuat halaman...</p>
      </div>

      {/* Background particles */}
      <div className="loading-particles"></div>

      <style>{`
        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 99999;
          background: var(--color-primary-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), visibility 0.6s;
        }

        .loading-screen.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .loading-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: white;
          padding: 2rem;
        }

        /* Logo animation */
        .loading-logo-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          border-radius: 16px;
          position: relative;
          z-index: 2;
        }

        .loading-logo-ring {
          display: none;
        }

        .loading-logo-ring.ring-2 {
          display: none;
        }

        @keyframes logoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        @keyframes ringPulse {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        /* Brand name */
        .loading-brand-name {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          font-weight: 800;
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .loading-tagline {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s ease-out 0.35s both;
        }

        /* Progress bar */
        .loading-progress-wrapper {
          width: 220px;
          margin: 0 auto 1rem;
          animation: fadeInUp 0.6s ease-out 0.5s both;
        }

        .loading-progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-full);
          overflow: hidden;
          margin-bottom: 0.5rem;
        }

        .loading-progress-fill {
          height: 100%;
          background: var(--color-secondary);
          border-radius: var(--radius-full);
          transition: width 0.3s ease-out;
          position: relative;
        }

        .loading-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 20px;
          background: rgba(255,255,255,0.25);
        }

        .loading-progress-text {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
        }

        /* Loading text */
        .loading-text {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 500;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes shimmer {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        /* Background particles */
        .loading-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .loading-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(197, 168, 92, 0.4);
          border-radius: 50%;
          animation: particleFloat 4s ease-in-out infinite;
        }

        .loading-particle:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
        .loading-particle:nth-child(2) { top: 25%; left: 85%; animation-delay: 0.5s; }
        .loading-particle:nth-child(3) { top: 40%; left: 20%; animation-delay: 1s; }
        .loading-particle:nth-child(4) { top: 55%; left: 75%; animation-delay: 1.5s; }
        .loading-particle:nth-child(5) { top: 70%; left: 15%; animation-delay: 2s; }
        .loading-particle:nth-child(6) { top: 80%; left: 80%; animation-delay: 2.5s; }
        .loading-particle:nth-child(7) { top: 10%; left: 50%; animation-delay: 0.3s; }
        .loading-particle:nth-child(8) { top: 35%; left: 90%; animation-delay: 0.8s; }
        .loading-particle:nth-child(9) { top: 60%; left: 5%; animation-delay: 1.3s; }
        .loading-particle:nth-child(10) { top: 75%; left: 45%; animation-delay: 1.8s; }
        .loading-particle:nth-child(11) { top: 90%; left: 60%; animation-delay: 2.3s; }
        .loading-particle:nth-child(12) { top: 5%; left: 30%; animation-delay: 2.8s; }

        @keyframes particleFloat {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          50% { transform: translateY(-40px) translateX(-5px); opacity: 0.3; }
          75% { transform: translateY(-20px) translateX(-10px); opacity: 0.5; }
        }

        @media (max-width: 640px) {
          .loading-brand-name {
            font-size: 1.35rem;
          }
          .loading-tagline {
            font-size: 0.75rem;
          }
          .loading-progress-wrapper {
            width: 180px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .loading-logo,
          .loading-logo-ring,
          .loading-particle,
          .loading-progress-fill::after {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
