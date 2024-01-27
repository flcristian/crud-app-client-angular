import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { UpdateProductComponent } from './update-product/update-product.component';
import { HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomDatePipe,
    NewProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RippleModule,
    MessageModule,
    MessagesModule,
    ToastModule
  ],
  providers: [
    MessageService,
    {
       provide:HTTP_INTERCEPTORS,
       useClass:HttpErrorInterceptor,
       multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
