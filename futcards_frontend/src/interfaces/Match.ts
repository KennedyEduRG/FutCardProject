import { Player } from "./Player";

export interface Match {
  player1: Player | null;
  player2: Player | null;
  matchCode: string | null;
}
