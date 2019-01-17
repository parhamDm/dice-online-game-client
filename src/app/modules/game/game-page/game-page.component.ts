import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GameService} from "../../../core/services/game.service";
import {GameStatusResponse} from "../../../core/models/GameStatusResponse.model";
import {Subscription} from "rxjs/Rx";
import {interval} from "rxjs/index";



@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})

export class GamePageComponent implements OnInit {

  gameId:string;

  numberOfDices:number;

  currentZeroMakers:Array<number>;

  scoreLimit:number;

  isPlayerTurn:boolean=true;

  playerCurrent:number=0;
  opponentCurrent:number=0;

  playerScore:number=0;
  opponentScore:number=0;
  message:string;
  subscription: Subscription;

  dicesArray =[1,1,1,1];




  constructor(private route: ActivatedRoute,
              private elRef: ElementRef,
              private gameService: GameService,
              ) {
    this.gameId = this.route.snapshot.paramMap.get("gameId");
    elRef.nativeElement.ownerDocument.body.style.cssText=
      "\n" +
      "  background: url(\"/../../../../assets/back.jpg\") no-repeat center center fixed;\n" +
      "  -webkit-background-size: cover !important;\n" +
      "  -moz-background-size: cover !important;\n" +
      "  -o-background-size: cover !important;\n" +
      "  background-size: cover !important;\n" +
      "  height: 100%;\n" +
      "  color: #BABABA;";
    console.log(this.gameId);
  }

  ngOnInit() {
    this.gameService.getGame(this.gameId).subscribe((game:Game)=>{
        this.handleGame(game);
      }
    );

    const source = interval(1000);

    this.subscription = source.subscribe(val => {
      this.whosTurn();
    })
  }

  private handleGame(game : Game) {
    this.currentZeroMakers=game.currentZeroMaker;
    this.scoreLimit = game.scoreLimit;
    this.numberOfDices=game.numberOfDices;
  }



  public rollDice(){
    this.message='';
    if(this.isPlayerTurn===false){
      this.message='نوبت شما نیست!!';
      return;
    }
    this.gameService.rollDice().subscribe(
      (model:GameStatusResponse) =>{
        if(model.statusCode!=="0"){
          this.message='نوبت شما نیست!!';
          return;
        }
        this.dicesArray=model.dices;
        this.playerCurrent=model.current;
        this.playerScore=model.score;
        this.isPlayerTurn=model.yourTurn;
        this.opponentScore=model.opponentScore;
        this.opponentCurrent=model.opponentCurrent
      }
    )
  }


  private whosTurn(){

    this.gameService.getGameStatus().subscribe(
      (model:GameStatusResponse)=>{

        if(!this.isPlayerTurn){
          if(model.dices.length!==0)
            this.dicesArray=model.dices;
        }
        // this.playerCurrent=model.current;
        // this.playerScore=model.score;
        this.isPlayerTurn=model.yourTurn;
        this.opponentScore=model.opponentScore;
        this.opponentCurrent=model.opponentCurrent
      }
    )
  }

  public hold(){

    this.gameService.hold().subscribe(

      (model:GameStatusResponse)=>{
        if(model.statusCode!=="0"){
          this.message='نوبت شما نیست!!';
          return;
        }
        this.dicesArray=model.dices;
        this.playerCurrent=model.current;
        this.playerScore=model.score;
        this.isPlayerTurn=model.yourTurn;
        this.opponentScore=model.opponentScore;
        this.opponentCurrent=model.opponentCurrent
      }
    )
  }

}
