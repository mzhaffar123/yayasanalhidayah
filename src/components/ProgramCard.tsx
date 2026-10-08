// src/components/ProgramCard.tsx
import { ArrowRight, BookOpen, Heart, Users } from 'lucide-react';
import type { ProgramItem } from '../data/mockData';
interface ProgramCardProps {
  program: ProgramItem;
  onSelect: (id: string) => void;
}

export default function ProgramCard({ program, onSelect }: ProgramCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pendidikan':
        return <BookOpen size={16} />;
      case 'keagamaan':
        return <Users size={16} />;
      case 'sosial':
        return <Heart size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="card program-card card-glow card-ornament-top">
      <div className="card-img-wrapper">
        <span className="card-badge" style={{
          backgroundColor: program.category === 'pendidikan' ? '#0d5c3a' : program.category === 'keagamaan' ? '#c5a85c' : '#2563eb',
          color: 'white'
        }}>
          <span className="badge-icon-flex">
            {getCategoryIcon(program.category)}
            {program.category}
          </span>
        </span>
        <img src={program.image} alt={program.title} className="card-img" loading="lazy" />
      </div>
      <div className="card-content">
        <h3 className="program-card-title">{program.title}</h3>
        <p className="program-card-desc">{program.description}</p>
        <button onClick={() => onSelect(program.id)} className="btn-link-program">
          {program.ctaText} <ArrowRight size={16} className="arrow-icon" />
        </button>
      </div>

      <style>{`
        .program-card {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        .badge-icon-flex {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }
        
        .program-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--color-primary-dark);
          line-height: 1.3;
        }
        
        .program-card-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }
        
        .btn-link-program {
          background: none;
          border: none;
          color: var(--color-primary);
          font-weight: 700;
          font-size: 0.875rem;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          cursor: pointer;
          padding: 0;
          transition: color var(--transition-fast);
          font-family: var(--font-heading);
        }
        
        .btn-link-program:hover {
          color: var(--color-primary-light);
        }
        
        .btn-link-program .arrow-icon {
          transition: transform var(--transition-fast);
        }
        
        .btn-link-program:hover .arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
