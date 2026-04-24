import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { FormsLabComponent } from './forms-lab';
import { describe, it, expect, beforeEach } from 'vitest';

describe('FormsLabComponent', () => {
  let component: FormsLabComponent;
  let fixture: ComponentFixture<FormsLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsLabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FormsLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start on login tab', () => {
    expect(component.selectedTab).toBe('login');
    expect(component.renderedTab).toBe('login');
  });

  it('should switch tab with one click logic', () => {
    component.setTab('register');

    expect(component.selectedTab).toBe('register');
    expect(component.renderedTab).toBe('register');
    expect(component.activeAnimationClass).toBe('anim-register');
  });

  it('should format phone correctly', () => {
    expect(component.formatPhone('11999999999')).toBe('(11) 99999-9999');
  });

  it('should format card number correctly', () => {
    expect(component.formatCardNumber('1234567890123456')).toBe('1234 5678 9012 3456');
  });

  it('should format expiry correctly', () => {
    expect(component.formatExpiry('1229')).toBe('12/29');
  });

  it('should keep register step 1 invalid when required fields are empty', () => {
    component.nextRegisterStep();

    expect(component.registerStep).toBe(1);
    expect(component.errorMessage).toContain('etapa 1');
  });

  it('should advance to register step 2 when step 1 fields are valid', () => {
    component.registerForm.patchValue({
      fullName: 'Lucas Silva',
      email: 'lucas@email.com',
      phone: '(11) 99999-9999',
    });

    component.nextRegisterStep();

    expect(component.registerStep).toBe(2);
    expect(component.errorMessage).toBe('');
  });

  it('should validate login form successfully', () => {
    component.loginForm.patchValue({
      email: 'lucas@email.com',
      password: '123456',
      remember: true,
    });

    component.submitLogin();

    expect(component.successMessage).toContain('Login validado');
    expect(component.errorMessage).toBe('');
  });

  it('should reject register when passwords do not match', () => {
    component.registerForm.patchValue({
      fullName: 'Lucas Silva',
      email: 'lucas@email.com',
      phone: '(11) 99999-9999',
      password: '123456',
      confirmPassword: '654321',
    });

    component.submitRegister();

    expect(component.errorMessage).toContain('não coincidem');
  });

  it('should expose card preview fallbacks', () => {
    expect(component.cardPreviewName).toBe('NOME NO CARTÃO');
    expect(component.cardPreviewNumber).toBe('0000 0000 0000 0000');
    expect(component.cardPreviewExpiry).toBe('MM/AA');
  });
});
