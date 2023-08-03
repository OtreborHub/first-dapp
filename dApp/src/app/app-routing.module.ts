import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { NFTComponent } from './components/nft/nft.component';
import { SigninComponent } from './components/signin/signin.component';
import { TokenComponent } from './components/token/token.component';
import { TransferComponent } from './components/transfer/transfer.component';

const routes: Routes = [
  {path:'', component:SigninComponent},
  {path:'home', component:HomeComponent},
  {path:'list', component: ListComponent},
  {path:'transfer', component: TransferComponent},
  {path:'mint', component: TokenComponent},
  {path:'nft', component: NFTComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
