import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductsService} from "../service/products.service";
import {ProductStateService} from "../service/product-state.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UpdateProductRequest} from "../models/update-product-request.model";

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
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
  private userId: number = -1;

  constructor(
    public productService: ProductsService,
    public productState: ProductStateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      this.userId = params['id'];
    });
  }

  onSubmit() {
    let request = this.productForm.value as UpdateProductRequest;
    request.id = this.userId;
    console.log(request)
    this.productService.updateProduct(request).subscribe(
      {
        next:(data)=>{

        },
        error:(err)=>{
          this.productState.setError(err);
        }
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

  loadHome(){
    this.router.navigate(['/home'])
    this.productState.setError(null)
  }
}
