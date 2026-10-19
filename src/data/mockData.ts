// src/data/mockData.ts

import tamankanak from '../assets/tamankanak.jpeg';
import tahsin from '../assets/tahsin.jpeg';
import kajianRutin from '../assets/kajian rutin.jpeg';
import kelasMinggu from '../assets/kelas minggu.jpeg';
import homepage from '../assets/homepage.jpeg';
import bukber from '../assets/bukber.jpeg';
import programTahfidz from '../assets/Program Tahfidz.jpeg';
import programKelasGuru from '../assets/Program Kelas Guru.jpeg';
import programKajianRutin from '../assets/Program Kajian Rutin Mingguan.jpeg';
import programCintaRasulullah from '../assets/Program Cinta Rasulullah.jpeg';
import tk from '../assets/tk.jpeg';
import { getCmsItems, migrateCmsItems, saveCmsItem } from './cmsRepository';

export interface ProgramItem {
  id: string;
  title: string;
  category: 'pendidikan' | 'keagamaan' | 'sosial';
  description: string;
  fullDescription: string;
  image: string;
  ctaText: string;
}

export interface DonationProgram {
  id: string;
  title: string;
  category: 'pembangunan' | 'sosial' | 'keagamaan' | 'pendidikan';
  description: string;
  targetAmount: number;
  collectedAmount: number;
  image: string;
  donorsCount: number;
  paymentMethods: string[];
}

export interface OnlineClass {
  id: string;
  title: string;
  instructor: string;
  schedule: string;
  price: number; // 0 untuk gratis
  description: string;
  syllabus: string[];
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'berita' | 'artikel' | 'cerita' | 'pengumuman';
  date: string;
  author: string;
  summary: string;
  content: string;
  image: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  category: 'tk' | 'tpa' | 'kajian' | 'umum';
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface ContactInfo {
  address: string;
  whatsapp: string;
  email: string;
  mapsEmbedUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
    twitter: string;
  };
}

