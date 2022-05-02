import { Injectable } from '@angular/core';
import { ShoppingList } from '../_types/shoppingLists';

@Injectable({
    providedIn: 'root',
})
export class ShoppingListService {
    currentshoppingList: ShoppingList;

    constructor() {}

    setShoppingList(shoppingList: ShoppingList) {
        console.log(shoppingList.Name + " wird geöffnet");
        this.currentshoppingList = shoppingList;
    }

    getShoppingList(): ShoppingList {
        return this.currentshoppingList;
    }
}
