import { Component, OnInit } from '@angular/core';
import {GameForm} from "../../../core/models/GameForm";
import {GameService} from "../../../core/services/game.service";
import {ResponseBean} from "../../../core/models/ResponseBean.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  model =new GameForm();
  constructor(private gameService:GameService) { }

  ngOnInit() {
  }

  performLogin(form){

    console.log(form.value);
    if(form.invalid){
      return;
    }
    let num=this.model.currentZeroMaker;

    let myArray = num.split(",");
    for(let i=0; i<myArray.length; i++) { myArray[i] = +myArray[i]; }
    this.model.currentZeroMaker = myArray;

    this.gameService.addGame(this.model).subscribe(
      (model:ResponseBean)=>{
        alert("added")
      }
    )


  }

}
