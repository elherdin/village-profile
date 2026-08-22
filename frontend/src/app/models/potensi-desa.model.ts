export type KategoriPotensi = 'Pertanian' | 'Peternakan' | 'Minyak Rakyat' | 'BUMDes' | 'Sumber Daya Air' | 'Pariwisata & UMKM' | string;

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
