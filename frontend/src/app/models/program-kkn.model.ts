export interface ProgramKKN {
  id?: number;
  judul: string;
  divisi: string;
  deskripsi: string;
  tanggal_pelaksanaan?: string;
  tanggal_mulai?: string;
  tanggal_selesai?: string;
  jumlah_anggota?: number | string;
  dokumentasi?: string;
  galeri?: string[];
  foto?: string[];
  status?: 'Selesai' | 'Sedang Berjalan' | 'Rencana';
  penanggung_jawab?: string;
  lokasi_kegiatan?: string;
  sasaran?: string;
}
