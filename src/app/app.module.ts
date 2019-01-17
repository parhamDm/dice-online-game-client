import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterComponent } from './core/navbar/master/master.component';
import { LoginComponent } from './modules/users/login/login.component';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {FormsModule} from "@angular/forms";
import { SignUpComponent } from './modules/users/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./core/interceptors/jwt.interceptor";
import { ProfileUpdateComponent } from './modules/users/profile-update/profile-update.component';
import { UserPageComponent } from './modules/users/user-page/user-page.component';
import { WaitingForPlayerComponent } from './modules/game/waiting-for-player/waiting-for-player.component';
import { GamePageComponent } from './modules/game/game-page/game-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    LoginComponent,
    SignUpComponent,
    ProfileUpdateComponent,
    UserPageComponent,
    WaitingForPlayerComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
