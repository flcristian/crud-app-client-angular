import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Product} from "../models/product.model";
import {Subscription} from "rxjs";
import {ProductStateService} from "../service/product-state.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
     public productService: ProductsService,
     public productState: ProductStateService,
     private router: Router
  ) { }

  ngOnInit() {
    this.productService.getProducts();
  }

  ngOnDestroy() {
  }

  loadAddNewProduct(){
    this.router.navigate(['/create-product'])
  }
}
