import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  public uriCreator(requestedUri: string): string {
    return '/api' + requestedUri;
  }

  public getHeader()  {
    let headers_object = new HttpHeaders();
    headers_object.append("Authorization", localStorage.getItem("token"));

    return  {
      headers: headers_object
    };
  }

}
