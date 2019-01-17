import { Component, OnInit } from '@angular/core';
import {GameService} from "../../../core/services/game.service";
import {ResponseBean} from "../../../core/models/ResponseBean.model";
import {Observable, Subscription} from "rxjs/Rx";
import {interval} from "rxjs/index";
import {Router} from "@angular/router";

@Component({
  selector: 'app-waiting-for-player',
  templateUrl: './waiting-for-player.component.html',
  styleUrls: ['./waiting-for-player.component.scss']
})
export class WaitingForPlayerComponent implements OnInit {
  isFinding:boolean= false;

  gameId:number= 1;

  subscription: Subscription;

  constructor(private gamseService:GameService,
              private router :Router) {



  }

  ngOnInit() {
    // let exampleSocket = new SockJS("http://localhost:4200/api/ws","rest");
    // exampleSocket.onmessage = function(event) {
    //   console.log(event)
    // }


    const source = interval(5000);

    this.subscription = source.subscribe(val => {
      console.log("asd");
      if(this.isFinding===false){
        return;
      }

      this.gamseService.getRequestStatus().subscribe(
        (model:ResponseBean)=>{
          if(model.statusCode===0){
            localStorage.setItem("gameToken",model.statusDesc);
            this.isFinding=false;
            //redirect to game
            this.router.navigateByUrl('/game/'+this.gameId);

          }else if(model.statusCode===2){
            this.isFinding=false;

          }
        }
      )
    });
  }

  requestPlay(){
    this.gamseService.RequestPlay(this.gameId).subscribe((model:ResponseBean)=>{
      if(model.statusCode===0){
        this.isFinding = true;
      }
    });
  }

  statuschecker(){

  }

}
