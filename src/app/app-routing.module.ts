import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/users/login/login.component";
import {MasterComponent} from "./core/navbar/master/master.component";
import {SignUpComponent} from "./modules/users/sign-up/sign-up.component";
import {ProfileUpdateComponent} from "./modules/users/profile-update/profile-update.component";
import {UserPageComponent} from "./modules/users/user-page/user-page.component";
import {WaitingForPlayerComponent} from "./modules/game/waiting-for-player/waiting-for-player.component";
import {GamePageComponent} from "./modules/game/game-page/game-page.component";

const routes: Routes = [
  {
    path: 'game/:gameId',
    component: GamePageComponent,
  },
  {

    path: '', component: MasterComponent /*,canActivate: [AuthGuard]*/,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signUp',
        component: SignUpComponent,
      },
      {
        path: 'profile',
        component: ProfileUpdateComponent,
      },
      {
        path: 'users',
        component: UserPageComponent,
      },
      {
        path: 'waitForGame',
        component: WaitingForPlayerComponent,
      },

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
