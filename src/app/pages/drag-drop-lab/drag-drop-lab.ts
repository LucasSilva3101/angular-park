import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { RouterLink } from '@angular/router';

type PieceType = 'X' | 'O';
type WinnerLine =
  | 'row-0'
  | 'row-1'
  | 'row-2'
  | 'col-0'
  | 'col-1'
  | 'col-2'
  | 'diag-main'
  | 'diag-anti'
  | null;

interface Piece {
  id: string;
  label: string;
  number: 1 | 2 | 3;
  type: PieceType;
  origin: 'pool' | 'board';
}

interface BoardCell {
  id: string;
  piece: Piece | null;
}

@Component({
  selector: 'app-drag-drop-lab',
  imports: [CommonModule, RouterLink, CdkDrag, CdkDropList],
  templateUrl: './drag-drop-lab.html',
  styleUrl: './drag-drop-lab.css',
})
export class DragDropLabComponent {
  [x: string]: any;
  openModal() {
    throw new Error('Method not implemented.');
  }
  currentTurn: PieceType = 'X';
  winner: PieceType | null = null;
  winnerLine: WinnerLine = null;

  nextIndexX: 1 | 2 | 3 = 1;
  nextIndexO: 1 | 2 | 3 = 1;

  showInfoModal = false;
  modalMessage = '';

  showWinnerModal = false;
  winnerMessage = '';

  poolX: Piece[] = [
    { id: 'x1', label: 'X1', number: 1, type: 'X', origin: 'pool' },
    { id: 'x2', label: 'X2', number: 2, type: 'X', origin: 'pool' },
    { id: 'x3', label: 'X3', number: 3, type: 'X', origin: 'pool' },
  ];

  poolO: Piece[] = [
    { id: 'o1', label: 'O1', number: 1, type: 'O', origin: 'pool' },
    { id: 'o2', label: 'O2', number: 2, type: 'O', origin: 'pool' },
    { id: 'o3', label: 'O3', number: 3, type: 'O', origin: 'pool' },
  ];

  board: BoardCell[] = Array.from({ length: 9 }, (_, index) => ({
    id: `cell-${index}`,
    piece: null,
  }));

  dropListIds: string[] = [
    'pool-x',
    'pool-o',
    ...Array.from({ length: 9 }, (_, i) => `cell-${i}`),
  ];

  drop(event: CdkDragDrop<any>, targetIndex?: number): void {
    if (this.winner || targetIndex === undefined) return;

    const draggedPiece = event.item.data as Piece;
    if (!draggedPiece) return;

    const fromId = event.previousContainer.id;
    const toId = event.container.id;

    if (fromId === toId) return;

    const targetCell = this.board[targetIndex];
    if (!targetCell || targetCell.piece) return;

    if (draggedPiece.type !== this.currentTurn) {
      this.openInfoModal(`Agora é a vez do jogador ${this.currentTurn}.`);
      return;
    }

    const requiredNumber = this.getRequiredNumber(this.currentTurn);

    if (draggedPiece.number !== requiredNumber) {
      this.openInfoModal(
        `Agora você só pode jogar a peça ${this.currentTurn}${requiredNumber}.`
      );
      return;
    }

    if (fromId === 'pool-x' || fromId === 'pool-o') {
      this.handlePoolToBoard(draggedPiece, fromId, targetIndex);
      return;
    }

    if (fromId.startsWith('cell-')) {
      this.handleBoardToBoard(draggedPiece, fromId, targetIndex);
    }
  }

  onPlacedPieceDragStarted(piece: Piece): void {
    if (this.winner) return;

    if (piece.type !== this.currentTurn) {
      this.openInfoModal(`Agora é a vez do jogador ${this.currentTurn}.`);
      return;
    }

    const requiredNumber = this.getRequiredNumber(piece.type);

    if (piece.number !== requiredNumber) {
      this.openInfoModal(
        `Essa peça já está posicionada. Neste momento, somente a peça ${piece.type}${requiredNumber} pode ser movimentada.`
      );
    }
  }

  private handlePoolToBoard(piece: Piece, fromId: string, targetIndex: number): void {
    const playerPiecesOnBoard = this.getPiecesOnBoard(piece.type);

    if (playerPiecesOnBoard.length >= 3) {
      this.openInfoModal(
        `As 3 peças do jogador ${piece.type} já estão no tabuleiro. Agora você deve movimentar a peça ${piece.type}${this.getRequiredNumber(piece.type)}.`
      );
      return;
    }

    const pool = fromId === 'pool-x' ? this.poolX : this.poolO;
    const pieceIndex = pool.findIndex(p => p.id === piece.id);
    if (pieceIndex === -1) return;

    const [removed] = pool.splice(pieceIndex, 1);
    removed.origin = 'board';

    this.board[targetIndex].piece = removed;
    this.advanceRequiredNumber(piece.type);
    this.afterMove();
  }

