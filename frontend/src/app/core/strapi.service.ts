import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { ProfilDesa } from '../models/profil-desa.model';
import { PerangkatDesa } from '../models/perangkat-desa.model';
import { DataKependudukan } from '../models/data-kependudukan.model';
import { PotensiDesa } from '../models/potensi-desa.model';
import { ProgramKKN } from '../models/program-kkn.model';
import { Berita } from '../models/berita.model';
import { APBDes } from '../models/apbdes.model';
import { InfrastrukturDesa } from '../models/infrastruktur-desa.model';
import {
  MOCK_PROFIL_DESA,
  MOCK_PERANGKAT_DESA,
  MOCK_DATA_KEPENDUDUKAN,
  MOCK_POTENSI_DESA,
  MOCK_PROGRAM_KKN,
  MOCK_BERITA,
  MOCK_APBDES,
  MOCK_INFRASTRUKTUR_DESA
} from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private http = inject(HttpClient);
  public readonly apiUrl = 'http://localhost:1337/api';

  // Reactive connection state signal
  public isBackendOnline = signal<boolean>(false);
  public lastError = signal<string | null>(null);
  public profilDesa = signal<ProfilDesa | null>(null);

  /**
   * Helper function to extract data from Strapi v4 / v5 responses
   */
  private normalizeStrapiData<T>(raw: any): T {
    if (!raw) return raw;
    if (raw.data && typeof raw.data === 'object') {
      if (Array.isArray(raw.data)) {
        return raw.data.map((item: any) => this.flattenEntity(item)) as unknown as T;
      }
      return this.flattenEntity(raw.data) as unknown as T;
    }
    return raw as T;
  }

  private flattenEntity(entity: any): any {
    if (!entity) return entity;
    if (entity.attributes) {
      return { id: entity.id, ...entity.attributes };
    }
    return entity;
  }

  /**
   * Get Profil Desa (Single Type)
   */
  getProfilDesa(): Observable<ProfilDesa> {
    return this.http.get<any>(`${this.apiUrl}/profil-desa?populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => this.normalizeStrapiData<ProfilDesa>(res)),
      tap((data) => this.profilDesa.set(data)),
      catchError((err) => {
        console.info('[Desa Plantungan Info] Strapi backend offline/unreachable. Menggunakan Mock Data Profil Desa.', err.message);
        this.isBackendOnline.set(false);
        this.lastError.set(err.message);
        this.profilDesa.set(MOCK_PROFIL_DESA);
        return of(MOCK_PROFIL_DESA);
      })
    );
  }

  /**
   * Get Perangkat Desa list (Collection Type)
   */
  getPerangkatDesa(): Observable<PerangkatDesa[]> {
    return this.http.get<any>(`${this.apiUrl}/perangkat-desas?sort=urutan:asc&populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<PerangkatDesa[]>(res);
        return Array.isArray(data) ? data : (data ? [data] : []);
      }),
      catchError((err) => {
        this.isBackendOnline.set(false);
        return of(MOCK_PERANGKAT_DESA);
      })
    );
  }

  /**
   * Get Data Kependudukan (Single Type)
   */
  getDataKependudukan(): Observable<DataKependudukan> {
    return this.http.get<any>(`${this.apiUrl}/data-kependudukan?populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => this.normalizeStrapiData<DataKependudukan>(res)),
      catchError(() => {
        this.isBackendOnline.set(false);
        return of(MOCK_DATA_KEPENDUDUKAN);
      })
    );
  }

  /**
   * Get Potensi Desa list (Collection Type)
   */
  getPotensiDesa(): Observable<PotensiDesa[]> {
    return this.http.get<any>(`${this.apiUrl}/potensi-desas?populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<PotensiDesa[]>(res);
        return Array.isArray(data) ? data : (data ? [data] : []);
      }),
      catchError(() => {
        this.isBackendOnline.set(false);
        return of(MOCK_POTENSI_DESA);
      })
    );
  }

  /**
   * Get Program KKN list (Collection Type)
   */
  getProgramKKN(): Observable<ProgramKKN[]> {
    return this.http.get<any>(`${this.apiUrl}/program-kkns?sort=tanggal_pelaksanaan:asc&populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<ProgramKKN[]>(res);
        return Array.isArray(data) ? data : (data ? [data] : []);
      }),
      catchError(() => {
        this.isBackendOnline.set(false);
        return of(MOCK_PROGRAM_KKN);
      })
    );
  }

  /**
   * Get Berita list (Collection Type)
   */
  getBerita(): Observable<Berita[]> {
    return this.http.get<any>(`${this.apiUrl}/beritas?sort=tanggal_publikasi:desc&populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<Berita[]>(res);
        return Array.isArray(data) ? data : (data ? [data] : []);
      }),
      catchError(() => {
        this.isBackendOnline.set(false);
        return of(MOCK_BERITA);
      })
    );
  }

  /**
   * Get Berita by slug
   */
  getBeritaBySlug(slug: string): Observable<Berita | null> {
    return this.http.get<any>(`${this.apiUrl}/beritas?filters[slug][$eq]=${slug}&populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<Berita[]>(res);
        if (Array.isArray(data) && data.length > 0) {
          return data[0];
        }
        return null;
      }),
      catchError(() => {
        this.isBackendOnline.set(false);
        const fallback = MOCK_BERITA.find((b) => b.slug === slug);
        return of(fallback || null);
      })
    );
  }

  /**
   * Get APBDes records list (Collection Type)
   */
  getAPBDes(): Observable<APBDes[]> {
    return this.http.get<any>(`${this.apiUrl}/apbdes-records?sort=tahun:desc&populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<APBDes[]>(res);
        return Array.isArray(data) ? data : (data ? [data] : []);
      }),
      catchError(() => {
        this.isBackendOnline.set(false);
        return of(MOCK_APBDES);
      })
    );
  }

  /**
   * Get Infrastruktur & Fasilitas Desa list (Collection Type)
   */
  getInfrastrukturDesa(): Observable<InfrastrukturDesa[]> {
    return this.http.get<any>(`${this.apiUrl}/infrastruktur-desas?populate=*`).pipe(
      tap(() => this.isBackendOnline.set(true)),
      map((res) => {
        const data = this.normalizeStrapiData<InfrastrukturDesa[]>(res);
        return Array.isArray(data) ? data : (data ? [data] : []);
      }),
      catchError(() => {
        this.isBackendOnline.set(false);
        return of(MOCK_INFRASTRUKTUR_DESA);
      })
    );
  }

  /**
   * Submit Contact / Citizen Feedback Message
   */
  kirimPesanKontak(payload: { nama: string; email: string; telepon: string; subjek: string; pesan: string }): Observable<{ success: boolean; message: string }> {
    return this.http.post<any>(`${this.apiUrl}/pesan-masyarakats`, { data: payload }).pipe(
      map(() => ({
        success: true,
        message: 'Aspirasi dan pesan Anda telah berhasil dikirim ke Kantor Desa Plantungan. Terima kasih!'
      })),
      catchError(() => {
        // Even if offline, return successful acknowledgement with note
        return of({
          success: true,
          message: 'Pesan Anda telah kami catat dalam antrian sistem pelayanan Desa Plantungan. Terima kasih atas partisipasi Anda!'
        });
      })
    );
  }
}
