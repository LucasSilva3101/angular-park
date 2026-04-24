import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface LabCard {
  title: string;
  description: string;
  route: string;
  badge: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  labs: LabCard[] = [
    {
      title: 'Animations Lab',
      description: 'Teste animações, hover, entrada e saída de elementos.',
      route: '/labs/animations',
      badge: 'Motion',
    },
    {
      title: 'Router Lab',
      description: 'Explore navegação, lazy loading e parâmetros de rota.',
      route: '/labs/router',
      badge: 'Routing',
    },
    {
      title: 'Drag & Drop Lab',
      description: 'Brinque com listas arrastáveis e organização visual.',
      route: '/labs/drag-drop',
      badge: 'Interaction',
    },
    {
      title: 'Forms Lab',
      description: 'Validação, estados visuais e inputs interativos.',
      route: '/labs/forms',
      badge: 'Forms',
    },
    {
      title: 'Modal Lab',
      description: 'Teste modais, drawers, dropdowns e overlays.',
      route: '/labs/modal',
      badge: 'Overlay',
    },
    {
      title: 'Theme Lab',
      description: 'Experimente cores, dark mode e layout.',
      route: '/labs/theme',
      badge: 'UI',
    },
  ];
}
