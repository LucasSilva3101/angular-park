import { describe, it, expect, beforeEach } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let documentRef: Document;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [ThemeService],
    });

    service = TestBed.inject(ThemeService);
    documentRef = TestBed.inject(DOCUMENT);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should default to ocean when nothing is saved', () => {
    expect(service.getTheme()).toBe('ocean');
    expect(documentRef.body.getAttribute('data-theme')).toBe('ocean');
  });

  it('should apply and persist sunset theme', () => {
    service.setTheme('sunset');

    expect(service.getTheme()).toBe('sunset');
    expect(documentRef.body.getAttribute('data-theme')).toBe('sunset');
    expect(localStorage.getItem('angular-park-theme')).toBe('sunset');
  });

  it('should apply and persist forest theme', () => {
    service.setTheme('forest');

    expect(service.getTheme()).toBe('forest');
    expect(documentRef.body.getAttribute('data-theme')).toBe('forest');
    expect(localStorage.getItem('angular-park-theme')).toBe('forest');
  });
});
