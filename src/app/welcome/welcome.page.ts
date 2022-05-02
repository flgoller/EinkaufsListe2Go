import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  constructor(private router: Router,
    private storageService: StorageService,
    private menuCtrl: MenuController) {}

ngOnInit() {}

ionViewWillEnter() {
    this.menuCtrl.enable(false);
}

welcomeDone() {
    this.storageService.set('welcomeDone', true);
    this.router.navigateByUrl('/login');
}

goToLogin()
{
    this.storageService.set('welcomeDone', true);
    this.router.navigateByUrl('/login');
}
}
