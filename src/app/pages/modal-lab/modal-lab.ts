import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type ToastType = 'success' | 'warning' | 'info';

@Component({
  selector: 'app-modal-lab',
  imports: [CommonModule, RouterLink],
  templateUrl: './modal-lab.html',
  styleUrl: './modal-lab.css',
})
export class ModalLabComponent {
  showModal = false;
  showPhotoModal = false;
  showDrawer = false;
  showDropdown = false;
  showToast = false;

  toastType: ToastType = 'success';
  toastMessage = '';

  photoTitle = 'Preview de imagem';
  photoDescription =
    'Esse modal simula visualização ampliada de imagem, banner, produto ou foto de perfil.';
  photoUrl =
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80';

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  openPhotoModal(): void {
    this.showPhotoModal = true;
  }

  closePhotoModal(): void {
    this.showPhotoModal = false;
  }

  openDrawer(): void {
    this.showDrawer = true;
  }

  closeDrawer(): void {
    this.showDrawer = false;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown(): void {
    this.showDropdown = false;
  }

  openToast(type: ToastType, message: string): void {
    this.toastType = type;
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2600);
  }

  onOverlayClick(event: MouseEvent, closeFn: () => void): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      closeFn();
    }
  }
}
