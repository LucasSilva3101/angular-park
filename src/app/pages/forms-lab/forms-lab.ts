import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

type FormTab = 'login' | 'register' | 'contact' | 'checkout' | 'profile';
type FormName = 'login' | 'register' | 'contact' | 'checkout' | 'profile';
type FormAnimation =
  | 'anim-login'
  | 'anim-register'
  | 'anim-contact'
  | 'anim-checkout'
  | 'anim-profile';

interface TabItem {
  key: FormTab;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-forms-lab',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forms-lab.html',
  styleUrl: './forms-lab.css',
})
export class FormsLabComponent {
  private fb = inject(FormBuilder);

  selectedTab: FormTab = 'login';
  renderedTab: FormTab = 'login';
  activeAnimationClass: FormAnimation = 'anim-login';
  formRenderKey = 0;

  showPassword = false;
  showRegisterPassword = false;
  showRegisterConfirmPassword = false;

  successMessage = '';
  errorMessage = '';

  registerStep = 1;
  avatarPreview: string | null = null;

  tabs: TabItem[] = [
    { key: 'login', label: 'Login', icon: '🔐', description: 'Acesso rápido com email e senha.' },
    { key: 'register', label: 'Cadastro', icon: '📝', description: 'Cadastro em etapas com validação progressiva.' },
    { key: 'contact', label: 'Contato', icon: '💬', description: 'Formulário de suporte com select e textarea.' },
    { key: 'checkout', label: 'Checkout', icon: '💳', description: 'Fluxo de pagamento com preview visual do cartão.' },
    { key: 'profile', label: 'Perfil', icon: '⚙️', description: 'Preferências, bio e upload de avatar com preview.' },
  ];

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  registerForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(14)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  contactForm = this.fb.group({
    name: ['', [Validators.required]],
    subject: ['', [Validators.required]],
    category: ['suporte', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  checkoutForm = this.fb.group({
    cardName: ['', [Validators.required]],
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    expiry: ['', [Validators.required, Validators.minLength(4)]],
    cvv: ['', [Validators.required, Validators.minLength(3)]],
  });

  profileForm = this.fb.group({
    username: ['', [Validators.required]],
    bio: [''],
    theme: ['dark'],
    notifications: [true],
    newsletter: [false],
    avatarUrl: [''],
  });

  get activeTabInfo(): TabItem {
    return this.tabs.find(tab => tab.key === this.selectedTab) ?? this.tabs[0];
  }

  setTab(tab: FormTab): void {
    if (tab === this.selectedTab) return;

    this.selectedTab = tab;
    this.renderedTab = tab;
    this.activeAnimationClass = this.getAnimationClass(tab);
    this.formRenderKey++;
    this.clearMessages();
  }

  private getAnimationClass(tab: FormTab): FormAnimation {
    switch (tab) {
      case 'login':
        return 'anim-login';
      case 'register':
        return 'anim-register';
      case 'contact':
        return 'anim-contact';
      case 'checkout':
        return 'anim-checkout';
      case 'profile':
        return 'anim-profile';
    }
  }

  private getForm(formName: FormName): FormGroup {
    switch (formName) {
      case 'login': return this.loginForm;
      case 'register': return this.registerForm;
      case 'contact': return this.contactForm;
      case 'checkout': return this.checkoutForm;
      case 'profile': return this.profileForm;
    }
  }

  isInvalid(controlName: string, formName: FormName): boolean {
    const form = this.getForm(formName);
    const control: AbstractControl | null = form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  private setSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
  }

  private setError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  formatPhone(value: string | null | undefined): string {
    const digits = (value ?? '').replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  formatCardNumber(value: string | null | undefined): string {
    const digits = (value ?? '').replace(/\D/g, '').slice(0, 16);
    const groups = digits.match(/.{1,4}/g);
    return groups?.join(' ') ?? '';
  }

  formatExpiry(value: string | null | undefined): string {
    const digits = (value ?? '').replace(/\D/g, '').slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  get cardPreviewNumber(): string {
    const raw = this.checkoutForm.get('cardNumber')?.value ?? '';
    return this.formatCardNumber(raw) || '0000 0000 0000 0000';
  }

  get cardPreviewName(): string {
    const raw = this.checkoutForm.get('cardName')?.value?.trim();
    return raw || 'NOME NO CARTÃO';
  }

  get cardPreviewExpiry(): string {
    const raw = this.checkoutForm.get('expiry')?.value ?? '';
    return this.formatExpiry(raw) || 'MM/AA';
  }

  onPhoneInput(): void {
    const control = this.registerForm.get('phone');
    control?.setValue(this.formatPhone(control?.value), { emitEvent: false });
  }

  onCardNumberInput(): void {
    const control = this.checkoutForm.get('cardNumber');
    const digits = (control?.value ?? '').replace(/\D/g, '').slice(0, 16);
    control?.setValue(digits, { emitEvent: false });
  }

  onExpiryInput(): void {
    const control = this.checkoutForm.get('expiry');
    const digits = (control?.value ?? '').replace(/\D/g, '').slice(0, 4);
    control?.setValue(digits, { emitEvent: false });
  }

  onCvvInput(): void {
    const control = this.checkoutForm.get('cvv');
    const digits = (control?.value ?? '').replace(/\D/g, '').slice(0, 4);
    control?.setValue(digits, { emitEvent: false });
  }

  nextRegisterStep(): void {
    const step1Fields = ['fullName', 'email', 'phone'];

    for (const field of step1Fields) {
      this.registerForm.get(field)?.markAsTouched();
    }

    const hasError = step1Fields.some(field => this.registerForm.get(field)?.invalid);
    if (hasError) {
      this.setError('Preencha corretamente os dados da etapa 1 antes de continuar.');
      return;
    }

    this.clearMessages();
    this.registerStep = 2;
  }

  prevRegisterStep(): void {
    this.clearMessages();
    this.registerStep = 1;
  }

  onAvatarFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.setError('Selecione um arquivo de imagem válido para o avatar.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = String(reader.result);
      this.clearMessages();
    };
    reader.readAsDataURL(file);
  }

  submitLogin(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.setError('Revise os campos de login antes de continuar.');
      return;
    }
    this.setSuccess('Login validado com sucesso. Fluxo pronto para autenticação.');
  }

  submitRegister(): void {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      this.setError('Existem campos inválidos no cadastro.');
      return;
    }

    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      this.setError('As senhas informadas não coincidem.');
      return;
    }

    this.setSuccess('Cadastro multi-step validado com sucesso.');
  }

  submitContact(): void {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) {
      this.setError('Preencha corretamente os campos do formulário de contato.');
      return;
    }
    this.setSuccess('Mensagem pronta para envio.');
  }

  submitCheckout(): void {
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.invalid) {
      this.setError('Os dados do pagamento ainda estão incompletos.');
      return;
    }
    this.setSuccess('Checkout validado com sucesso. Pagamento simulado aprovado.');
  }

  submitProfile(): void {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) {
      this.setError('Revise as informações do perfil antes de salvar.');
      return;
    }
    this.setSuccess('Perfil salvo com sucesso.');
  }
}
