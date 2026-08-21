import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { StrapiService } from '../../core/strapi.service';

interface NavItem {
  label: string;
  path: string;
  exact?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private strapiService = inject(StrapiService);

  // Reactive state signals
  public isScrolled = signal<boolean>(false);
  public isMobileMenuOpen = signal<boolean>(false);
  public profil = this.strapiService.profilDesa;

  // Daftar menu navigasi utama yang bersih & esensial
  public navItems: NavItem[] = [
    { label: 'Beranda', path: '/', exact: true },
    { label: 'Profil', path: '/profil' },
    { label: 'Data Desa', path: '/data-desa' },
    { label: 'Potensi', path: '/potensi' },
    { label: 'KKN 2025', path: '/kkn-2025' },
    { label: 'Informasi Publik', path: '/informasi-publik' },
    { label: 'Berita', path: '/berita' }
  ];

  ngOnInit(): void {
    this.strapiService.getProfilDesa().subscribe();
    this.checkScrollPosition();
  }

  /**
   * Listener event scroll layar pada window
   * Mengaktifkan state isScrolled jika scroll > 20px
   */
  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    this.checkScrollPosition();
  }

  private checkScrollPosition(): void {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled.set(scrollOffset > 20);
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((val) => !val);
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
