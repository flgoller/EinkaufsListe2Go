import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_types/product';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from '../_types/user';
@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product: Product;
  public productForm: FormGroup;
  isNew: boolean;
  constructor(
    private productService: ProductService,
    public router: Router,
    private authService: AuthService,
    private menuCtrl: MenuController) {
      this.product = this.productService.getProduct();
      if(this.product.CreatedOn == "")
      {
        this.isNew = true;
      }
      this.productForm = new FormGroup({
        name: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        amount: new FormControl('', Validators.required),
        priority: new FormControl('', Validators.required),
        notes: new FormControl(''),
    });
  }


  ionViewWillEnter() {
    this.menuCtrl.enable(false);
}

async save() {
    if (this.productForm.valid) 
    {
      if(!this.isNew)
      {
        this.productService.updateProduct(this.product);
      }
      else
      {
        this.isNew = false;
        this.productService.saveProduct(this.product);
      }
      this.productForm.reset();
      this.router.navigateByUrl('/shopping-list');
    }
}

ngOnInit() {}
}
