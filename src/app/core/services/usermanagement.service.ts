import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.post("http://localhost:8080/user/login",model).pipe()
  }

  register(model:signUpForm): Observable<any> {
    return this.http.post("api/user/signup",model).pipe()
  }

  uploadpicture(model) {

    let formData = new FormData();
    formData.append("file", model);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/user/uploadPix");

    xhr.onload = function() {
      console.log(xhr.responseText);
      let response = JSON.parse(xhr.responseText);
      if(xhr.status == 200) {

      }
    };

    xhr.send(formData);

  }
}
