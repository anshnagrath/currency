import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { NotfoundComponent } from './notfound/notfound.component';
import {CanDeactivateGuard} from './navigation-guard.service';


const appRoutes: Routes = [
    { path: 'login', component: SignupComponent, pathMatch: 'full'},
    { path: 'trade', loadChildren: '../app/trade/trade.module#TradeModule', canActivate: [AuthGuard]},
    { path: '' ,redirectTo:'login',pathMatch:'full'},
    { path: '**', component: NotfoundComponent}
  
]


@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }