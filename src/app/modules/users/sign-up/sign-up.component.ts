import { Component, OnInit } from '@angular/core';
import {signUpForm} from "../../../core/models/signUpForm";
import {UsermanagementService} from "../../../core/services/usermanagement.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  model:signUpForm=new signUpForm;
  filename:string="فایل انتخاب کنید";
  error: string='';
  profilePic;
  fileEvent(fileInput: Event){
    this.profilePic = fileInput.target["files"][0];
    console.log(this.profilePic);
    this.filename = this.profilePic.name;
  }

  constructor(private userService :UsermanagementService
              ,private router :Router) { }

  ngOnInit() {
  }

  performSignUp(form){
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }
    if(form.invalid){
      return;
    }
    console.log(form.value);
    if(this.model.password!=this.model.repeatPassword)
    {
      this.error="پسوورد و تکرار آن مطابقت ندارد";
      return;
    }
    this.userService.register(this.model).subscribe(model=>{

      if(model.token==="INVALID"){
        this.error=model.errorMsg;
      }else {
        //valid
        localStorage.setItem("token","Bearer "+ model.token);
        localStorage.setItem("role",model.role);
        this.router.navigateByUrl('/home');
      }
      console.log(model)
    });

  }

}