// Initial Data
export const initialPrograms: ProgramItem[] = [
  // Pendidikan
  {
    id: 'edu-tk',
    title: 'Taman Kanak-Kanak (TK) Islam',
    category: 'pendidikan',
    description: 'Pendidikan anak usia dini berbasis nilai-nilai Islam dengan kurikulum ramah anak.',
    fullDescription: 'Taman Kanak-Kanak (TK) Islam Al Hidayah berdedikasi untuk mendidik tunas bangsa pada usia emas mereka (4-6 tahun). Kami memadukan Kurikulum Nasional dengan penanaman karakter Islami sejak dini, pengenalan huruf hijaiyah, doa harian, dan hafalan surat pendek (Juz Amma) melalui metode belajar sambil bermain yang menyenangkan.',
    image: tamankanak,
    ctaText: 'Daftar TK'
  },
  {
    id: 'edu-tpa',
    title: 'Taman Pendidikan Al-Qur\'an (TPA)',
    category: 'pendidikan',
    description: 'Pembelajaran membaca Al-Qur\'an sejak usia dini dengan metode Iqra\' yang mudah.',
    fullDescription: 'TPA Al Hidayah adalah wadah anak-anak untuk belajar membaca, menulis, dan memahami Al-Qur\'an selepas sekolah formal. Menggunakan metode Iqra\' yang interaktif, anak-anak juga diajarkan adab harian, kisah para nabi, serta praktik ibadah praktis seperti wudhu dan shalat berjamaah.',
    image: tamankanak,
    ctaText: 'Daftar TPA'
  },
  {
    id: 'edu-tahsin',
    title: 'Kelas Tahsin Al-Qur\'an',
    category: 'pendidikan',
    description: 'Perbaikan bacaan Al-Qur\'an sesuai dengan kaidah tajwid yang benar bagi dewasa.',
    fullDescription: 'Program bimbingan membaca Al-Qur\'an khusus bagi remaja dan dewasa yang ingin memperbaiki makhraj (tempat keluarnya huruf) dan hukum-hukum tajwid. Dibimbing langsung oleh ustadz/ustadzah yang kompeten untuk memastikan kelancaran dan ketepatan membaca sesuai kaidah tartil.',
    image: tahsin,
    ctaText: 'Ikut Kelas Tahsin'
  },
  {
    id: 'edu-tahfidz',
    title: 'Program Tahfidzul Qur\'an',
    category: 'pendidikan',
    description: 'Bimbingan menghafal Al-Qur\'an berjenjang untuk melahirkan hafizh/hafizhah.',
    fullDescription: 'Program intensif bagi santri yang berkomitmen menghafal Al-Qur\'an. Menyediakan metode setoran hafalan (sabaq), pengulangan hafalan baru (sabqi), dan murojaah hafalan lama (manzil) yang dipandu secara personal untuk menjaga kualitas hafalan santri.',
    image: programTahfidz,
    ctaText: 'Daftar Tahfidz'
  },
  {
    id: 'edu-guru',
    title: 'Kelas Pelatihan Guru Ngaji',
    category: 'pendidikan',
    description: 'Sertifikasi dan pembekalan metode mengajar kreatif bagi calon pengajar Al-Qur\'an.',
    fullDescription: 'Kelas Guru dirancang khusus untuk meningkatkan kompetensi pedagogik dan spiritual para pengajar Al-Qur\'an. Program ini mencakup metodologi pengajaran Iqra\'/Qiraati, psikologi perkembangan anak, manajemen kelas, serta teknik membangun motivasi santri agar mencintai Al-Qur\'an.',
    image: programKelasGuru,
    ctaText: 'Daftar Pelatihan'
  },
  {
    id: 'edu-islam1',
    title: 'Dasar Islam 1 (Aqidah & Fiqih)',
    category: 'pendidikan',
    description: 'Bimbingan pemahaman aqidah yang lurus dan fiqih ibadah praktis sehari-hari.',
    fullDescription: 'Program kelas berseri untuk memahami pilar-pilar penting dalam beragama. Membahas tauhid dan aqidah Ahlussunnah wal Jamaah secara mendalam, serta fiqih ibadah sehari-hari seperti bersuci (thaharah), shalat, puasa, zakat, dan dasar-dasar muamalah.',
    image: tahsin,
    ctaText: 'Daftar Kelas'
  },
  {
    id: 'edu-islam2',
    title: 'Dasar Islam 2 (Akhlak & Sejarah)',
    category: 'pendidikan',
    description: 'Pembelajaran adab Islami dan Sirah Nabawiyah sebagai teladan kehidupan.',
    fullDescription: 'Lanjutan dari Dasar Islam 1, kelas ini berfokus pada pembentukan akhlakul karimah (karakter mulia) berdasarkan tuntunan Rasulullah SAW. Santri juga diajak menelusuri sejarah kehidupan Nabi Muhammad SAW (Sirah Nabawiyah) dan para sahabat sebagai teladan praktis dalam bermasyarakat.',
    image: programKelasGuru,
    ctaText: 'Daftar Kelas'
  },
  {
    id: 'edu-arab',
    title: 'Bahasa Arab Al-Azhar Mesir',
    category: 'pendidikan',
    description: 'Pelajaran bahasa Arab lisan & tulisan terstandar universitas Al-Azhar Kairo.',
    fullDescription: 'Program kelas intensif belajar bahasa Arab, mulai dari dasar (nahwu, sharaf, percakapan harian/hiwar, kosakata) hingga persiapan ujian masuk Universitas Al-Azhar Mesir. Diajar oleh ustadz lulusan Universitas Al-Azhar Kairo yang berpengalaman.',
    image: tahsin,
    ctaText: 'Daftar Kelas Arab'
  },

  // Keagamaan
  {
    id: 'rel-mingguan',
    title: 'Kajian Mingguan Ahad Pagi',
    category: 'keagamaan',
    description: 'Kajian umum keislaman yang terbuka untuk masyarakat luas setiap hari Ahad.',
    fullDescription: 'Kajian umum rutin yang diselenggarakan setiap hari Ahad pukul 07.00 - 08.30 WIB di Masjid Al Hidayah. Menghadirkan penceramah dan ulama terkemuka untuk membahas tafsir Al-Qur\'an, hadits, tazkiyatun nufus (penyucian jiwa), dan isu-isu kontemporer umat.',
    image: kelasMinggu,
    ctaText: 'Info Jadwal Kajian'
  },
  {
    id: 'rel-ibu',
    title: 'Kajian Rutin Ibu-Ibu',
    category: 'keagamaan',
    description: 'Kajian khusus muslimah membahas fiqih wanita, keluarga sakinah, dan parenting.',
    fullDescription: 'Wadah silaturahmi dan belajar khusus bagi ibu-ibu yang diselenggarakan setiap Rabu sore. Kajian ini mengupas tuntas permasalahan fiqih wanita, kiat membangun rumah tangga sakinah mawaddah warahmah, serta tips parenting Islami dalam mendidik anak zaman sekarang.',
    image: kajianRutin,
    ctaText: 'Ikut Kajian'
  },
  {
    id: 'rel-sholawat',
    title: 'Majelis Halaqah Sholawat',
    category: 'keagamaan',
    description: 'Majelis dzikir dan pembacaan sholawat nabi rutin malam Jumat.',
    fullDescription: 'Majelis spiritual yang diadakan setiap malam Jumat ba\'da Isya. Diisi dengan pembacaan dzikir, ratib, sholawat kepada Rasulullah SAW, serta taushiyah singkat untuk memupuk kecintaan kepada Nabi Muhammad SAW dan mempererat ukhuwah islamiyah.',
    image: programCintaRasulullah,
    ctaText: 'Hadir Majelis'
  },
  {
    id: 'rel-dakwah',
    title: 'Kelompok Binaan Da\'wah',
    category: 'keagamaan',
    description: 'Kaderisasi da\'i muda untuk diterjunkan berdakwah di daerah pelosok.',
    fullDescription: 'Program pembinaan, pendampingan, dan kaderisasi bagi para da\'i muda. Yayasan mempersiapkan mereka dengan wawasan keislaman yang moderat, keahlian retorika dakwah, dan kesiapan mental untuk diterjunkan langsung ke masyarakat, khususnya di daerah tertinggal, terluar, dan terdepan (3T).',
    image: kelasMinggu,
    ctaText: 'Gabung Da\'wah'
  },

  // Sosial
  {
    id: 'soc-yatim',
    title: 'Santunan Yatim Piatu & Dhuafa',
    category: 'sosial',
    description: 'Penyaluran beasiswa pendidikan dan pemenuhan kebutuhan dasar anak yatim.',
    fullDescription: 'Program kepedulian sosial yang berkomitmen menyejahterakan anak-anak yatim, piatu, dan dhuafa di sekitar lingkungan yayasan. Melalui donasi Anda, kami menyediakan beasiswa sekolah, peralatan belajar, kebutuhan nutrisi bulanan, serta pembinaan akhlak secara rutin.',
    image: homepage,
    ctaText: 'Donasi Yatim'
  },
  {
    id: 'soc-pembangunan',
    title: 'Pembangunan Sarana Ibadah & Belajar',
    category: 'sosial',
    description: 'Pembangunan masjid, mushola, serta renovasi ruang kelas santri yang layak.',
    fullDescription: 'Wakaf sarana prasarana fisik untuk menunjang kelancaran ibadah masyarakat dan aktivitas belajar mengajar para santri. Proyek saat ini difokuskan pada penyelesaian renovasi gedung TPA dan perbaikan fasilitas sanitasi bersih.',
    image: tk,
    ctaText: 'Wakaf Pembangunan'
  },
  {
    id: 'soc-guru',
    title: 'Program Peduli Penjaga Qur\'an',
    category: 'sosial',
    description: 'Pemberian insentif dan jaminan kesehatan bagi guru-guru ngaji pejuang dakwah.',
    fullDescription: 'Banyak guru ngaji mengabdi tanpa pamrih dengan honor yang sangat minim. Program ini bertujuan mengapresiasi dan menyejahterakan para penjaga Al-Qur\'an tersebut dengan memberikan bantuan insentif bulanan tetap, sembako keluarga, dan jaminan kesehatan mandiri.',
    image: programKelasGuru,
    ctaText: 'Sponsori Guru Ngaji'
  },
  {
    id: 'soc-bukapuasa',
    title: 'Berbagi Buka Puasa Bersama',
    category: 'sosial',
    description: 'Penyediaan hidangan buka puasa sehat bagi kaum dhuafa dan santri penghafal Quran.',
    fullDescription: 'Penyediaan paket buka puasa bergizi gratis yang disalurkan secara rutin pada hari Senin dan Kamis bagi santri yatim penghafal Qur\'an, serta program buka puasa massal gratis selama bulan suci Ramadhan untuk masyarakat dhuafa di jalanan.',
    image: bukber,
    ctaText: 'Sedekah Buka Puasa'
  },
  {
    id: 'soc-hewan',
    title: 'Gerakan Peduli Kucing Liar & Hewan',
    category: 'sosial',
    description: 'Aksi kasih sayang memberi makan (street feeding) dan pengobatan hewan jalanan.',
    fullDescription: 'Wujud dari rahmatan lil \'alamin (kasih sayang semesta alam), yayasan menginisiasi gerakan kepedulian terhadap hewan di sekitar kita. Berupa pemberian makanan kucing jalanan secara terjadwal (street feeding), pengobatan kucing liar yang sakit/terluka, serta program sterilisasi mandiri bekerja sama dengan klinik hewan.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    ctaText: 'Donasi Peduli Hewan'
  }
];

