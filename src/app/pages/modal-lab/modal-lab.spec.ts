import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ModalLabComponent } from './modal-lab';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('ModalLabComponent', () => {
  let component: ModalLabComponent;
  let fixture: ComponentFixture<ModalLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close modal', () => {
    component.openModal();
    expect(component.showModal).toBe(true);

    component.closeModal();
    expect(component.showModal).toBe(false);
  });

  it('should show toast and auto close', () => {
    vi.useFakeTimers();

    component.openToast('success', 'ok');

    expect(component.showToast).toBe(true);
    expect(component.toastType).toBe('success');
    expect(component.toastMessage).toBe('ok');

    vi.advanceTimersByTime(2600);

    expect(component.showToast).toBe(false);
  });
});
