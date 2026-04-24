import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ThemeLabComponent } from './theme-lab';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ThemeLabComponent', () => {
  let component: ThemeLabComponent;
  let fixture: ComponentFixture<ThemeLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeLabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