export const initialDonations: DonationProgram[] = [
  {
    id: 'don-pembangunan',
    title: 'Wakaf Pembangunan Gedung TPA',
    category: 'pembangunan',
    description: 'Bantu kami mendirikan 3 ruang kelas baru yang layak untuk 150+ santri TPA agar belajar lebih nyaman dan tidak berdesakan.',
    targetAmount: 150000000,
    collectedAmount: 87250000,
    image: tk,
    donorsCount: 342,
    paymentMethods: ['BSI', 'Mandiri', 'QRIS', 'Gopay']
  },
  {
    id: 'don-yatim',
    title: 'Santunan Pendidikan Anak Yatim & Dhuafa',
    category: 'sosial',
    description: 'Penyaluran dana beasiswa bulanan, tas sekolah, seragam, dan buku pelajaran untuk menjamin kelangsungan sekolah mereka.',
    targetAmount: 50000000,
    collectedAmount: 42500000,
    image: homepage,
    donorsCount: 187,
    paymentMethods: ['BSI', 'Mandiri', 'QRIS', 'OVO']
  },
  {
    id: 'don-guru',
    title: 'Insentif Mulia Penjaga Qur\'an (Guru Ngaji)',
    category: 'sosial',
    description: 'Dukung kesejahteraan ekonomi 20 guru ngaji sukarela yang mengajar Al-Qur\'an di pelosok desa dengan insentif bulanan yang layak.',
    targetAmount: 30000000,
    collectedAmount: 12800000,
    image: programKelasGuru,
    donorsCount: 95,
    paymentMethods: ['BSI', 'Mandiri', 'QRIS']
  },
  {
    id: 'don-bukapuasa',
    title: 'Sedekah Paket Buka Puasa Sunnah & Ramadhan',
    category: 'sosial',
    description: 'Sedekah paket hidangan buka puasa bergizi seharga Rp 25.000/paket untuk santri penghafal Quran dan dhuafa di jalan.',
    targetAmount: 15000000,
    collectedAmount: 9400000,
    image: bukber,
    donorsCount: 78,
    paymentMethods: ['BSI', 'QRIS', 'LinkAja']
  },
  {
    id: 'don-kajian',
    title: 'Operasional Dakwah Kajian Rutin Mingguan',
    category: 'keagamaan',
    description: 'Pembiayaan operasional masjid, sound system, dokumentasi media dakwah, dan konsumsi jamaah kajian Ahad pagi.',
    targetAmount: 20000000,
    collectedAmount: 8000000,
    image: programKajianRutin,
    donorsCount: 64,
    paymentMethods: ['BSI', 'Mandiri', 'QRIS']
  },
  {
    id: 'don-sholawat',
    title: 'Gema Sholawat: Sarana & Prasarana Hadroh',
    category: 'keagamaan',
    description: 'Pembelian 1 set alat hadroh rebana berkualitas premium dan perlengkapan pengeras suara Majelis Halaqah Sholawat.',
    targetAmount: 10000000,
    collectedAmount: 4500000,
    image: programCintaRasulullah,
    donorsCount: 39,
    paymentMethods: ['BSI', 'QRIS', 'ShopeePay']
  },
  {
    id: 'don-dakwah',
    title: 'Uang Saku Pengabdian Da\'i di Daerah Pelosok',
    category: 'keagamaan',
    description: 'Bantuan biaya transportasi, akomodasi, dan biaya hidup untuk para da\'i muda yang ditugaskan membimbing mualaf di pelosok.',
    targetAmount: 25000000,
    collectedAmount: 11200000,
    image: kelasMinggu,
    donorsCount: 52,
    paymentMethods: ['BSI', 'Mandiri', 'QRIS']
  },
  {
    id: 'don-hewan',
    title: 'Donasi Peduli Kucing Liar & Street Feeding',
    category: 'sosial',
    description: 'Penyediaan pakan dry/wet food kucing jalanan, biaya pengobatan kucing terluka, steril massal, dan shelter penyelamatan sementara.',
    targetAmount: 5000000,
    collectedAmount: 3200000,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800',
    donorsCount: 31,
    paymentMethods: ['BSI', 'QRIS', 'Gopay']
  }
];

