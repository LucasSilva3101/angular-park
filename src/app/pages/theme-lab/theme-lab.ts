import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppTheme, ThemeService } from '../../services/theme.service';

interface ThemeCard {
  key: AppTheme;
  name: string;
  description: string;
  badge: string;
}

@Component({
  selector: 'app-theme-lab',
  imports: [CommonModule, RouterLink],
  templateUrl: './theme-lab.html',
  styleUrl: './theme-lab.css',
})
export class ThemeLabComponent {
  private themeService = inject(ThemeService);

  themes: ThemeCard[] = [
    {
      key: 'ocean',
      name: 'Ocean',
      description: 'Tema frio, tecnológico e mais próximo do visual padrão do projeto.',
      badge: 'Blue UI',
    },
    {
      key: 'sunset',
      name: 'Sunset',
      description: 'Tema com energia, tons quentes e contraste forte.',
      badge: 'Warm Glow',
    },
    {
      key: 'forest',
      name: 'Forest',
      description: 'Tema com pegada natural, escura e elegante.',
      badge: 'Nature Mode',
    },
  ];

  get selectedTheme(): AppTheme {
    return this.themeService.getTheme();
  }

  applyTheme(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }
}
