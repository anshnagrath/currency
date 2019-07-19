import { Component, Input, OnDestroy } from '@angular/core';
import {  FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AppService } from '../app.service';
import {Router,ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Response } from '../interfaces/interfaces';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnDestroy {
  subscriptions: Subscription = new Subscription();
  username:String;
  loginForm : FormGroup;
  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private activateRoutes: ActivatedRoute) {
   this.loginForm  = this.fb.group({
    username: ['', [ Validators.required,Validators.minLength(1),Validators.maxLength(1) ]],
 });
  }
  loginMeIn(){
    const login = this.appService.login({ 'username': this.username }).subscribe((res: HttpResponse<Response>) => {
      if (res.status['code'] === 200){
        this.appService.openSnackBar('Login Sucessfull', 'sucess');
        this.router.navigate(['trade']) 
      }else{
        this.appService.openSnackBar('User not found', 'error');
      }
    });
    this.subscriptions.add(login)
  }
  ngOnDestroy() {
    (this.subscriptions) ? this.subscriptions.unsubscribe() : '';
  }
}