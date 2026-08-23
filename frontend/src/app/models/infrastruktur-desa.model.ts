export interface InfrastrukturDesa {
  id?: number;
  nama: string;
  kategori?: string;
  deskripsi: string;
  ikon?: string; // 'home' | 'book-open' | 'moon' | 'activity' | 'tool' | 'layers' | 'map-pin'
  lokasi?: string;
  kondisi?: string;
}
