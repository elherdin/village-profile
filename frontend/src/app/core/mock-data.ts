import { ProfilDesa } from '../models/profil-desa.model';
import { PerangkatDesa } from '../models/perangkat-desa.model';
import { DataKependudukan } from '../models/data-kependudukan.model';
import { PotensiDesa } from '../models/potensi-desa.model';
import { ProgramKKN } from '../models/program-kkn.model';
import { Berita } from '../models/berita.model';
import { APBDes } from '../models/apbdes.model';
import { InfrastrukturDesa } from '../models/infrastruktur-desa.model';

export const MOCK_PROFIL_DESA: ProfilDesa = {
  id: 1,
  nama_desa: 'Desa Plantungan',
  tagline: 'Maju, Berdaya Saing, Berbudaya, dan Sejahtera Berbasis Potensi Lokal',
  logo: 'http://localhost:1337/api/media-file?key=desa-plantungan/1786785184078_IMG_1445.jpg',
  tentang: `Desa Plantungan merupakan salah satu desa yang terletak di kawasan strategis dengan bentang alam yang asri dan tanah yang subur. Desa ini memiliki kekayaan sumber daya alam yang melimpah, khususnya di sektor pertanian pangan, perkebunan rakyat penghasil komoditas atsiri/minyak rakyat, serta kelembagaan ekonomi desa yang produktif melalui BUMDes Maju Bersama. 

Masyarakat Desa Plantungan menjunjung tinggi nilai-nilai kearifan lokal, gotong royong, dan keterbukaan dalam tata kelola pemerintahan desa modern yang transparan dan akuntabel.`,
  sejarah: `Asal mula nama **Plantungan** berakar dari sejarah masa lampau ketika wilayah ini dikenal sebagai area peristirahatan dan pertemuan para perintis desa yang memanfaatkan melimpahnya sumber mata air dan kesuburan tanah pegunungan. 

Seiring bergulirnya waktu, Desa Plantungan berkembang menjadi pemukiman masyarakat yang gigih dalam mengolah lahan pertanian dan memelopori pengolahan hasil bumi berupa penyulingan minyak rakyat secara turun-temurun. Saat ini, Desa Plantungan telah bertransformasi menjadi desa mandiri yang memadukan kearifan tradisi dengan sistem informasi digital untuk pelayanan publik yang cepat dan prima.`,
  visi_misi: {
    visi: 'Terwujudnya Desa Plantungan yang Mandiri, Sejahtera, Transparan, dan Berdaya Saing Melalui Penguatan Ekonomi Rakyat dan Pelayanan Prima Berbasis Teknologi.',
    misi: [
      'Meningkatkan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berbasis digital.',
      'Mengoptimalkan potensi sektor pertanian, penyulingan minyak rakyat, dan usaha mikro kecil menengah (UMKM).',
      'Meningkatkan kualitas infrastruktur jalan desa, irigasi pertanian, dan fasilitas kesehatan masyarakat.',
      'Mendorong pemberdayaan pemuda, perempuan, dan lembaga kemasyarakatan desa dalam pembangunan.',
      'Memperkuat peran BUMDes sebagai motor penggerak ekonomi dan kemandirian finansial desa.'
    ],
    motto: 'Guyub Rukun Mbangun Desa Menuju Kesejahteraan Nyata'
  },
  alamat: 'Plantungan, Kec. Blora, Kabupaten Blora, Jawa Tengah 58219, Indonesia',
  email: 'desaplantungan@gmail.com',
  telepon: '+62 895-3927-48251',
  nama_kades: 'Endang Susana',
  luas_wilayah: '482,5 Hektar',
  jumlah_dusun: 4,
  jumlah_rt: 18,
  jumlah_rw: 4,
  koordinat: {
    latitude: -6.8892678,
    longitude: 111.4723041,
    zoom: 15
  }
};

