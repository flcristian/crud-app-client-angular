import { Injectable } from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Product} from "../models/product.model";
import {ProductStateService} from "./product-state.service";
import {CreateProductRequest} from "../models/create-product-request.model";
import {UpdateProductRequest} from "../models/update-product-request.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private server = "http://localhost:5026/api/v1/Product";
  constructor(private http: HttpClient, private productState: ProductStateService) { }

  getProducts(): void {
    this.productState.setLoading(true);
    this.http.get<Product[]>(this.server + "/all").pipe(
      catchError(this.handleError)
    ).subscribe({
      next: (products) => {
        setTimeout(() => {
          this.productState.setProducts(products);
          this.productState.setLoading(false);
        }, 500)
      },
      error: (error) => {
        setTimeout(() => {
          this.productState.setError(error);
          this.productState.setLoading(false);
        }, 500)
      }
    });
  }

  createProduct(newProduct: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.server}/create`, newProduct).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(updatedProduct: UpdateProductRequest): Observable<Product>{
    return this.http.put<Product>(`${this.server}/update`, updatedProduct).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(() => `Error code ${error.status} : ${error.error}`);
  }
}
