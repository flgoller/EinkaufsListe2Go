import { Injectable } from '@angular/core';
import { ShoppingList } from '../_types/shoppingLists';
import {
    AngularFireList,
    AngularFireDatabase,
  } from '@angular/fire/compat/database';
import { StorageService } from '../_services/storage.service'

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    currentshoppingList: ShoppingList;
    shoppingListReference:AngularFireList<ShoppingList>;
    constructor(public storageService: StorageService) {}

    setShoppingList(shoppingList: ShoppingList) {
        console.log(shoppingList.Name + " wird geöffnet");
        this.currentshoppingList = shoppingList;
    }

    setShoppingListReference(shoppingListRef: AngularFireList<ShoppingList>)
    {
        this.shoppingListReference = shoppingListRef;
    }

    getShoppingList(): ShoppingList {
        return this.currentshoppingList;
    }

    deleteShoppingList(shoppingList: ShoppingList)
    {
        this.shoppingListReference.remove(shoppingList.ID.toString());
    }

    updateShoppingList(shoppingList: ShoppingList)
    {
        this.shoppingListReference.update(shoppingList.ID.toString(), shoppingList);
    }

    saveShoppingList(shoppingList: ShoppingList)
    {
        shoppingList.CreatedBy = this.storageService.get('currentUserID').toString(); // ToDo
        console.log(this.storageService.get('currentUserID'));
        shoppingList.CreatedOn = new Date().toISOString();
        shoppingList.ChangedOn = shoppingList.CreatedOn;
        let key = this.shoppingListReference.push(shoppingList);
        shoppingList.ID = key.key;
        this.shoppingListReference.update(key, shoppingList);
    }
}
