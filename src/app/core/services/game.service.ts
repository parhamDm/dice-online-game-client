import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(    private http: HttpClient,
                  private httpService: HttpService) {

  }

  getRequestStatus(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.requestStatus);
    return this.http.get(existsRequestUri).pipe()
  }

  RequestPlay(gameId): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.requestPlay+"?gameId="+gameId);
    return this.http.get(existsRequestUri).pipe()
  }

  getGame(gameId): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.get+"?gameId="+gameId);
    return this.http.get(existsRequestUri).pipe()
  }

  rollDice(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.dice);
    let object = {
      gameToken : localStorage.getItem("gameToken")
    };
    return this.http.post(existsRequestUri,object).pipe()
  }

  getGameStatus(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.status);
    let object = {
      gameToken : localStorage.getItem("gameToken")
    };
    return this.http.post(existsRequestUri,object).pipe()
  }

  hold(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.hold);
    let object = {
      gameToken : localStorage.getItem("gameToken")
    };
    return this.http.post(existsRequestUri,object).pipe()
  }


  addGame(model:any): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.create);
    return this.http.post(existsRequestUri,model).pipe()
  }

  listGame(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.game.list);
    return this.http.get(existsRequestUri).pipe()
  }
}
