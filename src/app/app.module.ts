import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CustomDatePipe } from './pipes/custom-date.pipe';
import { NewProductComponent } from './new-product/new-product.component';
import { CommonModule } from '@angular/common';
import {RippleModule} from "primeng/ripple";
import {MessageModule} from "primeng/message";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomDatePipe,
    NewProductComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RippleModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
