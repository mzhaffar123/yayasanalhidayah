// src/components/DonationCard.tsx
import { Heart, Users } from 'lucide-react';
import type { DonationProgram } from '../data/mockData';

interface DonationCardProps {
  donation: DonationProgram;
  onSelect: (id: string) => void;
}

export default function DonationCard({ donation, onSelect }: DonationCardProps) {
  const percent = Math.min(Math.round((donation.collectedAmount / donation.targetAmount) * 100), 100);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="card donation-card card-glow">
      <div className="card-img-wrapper">
        <span className="card-badge" style={{ backgroundColor: '#c5a85c', color: 'white' }}>
          {donation.category}
        </span>
        <img src={donation.image} alt={donation.title} className="card-img" loading="lazy" />
      </div>
      <div className="card-content">
        <h3 className="donation-card-title">{donation.title}</h3>
        <p className="donation-card-desc">{donation.description}</p>
        
        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-labels">
            <span className="progress-percent font-bold">{percent}% Terkumpul</span>
            <span className="progress-donors flex-center gap-xs">
              <Users size={14} /> {donation.donorsCount} Donatur
            </span>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
          </div>
        </div>

        {/* Donation Stats */}
        <div className="donation-amounts">
          <div className="amount-col">
            <span className="amount-label">Terkumpul</span>
            <span className="amount-value text-primary">{formatCurrency(donation.collectedAmount)}</span>
          </div>
          <div className="amount-col text-right">
            <span className="amount-label">Target</span>
            <span className="amount-value text-dark">{formatCurrency(donation.targetAmount)}</span>
          </div>
        </div>

        <button onClick={() => onSelect(donation.id)} className="btn btn-primary btn-sm btn-full donation-card-btn">
          <Heart size={14} fill="currentColor" /> Donasi Sekarang
        </button>
      </div>

      <style>{`
        .donation-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .gap-xs {
          gap: 0.25rem;
        }
        
        .donation-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--color-primary-dark);
          line-height: 1.35;
          min-height: 2.7rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .donation-card-desc {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .donation-amounts {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid var(--color-border);
          padding-top: 0.75rem;
          margin-bottom: 1.25rem;
        }
        
        .amount-col {
          display: flex;
          flex-direction: column;
        }
        
        .amount-label {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 500;
          text-transform: uppercase;
        }
        
        .amount-value {
          font-size: 0.95rem;
          font-weight: 700;
        }
        
        .text-primary {
          color: var(--color-primary);
        }
        
        .text-dark {
          color: var(--color-primary-dark);
        }
        
        .donation-card-btn {
          margin-top: auto;
        }
      `}</style>
    </div>
  );
}