export const MOCK_PERANGKAT_DESA: PerangkatDesa[] = [
  {
    id: 1,
    nama: 'Endang Susana',
    jabatan: 'Kepala Desa',
    kategori: 'Kepala Desa',
    nip: '197508122005011003',
    urutan: 1,
    foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    pendidikan_terakhir: 'S1 Ilmu Pemerintahan',
    periode: '2020 - 2026',
    kontak: 'kades@plantungan.desa.id'
  },
  {
    id: 2,
    nama: 'Muhammad Muslimin',
    jabatan: 'Ketua BPD',
    kategori: 'Badan Permusyawaratan Desa (BPD)',
    urutan: 2
  },
  {
    id: 3,
    nama: 'Sulasdi',
    jabatan: 'Wakil Ketua BPD',
    kategori: 'Badan Permusyawaratan Desa (BPD)',
    urutan: 3
  },
  {
    id: 4,
    nama: 'Windi Afrianti',
    jabatan: 'Sekretaris BPD',
    kategori: 'Badan Permusyawaratan Desa (BPD)',
    urutan: 4
  },
  {
    id: 5,
    nama: 'Rita Adriyani',
    jabatan: 'Anggota BPD',
    kategori: 'Badan Permusyawaratan Desa (BPD)',
    urutan: 5
  },
  {
    id: 6,
    nama: 'Ngadul',
    jabatan: 'Ketua LKMD',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 6
  },
  {
    id: 7,
    nama: 'Sukiran',
    jabatan: 'Wakil Ketua LKMD',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 7
  },
  {
    id: 8,
    nama: 'Siti Maisaroh',
    jabatan: 'Sekretaris Desa',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 8
  },
  {
    id: 9,
    nama: 'Reni Susanti',
    jabatan: 'Kaur Tata Usaha dan Umum',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 9
  },
  {
    id: 10,
    nama: 'M. Erfandi',
    jabatan: 'Kaur Perencanaan',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 10
  },
  {
    id: 11,
    nama: 'Indah Fitriani',
    jabatan: 'Kaur Keuangan',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 11
  },
  {
    id: 12,
    nama: 'Sufajar',
    jabatan: 'Kasi Pelayanan',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 12
  },
  {
    id: 13,
    nama: 'Wiluyo',
    jabatan: 'Kasi Pemerintahan',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 13
  },
  {
    id: 14,
    nama: 'Muhadi',
    jabatan: 'Kasi Kesehatan',
    kategori: 'Kelembagaan dan Perangkat Desa',
    urutan: 14
  }
];

export const MOCK_DATA_KEPENDUDUKAN: DataKependudukan = {
  id: 1,
  total_penduduk: 1102,
  laki_laki: 529,
  perempuan: 573,
  tahun_update: 2025,
  kelompok_usia: [
    { rentang: '0 - 5 Tahun (Balita)', jumlah: 245 },
    { rentang: '6 - 12 Tahun (Anak-anak)', jumlah: 380 },
    { rentang: '13 - 17 Tahun (Remaja)', jumlah: 340 },
    { rentang: '18 - 35 Tahun (Pemuda/Produktif Awal)', jumlah: 1020 },
    { rentang: '36 - 55 Tahun (Dewasa/Produktif)', jumlah: 980 },
    { rentang: '56+ Tahun (Lansia)', jumlah: 520 }
  ],
  tingkat_pendidikan: [
    { tingkat: 'Belum / Tidak Sekolah', jumlah: 215, persentase: 6.2 },
    { tingkat: 'Tamat SD / Sederajat', jumlah: 890, persentase: 25.5 },
    { tingkat: 'Tamat SMP / Sederajat', jumlah: 950, persentase: 27.3 },
    { tingkat: 'Tamat SMA / SMK / Sederajat', jumlah: 1120, persentase: 32.1 },
    { tingkat: 'Diploma & Sarjana (D3/S1/S2)', jumlah: 310, persentase: 8.9 }
  ],
  mata_pencaharian: [
    { sektor: 'Petani & Pekebun', jumlah: 1180, persentase: 44.5 },
    { sektor: 'Pengrajin Minyak Rakyat & UMKM', jumlah: 430, persentase: 16.2 },
    { sektor: 'Pedagang & Jasa', jumlah: 390, persentase: 14.7 },
    { sektor: 'Karyawan Swasta & Buruh', jumlah: 450, persentase: 17.0 },
    { sektor: 'PNS, TNI, POLRI & Pensiunan', jumlah: 200, persentase: 7.6 }
  ],
  distribusi_dusun: [
    { dusun: 'Desa Plentungan', jumlah_jiwa: 1102, laki_laki: 529, perempuan: 573 }
  ]
};

