import { Injectable } from '@angular/core';
import { UserAuthorization } from '../_types/userAuthorization';
import { ShoppingList } from '../_types/shoppingLists';
import {
    AngularFireList,

  } from '@angular/fire/compat/database';
import { StorageService } from '../_services/storage.service'



@Injectable({
    providedIn: 'root',
})
export class userAuthorizationService {
    currentUserAuth: UserAuthorization;
    UserAuthReference:AngularFireList<UserAuthorization>;
    constructor(public storageService: StorageService) {}

    setUserAuthorization(shoppingList: UserAuthorization) {
        this.currentUserAuth = shoppingList;
    }

    setUserAuthorizationtReference(userAuthRef: AngularFireList<UserAuthorization>)
    {
        this.UserAuthReference = userAuthRef;
    }

    async hasUserPerrmission(shoppingList: ShoppingList): Promise<boolean> {
        let userAuthorization = this.UserAuthReference.valueChanges();
        let currentUser = await this.storageService.get('currentUserID');
 
        userAuthorization.forEach(async (userAuth) => { 
            let a = userAuth.filter( x => x.listId == shoppingList.ID);
            userAuth.forEach(async (auth) => { 
               if(auth.userId == currentUser)
               {
                   return true;
               }
            });
        });

        return false;
    }

    async addUser(shoppingList: ShoppingList)
    {
        let userAuthorization = new UserAuthorization();
        userAuthorization.userId = await this.storageService.get('currentUserID').toString(); // ToDo
        userAuthorization.listId = shoppingList.ID;
        let key = this.UserAuthReference.push(userAuthorization);
        userAuthorization.id = key.key;
        this.UserAuthReference.update(key, userAuthorization);
    }
}
