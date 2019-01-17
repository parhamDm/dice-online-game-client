import { Component, OnInit } from '@angular/core';
import {signUpForm} from "../../../core/models/signUpForm";
import {UsermanagementService} from "../../../core/services/usermanagement.service";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  model:signUpForm=new signUpForm;
  filename:string="فایل انتخاب کنید";
  error: string='';
  profilePic;
  profileSrc:string;
  fileEvent(fileInput: Event){
    this.profilePic = fileInput.target["files"][0];
    console.log(this.profilePic);
    this.filename = this.profilePic.name;
  }

  constructor(private userService :UsermanagementService
    ,private router :Router) { }

  ngOnInit() {
    this.userService.getInfo().subscribe(model=>{
      this.model.firstName=model.firstName;
      this.model.lastName=model.firstName;
      this.model.username=model.username;
    });

    this.profileSrc ="/api"+environment.user.getPix+"/"+localStorage.getItem("username")+"?"+ new Date().getTime();

  }


  editProfile(form){
    for (let i in form.controls) {
      form.controls[i].markAsTouched();
    }

    console.log(form.value);
    if((this.model.password) && this.model.password!=this.model.repeatPassword)
    {
      this.error="پسوورد و تکرار آن مطابقت ندارد";
      return;
    }
    if(this.profilePic){
      this.uploadPix();
      return;
    }
    this.model.picture=this.profilePic;
    console.log(this.model.picture);
    this.userService.updateProfile(this.model).subscribe(model=>{

      if(model.token==="INVALID"){
        this.error=model.errorMsg;
      }else {
        //valid
        localStorage.setItem("token","Bearer "+ model.token);
        localStorage.setItem("role",model.role);
        // this.router.navigateByUrl('/');
      }
      console.log(model)
    });

  }

  uploadPix(){
    this.userService.uploadpicture(this.profilePic,function () {
      this.profileSrc ="/api"+environment.user.getPix+"/"+localStorage.getItem("username")+"?"+ new Date().getTime();
    })
  }
}
