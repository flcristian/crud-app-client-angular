import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../service/products.service";
import {ProductStateService} from "../service/product-state.service";
import {CreateProductRequest} from "../models/create-product-request.model";

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
    private productService: ProductsService,
    private productState: ProductStateService
  ) { }

  onSubmit() {
    this.productService.createProduct(this.productForm.value as CreateProductRequest).subscribe(data=>{
        console.log(data);
      }
    )
  }

  private priceValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === 0) return { 'required': true};
    return null;
  }

  private dateValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value === new Date()) return { 'required': true};
    return null;
  }
}
