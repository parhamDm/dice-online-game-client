import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../core/services/game.service";
import {GameStatusResponse} from "../../../core/models/GameStatusResponse.model";
import {Subscription} from "rxjs/Rx";
import {interval} from "rxjs/index";
import {Comment} from "../../../core/models/Comment.model";
import {UsermanagementService} from "../../../core/services/usermanagement.service";
import {ResponseBean} from "../../../core/models/ResponseBean.model";
import {MDBModalService} from "angular-bootstrap-md";



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
  model: Comment=new Comment;
  isPlayerTurn:boolean=true;

  playerCurrent:number=0;
  opponentCurrent:number=0;

  playerScore:number=0;
  opponentScore:number=0;
  message:string;
  subscription: Subscription;
  gameStatus:string;
  dicesArray =[1,1,1,1];
  private opponentId: number;
  @ViewChild('frame')modal: MDBModalService;




  constructor(private route: ActivatedRoute,
              private elRef: ElementRef,
              private router: Router,
              private gameService: GameService,
              private userService: UsermanagementService,
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

    const source = interval(1500);

    this.subscription = source.subscribe(val => {
      this.whosTurn();
    })
  }

  private handleGame(game : Game) {
    this.currentZeroMakers=game.currentZeroMaker;
    this.scoreLimit = game.scoreLimit;
    this.numberOfDices=game.numberOfDices;

    console.log(this.numberOfDices)
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
        if(model.statusCode=="4"){
          this.finalizeGame(4)
        }
        if(model.statusCode=="5"){
          this.finalizeGame(5)
        }
        if(!this.isPlayerTurn){
          if(model.dices.length!==0)
            this.dicesArray=model.dices;
        }
        // this.playerCurrent=model.current;
        // this.playerScore=model.score;
        this.isPlayerTurn=model.yourTurn;
        this.opponentScore=model.opponentScore;
        this.opponentCurrent=model.opponentCurrent;
        this.model.toUserId =model.opponentId;
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

  performComment(form){
    this.model.gameId= +this.gameId;
    this.userService.addComment(this.model).subscribe(
      (model:ResponseBean)=>{
        console.log(model);
        window.location.replace('/listGame')
      }
    )
  }

  private finalizeGame(number: number) {
    if(number==4){
      this.gameStatus="شما بردید"
    }
    if(number==5){
      this.gameStatus="شما باختید"
    }
    this.isPlayerTurn=false;
    this.subscription.unsubscribe();
    this.modal.show("");
  }
}
