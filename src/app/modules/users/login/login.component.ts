import {Component, NgModule, OnInit,} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {LoginForm} from "../../../core/models/loginForm.model";
import {UsermanagementService} from "../../../core/services/usermanagement.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:LoginForm=new LoginForm;
  error:string='';
  constructor(private userService :UsermanagementService
  ,private router:Router) { }

  ngOnInit() {

  }

  performLogin(form){

    console.log(form.value);
    if(form.invalid){
      return;
    }
    this.userService.login(this.model).subscribe(model=>{
      if(model.token==="INVALID"){
        this.error=model.errorMsg;
      }else {
        //valid
        localStorage.setItem("token","Bearer "+ model.token);
        localStorage.setItem("role",model.role);
        localStorage.setItem("username",model.username);
        this.router.navigateByUrl('/');
      }
      console.log(model)    })
    // alert("The form was submitted");
    // form.reset();
  }

}
