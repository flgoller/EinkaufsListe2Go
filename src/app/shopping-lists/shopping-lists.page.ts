import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingListService } from '../_services/shoppingList.service';
import { ShoppingList } from '../_types/shoppingLists';
import {
    AngularFireList,
    AngularFireDatabase,
} from '@angular/fire/compat/database';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})

export class ShoppingListsPage implements OnInit {
  shoppingLists: Observable<ShoppingList[]>;
  shoppingListsRef: AngularFireList<ShoppingList>;
  searchTerm: string;
  constructor(
      private router: Router,
      private shoppingListService: ShoppingListService,
      afDb: AngularFireDatabase,
      private menuCtrl: MenuController,
  ) {
      this.shoppingListsRef = afDb.list('/ShoppingList');
      this.shoppingLists = this.shoppingListsRef.valueChanges();
  }

  openShoppingList(list: ShoppingList)
  {
      this.shoppingListService.setShoppingList(list);
      this.router.navigateByUrl('/shopping-list');
  }

  ionViewWillEnter() {
      this.menuCtrl.enable(true);
  }



  ngOnInit() {}
}
