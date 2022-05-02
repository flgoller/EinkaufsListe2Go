import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_types/user';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  user = {} as User;
  
  constructor(private router: Router,
      private menuCtrl: MenuController,
      private authService: AuthService) {
      this.loginForm = new FormGroup({
          email: new FormControl('', Validators.email),
          password: new FormControl('', Validators.required),
      });
  }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
      this.menuCtrl.enable(false);
  }

  async doLogin() {
      if (this.loginForm.valid) {
          await this.authService.loginWithEmailAndPassword(
              {
                  email: this.loginForm.get('email').value,
                  password: this.loginForm.get('password').value,
              },
              '/shopping-lists'
          );
      }
  }

  gotoRegistrierung() {
      this.router.navigateByUrl('/register');
  }
}
