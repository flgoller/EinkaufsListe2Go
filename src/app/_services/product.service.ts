import { Injectable } from '@angular/core';
import { Product } from '../_types/product';
import {
    AngularFireList,
    AngularFireDatabase,
  } from '@angular/fire/compat/database';
import { StorageService } from '../_services/storage.service'

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    currentProduct: Product;
    productReference:AngularFireList<Product>;
    constructor(public storageService: StorageService) {}

    setProduct(product: Product) {
        console.log(product.Name + " wird geöffnet");
        this.currentProduct = product;
    }

    setProductReference(productRef: AngularFireList<Product>)
    {
        this.productReference = productRef;
    }

    getProduct(): Product {
        return this.currentProduct;
    }

    deleteProduct(product: Product)
    {
        this.productReference.remove(product.ID.toString());
    }

    updateProduct(product: Product)
    {
        this.productReference.update(product.ID.toString(), product);
    }

    async saveProduct(product: Product)
    {
        product.CreatedBy = await this.storageService.get('currentUserID');
        product.CreatedOn = new Date().toISOString();
        let key = this.productReference.push(product);
        product.ID = key.key;
        this.productReference.update(key, product);
    }
}
