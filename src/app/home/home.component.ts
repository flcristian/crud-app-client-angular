import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
import {Product} from "../models/product.model";
import {Subscription} from "rxjs";
import {ProductStateService} from "../service/product-state.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  items: Product[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  private subscriptions: Subscription[] = [];
  constructor(
    private productService: ProductsService,
    private productState: ProductStateService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.productState.products$.subscribe(products => {
        this.items = products;
      }),
      this.productState.loading$.subscribe(loading => {
        this.isLoading = loading;
      }),
      this.productState.error$.subscribe(error => {
        this.error = error;
      })
    );``


    this.productService.getProducts();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
