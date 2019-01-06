import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {


    const idToken = localStorage.getItem("token");
    if(req.url == environment.gameURL+':'+environment.gamePort+'/user/signup'||
      req.url == environment.gameURL+':'+environment.gamePort+'user/login'){
      return next.handle(req);

    }
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set("Authorization",idToken)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
