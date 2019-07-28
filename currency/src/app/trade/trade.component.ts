import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpResponse } from '@angular/common/http';
import { Response } from '../interfaces/interfaces';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit, OnDestroy {
  allProducts: Observable<any>;
  userProducts: Array<String> = [];
  userData: HttpResponse<Response>;
  subscriptions: Subscription =  new Subscription();
  constructor(public appService: AppService, public router: Router, public matDialog: MatDialog) {
   }
  ngOnInit() {
   const subscribtion =  this.appService.getUserInfo().subscribe((res: HttpResponse<Response>) => {
      if (res.status['code'] === 200 && res['data']) {
         this.userData = res['data'];

      }
    });
    (subscribtion)?this.subscriptions.add(subscribtion) : '';
  }
  navigateToTransactions() {
    console.log(this.userData,'minnnnn' );
    if (this.userData['isadmin'] === false) {
    this.router.navigate(['trade/transactions']);
    }else{
    this.appService.openSnackBar('Admin is not allowed to post a trade');
  }
  }

  ngOnDestroy() {
    (this.subscriptions) ? this.subscriptions.unsubscribe() : '' ;
  }
}
