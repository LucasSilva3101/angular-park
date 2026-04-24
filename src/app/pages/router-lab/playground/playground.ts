import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface PlaygroundCard {
  id: number;
  title: string;
  text: string;
}

@Component({
  selector: 'app-playground',
  imports: [CommonModule, RouterLink],
  templateUrl: './playground.html',
  styleUrl: './playground.css',
})
export class PlaygroundComponent {
  cards: PlaygroundCard[] = [
    {
      id: 1,
      title: 'Detalhe 1',
      text: 'Clique para testar rota dinâmica com parâmetro.',
    },
    {
      id: 2,
      title: 'Detalhe 2',
      text: 'Outro exemplo de detalhe acessado por ID.',
    },
    {
      id: 3,
      title: 'Detalhe 3',
      text: 'Navegação declarativa diretamente pelo template.',
    },
  ];
}
