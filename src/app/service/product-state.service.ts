import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductStateService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);
  products$: Observable<Product[]> = this.productsSubject.asObservable();
  loading$: Observable<boolean> = this.loadingSubject.asObservable();
  error$: Observable<string | null> = this.errorSubject.asObservable();

  constructor() { }

  setProducts(products: Product[]) {
    this.productsSubject.next(products);
  }

  addProduct(newProduct: Product) {
    this.productsSubject.next([...this.productsSubject.value, newProduct]);
  }

  updateProduct(product: Product){
    let products: Product[] = this.productsSubject.value;
    let newProducts: Product[] = []

    products.forEach(p => {
      if(p.id != product.id) newProducts.push(p)
      else newProducts.push(product)
    })

    this.productsSubject.next(newProducts)
  }

  deleteProduct(product: Product){
    let products: Product[] = this.productsSubject.value;
    let newProducts: Product[] = []

    products.forEach(p => {
      if(p.id != product.id) newProducts.push(p)
    })

    this.productsSubject.next(newProducts)
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null) {
    this.errorSubject.next(error);
  }
}
