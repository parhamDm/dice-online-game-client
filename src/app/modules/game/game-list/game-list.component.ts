import {Component, OnInit, ViewChild} from '@angular/core';
import {GameService} from "../../../core/services/game.service";
import {GameListModel} from "../../../core/models/GameListModel";
import {forEach} from "@angular/router/src/utils/collection";
import {GameComment} from "../../../core/models/GameComment";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {UsermanagementService} from "../../../core/services/usermanagement.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  elements: any = [];
  users:any= [];
  @ViewChild('basicModal')mdbTablePagination: MDBModalService;
  @ViewChild('Modal2') modal2: MDBModalService;
  comments: Array<GameComment>=[];
  gameId=0;
  constructor(private gameService:GameService,
              public userService:UsermanagementService) { }

  ngOnInit() {
    this.loadGames();
  }

  loadGames(){
    this.gameService.listGame().subscribe(
      (model)=>{
        let result = <Array<GameListModel>> model.result;
        for(let i=0;i<result.length;i++) {
          if (result[i].gameComments.length == 0) {
            result[i].avgScore = 0;
          } else {
            let comm: Array<GameComment> = result[i].gameComments;
            let sum = 0;
            for (let j = 0; j < comm.length; j++) {
              sum+=comm[j].score;
            }
            result[i].avgScore = sum/(comm.length);
          }
        }
        this.elements=result;

      }
    )
  }


  startGame(id) {
    this.gameId=id;
    this.mdbTablePagination.show("");
  }

  showComm(id){
    this.comments=this.elements.find(x => id===x.id).gameComments;
    console.log(this.comments);
    this.modal2.show("");
  }

  filterByGamesDate(){
    this.elements.sort(function (a,b) {
      return a.date < b.date;
    });
  }

  filterByAvgScore(){
    this.elements.sort(function (a,b) {
      return a.avgScore < b.avgScore;
    });
  }



  filterByGamesOnline(){
    this.elements.sort(function (a,b) {
      return a.playingSessions < b.playingSessions;
    });
  }
}
