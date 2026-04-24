import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home';
import { ThemeLabComponent } from './pages/theme-lab/theme-lab';
import { RouterLabComponent } from './pages/router-lab/router-lab';
import { describe, it, expect, beforeEach } from 'vitest';

describe('App routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should navigate to home', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/', HomeComponent);

    expect(component).toBeTruthy();
  });

  it('should navigate to theme lab', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/labs/theme', ThemeLabComponent);

    expect(component).toBeTruthy();
  });

  it('should navigate to router lab', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/labs/router', RouterLabComponent);

    expect(component).toBeTruthy();
  });
});