export const MOCK_POTENSI_DESA: PotensiDesa[] = [
  {
    id: 1,
    judul: 'Pertanian: Tebu, Padi dan Jagung',
    kategori: 'Pertanian',
    deskripsi: 'Pertanian merupakan salah satu sektor yang banyak dijalankan oleh masyarakat Desa Plantungan. Komoditas pertanian yang terdapat di desa meliputi tebu, padi, dan jagung. Ketiga komoditas tersebut menjadi bagian dari hasil pertanian masyarakat dan menunjukkan adanya pemanfaatan lahan untuk berbagai jenis tanaman sesuai dengan kondisi wilayah. Selain sebagai sumber hasil pertanian, sektor ini juga memiliki keterkaitan dengan aktivitas ekonomi masyarakat. Hasil pertanian dapat dimanfaatkan untuk memenuhi kebutuhan pangan maupun menjadi sumber pendapatan bagi masyarakat yang bergerak di bidang pertanian.',
    komoditas_utama: 'Tebu, Padi, dan Jagung',
    kontak_pengelola: 'Kelompok Tani Desa Plantungan',
    lokasi: 'Hamparan Pertanian Desa Plantungan'
  },
  {
    id: 2,
    judul: 'Ternak Sapi Terpadu',
    kategori: 'Peternakan',
    deskripsi: 'Peternakan sapi merupakan salah satu potensi lain yang terdapat di Desa Plantungan. Pemeliharaan sapi menjadi bagian dari aktivitas masyarakat dan mendukung sumber penghasilan rumah tangga di bidang peternakan. Potensi peternakan sapi juga memiliki keterkaitan dengan sektor pertanian. Kotoran ternak, misalnya, dapat dimanfaatkan sebagai bahan pupuk organik untuk mendukung kegiatan pertanian. Hubungan antara sektor pertanian dan peternakan tersebut menunjukkan adanya peluang pemanfaatan sumber daya lokal secara terpadu di Desa Plantungan.',
    komoditas_utama: 'Sapi Potong & Pupuk Organik',
    kontak_pengelola: 'Kelompok Peternak Desa Plantungan',
    lokasi: 'Kawasan Peternakan Warga Desa Plantungan'
  },
  {
    id: 3,
    judul: 'Sentra Minyak Rakyat',
    kategori: 'Minyak Rakyat',
    deskripsi: 'Desa Plantungan juga memiliki potensi minyak rakyat yang menjadi salah satu karakteristik sumber daya lokal desa. Potensi minyak rakyat tidak hanya menjadi bagian dari sumber daya yang terdapat di wilayah Desa Plantungan, tetapi juga memiliki nilai historis yang berkaitan dengan identitas dan perkembangan desa. Keberadaannya menjadi salah satu karakteristik yang turut memperkaya potensi lokal Desa Plantungan.',
    komoditas_utama: 'Minyak Atsiri Tradisional',
    kontak_pengelola: 'Pengrajin Penyulingan Minyak Rakyat',
    lokasi: 'Sentra Penyulingan Desa Plantungan'
  },
  {
    id: 4,
    judul: 'BUMDes Plantungan SA3',
    kategori: 'BUMDes',
    deskripsi: 'BUMDes Plantungan SA3 merupakan lembaga ekonomi desa yang menjadi bagian dari pengelolaan dan pengembangan kegiatan ekonomi di Desa Plantungan. BUMDes berperan sebagai salah satu wadah usaha desa dalam memanfaatkan potensi dan sumber daya yang tersedia. Keberadaan BUMDes menjadi bagian dari upaya penguatan ekonomi desa dan dapat mendukung pengelolaan berbagai potensi lokal secara lebih terorganisasi. Pengembangan BUMDes juga dapat berjalan berdampingan dengan sektor pertanian, peternakan, dan potensi ekonomi lainnya yang dimiliki masyarakat.',
    komoditas_utama: 'Wadah Usaha & Penguatan Ekonomi Desa',
    kontak_pengelola: 'Pengurus BUMDes Plantungan SA3',
    lokasi: 'Kompleks Balai Desa Plantungan'
  },
  {
    id: 5,
    judul: 'Sendang (Konservasi Sumber Daya Air)',
    kategori: 'Sumber Daya Air',
    deskripsi: 'Sendang merupakan salah satu potensi lokal yang terdapat di Desa Plantungan. Keberadaan sendang menjadi bagian dari sumber daya air yang dimiliki desa dan memiliki keterkaitan dengan kehidupan masyarakat serta kondisi lingkungan di sekitarnya. Selain memiliki fungsi sebagai sumber air, sendang juga dapat menjadi bagian dari kekayaan lingkungan dan identitas lokal Desa Plantungan. Keberadaannya berpotensi untuk mendukung pemanfaatan sumber daya air secara berkelanjutan serta menjadi salah satu bagian dari potensi desa yang dapat dijaga dan dikembangkan. Sebagai salah satu sumber daya lokal, keberadaan sendang perlu dijaga kelestarian dan kebersihannya agar manfaatnya dapat terus dirasakan oleh masyarakat.',
    komoditas_utama: 'Sumber Air Alami & Kelestarian Lingkungan',
    kontak_pengelola: 'Pemerintah Desa & Masyarakat Plantungan',
    lokasi: 'Kawasan Mata Air Sendang Desa Plantungan'
  }
];

