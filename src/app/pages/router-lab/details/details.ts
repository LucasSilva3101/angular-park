import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class DetailsComponent {
  private route = inject(ActivatedRoute);

  id = computed(() => this.route.snapshot.paramMap.get('id') ?? 'sem-id');

  detailText = computed(() => {
    const currentId = this.id();

    const map: Record<string, string> = {
      '1': 'Este detalhe demonstra leitura de parâmetros de rota para carregar um conteúdo específico.',
      '2': 'Aqui você pode simular busca de dados por ID e renderização condicional da interface.',
      '3': 'Este exemplo mostra como rotas dinâmicas ajudam a construir telas reutilizáveis.',
    };

    return map[currentId] ?? 'Nenhum conteúdo específico foi encontrado para este ID.';
  });
}
