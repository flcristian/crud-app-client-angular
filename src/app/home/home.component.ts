import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from "../service/products.service";
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
  ) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.productState.setProducts(products);
        this.productState.setLoading(false);
      },
      error: (error) => {
        this.productState.setError(error);
        this.productState.setLoading(false);
      }
    })
  }

  ngOnDestroy() {
  }

  loadAddNewProduct() {
    this.router.navigate(['/create-product'])
  }

  loadUpdateProduct(id: number) {
    this.router.navigate([`/update-product`, id]);
  }
}