export const MOCK_PROGRAM_KKN: ProgramKKN[] = [
  {
    id: 1,
    judul: 'Pengembangan & Digitalisasi Sistem Informasi Desa (Website)',
    divisi: 'Teknologi & Informasi',
    deskripsi: 'Pembangunan website resmi Pemerintah Desa Plantungan terintegrasi Headless CMS Strapi untuk transparansi APBDes, publikasi potensi komoditas minyak rakyat & pertanian, berita kegiatan desa, serta pangkalan data kependudukan real-time.',
    tanggal_mulai: '2025-07-10',
    tanggal_selesai: '2025-08-15',
    tanggal_pelaksanaan: '10 Juli 2025 s/d 15 Agustus 2025',
    jumlah_anggota: '11 Orang',
    dokumentasi: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop',
    galeri: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=500&fit=crop'
    ],
    status: 'Sedang Berjalan',
    penanggung_jawab: 'Tim KKN Divisi IT & Komunikasi',
    lokasi_kegiatan: 'Balai Desa Plantungan',
    sasaran: 'Aparatur Pemerintahan Desa dan Masyarakat Luas'
  },
  {
    id: 2,
    judul: 'Digital Marketing & Branding Kemasan Minyak Rakyat Plantungan',
    divisi: 'Ekonomi Kreatif & UMKM',
    deskripsi: 'Pemberdayaan para pengrajin penyulingan minyak atsiri dan daun cengkeh dalam standarisasi label kemasan botol higienis, pembuatan barcode izin usaha, serta pembukaan etalase toko di platform e-commerce dan media sosial.',
    tanggal_mulai: '2025-07-15',
    tanggal_selesai: '2025-08-10',
    tanggal_pelaksanaan: '15 Juli 2025 s/d 10 Agustus 2025',
    jumlah_anggota: '11 Orang',
    dokumentasi: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop',
    galeri: [
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop'
    ],
    status: 'Selesai',
    penanggung_jawab: 'Tim KKN Divisi Ekonomi',
    lokasi_kegiatan: 'Sentra Penyulingan Dusun Plantungan Wetan',
    sasaran: 'Kelompok Tani dan Pelaku Usaha Minyak Atsiri'
  },
  {
    id: 3,
    judul: 'Skrining Kesehatan Balita & Edukasi Gizi Pencegahan Stunting',
    divisi: 'Kesehatan & Lingkungan',
    deskripsi: 'Bekerja sama dengan Posyandu Desa dan Bidan Desa mengadakan posko penimbangan, pengukuran tinggi badan, pemberian vitamin A, serta workshop pembuatan PMT (Pemberian Makanan Tambahan) bergizi berbasis bahan pangan lokal kelor dan ikan.',
    tanggal_mulai: '2025-07-20',
    tanggal_selesai: '2025-08-05',
    tanggal_pelaksanaan: '20 Juli 2025 s/d 05 Agustus 2025',
    jumlah_anggota: '11 Orang',
    dokumentasi: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=500&fit=crop',
    galeri: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop'
    ],
    status: 'Selesai',
    penanggung_jawab: 'Tim KKN Divisi Kesehatan',
    lokasi_kegiatan: 'Posyandu Dusun Krajan & Sari Rejo',
    sasaran: 'Ibu Hamil, Ibu Menyusui, dan Balita'
  },
  {
    id: 4,
    judul: 'Bimbingan Belajar Ceria & Literasi Bahasa Inggris Anak Desa',
    divisi: 'Pendidikan & Karakter',
    deskripsi: 'Menyelenggarakan kelas belajar interaktif sore hari bagi anak-anak tingkat SD/SMP di desa, mencakup penguatan literasi membaca, dasar-dasar percakapan bahasa Inggris, serta games edukatif menumbuhkan minat belajar sains.',
    tanggal_mulai: '2025-07-25',
    tanggal_selesai: '2025-08-12',
    tanggal_pelaksanaan: '25 Juli 2025 s/d 12 Agustus 2025',
    jumlah_anggota: '11 Orang',
    dokumentasi: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop',
    galeri: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=500&fit=crop'
    ],
    status: 'Selesai',
    penanggung_jawab: 'Tim KKN Divisi Pendidikan',
    lokasi_kegiatan: 'SDN 1 Plantungan & Rumah Pintar Dusun',
    sasaran: 'Siswa SD dan Remaja Desa'
  },
  {
    id: 5,
    judul: 'Pemasangan Plang Penunjuk Arah Dusun & Peta Wilayah Desa',
    divisi: 'Infrastruktur & Tata Ruang',
    deskripsi: 'Pembuatan dan pemasangan papan penunjuk arah berbahan kayu tahan cuaca di simpang-simpang utama desa, serta pembaruan peta administrasi batas wilayah desa di ruang aula balai desa.',
    tanggal_mulai: '2025-08-01',
    tanggal_selesai: '2025-08-14',
    tanggal_pelaksanaan: '01 Agustus 2025 s/d 14 Agustus 2025',
    jumlah_anggota: '11 Orang',
    dokumentasi: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&h=500&fit=crop',
    galeri: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&h=500&fit=crop',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=500&fit=crop'
    ],
    status: 'Selesai',
    penanggung_jawab: 'Tim KKN Divisi Infrastruktur',
    lokasi_kegiatan: 'Jalan Utama & Perbatasan Dusun',
    sasaran: 'Seluruh Warga Desa dan Tamu dari Luar Daerah'
  }
];