export const initialClasses: OnlineClass[] = [
  {
    id: 'cls-tahsin',
    title: 'Kelas Tahsin Al-Qur\'an Dewasa',
    instructor: 'Ustadz Syihabuddin, Lc.',
    schedule: 'Sabtu & Ahad, 05.30 - 07.00 WIB (Zoom)',
    price: 0,
    description: 'Kelas perbaikan bacaan Al-Qur\'an dari dasar secara privat maupun berkelompok. Cocok untuk Anda yang ingin memfasihkan makhraj dan melancarkan tajwid.',
    syllabus: [
      'Pengenalan makharijul huruf (tempat keluar huruf)',
      'Hukum bacaan Nun Sukun & Tanwin',
      'Hukum bacaan Mim Sukun',
      'Pembagian Mad (Panjang Pendek)',
      'Praktik membaca Surat Al-Fatihah dan Juz 30'
    ],
    image: tahsin
  },
  {
    id: 'cls-tahfidz',
    title: 'Hafalan Qur\'an Mandiri (Tahfidz)',
    instructor: 'Ustadz Yusuf Al-Hafizh',
    schedule: 'Senin s/d Kamis, 16.00 - 17.30 WIB (WhatsApp Call)',
    price: 100000,
    description: 'Setoran hafalan dan murojaah harian terpandu dengan ustadz bersertifikat sanad Al-Qur\'an.',
    syllabus: [
      'Pembekalan Metode Menghafal Efektif',
      'Setoran Hafalan Baru (Sabaq)',
      'Murojaah Hafalan Baru (Sabqi)',
      'Murojaah Hafalan Lama (Manzil)',
      'Evaluasi Ujian Hafalan per Juz'
    ],
    image: programTahfidz
  },
  {
    id: 'cls-guru',
    title: 'Kelas Guru: Pelatihan Guru TPA/Ngaji',
    instructor: 'Dr. KH. Ahmad Muzakki',
    schedule: 'Sabtu Sore, 16.00 - 17.30 WIB (Google Meet)',
    price: 0,
    description: 'Program pembekalan pedagogik guru ngaji untuk menciptakan kelas mengaji yang ceria, interaktif, dan penuh adab.',
    syllabus: [
      'Metodologi Pengajaran Iqra\' Cepat & Tepat',
      'Psikologi Anak & Karakteristik Santri',
      'Manajemen & Media Pembelajaran TPA',
      'Penyusunan Kurikulum & Silabus TPA',
      'Seni Bercerita (Storytelling) Kisah Para Nabi'
    ],
    image: programKelasGuru
  },
  {
    id: 'cls-islam1',
    title: 'Studi Dasar Islam 1: Aqidah & Fiqih',
    instructor: 'Ustadz Abdul Wahid, M.Ag',
    schedule: 'Ahad Malam (Ba\'da Isya), 19.30 - 21.00 WIB (Zoom)',
    price: 0,
    description: 'Memahami sendi-sendi utama keyakinan muslim dan tata cara ibadah yang sesuai dengan tuntunan sunnah Rasulullah SAW.',
    syllabus: [
      'Rukun Iman & Pembersihan Aqidah dari Syirik',
      'Kaidah Fiqih Thaharah (Wudhu, Mandi Wajib, Tayammum)',
      'Fiqih Shalat Fardhu & Shalat Sunnah Lengkap',
      'Fiqih Puasa Ramadhan & Puasa Sunnah',
      'Zakat, Infaq, Sedekah, dan Wakaf'
    ],
    image: tahsin
  },
  {
    id: 'cls-islam2',
    title: 'Studi Dasar Islam 2: Akhlak & Sirah',
    instructor: 'Ustadz Hanan Mubarak, Lc.',
    schedule: 'Selasa Malam, 19.30 - 21.00 WIB (Zoom)',
    price: 0,
    description: 'Menelusuri jejak sejarah keemasan Islam dan pembentukan akhlak mulia dalam hubungan sosial kemasyarakatan.',
    syllabus: [
      'Adab Berinteraksi dengan Orang Tua, Guru, & Tetangga',
      'Penyakit Hati (Hasad, Riya, Sombong) dan Obatnya',
      'Sirah Nabawiyah Periode Makkah (Dakwah Awal)',
      'Sirah Nabawiyah Periode Madinah (Pembentukan Negara)',
      'Kisah Inspiratif Khulafaur Rasyidin'
    ],
    image: programKelasGuru
  },
  {
    id: 'cls-arab',
    title: 'Bahasa Arab Standar Al-Azhar',
    instructor: 'Ustadz Syarifuddin, Lc., Dipl.',
    schedule: 'Jumat & Sabtu Malam, 20.00 - 21.30 WIB (Zoom)',
    price: 150000,
    description: 'Penguasaan Bahasa Arab aktif lisan dan tulisan menggunakan modul ajar Universitas Al-Azhar Kairo. Sangat baik untuk persiapan studi timur tengah.',
    syllabus: [
      'Kosakata Dasar & Percakapan Sehari-hari (Hiwar)',
      'Tinjauan Nahwu (Tata Bahasa): Isim, Fi\'il, Harf',
      'Tinjauan Sharaf (Perubahan Kata): Tasrif',
      'Membaca Kitab Gundul (Qira\'ah & Terjemah)',
      'Kemampuan Menulis & Mengarang (Kitabah)'
    ],
    image: tahsin
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'new-santunan',
    title: 'Penyaluran Beasiswa Yatim & Paket Sembako Sukses Dilaksanakan',
    category: 'berita',
    date: '2026-08-25',
    author: 'Admin Yayasan',
    summary: 'Yayasan Al Hidayah kembali menyalurkan beasiswa pendidikan dan paket sembako bulanan kepada 100 anak yatim binaan yang tersebar di wilayah sekitar.',
    content: 'Alhamdulillah, pada hari Ahad tanggal 23 Agustus 2026 kemarin, Yayasan Al Hidayah telah sukses menyelenggarakan agenda bulanan "Santunan Ceria Yatim Piatu". Dalam kegiatan ini, disalurkan beasiswa uang tunai senilai Rp 250.000/anak untuk keperluan sekolah, satu paket perlengkapan sekolah (tas, buku, alat tulis), serta paket sembako bagi keluarga/wali santri.\n\nKetua Yayasan menyatakan bahwa program ini dapat terlaksana secara konsisten berkat kebaikan hati para donatur sekalian. Kami mengucapkan terima kasih yang sebesar-besarnya, jazakumullahu khairan katsiran. Semoga harta yang disedekahkan membawa keberkahan melimpah bagi keluarga para donatur.',
    image: homepage
  },
  {
    id: 'new-sedekah',
    title: 'Keutamaan Bersedekah di Hari Jumat: Amalan yang Dilipat gandakan',
    category: 'artikel',
    date: '2026-08-20',
    author: 'Ustadz Hanan Mubarak, Lc.',
    summary: 'Hari Jumat merupakan Sayyidul Ayyam (pemimpin hari). Di dalamnya terdapat keutamaan amal sedekah yang bernilai ganda dibandingkan hari lainnya.',
    content: 'Hari Jumat memiliki kedudukan agung dalam Islam. Salah satu amalan mulia yang sangat dianjurkan adalah sedekah. Rasulullah SAW bersabda, "Sedekah itu dilipatgandakan pada hari Jumat." (HR. Abi Syaibah).\n\nMengapa bersedekah di hari Jumat begitu istimewa? Pertama, ia bertepatan dengan hari yang paling utama dalam sepekan. Kedua, sedekah di hari Jumat sebanding dengan sedekah di bulan Ramadhan. Ketiga, sedekah menjadi tameng dari siksa kubur dan melapangkan jalan hisab di akhirat kelak.\n\nMari budayakan sedekah subuh atau sedekah jumat secara konsisten demi meraih keberkahan hidup.',
    image: bukber
  },
  {
    id: 'new-kisah',
    title: 'Kisah Fajar: Alumni TPA Al Hidayah yang Kini Hafizh 30 Juz',
    category: 'cerita',
    date: '2026-08-15',
    author: 'Tim Media Yayasan',
    summary: 'Mengenal perjuangan Fajar, salah satu penerima manfaat beasiswa yatim yayasan, yang berhasil merampungkan hafalan Al-Qur\'an 30 Juz di pesantren.',
    content: 'Fajar (19) kehilangan ayahnya sejak usia 7 tahun. Ibunya bekerja serabutan untuk menghidupi tiga bersaudara. Namun keterbatasan ekonomi tidak menghentikan tekadnya. Fajar bergabung sebagai santri TPA Al Hidayah sejak kecil dan memperoleh beasiswa yatim berprestasi.\n\nDengan bimbingan intensif dari para ustadz yayasan dan ketekunan yang luar biasa, Fajar melanjutkan studi ke pesantren tahfidz mitra yayasan. Di pertengahan tahun ini, ia berhasil menyelesaikan setoran hafalan terakhirnya dan resmi menjadi Hafizh Al-Qur\'an 30 Juz.\n\n"Semua ini berkat bantuan para donatur Yayasan Al Hidayah yang membiayai sekolah saya sejak kecil. Terima kasih karena telah percaya pada impian saya," ujar Fajar dengan haru.',
    image: programTahfidz
  },
  {
    id: 'new-daftar',
    title: 'Pendaftaran Kelas Online Tahsin & Tahfidz Angkatan V Resmi Dibuka!',
    category: 'pengumuman',
    date: '2026-08-10',
    author: 'Humas Yayasan',
    summary: 'Yayasan Al Hidayah membuka pendaftaran baru bagi santri kelas online angkatan V untuk program Tahsin, Tahfidz, dan Studi Dasar Keislaman.',
    content: 'Pemberitahuan kepada segenap kaum muslimin yang ingin memperdalam ilmu agama dan interaksi dengan Al-Qur\'an. Yayasan Al Hidayah resmi membuka registrasi Kelas Online Angkatan V.\n\nProgram Kelas yang dibuka:\n1. Tahsin Al-Qur\'an (Dewasa)\n2. Setoran Hafalan Qur\'an (Remaja/Dewasa)\n3. Kelas Guru Ngaji\n4. Dasar Islam 1 & 2 (Aqidah, Fiqih, Akhlak, Sirah)\n5. Bahasa Arab Al-Azhar Mesir\n\nPembelajaran dilakukan via Zoom dan Google Meet pada akhir pekan dan malam hari sehingga tidak mengganggu jam kerja formal. Pendaftaran ditutup pada 10 September 2026.',
    image: tahsin
  }
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Mewarnai Kaligrafi Islami Santri TK',
    date: '2026-08-22',
    description: 'Mengembangkan kreativitas anak-anak usia dini melalui kegiatan mewarnai kaligrafi Asmaul Husna dengan penuh keceriaan.',
    image: tk,
    category: 'tk'
  },
  {
    id: 'act-2',
    title: 'Munaqosyah Jilid & Pembagian Rapor Santri TPA',
    date: '2026-08-18',
    description: 'Evaluasi kenaikan jilid Iqra dan pembacaan tajwid santri TPA yang dihadiri langsung oleh orang tua wali murid.',
    image: tamankanak,
    category: 'tpa'
  },
  {
    id: 'act-3',
    title: 'Kajian Bulanan Ibu-Ibu: Mendidik Anak Zaman Now',
    date: '2026-08-14',
    description: 'Kajian khusus muslimah yang membahas teknik pengawasan gawai dan membiasakan akhlak mulia pada anak di rumah.',
    image: kajianRutin,
    category: 'kajian'
  },
  {
    id: 'act-4',
    title: 'Aksi Bersih Masjid & Penyemprotan Disinfektan',
    date: '2026-08-05',
    description: 'Aksi sosial gotong royong membersihkan area dalam dan halaman luar Masjid Al Hidayah demi kenyamanan jamaah shalat.',
    image: kelasMinggu,
    category: 'umum'
  }
];

