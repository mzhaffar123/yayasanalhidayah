// src/pages/Donasi.tsx
import { useState, useEffect } from 'react';
import { Users, ArrowLeft, ArrowRight, ShieldCheck, Check, QrCode } from 'lucide-react';
import { getDonations, updateDonationProgress, contactInfo } from '../data/mockData';
import type { DonationProgram } from '../data/mockData';
import DonationCard from '../components/DonationCard';

interface DonasiProps {
  selectedDonationId: string | null;
  setSelectedDonationId: (id: string | null) => void;
  initialFilter?: string | null;
}

export default function Donasi({ selectedDonationId, setSelectedDonationId, initialFilter }: DonasiProps) {
  const [filter, setFilter] = useState<'all' | 'pembangunan' | 'sosial' | 'keagamaan'>('all');
  const [donations, setDonations] = useState<DonationProgram[]>([]);
  const [cmsError, setCmsError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Donation Form States
  const [selectedPreset, setSelectedPreset] = useState<number>(50000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('QRIS');
  const [donorName, setDonorName] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [donorContact, setDonorContact] = useState<string>('');
  const [donorPrayer, setDonorPrayer] = useState<string>('');
  
  // Success state
  const [donationSuccess, setDonationSuccess] = useState<boolean>(false);
  const [successData, setSuccessData] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;
    getDonations()
      .then(items => {
        if (isMounted) setDonations(items);
      })
      .catch((error: unknown) => {
        if (isMounted) setCmsError(error instanceof Error ? error.message : 'Program donasi gagal dimuat.');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (initialFilter === 'pembangunan' || initialFilter === 'sosial' || initialFilter === 'keagamaan') {
      setFilter(initialFilter);
    } else {
      setFilter('all');
    }
  }, [initialFilter]);

  const handleSelectDonation = (id: string) => {
    setSelectedDonationId(id);
    setDonationSuccess(false);
    setSelectedPreset(50000);
    setCustomAmount('');
    setPaymentMethod('QRIS');
    setDonorName('');
    setIsAnonymous(false);
    setDonorContact('');
    setDonorPrayer('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedDonationId(null);
  };

  const handlePresetSelect = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedPreset(0);
  };

  const handleSubmitDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseInt(customAmount) : selectedPreset;
    
    if (!finalAmount || finalAmount < 1000) {
      alert('Minimal donasi adalah Rp 1.000');
      return;
    }

    if (!isAnonymous && !donorName.trim()) {
      alert('Harap isi nama donatur atau pilih opsi Hamba Allah (Anonim).');
      return;
    }

    const nameToRegister = isAnonymous ? 'Hamba Allah' : donorName;

    // Update progress in database
    if (selectedDonationId) {
      const updated = updateDonationProgress(selectedDonationId, finalAmount);
      setDonations(updated);

      // Generate success receipt data
      setSuccessData({
        amount: finalAmount,
        donorName: nameToRegister,
        method: paymentMethod,
        programTitle: selectedDonation?.title,
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        receiptNo: 'REG-' + Math.floor(100000 + Math.random() * 900000)
      });
      setDonationSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const selectedDonation = donations.find(d => d.id === selectedDonationId);
  const filteredDonations = filter === 'all' 
    ? donations 
    : donations.filter(d => d.category === filter);

  const percent = selectedDonation ? Math.min(Math.round((selectedDonation.collectedAmount / selectedDonation.targetAmount) * 100), 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const presets = [10000, 25000, 50000, 100000, 250000, 500000];

  if (selectedDonation) {
    if (donationSuccess && successData) {
      // Success Receipt UI
      return (
        <div className="donation-success-page section-padding">
          <div className="container text-center success-receipt-container">
            <div className="success-icon-badge">
              <Check size={48} />
            </div>
            <h2 className="success-title">Jazakumullahu Khairan Katsiran</h2>
            <p className="success-desc">
              Donasi Anda telah dikonfirmasi dan langsung tersalurkan ke program pilihan Anda. Semoga menjadi amal jariyah yang terus mengalir dan membawa keberkahan.
            </p>

            <div className="card receipt-card">
              <div className="receipt-header">
                <h3>KUITANSI DONASI ELEKTRONIK</h3>
                <span className="receipt-no">No. Kuitansi: {successData.receiptNo}</span>
              </div>
              <div className="receipt-body">
                <div className="receipt-row">
                  <span>Program Donasi:</span>
                  <span className="font-bold">{successData.programTitle}</span>
                </div>
                <div className="receipt-row">
                  <span>Nama Donatur:</span>
                  <span className="font-bold">{successData.donorName}</span>
                </div>
                <div className="receipt-row">
                  <span>Jumlah Donasi:</span>
                  <span className="font-bold text-primary font-heading-style">{formatCurrency(successData.amount)}</span>
                </div>
                <div className="receipt-row">
                  <span>Metode Pembayaran:</span>
                  <span className="font-bold">{successData.method}</span>
                </div>
                <div className="receipt-row">
                  <span>Waktu Transaksi:</span>
                  <span>{successData.date}</span>
                </div>
                <div className="receipt-row status-row">
                  <span>Status:</span>
                  <span className="badge-status badge-status-completed">Berhasil Disalurkan</span>
                </div>
              </div>
              <div className="receipt-footer text-muted">
                Yayasan Al Hidayah - SK Kemenkumham RI: AHU-0012345.AH.01.04
              </div>
            </div>

            <div className="receipt-actions">
              <a 
                href={`https://wa.me/${contactInfo.whatsapp}?text=Halo%20Admin%2C%20saya%20sudah%20berdonasi%20di%20Yayasan%20Al%20Hidayah%20sebesar%20${encodeURIComponent(formatCurrency(successData.amount))}%20untuk%20${encodeURIComponent(successData.programTitle)}.%20Nomor%20kuitansi%3A%20${successData.receiptNo}.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary"
              >
                Kirim Bukti Ke WhatsApp Relawan
              </a>
              <button onClick={handleBackToList} className="btn btn-outline ml-sm">
                Lihat Program Donasi Lain
              </button>
            </div>
          </div>

          <style>{`
            .success-receipt-container {
              max-width: 600px;
              margin-right: auto;
              margin-left: auto;
            }
            .success-icon-badge {
              width: 80px;
              height: 80px;
              border-radius: 9999px;
              background-color: var(--color-primary-soft);
              color: var(--color-primary);
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: auto;
              margin-left: auto;
              margin-bottom: 1.5rem;
            }
            .success-title {
              font-family: var(--font-heading);
              color: var(--color-primary-dark);
              font-weight: 800;
              margin-bottom: 0.5rem;
            }
            .success-desc {
              font-size: 0.95rem;
              color: var(--color-text-muted);
              margin-bottom: 2rem;
              line-height: 1.6;
            }
            .receipt-card {
              text-align: left;
              background-color: white;
              padding: 2rem;
              margin-bottom: 2rem;
              border: 1px solid var(--color-border);
              box-shadow: var(--shadow-sm);
            }
            .receipt-header {
              border-bottom: 2px dashed var(--color-border);
              padding-bottom: 1.25rem;
              margin-bottom: 1.25rem;
            }
            .receipt-header h3 {
              margin: 0 0 0.25rem 0;
              font-size: 1.15rem;
              color: var(--color-primary-dark);
              letter-spacing: 0.05em;
            }
            .receipt-no {
              font-size: 0.8rem;
              color: var(--color-text-muted);
              font-weight: 600;
            }
            .receipt-body {
              display: flex;
              flex-direction: column;
              gap: 0.85rem;
              border-bottom: 1px solid var(--color-border);
              padding-bottom: 1.25rem;
              margin-bottom: 1.25rem;
            }
            .receipt-row {
              display: flex;
              justify-content: space-between;
              font-size: 0.9rem;
              gap: 1.5rem;
            }
            .font-heading-style {
              font-size: 1.2rem;
            }
            .status-row {
              align-items: center;
            }
            .receipt-footer {
              text-align: center;
              font-size: 0.75rem;
              font-weight: 600;
            }
            .receipt-actions {
              display: flex;
              justify-content: center;
              gap: 1rem;
              flex-wrap: wrap;
            }
          `}</style>
        </div>
      );
    }

    // Donation Portal / Checkout Form
    return (
      <div className="donation-checkout-page">
        <section className="detail-banner" style={{ backgroundImage: `linear-gradient(rgba(6, 60, 37, 0.9), rgba(13, 92, 58, 0.8)), url(${selectedDonation.image})` }}>
          <div className="container">
            <button onClick={handleBackToList} className="btn-back">
              <ArrowLeft size={16} /> Kembali ke Kategori Donasi
            </button>
            <h1 className="detail-title">{selectedDonation.title}</h1>
          </div>
        </section>

        <section className="detail-body section-padding">
          <div className="container detail-layout">
            {/* Left Column: Progress details */}
            <div className="detail-main">
              <img src={selectedDonation.image} alt={selectedDonation.title} className="detail-hero-img" />
              <h3>Rincian Program Donasi</h3>
              <p className="detail-text">{selectedDonation.description}</p>
              
              {/* Progress and Stats Box */}
              <div className="card donation-details-progress-card">
                <div className="progress-container">
                  <div className="progress-labels">
                    <span className="progress-percent font-bold" style={{ fontSize: '1rem' }}>{percent}% Dana Terkumpul</span>
                    <span className="progress-donors flex-center gap-xs font-semibold">
                      <Users size={16} /> {selectedDonation.donorsCount} Donatur Berpartisipasi
                    </span>
                  </div>
                  <div className="progress-bar-bg" style={{ height: '12px' }}>
                    <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                  </div>
                </div>

                <div className="donation-detail-grid-stats">
                  <div className="det-stat-col">
                    <span className="det-stat-label">Dana Terkumpul</span>
                    <span className="det-stat-val text-primary">{formatCurrency(selectedDonation.collectedAmount)}</span>
                  </div>
                  <div className="det-stat-col">
                    <span className="det-stat-label">Target Kebutuhan</span>
                    <span className="det-stat-val">{formatCurrency(selectedDonation.targetAmount)}</span>
                  </div>
                  <div className="det-stat-col">
                    <span className="det-stat-label">Sisa Kebutuhan</span>
                    <span className="det-stat-val" style={{ color: '#dc2626' }}>
                      {formatCurrency(Math.max(selectedDonation.targetAmount - selectedDonation.collectedAmount, 0))}
                    </span>
                  </div>
                </div>
              </div>

              <h3>Mengapa Donasi Anda Sangat Membantu?</h3>
              <ul className="detail-benefits-list">
                <li><Check size={16} className="benefit-icon" /> Penyaluran amanah langsung kepada pihak penerima manfaat yang terdata.</li>
                <li><Check size={16} className="benefit-icon" /> Pembaruan progress dan laporan pembangunan diunggah secara berkala di portal.</li>
                <li><Check size={16} className="benefit-icon" /> Membuka kesempatan pahala jariyah yang tidak terputus bagi Anda sekeluarga.</li>
              </ul>
            </div>

            {/* Right Column: Checkout Form */}
            <div className="detail-sidebar donation-form-sidebar">
              <h4 className="sidebar-title">Formulir Donasi Amanah</h4>
              
              <form onSubmit={handleSubmitDonation}>
                {/* Nominal Preset */}
                <div className="form-group">
                  <label className="form-label">Pilih Nominal Donasi</label>
                  <div className="donation-grid-presets">
                    {presets.map(amount => (
                      <div 
                        key={amount} 
                        onClick={() => handlePresetSelect(amount)} 
                        className={`preset-btn ${selectedPreset === amount ? 'active' : ''}`}
                      >
                        {formatCurrency(amount).replace(',00', '').replace('Rp', 'Rp ')}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Custom Nominal */}
                <div className="form-group">
                  <label className="form-label">Atau Masukkan Nominal Kustom (Rp)</label>
                  <div className="input-with-icon-wrapper">
                    <span className="input-currency-prefix">Rp</span>
                    <input 
                      type="number" 
                      className="form-control" 
                      placeholder="Contoh: 150000" 
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      min="1000"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="form-group">
                  <label className="form-label">Metode Pembayaran</label>
                  <div className="payment-methods-grid">
                    <div 
                      onClick={() => setPaymentMethod('QRIS')} 
                      className={`payment-method-card ${paymentMethod === 'QRIS' ? 'active' : ''}`}
                    >
                      <QrCode size={20} className="text-primary" />
                      <div className="payment-method-text">
                        <span className="font-bold d-block" style={{ fontSize: '0.85rem' }}>QRIS / E-Wallet</span>
                        <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Gopay/OVO/Shopee</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('Bank Syariah Indonesia (BSI)')} 
                      className={`payment-method-card ${paymentMethod === 'Bank Syariah Indonesia (BSI)' ? 'active' : ''}`}
                    >
                      <span className="payment-logo">BSI</span>
                      <div className="payment-method-text">
                        <span className="font-bold d-block" style={{ fontSize: '0.85rem' }}>Transfer BSI</span>
                        <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Norek: 7123456789</span>
                      </div>
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('Bank Mandiri')} 
                      className={`payment-method-card ${paymentMethod === 'Bank Mandiri' ? 'active' : ''}`}
                    >
                      <span className="payment-logo" style={{ color: '#003366' }}>Mandiri</span>
                      <div className="payment-method-text">
                        <span className="font-bold d-block" style={{ fontSize: '0.85rem' }}>Transfer Mandiri</span>
                        <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>Norek: 13100222444</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* QR Code Renders Dynamically for QRIS */}
                {paymentMethod === 'QRIS' && (
                  <div className="card qris-instructions-card text-center">
                    <span className="qris-badge">QRIS NASIONAL</span>
                    <div className="mock-qris-container">
                      <QrCode size={130} strokeWidth={1.5} className="mock-qr-graphic" />
                      <div className="qr-focus-border tl"></div>
                      <div className="qr-focus-border tr"></div>
                      <div className="qr-focus-border bl"></div>
                      <div className="qr-focus-border br"></div>
                    </div>
                    <p className="qris-desc">Silakan scan kode QR di atas menggunakan aplikasi dompet digital (GoPay, OVO, LinkAja) atau m-Banking Anda.</p>
                  </div>
                )}

                {/* Donor details */}
                <div className="form-group">
                  <div className="flex-between">
                    <label className="form-label">Nama Lengkap Donatur</label>
                    <label className="checkbox-label-anon">
                      <input 
                        type="checkbox" 
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)} 
                      /> Hamba Allah (Anonim)
                    </label>
                  </div>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Contoh: Ahmad Fauzi"
                    disabled={isAnonymous}
                    value={isAnonymous ? '' : donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nomor WhatsApp / Email (Opsional)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Contoh: 0812xxxxxxxx / ahmad@email.com"
                    value={donorContact}
                    onChange={(e) => setDonorContact(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Doa & Harapan (Pesan untuk Penerima Manfaat)</label>
                  <textarea 
                    className="form-control" 
                    placeholder="Tulis doa atau harapan Anda di sini agar dapat dibaca pengurus & penerima manfaat..."
                    value={donorPrayer}
                    onChange={(e) => setDonorPrayer(e.target.value)}
                  />
                </div>

                <div className="sidebar-actions mt-3">
                  <button type="submit" className="btn btn-secondary btn-full btn-lg">
                    Konfirmasi Donasi <ArrowRight size={18} />
                  </button>
                  <div className="sidebar-trust-box" style={{ border: 'none', padding: 0 }}>
                    <ShieldCheck size={20} className="trust-icon" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>
                      Transaksi Aman & Sesuai Syariat Islam.
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        <style>{`
          .donation-details-progress-card {
            background-color: white;
            border: 1px solid var(--color-border);
            padding: 1.5rem;
            margin-bottom: 2rem;
          }
          .donation-detail-grid-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin-top: 1.25rem;
            border-top: 1px solid var(--color-border);
            padding-top: 1rem;
          }
          .det-stat-col {
            display: flex;
            flex-direction: column;
          }
          .det-stat-label {
            font-size: 0.725rem;
            color: var(--color-text-muted);
            font-weight: 500;
            text-transform: uppercase;
          }
          .det-stat-val {
            font-size: 1rem;
            font-weight: 700;
            color: var(--color-primary-dark);
          }
          .input-with-icon-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input-currency-prefix {
            position: absolute;
            left: 1rem;
            font-weight: 700;
            color: var(--color-primary);
          }
          .input-with-icon-wrapper .form-control {
            padding-left: 2.25rem;
          }
          .checkbox-label-anon {
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--color-text-muted);
            display: flex;
            align-items: center;
            gap: 0.25rem;
            cursor: pointer;
          }
          .d-block { display: block; }
          .payment-method-text {
            display: flex;
            flex-direction: column;
            line-height: 1.2;
          }
          .qris-instructions-card {
            background-color: var(--color-bg-secondary);
            border: 1px dashed var(--color-primary);
            padding: 1.25rem;
            margin-bottom: 1.25rem;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .qris-badge {
            background-color: #dc2626;
            color: white;
            font-size: 0.65rem;
            font-weight: 800;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            letter-spacing: 0.05em;
            margin-bottom: 0.75rem;
          }
          .mock-qris-container {
            position: relative;
            background-color: white;
            padding: 1rem;
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-sm);
            margin-bottom: 0.75rem;
            width: fit-content;
          }
          .mock-qr-graphic {
            color: #000000;
          }
          .qr-focus-border {
            position: absolute;
            width: 15px;
            height: 15px;
            border: 3px solid var(--color-primary);
          }
          .qr-focus-border.tl { top: 0.5rem; left: 0.5rem; border-right: none; border-bottom: none; }
          .qr-focus-border.tr { top: 0.5rem; right: 0.5rem; border-left: none; border-bottom: none; }
          .qr-focus-border.bl { bottom: 0.5rem; left: 0.5rem; border-right: none; border-top: none; }
          .qr-focus-border.br { bottom: 0.5rem; right: 0.5rem; border-left: none; border-top: none; }
          
          .qris-desc {
            margin: 0;
            font-size: 0.75rem;
            color: var(--color-text-muted);
            line-height: 1.4;
            max-width: 250px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="donations-list-page">
      {/* Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="banner-particle"></div>
        <div className="container banner-content text-center banner-slide">
          <h1>Program Donasi & Wakaf Umat</h1>
          <p>Membantu sesama dan berinvestasi pahala abadi melalui penyaluran donasi terpercaya.</p>
        </div>
      </section>

      {/* Grid Program Donasi */}
      <section className="donations-grid-section section-padding">
        <div className="container">
          {cmsError && <p role="alert" style={{ color: 'var(--color-danger)' }}>{cmsError}</p>}
          {isLoading && <p>Memuat program donasi...</p>}
          <div className="tab-container">
            <button className={`tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Semua Kategori</button>
            <button className={`tab-btn ${filter === 'pembangunan' ? 'active' : ''}`} onClick={() => setFilter('pembangunan')}>Wakaf Pembangunan</button>
            <button className={`tab-btn ${filter === 'sosial' ? 'active' : ''}`} onClick={() => setFilter('sosial')}>Kemanusiaan & Sosial</button>
            <button className={`tab-btn ${filter === 'keagamaan' ? 'active' : ''}`} onClick={() => setFilter('keagamaan')}>Dakwah Keagamaan</button>
          </div>

          <div className="grid-responsive grid-responsive-3 stagger-fade-in" data-reveal-stagger>
            {filteredDonations.map(donation => (
              <div key={donation.id} data-reveal>
                <DonationCard donation={donation} onSelect={handleSelectDonation} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
