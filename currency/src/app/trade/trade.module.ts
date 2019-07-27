import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeComponent } from './trade.component';
import { TradeRoutingModule } from './trade-routing.module';
import { MaterialModule } from '../material/material.module';
import { TransactionComponent } from './transaction.component';
import { DialogComponent } from '../dialog/dialog.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    TradeRoutingModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [TradeComponent, DialogComponent, TransactionComponent],
  entryComponents: [DialogComponent]
})
export class TradeModule { }
