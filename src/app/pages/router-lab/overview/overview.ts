import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class OverviewComponent {
  features = [
    'RouterOutlet para renderizar rotas filhas',
    'RouterLink para navegação declarativa',
    'RouterLinkActive para destacar o link atual',
    'Params dinâmicos com /details/:id',
  ];
}