  private handleBoardToBoard(piece: Piece, fromId: string, targetIndex: number): void {
    const playerPiecesOnBoard = this.getPiecesOnBoard(piece.type);

    if (playerPiecesOnBoard.length < 3) {
      this.openInfoModal(
        `A peça ${piece.label} ainda não pode ser movida. Primeiro coloque as 3 peças do jogador ${piece.type} no tabuleiro.`
      );
      return;
    }

    const fromIndex = Number(fromId.replace('cell-', ''));
    if (Number.isNaN(fromIndex)) return;

    const sourceCell = this.board[fromIndex];
    if (!sourceCell.piece) return;

    sourceCell.piece = null;
    this.board[targetIndex].piece = piece;

    this.advanceRequiredNumber(piece.type);
    this.afterMove();
  }

  private afterMove(): void {
    const result = this.checkWinner();

    if (result.winner) {
      this.winner = result.winner;
      this.winnerLine = result.line;
      this.winnerMessage = `A peça ${result.winner} venceu o jogo!`;
      this.showWinnerModal = true;
      return;
    }

    this.currentTurn = this.currentTurn === 'X' ? 'O' : 'X';
  }

  private getRequiredNumber(type: PieceType): 1 | 2 | 3 {
    return type === 'X' ? this.nextIndexX : this.nextIndexO;
  }

  private advanceRequiredNumber(type: PieceType): void {
    if (type === 'X') {
      this.nextIndexX = this.nextIndexX === 1 ? 2 : this.nextIndexX === 2 ? 3 : 1;
    } else {
      this.nextIndexO = this.nextIndexO === 1 ? 2 : this.nextIndexO === 2 ? 3 : 1;
    }
  }

  private getPiecesOnBoard(type: PieceType): Piece[] {
    return this.board
      .map(cell => cell.piece)
      .filter((piece): piece is Piece => !!piece && piece.type === type);
  }

  private checkWinner(): { winner: PieceType | null; line: WinnerLine } {
    const lines = [
      { indexes: [0, 1, 2], line: 'row-0' as WinnerLine },
      { indexes: [3, 4, 5], line: 'row-1' as WinnerLine },
      { indexes: [6, 7, 8], line: 'row-2' as WinnerLine },
      { indexes: [0, 3, 6], line: 'col-0' as WinnerLine },
      { indexes: [1, 4, 7], line: 'col-1' as WinnerLine },
      { indexes: [2, 5, 8], line: 'col-2' as WinnerLine },
      { indexes: [0, 4, 8], line: 'diag-main' as WinnerLine },
      { indexes: [2, 4, 6], line: 'diag-anti' as WinnerLine },
    ];

    for (const item of lines) {
      const [a, b, c] = item.indexes.map(i => this.board[i].piece?.type ?? null);

      if (a && a === b && b === c) {
        return { winner: a, line: item.line };
      }
    }

    return { winner: null, line: null };
  }

  getCellPiece(index: number): Piece | null {
    return this.board[index].piece;
  }

  getNextPieceLabel(): string {
    return `${this.currentTurn}${this.getRequiredNumber(this.currentTurn)}`;
  }

  resetGame(): void {
    this.currentTurn = 'X';
    this.winner = null;
    this.winnerLine = null;

    this.nextIndexX = 1;
    this.nextIndexO = 1;

    this.showInfoModal = false;
    this.modalMessage = '';
    this.showWinnerModal = false;
    this.winnerMessage = '';

    this.poolX = [
      { id: 'x1', label: 'X1', number: 1, type: 'X', origin: 'pool' },
      { id: 'x2', label: 'X2', number: 2, type: 'X', origin: 'pool' },
      { id: 'x3', label: 'X3', number: 3, type: 'X', origin: 'pool' },
    ];

    this.poolO = [
      { id: 'o1', label: 'O1', number: 1, type: 'O', origin: 'pool' },
      { id: 'o2', label: 'O2', number: 2, type: 'O', origin: 'pool' },
      { id: 'o3', label: 'O3', number: 3, type: 'O', origin: 'pool' },
    ];

    this.board = Array.from({ length: 9 }, (_, index) => ({
      id: `cell-${index}`,
      piece: null,
    }));
  }

  openInfoModal(message: string): void {
    this.modalMessage = message;
    this.showInfoModal = true;
  }

  closeInfoModal(): void {
    this.showInfoModal = false;
  }

  closeWinnerModal(): void {
    this.showWinnerModal = false;
  }
}
