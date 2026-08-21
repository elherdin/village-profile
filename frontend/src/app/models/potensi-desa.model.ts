export type KategoriPotensi = 'Pertanian' | 'Minyak Rakyat' | 'BUMDes' | 'Pariwisata & UMKM';

export interface PotensiDesa {
  id?: number;
  judul: string;
  kategori: KategoriPotensi;
  deskripsi: string;
  komoditas_utama?: string;
  kontak_pengelola?: string;
  foto?: string;
  lokasi?: string;
  keunggulan?: string[];
}