export const initialTestimonials: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Indri Mayasari',
    role: 'Murid Kelas Tahfidz Dewasa',
    quote: 'Alhamdulillah, belajar bersama Ustadz/ah sangat bermanfaat. Bacaan Al-Qur’an, tajwid, makhraj, dan hafalan saya menjadi lebih baik. Terima kasih atas bimbingan dan kesabarannya. Semoga Ustadz/ah dan Yayasan Bidayah Al Hidayah semakin sukses dalam berbagi. Aamiin.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't-2',
    name: 'Naviati Wahidah',
    role: 'Murid Kelas Tahfidz Dewasa Offline',
    quote: 'Alhamdulillah, belajar bersama Ustadz/ah  sangat memberikan manfaat bagi saya. Bacaan Al-Qur’an menjadi lebih baik, lebih memahami tajwid, dan semakin mencintai Al-Qur’an. Jazakillāhu khairan atas ilmu, kesabaran, dan bimbingannya. Semoga menjadi amal jariyah yang terus mengalir. Aamiin. 🤲🏻🌷🌷',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't-3',
    name: 'Bu Lisa Veronica',
    role: 'Murid Kelas Online Tahsin',
    quote: 'Saya merasa dlm belajar pengucapan makhroj, tajwid bila ada kesalahan langsung dibetulkan oleh guru dgn detail dan guru dlm mengajar sabar & selalu mengulang2',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't-4',
    name: 'Bilqis',
    role: 'Murid Kelas Tahsin Remaja Online',
    quote: 'Alhamdulillah selama belajar di tahsin online ini banyak hal tentang tajwid yang saya ketahui, Pengajar yang mengajarkan nya pun sangat detail menjelaskannya dan sangat baik, trimakasih karena telah membuka tahsin online ini🙏🥰',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 't-5',
    name: 'Azzam',
    role: 'Murid Kelas Tahfidz Anak Anak',
    quote: 'Aku senang ikut Ngaji Sore. Walaupun kadang aku suka bermain dan bercanda, Ustadz/ah tetap sabar mengajari aku baca nulis hafal Al-Qur’an. Sekarang aku jadi lebih rajin bermain dan ingin hafal lebih banyak surat. 😊📖',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'
  }
];

