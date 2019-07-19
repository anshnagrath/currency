import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit, OnDestroy {
  allProducts: Observable<any>;
  userProducts: Array<String> = [];
  subscriptions: Array<Subscription> = [ ];
  constructor(public appService: AppService, public router: Router, public matDialog: MatDialog) {
   
   }

  ngOnInit() {

  }

  ngOnDestroy(){
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
