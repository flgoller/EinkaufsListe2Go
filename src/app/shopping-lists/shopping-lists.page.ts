import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingListService } from '../_services/shoppingList.service';
import { ShoppingList } from '../_types/shoppingLists';
import { AlertController } from '@ionic/angular';
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
  deleteProcess: boolean;
  constructor(
      private router: Router,
      private shoppingListService: ShoppingListService,
      afDb: AngularFireDatabase,
      private menuCtrl: MenuController,
      private alertCtrl: AlertController
  ) {
      this.shoppingListsRef = afDb.list('/ShoppingList');
      this.shoppingLists = this.shoppingListsRef.valueChanges();
      this.shoppingListService.setShoppingListReference(this.shoppingListsRef);
      this.deleteProcess = false;
  }

  openShoppingList(list: ShoppingList)
  {
    if(this.deleteProcess == false)
    {
      this.shoppingListService.setShoppingList(list);
      this.router.navigateByUrl('/shopping-list');
    }

    this.deleteProcess = false;
  }

  ionViewWillEnter() {
      this.menuCtrl.enable(true);
  }

  deleteShoppingList(shoppingList: ShoppingList)
  {
    this.deleteProcess = true;
    this.shoppingListService.deleteShoppingList(shoppingList);
  }

  async shoppingListprompt() {
    let alert = this.alertCtrl.create({
      header: 'Neue Einkaufsliste',
      inputs: [
        {
          name: 'Name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Speichern',
          handler: data => {
            let newShoppingList = new ShoppingList(data.Name);
            this.shoppingListService.saveShoppingList(newShoppingList);
        }
      }
      ]
    });
    (await alert).present();
  }

  ngOnInit() {}
}