export const contactInfo: ContactInfo = {
  address: ' Jl. Perindustrian 5 No.13, Kecamatan Makasar, Kota Adm. Jakarta Timur, DKI Jakarta 13560',
  whatsapp: '628989784867',
  email: 'alhidayahbidayah7@gmail.com',
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.835163013233!2d107.6186121!3d-6.9103211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e639825b2067%3A0xe510f8ed046ea234!2sGedung%20Sate!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid',
  socials: {
    instagram: 'https://instagram.com/yayasan.alhidayah',
    facebook: 'https://facebook.com/yayasan.alhidayah',
    youtube: 'https://youtube.com/c/YayasanAlHidayah',
    twitter: 'https://twitter.com/yayasan_hidayah'
  }
};

// Database local storage keys
const KEYS = {
  PROGRAMS: 'yayasan_programs',
  DONATIONS: 'yayasan_donations',
  CLASSES: 'yayasan_classes',
  NEWS: 'yayasan_news',
  ACTIVITIES: 'yayasan_activities'
};

// Initialization helpers
function syncLocalPhotoDefaults(key: string, imageById: Record<string, string>) {
  const storedItems: Array<{ id?: string; image?: string }> = JSON.parse(localStorage.getItem(key) || '[]');
  if (!Array.isArray(storedItems)) return;

  let changed = false;
  const updatedItems = storedItems.map(item => {
    const localImage = item.id ? imageById[item.id] : undefined;
    if (localImage && item.image?.startsWith('https://images.unsplash.com/')) {
      changed = true;
      return { ...item, image: localImage };
    }
    return item;
  });

  if (changed) {
    localStorage.setItem(key, JSON.stringify(updatedItems));
  }
}

