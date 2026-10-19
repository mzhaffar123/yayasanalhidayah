// src/components/AdminCMS.tsx
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Check, RefreshCw, Save } from 'lucide-react';
import {
  getDonations,
  saveDonation, saveNews, saveClass, saveActivity
} from '../data/mockData';
import tahsin from '../assets/tahsin.jpeg';
import homepage from '../assets/homepage.jpeg';
import kelasMinggu from '../assets/kelas minggu.jpeg';
import type {
  DonationProgram,
  NewsItem,
  OnlineClass,
  ActivityItem
} from '../data/mockData';

interface AdminCMSProps {
  onRefreshData: () => void;
  onLogout?: () => void;
}

interface ImageInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

async function compressImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Pilih file gambar yang valid.');
  }
  if (file.size > 12 * 1024 * 1024) {
    throw new Error('Ukuran gambar maksimal 12 MB.');
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const loadedImage = new Image();
      loadedImage.onload = () => resolve(loadedImage);
      loadedImage.onerror = () => reject(new Error('Gambar tidak dapat dibuka.'));
      loadedImage.src = objectUrl;
    });
    const scale = Math.min(1, 1280 / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));

    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Browser tidak dapat memproses gambar ini.');
    }
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.82);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

function ImageInput({ label, value, onChange }: ImageInputProps) {
  const [error, setError] = useState('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    try {
      onChange(await compressImage(file));
      setError('');
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : 'Gambar gagal diproses.');
    }
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder="URL gambar (opsional)"
        value={value.startsWith('data:image/') ? '' : value}
        onChange={(event) => onChange(event.target.value)}
      />
      <label className="btn btn-outline btn-sm" style={{ marginTop: '0.5rem', display: 'inline-flex', cursor: 'pointer' }}>
        Pilih gambar dari galeri
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
      <small className="text-muted" style={{ display: 'block', marginTop: '0.35rem' }}>
        Maksimal 12 MB; gambar akan diperkecil otomatis agar penyimpanan lebih ringan.
      </small>
      {error && <small style={{ display: 'block', color: 'var(--color-danger)', marginTop: '0.35rem' }}>{error}</small>}
      {value && (
        <img
          src={value}
          alt="Pratinjau gambar"
          style={{ display: 'block', maxWidth: '180px', maxHeight: '120px', objectFit: 'cover', marginTop: '0.75rem', borderRadius: '8px' }}
        />
      )}
    </div>
  );
}

