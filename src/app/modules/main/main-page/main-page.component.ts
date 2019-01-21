import { Component, OnInit } from '@angular/core';
import {UsermanagementService} from "../../../core/services/usermanagement.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  elements:any[];
  items:any['kuy'];
  private cars :any=[];

  constructor(private userService:UsermanagementService) { }

  ngOnInit() {
    this.userService.getGamesSlider().subscribe(model=>{
      this.elements=model;
    });
    this.userService.getUsersSlider().subscribe(model=>{
      this.items=model;
    });

  }

}
