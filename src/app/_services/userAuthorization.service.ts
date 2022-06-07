import { Injectable } from '@angular/core';
import { UserAuthorization } from '../_types/userAuthorization';
import { ShoppingList } from '../_types/shoppingLists';
import { AngularFireList } from '@angular/fire/compat/database';
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

    async getListWithPermission(shoppingList: ShoppingList): Promise<ShoppingList> {
        let userAuthorization = this.UserAuthReference.valueChanges();
        let currentUser = await this.storageService.get('currentUserID');
 
        userAuthorization.forEach(async (userAuth) => { 
            let hasPermission = userAuth.find( x => x.listId == shoppingList.ID && x.userId == currentUser);
            if(hasPermission)
            {
                return shoppingList;
            }
        });

        return undefined;
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
