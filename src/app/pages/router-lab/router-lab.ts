import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

interface RouteCard {
  title: string;
  description: string;
  tag: string;
  route: string;
  cta: string;
  targetLabel: string;
}

@Component({
  selector: 'app-router-lab',
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './router-lab.html',
  styleUrl: './router-lab.css',
})
export class RouterLabComponent {
  cards: RouteCard[] = [
    {
      title: 'Route Params',
      description: 'Abre uma rota dinâmica real usando o parâmetro /details/1.',
      tag: 'Params',
      route: '/labs/router/details/1',
      cta: 'Abrir detalhe',
      targetLabel: '/details/1',
    },
    {
      title: 'Child Routes',
      description: 'Navega para uma rota filha renderizada dentro do router-outlet.',
      tag: 'Children',
      route: '/labs/router/playground',
      cta: 'Ir para playground',
      targetLabel: '/playground',
    },
    {
      title: 'Active Links',
      description: 'Volta para a visão geral para destacar o comportamento da navegação.',
      tag: 'State',
      route: '/labs/router/overview',
      cta: 'Ver overview',
      targetLabel: '/overview',
    },
  ];
}
