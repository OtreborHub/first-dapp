import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ListComponent } from './components/list/list.component';
import { NFTCardComponent } from './components/nft/nft-card/nft-card.component';
import { NFTDetailComponent } from './components/nft/nft-detail/nft-detail.component';
import { NFTComponent } from './components/nft/nft.component';
import { ReadComponent } from './components/read/read.component';
import { SigninComponent } from './components/signin/signin.component';
import { TokenComponent } from './components/token/token.component';
import { TransferComponent } from './components/transfer/transfer.component';
import { AccountService } from './services/account.service';
import { ContractService } from './services/contract.service';
import { ResourceService } from './services/resource.service';
import { SectionHeaderComponent } from './components/section-header/section-header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    CreateComponent,
    ReadComponent,
    ListComponent,
    TransferComponent,
    HeaderComponent,
    TokenComponent,
    NFTComponent,
    NFTCardComponent,
    NFTDetailComponent,
    SectionHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ContractService, ResourceService, AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
