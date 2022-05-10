import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../_services/shoppingList.service';
import { ProductService } from '../_services/product.service';
import { Product } from '../_types/product';
import { ShoppingList } from '../_types/shoppingLists';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AngularFireList,
  AngularFireDatabase,
} from '@angular/fire/compat/database';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {

  shoppingList: ShoppingList;
  Products: Observable<Product[]>;
  productRef: AngularFireList<Product>;
  deleteProcess: boolean;
  constructor(
    private shoppingListService: ShoppingListService,
    private productService: ProductService,
    private router: Router,
    public afDb: AngularFireDatabase,) {
      this.shoppingList = this.shoppingListService.getShoppingList();

      this.productRef = afDb.list('/ShoppingList/' + this.shoppingList.ID + '/Products');
      this.Products = this.productRef.valueChanges();

      this.productService.setProductReference(this.productRef);
      this.deleteProcess = false;
  }
  ngOnInit() {
  }

  openProduct(product: Product)
  {
    if(this.deleteProcess == false)
    {
      this.productService.setProduct(product);
      this.router.navigateByUrl('/product');
    }
    this.deleteProcess = false;
      
  }

  deleteProduct(product: Product)
  {
    this.deleteProcess = true;
    this.productService.deleteProduct(product);
  }

  newProduct()
  {
    let newProduct = new Product('0', 0, 'Mittel', '', '', '', '', '');

    this.productService.setProduct(newProduct)
    this.router.navigateByUrl('/product');
  }

}
