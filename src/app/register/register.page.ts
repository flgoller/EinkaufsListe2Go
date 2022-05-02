import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { User } from '../_types/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerForm: FormGroup;
  user = {} as User;

  constructor(
      private router: Router,
      private authService: AuthService,
      private menuCtrl: MenuController
  ) {
      this.registerForm = new FormGroup({
          displayname: new FormControl('', Validators.required),
          email: new FormControl('', Validators.email),
          password: new FormControl('', Validators.required),
          passwordConfirmation: new FormControl('', Validators.required),
      });
  }

  ionViewWillEnter() {
      this.menuCtrl.enable(false);
  }

  async register() {
      if (this.registerForm.valid && 
          this.registerForm.get('password').value == this.registerForm.get('passwordConfirmation').value) {
          this.authService.createUserWithEmailAndPassword(
              {
                  displayname: this.registerForm.get('displayname').value,
                  email: this.registerForm.get('email').value,
                  password: this.registerForm.get('password').value,
              },
              '/shopping-lists'
          );
          this.registerForm.reset();
      }
  }

  ngOnInit() {}
}
