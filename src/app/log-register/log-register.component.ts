import { Component } from '@angular/core';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LogregService } from '../services/logreg.service';

@Component({
  selector: 'app-log-register',
  templateUrl: './log-register.component.html',
  styleUrls: ['./log-register.component.scss']
})
export class LogRegisterComponent {

  registerForm:FormGroup;
  loginForm:FormGroup;
  showWarning:boolean;

  constructor(private fb:FormBuilder, private logreg:LogregService, private route:Router){

    this.registerForm = this.fb.group({
      name:['',Validators.required],
      username:['',Validators.required],
      user_image:['no_image.png',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required],
      passrepeat:['',Validators.required]
    })

    this.loginForm = this.fb.group({
      eou:['',Validators.required],
      password:['',Validators.required]
    })
    this.showWarning = false;

  }

  sendLogin():void{

    if(this.loginForm.invalid){
      return;
    }

    this.logreg.loginFake(this.loginForm).subscribe(result=>{

      if(result){

        this.route.navigate(['/token'],{queryParams:{login:true}});
      }else{
        this.showWarning = true;
      }
    })



  }

  sendRegister():void{

    if(this.registerForm.invalid){
      return;
    }

    this.logreg.registerFake(this.registerForm).subscribe(res=>{

      if(res){
        this.route.navigate(['/token'],{queryParams:{register:true}});
      }
    })

  }

  checkSign():boolean{
    return this.registerForm.invalid || this.registerForm.get('password')?.value !== this.registerForm.get('passrepeat')?.value

  }

}
