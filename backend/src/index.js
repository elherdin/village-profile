'use strict';

const SEED_DATA = {
  profilDesa: {
    nama_desa: 'Desa Plantungan',
    tagline: 'Maju, Berdaya Saing, Berbudaya, dan Sejahtera Berbasis Potensi Lokal',
    tentang: `Desa Plantungan merupakan salah satu desa yang terletak di kawasan strategis dengan bentang alam yang asri dan tanah yang subur. Desa ini memiliki kekayaan sumber daya alam yang melimpah, khususnya di sektor pertanian pangan, perkebunan rakyat penghasil komoditas atsiri/minyak rakyat, serta kelembagaan ekonomi desa yang produktif melalui BUMDes Maju Bersama.\n\nMasyarakat Desa Plantungan menjunjung tinggi nilai-nilai kearifan lokal, gotong royong, dan keterbukaan dalam tata kelola pemerintahan desa modern yang transparan dan akuntabel.`,
    sejarah: `Asal mula nama Plantungan berakar dari sejarah masa lampau ketika wilayah ini dikenal sebagai area peristirahatan dan pertemuan para perintis desa yang memanfaatkan melimpahnya sumber mata air dan kesuburan tanah pegunungan.\n\nSeiring bergulirnya waktu, Desa Plantungan berkembang menjadi pemukiman masyarakat yang gigih dalam mengolah lahan pertanian dan memelopori pengolahan hasil bumi berupa penyulingan minyak rakyat secara turun-temurun. Saat ini, Desa Plantungan telah bertransformasi menjadi desa mandiri yang memadukan kearifan tradisi dengan sistem informasi digital untuk pelayanan publik yang cepat dan prima.`,
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
    alamat: 'Jl. Raya Utama Plantungan No. 01, Balai Desa Plantungan, Kode Pos 51362',
    email: 'pemdes@plantungan.desa.id',
    telepon: '+62 812-3456-7890',
    koordinat: {
      latitude: -7.0854,
      longitude: 109.9532,
      zoom: 14
    }
  },
  perangkatDesa: [
    {
      nama: 'H. Mulyadi, S.Sos.',
      jabatan: 'Kepala Desa',
      nip: '197508122005011003',
      urutan: 1,
      foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      kontak: 'kades@plantungan.desa.id'
    },
    {
      nama: 'Ahmad Fauzi, S.Kom.',
      jabatan: 'Sekretaris Desa',
      nip: '198804152012011007',
      urutan: 2,
      foto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      kontak: 'sekdes@plantungan.desa.id'
    },
    {
      nama: 'Siti Rahmawati, S.E.',
      jabatan: 'Kepala Urusan Keuangan',
      nip: '199202202018022004',
      urutan: 3,
      foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      kontak: 'keuangan@plantungan.desa.id'
    },
    {
      nama: 'Joko Susilo, A.Md.',
      jabatan: 'Kepala Urusan Perencanaan',
      nip: '199009102015031002',
      urutan: 4,
      foto: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
      kontak: 'perencanaan@plantungan.desa.id'
    },
    {
      nama: 'Bambang Irawan',
      jabatan: 'Kepala Seksi Kesejahteraan',
      nip: '198305142010011005',
      urutan: 5,
      foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      kontak: 'kesra@plantungan.desa.id'
    },
    {
      nama: 'Dewi Anggraeni, S.Pd.',
      jabatan: 'Kepala Seksi Pelayanan',
      nip: '199411082019022001',
      urutan: 6,
      foto: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      kontak: 'pelayanan@plantungan.desa.id'
    }
  ],
  dataKependudukan: {
    total_penduduk: 3485,
    total_kk: 1042,
    laki_laki: 1762,
    perempuan: 1723,
    tahun_update: 2025,
    kelompok_usia: [
      { rentang: '0 - 5 Tahun (Balita)', jumlah: 245, laki_laki: 128, perempuan: 117 },
      { rentang: '6 - 12 Tahun (Anak-anak)', jumlah: 380, laki_laki: 195, perempuan: 185 },
      { rentang: '13 - 17 Tahun (Remaja)', jumlah: 340, laki_laki: 174, perempuan: 166 },
      { rentang: '18 - 35 Tahun (Pemuda/Produktif Awal)', jumlah: 1020, laki_laki: 518, perempuan: 502 },
      { rentang: '36 - 55 Tahun (Dewasa/Produktif)', jumlah: 980, laki_laki: 495, perempuan: 485 },
      { rentang: '56+ Tahun (Lansia)', jumlah: 520, laki_laki: 252, perempuan: 268 }
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
      { dusun: 'Dusun Krajan', jumlah_jiwa: 1050, jumlah_kk: 315 },
      { dusun: 'Dusun Plantungan Wetan', jumlah_jiwa: 920, jumlah_kk: 275 },
      { dusun: 'Dusun Plantungan Kulon', jumlah_jiwa: 845, jumlah_kk: 252 },
      { dusun: 'Dusun Sari Rejo', jumlah_jiwa: 670, jumlah_kk: 200 }
    ]
  },
  potensiDesa: [
    {
      judul: 'Sentra Produksi & Penyulingan Minyak Rakyat (Atsiri & Cengkeh)',
      kategori: 'Minyak Rakyat',
      deskripsi: 'Desa Plantungan dikenal sebagai sentra penghasil minyak atsiri dan minyak daun cengkeh tradisional berkualitas tinggi yang memasok industri aromaterapi dan farmasi nasional.',
      komoditas_utama: 'Minyak Daun Cengkeh, Minyak Nilam, Minyak Kayu Putih',
      kontak_pengelola: 'Kelompok Tani Penyuling Minyak "Karya Lestari" (0813-8899-1122)',
      foto: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&h=500&fit=crop'
    },
    {
      judul: 'Lumbung Pertanian Padi Organik & Palawija Unggul',
      kategori: 'Pertanian',
      deskripsi: 'Dengan didukung sistem irigasi alami pegunungan yang subur, sektor pertanian Desa Plantungan memproduksi beras organik varietas Menthik Wangi serta jagung hibrida berkualitas.',
      komoditas_utama: 'Beras Organik Menthik Wangi, Jagung Manis, Cabai Merah',
      kontak_pengelola: 'GAPOKTAN Sido Makmur (0821-3344-5566)',
      foto: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&h=500&fit=crop'
    },
    {
      judul: 'BUMDes "Maju Bersama Plantungan" - Unit Jasa & Distribusi',
      kategori: 'BUMDes',
      deskripsi: 'Badan Usaha Milik Desa mengelola unit penyewaan traktor, agen laku pandai PPOB, sentra pupuk bersubsidi, dan toko modern pasar desa.',
      komoditas_utama: 'Penyewaan Alsintan, PPOB, Pasar Desa Digital',
      kontak_pengelola: 'Direktur BUMDes Maju Bersama (0852-7788-9900)',
      foto: 'https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=800&h=500&fit=crop'
    }
  ],
  programKKN: [
    {
      judul: 'Pengembangan Website Sistem Informasi & Profil Digital Desa',
      divisi: 'Teknologi & Digitalisasi',
      deskripsi: 'Merancang dan mengimplementasikan portal web desa modern berbasis Headless CMS untuk meningkatkan transparansi layanan publik.',
      tanggal_pelaksanaan: '2025-07-15',
      capaian: 'Website resmi desa aktif 100% dan pelatihan pengelola konten aparatur desa.',
      dokumentasi: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop',
      status: 'Selesai'
    },
    {
      judul: 'Digital Marketing & Branding Kemasan Minyak Rakyat Plantungan',
      divisi: 'Ekonomi Kreatif & UMKM',
      deskripsi: 'Pemberdayaan pengrajin minyak atsiri dalam standarisasi kemasan botol higienis dan onboarding produk ke marketplace.',
      tanggal_pelaksanaan: '2025-07-22',
      capaian: 'Dibuatkannya 4 desain kemasan eksklusif dan onboarding 15 UMKM desa ke marketplace.',
      dokumentasi: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=500&fit=crop',
      status: 'Selesai'
    },
    {
      judul: 'Skrining Kesehatan Balita & Edukasi Gizi Pencegahan Stunting',
      divisi: 'Kesehatan & Lingkungan',
      deskripsi: 'Posko pemeriksaan kesehatan balita terpadu dan workshop PMT gizi berbasis pangan lokal.',
      tanggal_pelaksanaan: '2025-07-28',
      capaian: 'Menjangkau 140 balita di 4 dusun dengan zero kasus stunting baru.',
      dokumentasi: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&h=500&fit=crop',
      status: 'Selesai'
    }
  ],
  berita: [
    {
      judul: 'Musrenbangdes Tahun 2025: Prioritaskan Penguatan Irigasi dan Digitalisasi UMKM',
      slug: 'musrenbangdes-2025-prioritaskan-irigasi-digitalisasi-umkm',
      kategori: 'Pemerintahan',
      tanggal_publikasi: '2025-08-01',
      penulis: 'Sekretariat Desa Plantungan',
      thumbnail: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=500&fit=crop',
      ringkasan: 'Pemerintah Desa Plantungan menetapkan RKPDes tahun anggaran berikutnya dengan fokus ketahanan pangan dan teknologi.',
      konten: 'Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) Desa Plantungan berlangsung khidmat dan produktif di Pendopo Balai Desa. Acara ini dihadiri oleh Kepala Desa, jajaran BPD, tokoh masyarakat, dan warga.'
    },
    {
      judul: 'Panen Raya Padi Organik Desa Plantungan Tembus Rekor 7 Ton per Hektar',
      slug: 'panen-raya-padi-organik-plantungan-tembus-rekor',
      kategori: 'Kegiatan Warga',
      tanggal_publikasi: '2025-07-25',
      penulis: 'Humas Kelompok Tani',
      thumbnail: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&h=500&fit=crop',
      ringkasan: 'Petani Dusun Krajan merayakan panen raya musim tanam kedua dengan hasil 7.1 ton per hektar.',
      konten: 'Rona bahagia terpancar dari wajah para petani Dusun Krajan Desa Plantungan saat mengawali panen raya padi organik varietas Menthik Wangi.'
    }
  ],
  apbdes: [
    {
      tahun: 2025,
      pendapatan: 1845600000,
      belanja: 1820400000,
      pembiayaan: 25200000,
      keterangan: 'APBDes 2025 fokus pada pembangunan infrastruktur jalan usaha tani dan UMKM.',
      rincian_pendapatan: [
        { kategori: 'Dana Desa (APBN)', nominal: 920000000, persentase: 49.8 },
        { kategori: 'Alokasi Dana Desa / ADD', nominal: 580000000, persentase: 31.4 },
        { kategori: 'Bagi Hasil Pajak & Retribusi', nominal: 145000000, persentase: 7.9 },
        { kategori: 'Pendapatan Asli Desa (PADes)', nominal: 110600000, persentase: 6.0 },
        { kategori: 'Bantuan Keuangan Provinsi', nominal: 90000000, persentase: 4.9 }
      ],
      rincian_belanja: [
        { kategori: 'Bidang Penyelenggaraan Pemerintahan', nominal: 540000000, persentase: 29.7 },
        { kategori: 'Bidang Pelaksanaan Pembangunan', nominal: 760400000, persentase: 41.8 },
        { kategori: 'Bidang Pembinaan Kemasyarakatan', nominal: 180000000, persentase: 9.9 },
        { kategori: 'Bidang Pemberdayaan Masyarakat', nominal: 260000000, persentase: 14.3 },
        { kategori: 'Bidang Penanggulangan Bencana', nominal: 80000000, persentase: 4.4 }
      ],
      file_pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    }
  ]
};

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    try {
      // 1. Enable Public Permissions
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' } });

      if (publicRole) {
        const apis = [
          'profil-desa',
          'perangkat-desa',
          'data-kependudukan',
          'potensi-desa',
          'program-kkn',
          'berita',
          'apbdes'
        ];

        const permissionsToEnable = [];
        for (const api of apis) {
          permissionsToEnable.push(
            `api::${api}.${api}.find`,
            `api::${api}.${api}.findOne`
          );
        }

        const existingPermissions = await strapi
          .query('plugin::users-permissions.permission')
          .findMany({ where: { role: publicRole.id } });

        const existingActionMap = new Set(existingPermissions.map((p) => p.action));

        for (const action of permissionsToEnable) {
          if (!existingActionMap.has(action)) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: {
                action,
                role: publicRole.id,
              },
            });
          }
        }
      }

      // 2. Auto Seed Initial Data if empty
      // Seed Profil Desa
      try {
        const count = await strapi.db.query('api::profil-desa.profil-desa').count();
        if (count === 0) {
          await strapi.db.query('api::profil-desa.profil-desa').create({
            data: SEED_DATA.profilDesa,
          });
        }
      } catch (e) {
        strapi.log.debug('Seed profil-desa note:', e.message);
      }

      // Seed Perangkat Desa
      try {
        const count = await strapi.db.query('api::perangkat-desa.perangkat-desa').count();
        if (count === 0) {
          for (const item of SEED_DATA.perangkatDesa) {
            await strapi.db.query('api::perangkat-desa.perangkat-desa').create({ data: item });
          }
        }
      } catch (e) {
        strapi.log.debug('Seed perangkat-desa note:', e.message);
      }

      // Seed Data Kependudukan
      try {
        const count = await strapi.db.query('api::data-kependudukan.data-kependudukan').count();
        if (count === 0) {
          await strapi.db.query('api::data-kependudukan.data-kependudukan').create({
            data: SEED_DATA.dataKependudukan,
          });
        }
      } catch (e) {
        strapi.log.debug('Seed data-kependudukan note:', e.message);
      }

      // Seed Potensi Desa
      try {
        const count = await strapi.db.query('api::potensi-desa.potensi-desa').count();
        if (count === 0) {
          for (const item of SEED_DATA.potensiDesa) {
            await strapi.db.query('api::potensi-desa.potensi-desa').create({ data: item });
          }
        }
      } catch (e) {
        strapi.log.debug('Seed potensi-desa note:', e.message);
      }

      // Seed Program KKN
      try {
        const count = await strapi.db.query('api::program-kkn.program-kkn').count();
        if (count === 0) {
          for (const item of SEED_DATA.programKKN) {
            await strapi.db.query('api::program-kkn.program-kkn').create({ data: item });
          }
        }
      } catch (e) {
        strapi.log.debug('Seed program-kkn note:', e.message);
      }

      // Seed Berita
      try {
        const count = await strapi.db.query('api::berita.berita').count();
        if (count === 0) {
          for (const item of SEED_DATA.berita) {
            await strapi.db.query('api::berita.berita').create({ data: item });
          }
        }
      } catch (e) {
        strapi.log.debug('Seed berita note:', e.message);
      }

      // Seed APBDes
      try {
        const count = await strapi.db.query('api::apbdes.apbdes').count();
        if (count === 0) {
          for (const item of SEED_DATA.apbdes) {
            await strapi.db.query('api::apbdes.apbdes').create({ data: item });
          }
        }
      } catch (e) {
        strapi.log.debug('Seed apbdes note:', e.message);
      }

      strapi.log.info(' Desa Plantungan: Backend database and public permissions initialized successfully.');
    } catch (err) {
      strapi.log.warn('Bootstrap initialization note:', err.message);
    }
  },
};
