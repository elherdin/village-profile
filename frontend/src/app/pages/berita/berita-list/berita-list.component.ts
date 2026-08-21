import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StrapiService } from '../../../core/strapi.service';
import { SectionHeaderComponent } from '../../../components/section-header/section-header.component';
import { Berita } from '../../../models/berita.model';

@Component({
  selector: 'app-berita-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, SectionHeaderComponent],
  templateUrl: './berita-list.component.html',
  styleUrls: ['./berita-list.component.css']
})
export class BeritaListComponent implements OnInit {
  private strapi = inject(StrapiService);
  public beritaList = signal<Berita[]>([]);
  public searchQuery = '';
  public selectedCategory = signal<string>('Semua');

  public categories: string[] = [
    'Semua',
    'Pemerintahan',
    'Kegiatan Warga',
    'Pengumuman',
    'Kesehatan & Posyandu'
  ];

  public filteredBerita = computed(() => {
    const list = this.beritaList();
    const q = this.searchQuery.toLowerCase().trim();
    const cat = this.selectedCategory();

    return list.filter((b) => {
      const matchCat = cat === 'Semua' || b.kategori === cat;
      const matchQuery = !q || b.judul.toLowerCase().includes(q) || b.ringkasan.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  });

  ngOnInit(): void {
    this.strapi.getBerita().subscribe((res) => this.beritaList.set(res));
  }
}
