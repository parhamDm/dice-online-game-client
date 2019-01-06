import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HttpService} from "./http.service";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";
import {LoginForm} from "../models/loginForm.model";
import {signUpForm} from "../models/signUpForm";

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(    private http: HttpClient,
                  private httpService: HttpService) {

  }

  login(model:LoginForm): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator('/user/login');
    console.log(existsRequestUri+''+model.username);
    return this.http.post("http://localhost:8080/user/login",model).pipe()
  }

  register(model:signUpForm): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator('/user/login');
    return this.http.post("http://localhost:8080/user/signup",model).pipe()
  }

}
