import { Player } from "./Player";

export class Match {
  player1: Player | null;
  player2: Player | null;
  matchCode: string | null;

  constructor() {
    this.player1 = null;
    this.player2 = null;
    this.matchCode = null;
  }

  createRoom(player1: Player) {
    this.player1 = player1;
  }

  startMatch() {
    if (this.player1 != null && this.player2 != null) {
      // iniciar a partida
    }
  }

  sendMessage() {}

  joinTheMatch(player2: Player) {
    this.player2 = player2;
  }
}
