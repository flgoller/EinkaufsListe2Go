import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './_services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  emailCurrentUser: string;

  constructor(private platform: Platform, 
      private storageService: StorageService) {
          this.getEmailFromCurrentUser();
          this.initializeApp();
  }

  initializeApp() {
      this.platform.ready().then(() => {});
  }

  async getEmailFromCurrentUser()
  {
      this.emailCurrentUser = await this.storageService.get('emailCurrentUser');
  }
}
