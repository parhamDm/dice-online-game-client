

import {GameComment} from "./GameComment";

export class GameListModel{

  id:number;
  scoreLimit:number;
  currentZeroMaker:number[];//numbers 123456
  numberOfDices:number; //1,2,4
  dicePerTurn:number;//number or "INF"
  gameName:string;
  username:string;
  date:string;
  timesPlayed:number;
  gameComments:Array<GameComment>;

  avgScore:number;

}
