import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {
   baseUrl="http://localhost:3000/";
  constructor(private http: HttpClient, private router:Router ,private snackbar: MatSnackBar,public jwtHelper: JwtHelperService) {}
    loginStatus = new BehaviorSubject(true);
    isLoggedIn = new BehaviorSubject('false');
    backbutton:Boolean = false;

    public isAuthenticated(): boolean {
    const token = localStorage.getItem('x-access-token');
    return !this.jwtHelper.isTokenExpired(token);
  }
   login(loginObject) {
    return this.http.post(`${this.baseUrl}login`, loginObject);
   }
  openSnackBar(message: any, action: any) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top', 
      horizontalPosition: 'end'

    });
  }
  setBackButton(state: Boolean) {
    if (this.router.url !== '/product/item') {
      this.backbutton  = state;
    }
  }
  getBackButtonStatus(): Boolean {
    return this.backbutton;
  }
 

}