export default function AdminCMS({ onRefreshData, onLogout }: AdminCMSProps) {
  const [activeTab, setActiveTab] = useState<'donasi' | 'berita' | 'kelas' | 'kegiatan'>('donasi');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Database States
  const [donations, setDonations] = useState<DonationProgram[]>([]);

  // Selected for quick editing
  const [editDonationId, setEditDonationId] = useState<string | null>(null);
  const [donationAddAmount, setDonationAddAmount] = useState<string>('');
  const [donationNewTarget, setDonationNewTarget] = useState<string>('');

  // New Content Form States
  const [newsForm, setNewsForm] = useState({
    title: '', category: 'berita', author: 'Admin Yayasan',
    summary: '', content: '', image: homepage
  });

  const [classForm, setClassForm] = useState({
    title: '', instructor: '', schedule: '', price: '0',
    description: '', syllabusInput: '',
    image: tahsin
  });

  const [activityForm, setActivityForm] = useState({
    title: '', category: 'umum', date: new Date().toISOString().split('T')[0],
    description: '', image: kelasMinggu
  });

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = () => {
    setDonations(getDonations());
  };

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // 1. Manage Donasi Handlers
  const handleStartEditDonation = (program: DonationProgram) => {
    setEditDonationId(program.id);
    setDonationAddAmount('');
    setDonationNewTarget(program.targetAmount.toString());
  };

  const handleSaveDonationEdit = (program: DonationProgram) => {
    const add = donationAddAmount ? parseInt(donationAddAmount) : 0;
    const target = donationNewTarget ? parseInt(donationNewTarget) : program.targetAmount;

    const updatedProgram: DonationProgram = {
      ...program,
      collectedAmount: program.collectedAmount + add,
      targetAmount: target,
      donorsCount: add > 0 ? program.donorsCount + 1 : program.donorsCount
    };

    const result = saveDonation(updatedProgram);
    setDonations(result);
    setEditDonationId(null);
    onRefreshData();
    triggerToast(`Berhasil memperbarui program donasi: ${program.title}`);
  };

  // 2. Manage Berita Handlers
  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim() || !newsForm.summary.trim() || !newsForm.content.trim()) {
      alert('Harap isi Judul, Ringkasan, dan Konten Berita.');
      return;
    }

    const newItem: NewsItem = {
      id: 'new-' + Date.now(),
      title: newsForm.title,
      category: newsForm.category as any,
      date: new Date().toISOString().split('T')[0],
      author: newsForm.author,
      summary: newsForm.summary,
      content: newsForm.content,
      image: newsForm.image
    };

    const result = saveNews(newItem);
    setDonations(result as never);
    setNewsForm({
      title: '', category: 'berita', author: 'Admin Yayasan',
      summary: '', content: '', image: homepage
    });
    onRefreshData();
    triggerToast('Berhasil menambahkan Berita/Artikel baru!');
  };

  // 3. Manage Kelas Handlers
  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classForm.title.trim() || !classForm.instructor.trim() || !classForm.schedule.trim()) {
      alert('Harap isi Judul Kelas, Pengajar, dan Jadwal.');
      return;
    }

    const syllabusArray = classForm.syllabusInput
      ? classForm.syllabusInput.split('\n').filter(line => line.trim())
      : ['Pengenalan materi dasar', 'Materi lanjutan & pendalaman', 'Praktik & Ujian Akhir'];

    const newItem: OnlineClass = {
      id: 'cls-' + Date.now(),
      title: classForm.title,
      instructor: classForm.instructor,
      schedule: classForm.schedule,
      price: parseInt(classForm.price) || 0,
      description: classForm.description || 'Deskripsi kelas belum diatur.',
      syllabus: syllabusArray,
      image: classForm.image
    };

    const result = saveClass(newItem);
    setDonations(result as never);
    setClassForm({
      title: '', instructor: '', schedule: '', price: '0',
      description: '', syllabusInput: '',
      image: tahsin
    });
    onRefreshData();
    triggerToast('Berhasil mendaftarkan Kelas Online baru!');
  };

  // 4. Manage Kegiatan Handlers
  const handleActivitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityForm.title.trim() || !activityForm.description.trim()) {
      alert('Harap isi Judul Kegiatan dan Deskripsi singkat.');
      return;
    }

    const newItem: ActivityItem = {
      id: 'act-' + Date.now(),
      title: activityForm.title,
      category: activityForm.category as any,
      date: activityForm.date,
      description: activityForm.description,
      image: activityForm.image
    };

    const result = saveActivity(newItem);
    setDonations(result as never);
    setActivityForm({
      title: '', category: 'umum', date: new Date().toISOString().split('T')[0],
      description: '', image: kelasMinggu
    });
    onRefreshData();
    triggerToast('Berhasil mendokumentasikan kegiatan baru!');
  };

  return (
    <div className="admin-cms-page section-padding">
      <div className="container">
        <div className="section-title-wrapper" style={{ marginBottom: '2.5rem' }}>
          <span className="section-subtitle">Simulasi Pengelolaan</span>
          <h2 className="section-title">CMS Admin Yayasan (Demo Mode)</h2>
          <p className="section-desc">Gunakan panel ini untuk mensimulasikan perubahan data donasi berjalan, menambahkan berita, kelas online, dan agenda kegiatan yayasan tanpa menyentuh kode program. Data tersimpan lokal di browser.</p>
        </div>

        {showToast && (
          <div className="toast-success">
            <Check size={18} /> {toastMessage}
          </div>
        )}

        <div className="admin-dashboard">
          <div className="admin-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>Dashboard Manajemen Data</h2>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <button className="btn btn-white btn-sm" onClick={loadAllData}>
                <RefreshCw size={14} /> Refresh Data
              </button>
              {onLogout && (
                <button className="btn btn-outline btn-sm" onClick={onLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>

          <div className="admin-nav">
            <button
              className={`admin-nav-btn ${activeTab === 'donasi' ? 'active' : ''}`}
              onClick={() => setActiveTab('donasi')}
            >
              Donasi & Target Dana
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'berita' ? 'active' : ''}`}
              onClick={() => setActiveTab('berita')}
            >
              Kabar Berita & Artikel
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'kelas' ? 'active' : ''}`}
              onClick={() => setActiveTab('kelas')}
            >
              Kelas Online
            </button>
            <button
              className={`admin-nav-btn ${activeTab === 'kegiatan' ? 'active' : ''}`}
              onClick={() => setActiveTab('kegiatan')}
            >
              Dokumentasi Kegiatan
            </button>
          </div>

          <div className="admin-content">
            {/* TABS 1: DONASI */}
            {activeTab === 'donasi' && (
              <div>
                <h3>Manajemen Progress Donasi</h3>
                <p className="text-muted" style={{ fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                  Simulasikan masuknya donasi dari donatur luar dengan menambahkan dana pada program donasi tertentu di bawah ini.
                </p>

                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Program Donasi</th>
                        <th>Kategori</th>
                        <th>Terkumpul</th>
                        <th>Target Kebutuhan</th>
                        <th>Progress</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.map(d => {
                        const pct = Math.min(Math.round((d.collectedAmount / d.targetAmount) * 100), 100);
                        const isEditing = editDonationId === d.id;

                        return (
                          <tr key={d.id}>
                            <td className="font-bold" style={{ maxWidth: '280px' }}>{d.title}</td>
                            <td><span className="badge-status badge-status-ongoing">{d.category}</span></td>
                            <td>
                              {isEditing ? (
                                <div className="quick-edit-form">
                                  <span>Tambah:</span>
                                  <input
                                    type="number"
                                    className="quick-edit-input"
                                    placeholder="Nominal Rp"
                                    value={donationAddAmount}
                                    onChange={(e) => setDonationAddAmount(e.target.value)}
                                  />
                                </div>
                              ) : (
                                formatCurrency(d.collectedAmount)
                              )}
                            </td>
                            <td>
                              {isEditing ? (
                                <div className="quick-edit-form">
                                  <span>Target:</span>
                                  <input
                                    type="number"
                                    className="quick-edit-input"
                                    value={donationNewTarget}
                                    onChange={(e) => setDonationNewTarget(e.target.value)}
                                  />
                                </div>
                              ) : (
                                formatCurrency(d.targetAmount)
                              )}
                            </td>
                            <td>
                              <span className="font-bold text-primary">{pct}%</span> ({d.donorsCount} Donatur)
                            </td>
                            <td>
                              {isEditing ? (
                                <button onClick={() => handleSaveDonationEdit(d)} className="btn btn-primary btn-sm">
                                  <Save size={12} /> Simpan
                                </button>
                              ) : (
                                <button onClick={() => handleStartEditDonation(d)} className="btn btn-outline btn-sm">
                                  <Edit2 size={12} /> Update Progress
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TABS 2: BERITA */}
            {activeTab === 'berita' && (
              <div>
                <h3>Tambah Kabar Berita / Artikel</h3>

                <form onSubmit={handleNewsSubmit} className="admin-form-card">
                  <div className="admin-form-grid">
                    <div className="form-group">
                      <label className="form-label">Judul Tulisan</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Masukkan judul menarik"
                        required
                        value={newsForm.title}
                        onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Kategori Tulisan</label>
                      <select
                        className="form-control"
                        value={newsForm.category}
                        onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                      >
                        <option value="berita">Berita Kegiatan Yayasan</option>
                        <option value="artikel">Artikel Keislaman</option>
                        <option value="cerita">Cerita Penerima Manfaat</option>
                        <option value="pengumuman">Pengumuman Resmi</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Penulis</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: Ustadz Hanan / Humas"
                        value={newsForm.author}
                        onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                      />
                    </div>
                    <ImageInput
                      label="Gambar Sampul"
                      value={newsForm.image}
                      onChange={(image) => setNewsForm({ ...newsForm, image })}
                    />
                    <div className="form-group grid-full-width">
                      <label className="form-label">Ringkasan Pendek (Summary)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ringkasan 1-2 kalimat untuk kartu beranda"
                        required
                        value={newsForm.summary}
                        onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                      />
                    </div>
                    <div className="form-group grid-full-width">
                      <label className="form-label">Konten Artikel Lengkap</label>
                      <textarea
                        className="form-control"
                        placeholder="Tulis artikel lengkap di sini. Gunakan baris baru ganda (Enter 2x) untuk paragraf baru..."
                        required
                        style={{ minHeight: '160px' }}
                        value={newsForm.content}
                        onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button type="submit" className="btn btn-primary">
                      <Plus size={16} /> Terbitkan Artikel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TABS 3: KELAS */}
            {activeTab === 'kelas' && (
              <div>
                <h3>Tambah Kelas Keislaman Online</h3>

                <form onSubmit={handleClassSubmit} className="admin-form-card">
                  <div className="admin-form-grid">
                    <div className="form-group">
                      <label className="form-label">Judul Kelas</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: Kelas Tahsin Angkatan V"
                        required
                        value={classForm.title}
                        onChange={(e) => setClassForm({ ...classForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Nama Pengajar (Ustadz)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: Ustadz Yusuf Al-Hafizh"
                        required
                        value={classForm.instructor}
                        onChange={(e) => setClassForm({ ...classForm, instructor: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Jadwal Kelas</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: Sabtu & Ahad, 05.30 WIB"
                        required
                        value={classForm.schedule}
                        onChange={(e) => setClassForm({ ...classForm, schedule: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Infaq Bulanan (Rp) - 0 jika Gratis</label>
                      <input
                        type="number"
                        className="form-control"
                        value={classForm.price}
                        onChange={(e) => setClassForm({ ...classForm, price: e.target.value })}
                      />
                    </div>
                    <div className="grid-full-width">
                      <ImageInput
                        label="Gambar Visual Kelas"
                        value={classForm.image}
                        onChange={(image) => setClassForm({ ...classForm, image })}
                      />
                    </div>
                    <div className="form-group grid-full-width">
                      <label className="form-label">Deskripsi Singkat Kelas</label>
                      <textarea
                        className="form-control"
                        placeholder="Tulis ringkasan mengenai target kelas..."
                        value={classForm.description}
                        onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                      />
                    </div>
                    <div className="form-group grid-full-width">
                      <label className="form-label">Silabus/Kurikulum Kelas (Tulis per Baris)</label>
                      <textarea
                        className="form-control"
                        placeholder="Baris 1: Pembahasan makhraj huruf&#10;Baris 2: Hukum bacaan nun sukun&#10;Baris 3: Hukum bacaan mim sukun"
                        style={{ minHeight: '100px' }}
                        value={classForm.syllabusInput}
                        onChange={(e) => setClassForm({ ...classForm, syllabusInput: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button type="submit" className="btn btn-primary">
                      <Plus size={16} /> Daftarkan Kelas Online
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TABS 4: KEGIATAN */}
            {activeTab === 'kegiatan' && (
              <div>
                <h3>Dokumentasi Aksi / Kegiatan Baru</h3>

                <form onSubmit={handleActivitySubmit} className="admin-form-card">
                  <div className="admin-form-grid">
                    <div className="form-group">
                      <label className="form-label">Judul Kegiatan</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Contoh: Street Feeding Kucing Liar"
                        required
                        value={activityForm.title}
                        onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Kategori Kegiatan</label>
                      <select
                        className="form-control"
                        value={activityForm.category}
                        onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                      >
                        <option value="tk">Kegiatan TK Islam</option>
                        <option value="tpa">Kegiatan TPA Al Hidayah</option>
                        <option value="kajian">Kajian Ibu-Ibu / Dakwah</option>
                        <option value="umum">Kegiatan Umum / Sosial</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Tanggal Pelaksanaan</label>
                      <input
                        type="date"
                        className="form-control"
                        required
                        value={activityForm.date}
                        onChange={(e) => setActivityForm({ ...activityForm, date: e.target.value })}
                      />
                    </div>
                    <ImageInput
                      label="Gambar Dokumentasi"
                      value={activityForm.image}
                      onChange={(image) => setActivityForm({ ...activityForm, image })}
                    />
                    <div className="form-group grid-full-width">
                      <label className="form-label">Deskripsi Singkat Dokumentasi</label>
                      <textarea
                        className="form-control"
                        placeholder="Jelaskan secara singkat apa yang dilakukan dan dampak kegiatan tersebut..."
                        required
                        style={{ minHeight: '100px' }}
                        value={activityForm.description}
                        onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="admin-actions">
                    <button type="submit" className="btn className btn-primary">
                      <Plus size={16} /> Simpan Kegiatan
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
