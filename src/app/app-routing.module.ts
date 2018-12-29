import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./modules/users/login/login.component";
import {MasterComponent} from "./core/navbar/master/master.component";

const routes: Routes = [
  {
    path: '', component: MasterComponent /*,canActivate: [AuthGuard]*/,
    children: [
      {
        path: 'login',
        component: LoginComponent,
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
