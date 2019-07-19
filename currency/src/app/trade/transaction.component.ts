import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../app.service';
import {Subscription } from 'rxjs';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit , OnDestroy {
    public userData;
    private userProductSubscription: Subscription = new Subscription();
    constructor(private AppService: AppService){
    }
  ngOnInit(){
    
 }
 ngOnDestroy(){
     (this.userProductSubscription)?this.userProductSubscription.unsubscribe():'';
 }  
}
