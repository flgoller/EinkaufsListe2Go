import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingListService } from '../_services/shoppingList.service';
import { ShoppingList } from '../_types/shoppingLists';
import { AlertController, ToastController  } from '@ionic/angular';
import {
    AngularFireList,
    AngularFireDatabase,
} from '@angular/fire/compat/database';
import { MenuController } from '@ionic/angular';
import { userAuthorizationService } from '../_services/userAuthorization.service';
import { UserAuthorization } from '../_types/userAuthorization';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.page.html',
  styleUrls: ['./shopping-lists.page.scss'],
})

export class ShoppingListsPage implements OnInit {
  shoppingLists: Observable<ShoppingList[]>;
  shoppingListsWithPermission: ShoppingList[];
  shoppingListsRef: AngularFireList<ShoppingList>;
  userAuthorization: Observable<UserAuthorization[]>;
  userAuthorizationRef: AngularFireList<UserAuthorization>;
  searchTerm: string;
  notOpenList: boolean;
  constructor(
      private router: Router,
      private shoppingListService: ShoppingListService,
      private userAuthService: userAuthorizationService,
      afDb: AngularFireDatabase,
      private menuCtrl: MenuController,
      private alertCtrl: AlertController,
      private toast: ToastController,
  ) {
      this.shoppingListsRef = afDb.list('/ShoppingList');
      this.shoppingLists = this.shoppingListsRef.valueChanges();
      this.shoppingListService.setShoppingListReference(this.shoppingListsRef);
      this.notOpenList = false;

      this.userAuthorizationRef = afDb.list('/UserAuthorization');
      this.userAuthService.setUserAuthorizationtReference(this.userAuthorizationRef);
  
      // ToDo:
      this.shoppingLists.forEach(async (lists) => { 
        lists.forEach(async (list) => { 
          let listWithPermission = await this.userAuthService.getListWithPermission(list);
          this.shoppingListsWithPermission.push(listWithPermission); //ToDo: Wird vor Zeile 49 ausgeführ + push() funktioniert nicht
      });    
    });    
}

  openShoppingList(list: ShoppingList)
  {
    if(this.notOpenList == false)
    {
      this.shoppingListService.setShoppingList(list);
      this.router.navigateByUrl('/shopping-list');
    }

    this.notOpenList = false;
  }

  ionViewWillEnter() {
      this.menuCtrl.enable(true);
  }

  addUser(shoppingList: ShoppingList)
  {
    this.notOpenList = true;
    this.shoppingListService.deleteShoppingList(shoppingList);
  }

  deleteShoppingList(shoppingList: ShoppingList)
  {
    this.notOpenList = true;
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
            if(data.Name.length > 2)
            {
              let newShoppingList = new ShoppingList(data.Name);
              this.shoppingListService.saveShoppingList(newShoppingList);
            }
            else
            {
              this.toast
                .create({
                    message: `Der Name muss mindestens 3 Zeichen lang sein.`,
                    color: 'warning',
                    duration: 5000,
                })
                .then((toast) => toast.present());
            this.router.navigateByUrl('/login');
            }
           
        }
      }
      ]
    });
    (await alert).present();
  }

  ngOnInit() {}
}
