import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { User } from '../_types/user';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public passwordForm: FormGroup;
  user = {} as User;

  constructor(
      private menuCtrl: MenuController
  ) {
      this.passwordForm = new FormGroup({
          email: new FormControl('', Validators.email),
      });
  }

  ionViewWillEnter() {
      this.menuCtrl.enable(false);
  }

  async send() {
      if (this.passwordForm.valid) {
         
          this.passwordForm.reset();
      }
  }

  ngOnInit() {}
}
