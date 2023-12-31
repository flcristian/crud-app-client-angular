import { Injectable } from '@angular/core';
import {catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Product} from "../models/product.model";
import {ProductStateService} from "./product-state.service";
import {CreateProductRequest} from "../models/create-product-request.model";

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
    return this.http.post<CreateProductRequest>(`${this.server}/create`, newProduct).pipe(
      catchError(this.handleError),
      tap(product => {
        this.productState.addProductToState(product);
      })
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = `A client error occurred - ${error.error.message}`;
    } else {
      if (error.error.reason) {
        errorMessage = `${error.error.reason} - Error code ${error.status}`;
      } else {
        errorMessage = `An error occurred - Error code ${error.status}`;
      }
    }
    return throwError(()=>errorMessage);
  }
}
