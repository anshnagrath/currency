import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AppService } from '../app.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  loggedIn :Boolean;
  constructor(private router: Router, private appService: AppService) {

   }
  onLoginAndSignUp(type) {

  }
  showUserItems(){
   
  }
  logout(){

  }

}
