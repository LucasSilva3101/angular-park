import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

type AnimationType = 'fade-up' | 'scale-in' | 'slide-left' | 'rotate-in' | 'pop-glow';

interface DemoCard {
  title: string;
  description: string;
  tag: string;
  type: AnimationType;
}

@Component({
  selector: 'app-animations-lab',
  imports: [CommonModule, RouterLink],
  templateUrl: './animations-lab.html',
  styleUrl: './animations-lab.css',
})
export class AnimationsLabComponent {
  selectedType: AnimationType = 'fade-up';
  activeCard = 'Fade & Slide';
  showToast = false;

  filters: { label: string; value: AnimationType }[] = [
    { label: 'Fade Up', value: 'fade-up' },
    { label: 'Scale In', value: 'scale-in' },
    { label: 'Slide Left', value: 'slide-left' },
    { label: 'Rotate In', value: 'rotate-in' },
    { label: 'Pop Glow', value: 'pop-glow' },
  ];

  cards: DemoCard[] = [
    {
      title: 'Fade & Slide',
      description: 'Entrada suave com opacidade e deslocamento vertical.',
      tag: 'Entry',
      type: 'fade-up',
    },
    {
      title: 'Scale Impact',
      description: 'Aparecimento com destaque visual usando escala.',
      tag: 'Scale',
      type: 'scale-in',
    },
    {
      title: 'Slide Reveal',
      description: 'Elemento entrando lateralmente com sensação de movimento.',
      tag: 'Slide',
      type: 'slide-left',
    },
    {
      title: 'Rotate Intro',
      description: 'Entrada com rotação leve para um efeito mais vivo.',
      tag: 'Rotate',
      type: 'rotate-in',
    },
    {
      title: 'Pop Glow',
      description: 'Entrada com energia visual e brilho para CTAs ou badges.',
      tag: 'Highlight',
      type: 'pop-glow',
    },
  ];

  selectType(type: AnimationType): void {
    this.selectedType = type;

    const selectedCard = this.cards.find(card => card.type === type);
    if (selectedCard) {
      this.activeCard = selectedCard.title;
    }

    this.openToast(`Preview alterado para ${type}`);
  }

  setActiveCard(card: DemoCard): void {
    this.activeCard = card.title;
    this.selectedType = card.type;
    this.openToast(`Animação ${card.title} selecionada`);
  }

  openToast(message: string): void {
    const toast = document.getElementById('lab-toast');
    if (toast) {
      toast.textContent = message;
    }

    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2200);
  }
}
