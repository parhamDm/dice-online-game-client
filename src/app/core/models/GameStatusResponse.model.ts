
export class GameStatusResponse {
  statusCode:string;
  statusDesc:string;
  dices:number[];
  yourTurn:boolean;
  current:number;
  score:number;
  opponentScore:number;
  opponentCurrent:number;

}
