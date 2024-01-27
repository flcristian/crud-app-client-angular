import { Injectable } from '@angular/core';
import {catchError, Observable, Subject, Subscription, tap, throwError} from "rxjs";
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

  getProducts(): Observable<Product[]> {
    this.productState.setLoading(true);
    return this.http.get<Product[]>(this.server + "/all")
  }

  createProduct(newProduct: CreateProductRequest): Observable<Product> {
    return this.http.post<Product>(`${this.server}/create`, newProduct)
  }

  updateProduct(updatedProduct: UpdateProductRequest): Observable<Product> {
    return this.http.put<Product>(`${this.server}/update`, updatedProduct)
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.server}/delete/${id}`)
  }
}
