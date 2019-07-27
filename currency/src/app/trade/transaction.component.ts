import { Component, OnInit, OnDestroy, ViewEncapsulation  } from '@angular/core';
import { AppService } from '../app.service';
import {Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Response } from '../interfaces/interfaces';
@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css'],
    encapsulation: ViewEncapsulation.None

})
export class TransactionComponent implements   OnDestroy {
    public userData;
    public transactionMode:String;
    public selectedOption = '1';
    public transactionAmount: Number;
    public currencyType;
    public allTransactions;
    public allUserTransactions;
    private userProductSubscription: Subscription = new Subscription();
    constructor(private AppService: AppService){
    }

    changeSelection(value) {
        this.transactionMode = value;
        if (this.transactionMode === 'sell') {
         this.getUserTransactions();
        } else if (this.transactionMode === 'buy') {
            this.getAllTransactions();
        }
    }
    getAllTransactions(){
      const transactions =  this.AppService.getAllTransactions().subscribe((res: HttpResponse<Response>) => {
             if (res['status']['code'] === 200) {
                 this.allUserTransactions =  res['data'];
             }
        });
        (transactions)?this.userProductSubscription.add(transactions) : '';
    }
    deleteTransaction(id) {
        const deleteTransaction = this.AppService.deleteTransaction(id).subscribe((res: HttpResponse<Response>) => {
       if (res['status']['code'] === 200) {
        this.getUserTransactions();
        this.AppService.openSnackBar('Transaction reversed');
       } else if (res['status']['code'] === 407) {
           this.AppService.openSnackBar('Transaction not completed please try after sometime')
       }
    });
        (deleteTransaction) ? this.userProductSubscription.add(deleteTransaction) : '';
    }
    currencyBought(event) {
    this.currencyType = event;
    this.selectedOption = event;
    }
    getUserTransactions(){
       const transactions = this.AppService.getUserTransactions().subscribe((res: HttpResponse<Response>) => {
            if (res.status['code'] === 200) {
                this.allTransactions = res['data'];
            }
        });
        (transactions) ? this.userProductSubscription.add(transactions) : '';
    }
    buytrade(transaction) {
    const obj = {
     'userId' : localStorage.getItem('id'),
     'type' : 'buy',
     'transactionAmount': transaction.currencySpent.amount ,
     'currencyBought': transaction.currencySpent.currenyName
    };
    const transact = this.AppService.transact(obj).then((res: HttpResponse<Response>) => {
        if (res.status['code'] === 200) {
            this.AppService.openSnackBar('Transaction Pending please wait for ammount will be credited to your account', 'sucess');
        } else {
            this.AppService.openSnackBar('Error while adding trade', 'error');
        }
    });
 
    }
    createTrade() {
      const obj = {};
      obj['userId'] = localStorage.getItem('id');
      obj['transactionAmount'] = this.transactionAmount;
      obj['type'] = this.transactionMode;
        obj['currencySold'] = this.currencyType;
      this.AppService.transact(obj).then((res: HttpResponse<Response>)=>{
          if (res.status['code'] === 200) {
            this.AppService.openSnackBar('Trade Added sucessfully', 'sucess' );
          } else {
              this.AppService.openSnackBar('Error while adding trade', 'error');
          }
      }).then(()  => {
          this.getUserTransactions();
      });
    }
 ngOnDestroy(){
     (this.userProductSubscription) ? this.userProductSubscription.unsubscribe() : '';
 }  
}