export const MOCK_BERITA: Berita[] = [
  {
    id: 1,
    judul: 'Musrenbangdes Tahun 2025: Prioritaskan Penguatan Irigasi dan Digitalisasi UMKM',
    slug: 'musrenbangdes-2025-prioritaskan-irigasi-digitalisasi-umkm',
    kategori: 'Pemerintahan',
    tanggal_publikasi: '2025-08-01',
    penulis: 'Sekretariat Desa Plantungan',
    dibaca: 342,
    thumbnail: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=500&fit=crop',
    ringkasan: 'Pemerintah Desa Plantungan menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) untuk menetapkan RKPDes tahun anggaran berikutnya dengan fokus ketahanan pangan dan teknologi.',
    konten: `Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Desa Plantungan berlangsung khidmat dan produktif di Pendopo Balai Desa. Acara ini dihadiri oleh Kepala Desa, jajaran BPD, tokoh masyarakat, perwakilan kelompok tani, pemuda Karang Taruna, serta tim pendamping desa.

Kepala Desa Plantungan, H. Mulyadi, dalam sambutannya menegaskan bahwa arah kebijakan pembangunan tahun 2025 diarahkan pada dua pilar utama:
1. **Modernisasi dan pemeliharaan jaringan irigasi tersier** guna mendukung produktivitas lahan sawah padi organik.
2. **Penguatan sarana digitalisasi UMKM dan BUMDes** agar produk olahan minyak atsiri dan hasil tani dapat menembus pasar luar daerah dengan efisien.

Musyawarah menyepakati pengalokasian anggaran yang berpihak pada kesejahteraan warga dengan transparansi penuh yang dapat diakses oleh publik melalui website resmi desa.`
  },
  {
    id: 2,
    judul: 'Panen Raya Padi Organik Desa Plantungan Tembus Rekor 7 Ton per Hektar',
    slug: 'panen-raya-padi-organik-plantungan-tembus-rekor',
    kategori: 'Kegiatan Warga',
    tanggal_publikasi: '2025-07-25',
    penulis: 'Humas Kelompok Tani',
    dibaca: 512,
    thumbnail: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&h=500&fit=crop',
    ringkasan: 'Petani Dusun Krajan merayakan panen raya musim tanam kedua dengan hasil menggembirakan berkat pendampingan penyuluh pertanian dan pupuk hayati alami.',
    konten: `Rona bahagia terpancar dari wajah para petani Dusun Krajan Desa Plantungan saat mengawali panen raya padi organik varietas Menthik Wangi. Hasil ubinan mencatatkan rata-rata panen mencapai 7.1 ton gabah kering panen (GKP) per hektar, melampaui capaian musim tanam sebelumnya.

Keberhasilan ini didorong oleh komitmen bersama petani dalam meninggalkan bahan kimia sintetis dan beralih ke pupuk organik berbasis kotoran ternak dan mol (mikroorganisme lokal) yang diracik mandiri. 

"Kami sangat bersyukur hasil panen meningkat dan harga jual gabah organik lebih tinggi di pasaran," ungkap Bpk. Slamet, salah satu perwakilan petani.`
  },
  {
    id: 3,
    judul: 'Inovasi Minyak Atsiri Desa Plantungan Raih Penghargaan Produk Unggulan Daerah',
    slug: 'inovasi-minyak-atsiri-plantungan-raih-penghargaan',
    kategori: 'Kegiatan Warga',
    tanggal_publikasi: '2025-07-18',
    penulis: 'Redaksi Berita Desa',
    dibaca: 420,
    thumbnail: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=500&fit=crop',
    ringkasan: 'Kelompok penyuling minyak rakyat Karya Lestari Plantungan berhasil memenangkan penganugerahan UMKM Inovatif tingkat Kabupaten.',
    konten: `Kerja keras perajin minyak rakyat Desa Plantungan membuahkan prestasi membanggakan. Produk minyak daun cengkeh dan minyak nilam hasil olahan lokal dinobatkan sebagai salah satu Produk Unggulan Daerah Terbaik dalam pameran ekonomi kreatif.

Kelebihan produk asal Plantungan terletak pada kemurnian formula tanpa campuran bahan sintetis dan standar penyulingan higienis yang terus ditingkatkan melalui kolaborasi dengan program KKN Mahasiswa dan dinas terkait. BUMDes berencana memperluas jangkauan distribusi hingga ke toko oleh-oleh kota besar.`
  },
  {
    id: 4,
    judul: 'Penyaluran Bantuan Langsung Tunai Dana Desa (BLT-DD) Tahap II Berjalan Tertib',
    slug: 'penyaluran-blt-dana-desa-tahap-ii-berjalan-tertib',
    kategori: 'Pengumuman',
    tanggal_publikasi: '2025-07-10',
    penulis: 'Kaur Keuangan Desa',
    dibaca: 289,
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=500&fit=crop',
    ringkasan: 'Sebanyak 45 Keluarga Penerima Manfaat (KPM) menerima pencairan BLT-DD tahap kedua tahun 2025 di Aula Kantor Balai Desa.',
    konten: `Pemerintah Desa Plantungan kembali merealisasikan penyaluran Bantuan Langsung Tunai bersumber dari Dana Desa (BLT-DD) untuk tahap kedua tahun 2025 kepada 45 KPM yang telah melalui proses verifikasi musdesus.

Kaur Keuangan, Ibu Siti Rahmawati, menyampaikan bahwa bantuan ini diharapkan dapat meringankan beban ekonomi warga lanjut usia dan keluarga rentan dalam memenuhi kebutuhan pokok harian. Seluruh proses penyerahan berlangsung transparan dan terdokumentasi rapi.`
  },
  {
    id: 5,
    judul: 'Gelar Posyandu Integrasi Layanan Primer (ILP) untuk Cegah Penyakit Tidak Menular',
    slug: 'gelar-posyandu-integrasi-layanan-primer-desa-plantungan',
    kategori: 'Kesehatan & Posyandu',
    tanggal_publikasi: '2025-06-28',
    penulis: 'Kader Kesehatan Desa',
    dibaca: 198,
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop',
    ringkasan: 'Pelayanan terpadu posyandu kini melayani seluruh siklus hidup dari balita, remaja, dewasa hingga lansia dalam satu pintu pemeriksaan.',
    konten: `Kader Kesehatan Desa Plantungan bersama Tim Puskesmas menyelenggarakan Posyandu Integrasi Layanan Primer (ILP) perdana. Warga berbondong-bondong memeriksakan tekanan darah, gula darah, asam urat, serta konsultasi nutrisi sehat secara gratis.

Kegiatan ini bertujuan mendeteksi dini faktor risiko penyakit tidak menular (PTM) sehingga derajat kesehatan masyarakat Desa Plantungan senantiasa terjaga optimal.`
  }
];