export function initializeDB() {
  if (!localStorage.getItem(KEYS.PROGRAMS)) {
    localStorage.setItem(KEYS.PROGRAMS, JSON.stringify(initialPrograms));
  }

  syncLocalPhotoDefaults(KEYS.PROGRAMS, {
    'edu-tk': tamankanak,
    'edu-tpa': tamankanak,
    'edu-tahsin': tahsin,
    'edu-tahfidz': programTahfidz,
    'edu-guru': programKelasGuru,
    'edu-islam1': tahsin,
    'edu-islam2': programKelasGuru,
    'edu-arab': tahsin,
    'rel-mingguan': kelasMinggu,
    'rel-ibu': kajianRutin,
    'rel-sholawat': programCintaRasulullah,
    'rel-dakwah': kelasMinggu,
    'soc-yatim': homepage,
    'soc-pembangunan': tk,
    'soc-guru': programKelasGuru,
    'soc-bukapuasa': bukber
  });

  if (!localStorage.getItem(KEYS.DONATIONS)) {
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(initialDonations));
  }
  syncLocalPhotoDefaults(KEYS.DONATIONS, {
    'don-pembangunan': tk,
    'don-yatim': homepage,
    'don-guru': programKelasGuru,
    'don-bukapuasa': bukber,
    'don-kajian': programKajianRutin,
    'don-sholawat': programCintaRasulullah,
    'don-dakwah': kelasMinggu
  });
  if (!localStorage.getItem(KEYS.CLASSES)) {
    localStorage.setItem(KEYS.CLASSES, JSON.stringify(initialClasses));
  }
  syncLocalPhotoDefaults(KEYS.CLASSES, {
    'cls-tahsin': tahsin,
    'cls-tahfidz': programTahfidz,
    'cls-guru': programKelasGuru,
    'cls-islam1': tahsin,
    'cls-islam2': programKelasGuru,
    'cls-arab': tahsin
  });
  if (!localStorage.getItem(KEYS.NEWS)) {
    localStorage.setItem(KEYS.NEWS, JSON.stringify(initialNews));
  }
  syncLocalPhotoDefaults(KEYS.NEWS, {
    'new-santunan': homepage,
    'new-sedekah': bukber,
    'new-kisah': programTahfidz,
    'new-daftar': tahsin
  });
  if (!localStorage.getItem(KEYS.ACTIVITIES)) {
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(initialActivities));
  }
  syncLocalPhotoDefaults(KEYS.ACTIVITIES, {
    'act-1': tk,
    'act-2': tamankanak,
    'act-3': kajianRutin,
    'act-4': kelasMinggu
  });
}

