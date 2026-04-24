import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterLabComponent } from './router-lab';
import { describe, it, expect, beforeEach } from 'vitest';

describe('RouterLabComponent', () => {
  let component: RouterLabComponent;
  let fixture: ComponentFixture<RouterLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterLabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RouterLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
