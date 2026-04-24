import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DragDropLabComponent } from './drag-drop-lab';
import { describe, it, expect, beforeEach } from 'vitest';

describe('DragDropLabComponent', () => {
  let component: DragDropLabComponent;
  let fixture: ComponentFixture<DragDropLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragDropLabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DragDropLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function createDropEvent(previousId: string, currentId: string, piece: any) {
    return {
      previousContainer: { id: previousId },
      container: { id: currentId },
      item: { data: piece },
    } as any;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with X turn', () => {
    expect(component.currentTurn).toBe('X');
    expect(component.getNextPieceLabel()).toBe('X1');
  });

  it('should allow X1 to be placed first', () => {
    const piece = component.poolX[0];
    const event = createDropEvent('pool-x', 'cell-0', piece);

    component.drop(event, 0);

    expect(component.board[0].piece?.label).toBe('X1');
    expect(component.currentTurn).toBe('O');
  });
});
