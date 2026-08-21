export type KategoriBerita =
  | 'Pemerintahan'
  | 'Pembangunan'
  | 'Kegiatan Warga'
  | 'Pengumuman'
  | 'Kesehatan & Posyandu'
  | 'KKN 2025';

export interface Berita {
  id?: number;
  judul: string;
  slug: string;
  ringkasan: string;
  konten: string;
  thumbnail?: string;
  kategori: KategoriBerita;
  tanggal_publikasi: string;
  penulis?: string;
  dibaca?: number;
  tags?: string[];
}
