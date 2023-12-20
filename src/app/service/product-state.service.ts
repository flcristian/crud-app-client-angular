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

  addProductToState(newProduct: Product) {
    this.productsSubject.next([...this.productsSubject.value, newProduct]);
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setError(error: string | null) {
    this.errorSubject.next(error);
  }
}
