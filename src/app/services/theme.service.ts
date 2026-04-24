import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

export type AppTheme = 'ocean' | 'sunset' | 'forest';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private storageKey = 'angular-park-theme';

  private currentThemeValue: AppTheme = 'ocean';

  constructor() {
    const savedTheme = this.getSavedTheme();
    this.applyTheme(savedTheme);
  }

  setTheme(theme: AppTheme): void {
    this.currentThemeValue = theme;
    this.document.body.setAttribute('data-theme', theme);
    localStorage.setItem(this.storageKey, theme);
  }

  getTheme(): AppTheme {
    return this.currentThemeValue;
  }

  private getSavedTheme(): AppTheme {
    const saved = localStorage.getItem(this.storageKey);

    if (saved === 'ocean' || saved === 'sunset' || saved === 'forest') {
      this.currentThemeValue = saved;
      return saved;
    }

    return 'ocean';
  }

  private applyTheme(theme: AppTheme): void {
    this.currentThemeValue = theme;
    this.document.body.setAttribute('data-theme', theme);
  }
}
