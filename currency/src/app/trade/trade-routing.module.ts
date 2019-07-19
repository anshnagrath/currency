import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { TradeComponent } from './trade.component'
import { CanDeactivateGuard } from '../navigation-guard.service';

const routes: Routes = [

    { path: '', component: TradeComponent, canDeactivate: [CanDeactivateGuard] },
    { path: 'transactions', component: TransactionComponent }
    
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})

export class TradeRoutingModule { }