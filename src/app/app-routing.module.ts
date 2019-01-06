import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/users/login/login.component";
import {MasterComponent} from "./core/navbar/master/master.component";
import {SignUpComponent} from "./modules/users/sign-up/sign-up.component";

const routes: Routes = [
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
