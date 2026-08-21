import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../core/strapi.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { ProfilDesa } from '../../models/profil-desa.model';
import { PerangkatDesa } from '../../models/perangkat-desa.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  private strapi = inject(StrapiService);
  public profil = signal<ProfilDesa | null>(null);
  public perangkatList = signal<PerangkatDesa[]>([]);

  public kades = computed(() => {
    const fromList = this.perangkatList().find(p => p.jabatan?.toLowerCase().includes('kepala desa') || p.kategori === 'Kepala Desa');
    const p = this.profil();
    return {
      nama: p?.nama_kades || fromList?.nama || 'Endang Susana',
      jabatan: 'Kepala Desa Plantungan',
      foto: p?.foto_kades || fromList?.foto || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      periode: fromList?.periode || '2019 - 2026'
    };
  });

  public bpdList = computed(() => {
    return this.perangkatList().filter(p => p.kategori === 'Badan Permusyawaratan Desa (BPD)' || p.jabatan?.toLowerCase().includes('bpd'));
  });

  public perangkatDesaList = computed(() => {
    return this.perangkatList().filter(p => p.kategori === 'Kelembagaan dan Perangkat Desa' || (!p.jabatan?.toLowerCase().includes('kepala desa') && !p.jabatan?.toLowerCase().includes('bpd')));
  });

  ngOnInit(): void {
    this.strapi.getProfilDesa().subscribe((res) => this.profil.set(res));
    this.strapi.getPerangkatDesa().subscribe((res) => this.perangkatList.set(res));
  }
}
