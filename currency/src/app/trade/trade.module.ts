import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade.component';
import { TradeRoutingModule } from './trade-routing.module';
import { MaterialModule } from '../material/material.module';
import { TransactionComponent } from './transaction.component';
import { DialogComponent } from '../dialog/dialog.component';



@NgModule({
  imports: [
    CommonModule,
    TradeRoutingModule,
    MaterialModule
  ],
  declarations: [TradeComponent, DialogComponent, TransactionComponent],
  entryComponents: [DialogComponent]
})
export class TradeModule { }
