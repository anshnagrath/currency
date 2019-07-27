
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = environment.baseurl;
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
   getUserInfo(){
    const userId = localStorage.getItem('id');
     return this.http.get(`${this.baseUrl}getUserDetails/${userId}`);
   }
  openSnackBar(message: string, action?: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top', 
      horizontalPosition: 'end'

    });
  }
  transact(obj) {
    return this.http.post(`${this.baseUrl}transact`, obj).toPromise();
  }
  setBackButton(state: Boolean) {
    if (this.router.url !== '/product/item') {
      this.backbutton  = state;
    }
  }
  getUserTransactions () {
   const id = localStorage.getItem('id');
    return this.http.get(`${this.baseUrl}gettransaction/${id}`);
  }
  getAllTransactions() {
    return this.http.get(`${this.baseUrl}getAllTransactions/`);
  }
  getBackButtonStatus(): Boolean {
    return this.backbutton;
  }
 deleteTransaction(id) {
   return this.http.delete(`${this.baseUrl}removetransaction/${id}`)
}

}