export const MOCK_APBDES: APBDes[] = [
  {
    id: 1,
    tahun: 2025,
    pendapatan: 1845600000,
    belanja: 1820400000,
    pembiayaan: 25200000,
    surplus_defisit: 25200000,
    status_publikasi: 'Ditetapkan (Perdes No. 04/2025)',
    keterangan: 'APBDes Tahun Anggaran 2025 fokus pada pembangunan infrastruktur jalan usaha tani, penanganan stunting, dan penguatan unit usaha BUMDes.',
    rincian_pendapatan: [
      { kategori: 'Dana Desa (APBN)', nominal: 920000000, persentase: 49.8, keterangan: 'Transfer langsung dari Kementerian Keuangan' },
      { kategori: 'Alokasi Dana Desa / ADD (APBD Kab)', nominal: 580000000, persentase: 31.4, keterangan: 'Operasional aparatur & kelembagaan' },
      { kategori: 'Bagi Hasil Pajak & Retribusi Daerah', nominal: 145000000, persentase: 7.9, keterangan: 'Retribusi daerah kabupaten' },
      { kategori: 'Pendapatan Asli Desa (PADes)', nominal: 110600000, persentase: 6.0, keterangan: 'Hasil sewa tanah kas desa & laba BUMDes' },
      { kategori: 'Bantuan Keuangan Provinsi & Lain-lain', nominal: 90000000, persentase: 4.9, keterangan: 'Program stimulan provinsi' }
    ],
    rincian_belanja: [
      { kategori: 'Bidang Penyelenggaraan Pemerintahan Desa', nominal: 540000000, persentase: 29.7, keterangan: 'Siltap perangkat, operasional kantor BPD' },
      { kategori: 'Bidang Pelaksanaan Pembangunan Desa', nominal: 760400000, persentase: 41.8, keterangan: 'Rabat beton jalan desa, drainase, lampu penerangan' },
      { kategori: 'Bidang Pembinaan Kemasyarakatan', nominal: 180000000, persentase: 9.9, keterangan: 'Kegiatan kepemudaan, PKK, poskamling, seni budaya' },
      { kategori: 'Bidang Pemberdayaan Masyarakat Desa', nominal: 260000000, persentase: 14.3, keterangan: 'Pelatihan UMKM, bantuan bibit pertanian, Posyandu' },
      { kategori: 'Bidang Penanggulangan Bencana & Darurat', nominal: 80000000, persentase: 4.4, keterangan: 'Dana tanggap darurat dan mitigasi longsor' }
    ],
    file_pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 2,
    tahun: 2024,
    pendapatan: 1720000000,
    belanja: 1695000000,
    pembiayaan: 25000000,
    surplus_defisit: 25000000,
    status_publikasi: 'Laporan Pertanggungjawaban (LPJ Selesai)',
    keterangan: 'Realisasi APBDes 2024 terserap 98.5% dengan predikat Wajar Tanpa Pengecualian pada audit inspektorat daerah.',
    rincian_pendapatan: [
      { kategori: 'Dana Desa (APBN)', nominal: 880000000, persentase: 51.2 },
      { kategori: 'Alokasi Dana Desa (ADD)', nominal: 530000000, persentase: 30.8 },
      { kategori: 'Bagi Hasil Pajak & Retribusi', nominal: 130000000, persentase: 7.6 },
      { kategori: 'Pendapatan Asli Desa (PADes)', nominal: 95000000, persentase: 5.5 },
      { kategori: 'Bantuan Keuangan Provinsi', nominal: 85000000, persentase: 4.9 }
    ],
    rincian_belanja: [
      { kategori: 'Penyelenggaraan Pemerintahan', nominal: 510000000, persentase: 30.1 },
      { kategori: 'Pembangunan Fisik Desa', nominal: 710000000, persentase: 41.9 },
      { kategori: 'Pembinaan Kemasyarakatan', nominal: 165000000, persentase: 9.7 },
      { kategori: 'Pemberdayaan Masyarakat', nominal: 240000000, persentase: 14.2 },
      { kategori: 'Penanggulangan Bencana', nominal: 70000000, persentase: 4.1 }
    ],
    file_pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

export const MOCK_INFRASTRUKTUR_DESA: InfrastrukturDesa[] = [
  {
    id: 1,
    nama: 'Balai Desa',
    kategori: 'Pemerintahan',
    deskripsi: 'Pusat pelayanan administrasi kependudukan, musyawarah desa, dan layanan aspirasi warga.',
    ikon: 'home',
    lokasi: 'Kawasan Balai Desa Plantungan',
    kondisi: 'Sangat Baik'
  },
  {
    id: 2,
    nama: 'SDN Plantungan',
    kategori: 'Pendidikan',
    deskripsi: 'Sarana pendidikan formal dasar bagi anak-anak dan generasi penerus Desa Plantungan.',
    ikon: 'book-open',
    lokasi: 'Dusun Krajan',
    kondisi: 'Baik'
  },
  {
    id: 3,
    nama: 'Masjid Jami\'',
    kategori: 'Keagamaan',
    deskripsi: 'Sarana ibadah utama, kegiatan keagamaan, pengajian, dan pusat silaturahmi masyarakat desa.',
    ikon: 'moon',
    lokasi: 'Dusun Krajan',
    kondisi: 'Sangat Baik'
  },
  {
    id: 4,
    nama: 'Poskesdes & Posyandu',
    kategori: 'Kesehatan',
    deskripsi: 'Pusat layanan pemeriksaan kesehatan balita, lansia, dan ibu hamil di Desa Plantungan.',
    ikon: 'activity',
    lokasi: 'Kompleks Balai Desa',
    kondisi: 'Baik'
  }
];
