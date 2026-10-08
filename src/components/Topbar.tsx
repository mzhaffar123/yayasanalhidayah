// src/components/Topbar.tsx
import { Mail, Phone } from 'lucide-react';
import { contactInfo } from '../data/mockData';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <span className="topbar-salam">
          <span className="arabic">السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ</span>
        </span>

        <div className="topbar-right">
          <span className="topbar-item">
            <Mail size={14} />
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </span>
          <span className="topbar-item">
            <Phone size={14} />
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{contactInfo.whatsapp.slice(0, 2)} {contactInfo.whatsapp.slice(2, 5)}-
              {contactInfo.whatsapp.slice(5, 9)}-{contactInfo.whatsapp.slice(9)}
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
