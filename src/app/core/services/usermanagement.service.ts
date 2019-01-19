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

  uploadpicture(model,src) {

    let formData = new FormData();
    formData.append("file", model);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "api/user/uploadPix");
    xhr.setRequestHeader("Authorization" ,localStorage.getItem("token"));

    xhr.onload = function() {
      console.log(xhr.responseText);
      if(xhr.status == 200) {
        src = "/api"+environment.user.getPix+"/"+localStorage.getItem("username")+"?"+ new Date().getTime();      }
    };

    xhr.send(formData);
    return xhr;
  }

  updateProfile(model:signUpForm): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.user.updateProfile);

    return this.http.post(existsRequestUri,model).pipe()
  }

  getInfo(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.user.getInfo);
    return this.http.get(existsRequestUri).pipe()
  }

  getPicture(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.user.getInfo);
    return this.http.get(existsRequestUri).pipe()
  }

  getUserlist(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.user.list);
    return this.http.get(existsRequestUri).pipe()
  }
  getGameUnapprovedCommentsList(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.comment.unApprovedComments);
    return this.http.get(existsRequestUri).pipe()
  }

  getGameCommentsList(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.comment.approvedGameComments);
    return this.http.get(existsRequestUri).pipe()
  }

  changeStatusGame(commentId, status): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.comment.changeStatusGame+
      "?commentId="+commentId+"&status="+status);
    return this.http.get(existsRequestUri).pipe()
  }


  getUserUnapprovedCommentsList(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.comment.unApprovedUserComment);
    return this.http.get(existsRequestUri).pipe()
  }

  getUserCommentsList(): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.comment.approvedUserComments);
    return this.http.get(existsRequestUri).pipe()
  }

  changeStatusUser(commentId, status): Observable<any> {
    const existsRequestUri = this.httpService.uriCreator(environment.comment.changeStatusUser+
      "?commentId="+commentId+"&status="+status);
    return this.http.get(existsRequestUri).pipe()
  }

}
