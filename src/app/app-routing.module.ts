import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/users/login/login.component";
import {MasterComponent} from "./core/navbar/master/master.component";
import {SignUpComponent} from "./modules/users/sign-up/sign-up.component";
import {ProfileUpdateComponent} from "./modules/users/profile-update/profile-update.component";
import {UserPageComponent} from "./modules/users/user-page/user-page.component";
import {WaitingForPlayerComponent} from "./modules/game/waiting-for-player/waiting-for-player.component";
import {GamePageComponent} from "./modules/game/game-page/game-page.component";
import {GameCommentsComponent} from "./modules/admin/game-comments/game-comments.component";
import {IsAdminGuard} from "./core/guards/is-admin.guard";
import {UserCommentsComponent} from "./modules/admin/user-comments/user-comments.component";
import {CreateComponent} from "./modules/game/create/create.component";
import {GameListComponent} from "./modules/game/game-list/game-list.component";

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
      {
        path: 'gameCommentApprove',
        component: GameCommentsComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'userCommentApprove',
        component: UserCommentsComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: 'createGame',
        component: CreateComponent,
      },
      {
        path: 'listGame',
        component: GameListComponent,
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
