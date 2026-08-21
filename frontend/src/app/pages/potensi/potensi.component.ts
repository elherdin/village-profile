import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../core/strapi.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { PotensiDesa } from '../../models/potensi-desa.model';

@Component({
  selector: 'app-potensi',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './potensi.component.html',
  styleUrls: ['./potensi.component.css']
})
export class PotensiComponent implements OnInit {
  private strapi = inject(StrapiService);
  public potensiList = signal<PotensiDesa[]>([]);
  public selectedCategory = signal<string>('Semua');

  public categories: string[] = [
    'Semua',
    'Pertanian',
    'Minyak Rakyat',
    'BUMDes',
    'Pariwisata & UMKM'
  ];

  public filteredPotensi = computed(() => {
    const list = this.potensiList();
    const cat = this.selectedCategory();
    if (cat === 'Semua') return list;
    return list.filter((p) => p.kategori === cat);
  });

  ngOnInit(): void {
    this.strapi.getPotensiDesa().subscribe((res) => this.potensiList.set(res));
  }
}