// Read helpers
export function getPrograms(): ProgramItem[] {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.PROGRAMS) || '[]');
}

export function getDonations(): Promise<DonationProgram[]> {
  initializeDB();
  return getCmsItems('donations', initialDonations);
}

export function getClasses(): Promise<OnlineClass[]> {
  initializeDB();
  return getCmsItems('classes', initialClasses);
}

export function getNews(): Promise<NewsItem[]> {
  initializeDB();
  return getCmsItems('news', initialNews);
}

export function getActivities(): Promise<ActivityItem[]> {
  initializeDB();
  return getCmsItems('activities', initialActivities);
}

// Write helpers
export function updateDonationProgress(id: string, amountToAdd: number): DonationProgram[] {
  const donations = JSON.parse(localStorage.getItem(KEYS.DONATIONS) || '[]') as DonationProgram[];
  const index = donations.findIndex(d => d.id === id);
  if (index !== -1) {
    donations[index].collectedAmount += amountToAdd;
    donations[index].donorsCount += 1;
    localStorage.setItem(KEYS.DONATIONS, JSON.stringify(donations));
  }
  return donations;
}

export async function saveDonation(program: DonationProgram): Promise<DonationProgram[]> {
  await saveCmsItem('donations', program);
  return getDonations();
}

export async function saveNews(item: NewsItem): Promise<NewsItem[]> {
  await saveCmsItem('news', item);
  return getNews();
}

export async function saveClass(item: OnlineClass): Promise<OnlineClass[]> {
  await saveCmsItem('classes', item);
  return getClasses();
}

export async function saveActivity(item: ActivityItem): Promise<ActivityItem[]> {
  await saveCmsItem('activities', item);
  return getActivities();
}

export async function migrateLocalCmsDataToSupabase(): Promise<void> {
  const migrationKey = 'yayasan_cms_supabase_migration_v1';
  if (localStorage.getItem(migrationKey) === 'done') return;

  initializeDB();
  await migrateCmsItems('donations', JSON.parse(localStorage.getItem(KEYS.DONATIONS) || '[]') as DonationProgram[]);
  await migrateCmsItems('news', JSON.parse(localStorage.getItem(KEYS.NEWS) || '[]') as NewsItem[]);
  await migrateCmsItems('classes', JSON.parse(localStorage.getItem(KEYS.CLASSES) || '[]') as OnlineClass[]);
  await migrateCmsItems('activities', JSON.parse(localStorage.getItem(KEYS.ACTIVITIES) || '[]') as ActivityItem[]);
  localStorage.setItem(migrationKey, 'done');
}
