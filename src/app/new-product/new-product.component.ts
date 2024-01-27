import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../service/products.service";
import {ProductStateService} from "../service/product-state.service";
import {CreateProductRequest} from "../models/create-product-request.model";
import {Router} from "@angular/router";
import {Product} from "../models/product.model";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]),
    price: new FormControl(0, [
      Validators.required,
      this.priceValidator
    ]),
    dateOfFabrication: new FormControl(new Date(), [
      Validators.required,
      this.dateValidator
    ])
  });

  constructor(
    public productService: ProductsService,
    public productState: ProductStateService,
    private router: Router
  ) { }

  onSubmit() {
    this.productService.createProduct(this.productForm.value as CreateProductRequest).subscribe({
      next: (product: Product) => {
        this.productState.addProduct(product)
        this.loadHome()
      },
      error: (error) => {
        this.productState.setError(error)
      }
    })
  }

  private priceValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === 0) return { 'required': true};
    return null;
  }

  private dateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === new Date()) return { 'required': true};
    return null;
  }

  loadHome(){
    this.router.navigate(['/home'])
    this.productState.setError(null)
  }
}
