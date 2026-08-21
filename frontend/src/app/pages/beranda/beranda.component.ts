import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../core/strapi.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { ProfilDesa } from '../../models/profil-desa.model';
import { DataKependudukan } from '../../models/data-kependudukan.model';
import { PotensiDesa } from '../../models/potensi-desa.model';
import { ProgramKKN } from '../../models/program-kkn.model';
import { Berita } from '../../models/berita.model';

@Component({
  selector: 'app-beranda',
  standalone: true,
  imports: [CommonModule, RouterLink, SectionHeaderComponent],
  templateUrl: './beranda.component.html',
  styleUrls: ['./beranda.component.css']
})
export class BerandaComponent implements OnInit {
  private strapi = inject(StrapiService);

  // State Signals untuk reaktivitas Angular
  public profil = signal<ProfilDesa | null>(null);
  public dataKependudukan = signal<DataKependudukan | null>(null);
  public potensiList = signal<PotensiDesa[]>([]);
  public beritaList = signal<Berita[]>([]);
  public kknList = signal<ProgramKKN[]>([]);

  ngOnInit(): void {
    this.loadBerandaData();
  }

  /**
   * Mengambil seluruh data konten untuk halaman Beranda
   */
  private loadBerandaData(): void {
    this.strapi.getProfilDesa().subscribe((res) => this.profil.set(res));
    this.strapi.getDataKependudukan().subscribe((res) => this.dataKependudukan.set(res));
    this.strapi.getPotensiDesa().subscribe((res) => this.potensiList.set(res));
    this.strapi.getBerita().subscribe((res) => this.beritaList.set(res));
    this.strapi.getProgramKKN().subscribe((res) => this.kknList.set(res));
  }
}
