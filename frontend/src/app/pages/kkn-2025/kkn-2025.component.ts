import { Component, OnInit, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StrapiService } from '../../core/strapi.service';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { ProgramKKN } from '../../models/program-kkn.model';

@Component({
  selector: 'app-kkn-2025',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './kkn-2025.component.html',
  styleUrls: ['./kkn-2025.component.css']
})
export class KKNComponent implements OnInit {
  private strapi = inject(StrapiService);
  public kknList = signal<ProgramKKN[]>([]);

  // Modal Pop-Up & Slider State
  public selectedProgram = signal<ProgramKKN | null>(null);
  public currentSlideIndex = signal<number>(0);

  public activeGallery = computed<string[]>(() => {
    const prog = this.selectedProgram();
    if (!prog) return [];
    if (Array.isArray(prog.galeri) && prog.galeri.length > 0) {
      return prog.galeri.filter((url) => url && url.trim().length > 0);
    }
    if (Array.isArray(prog.foto) && prog.foto.length > 0) {
      return prog.foto.filter((url) => url && url.trim().length > 0);
    }
    return prog.dokumentasi ? [prog.dokumentasi] : ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop'];
  });

  public currentPhotoUrl = computed<string>(() => {
    const gal = this.activeGallery();
    if (gal.length === 0) return '';
    const idx = this.currentSlideIndex();
    return gal[idx] || gal[0];
  });

  ngOnInit(): void {
    this.strapi.getProgramKKN().subscribe((res) => this.kknList.set(res));
  }

  public openDetailModal(prog: ProgramKKN): void {
    this.selectedProgram.set(prog);
    this.currentSlideIndex.set(0);
    document.body.style.overflow = 'hidden';
  }

  public closeDetailModal(): void {
    this.selectedProgram.set(null);
    this.currentSlideIndex.set(0);
    document.body.style.overflow = '';
  }

  public nextSlide(event?: Event): void {
    if (event) event.stopPropagation();
    const total = this.activeGallery().length;
    if (total <= 1) return;
    this.currentSlideIndex.update((curr) => (curr + 1) % total);
  }

  public prevSlide(event?: Event): void {
    if (event) event.stopPropagation();
    const total = this.activeGallery().length;
    if (total <= 1) return;
    this.currentSlideIndex.update((curr) => (curr - 1 + total) % total);
  }

  public goToSlide(idx: number, event?: Event): void {
    if (event) event.stopPropagation();
    this.currentSlideIndex.set(idx);
  }

  public getCardGalleryCount(prog: ProgramKKN): number {
    if (Array.isArray(prog.galeri) && prog.galeri.length > 0) return prog.galeri.length;
    if (Array.isArray(prog.foto) && prog.foto.length > 0) return prog.foto.length;
    return prog.dokumentasi ? 1 : 0;
  }

  @HostListener('document:keydown', ['$event'])
  public handleKeyboard(event: KeyboardEvent): void {
    if (!this.selectedProgram()) return;
    if (event.key === 'Escape') {
      this.closeDetailModal();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === 'ArrowLeft') {
      this.prevSlide();
    }
  }
}
