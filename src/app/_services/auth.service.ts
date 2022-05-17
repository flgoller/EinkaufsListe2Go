import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../_types/user';
import { MenuController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private navCtrl: NavController,
        private toast: ToastController,
        private router: Router,
        private menuCtrl: MenuController,
        private storageService: StorageService
    ) {}

    async loginWithEmailAndPassword(user: User, redirectToURL?: string) {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(
                user.email,
                user.password
            );
            if (result) {
                // Logged in
                this.storageService.set('emailCurrentUser', result.user.email);
                this.storageService.set('currentUser', result.user.displayName);
                this.storageService.set('currentUserID', result.user.uid);
                console.log(result.user.uid);

                this.toast.create({
                    message: `Willkommen ${result.user.displayName}`,
                    color: 'success',
                    duration: 2000,
                })
                .then((toast) => toast.present());

                if (redirectToURL) {
                    this.menuCtrl.enable(true);
                    this.router.navigateByUrl(redirectToURL);
                }
            }
        } catch (e) {
            this.toast
                .create({
                    message: `Fehler beim Login!`,
                    color: 'danger',
                    duration: 5000,
                })
                .then((toast) => toast.present());
            this.router.navigateByUrl('/login');
        }
    }

    async createUserWithEmailAndPassword(user: User, redirectToURL?: string) {
        try {
            const result = await this.afAuth.createUserWithEmailAndPassword(
                user.email,
                user.password
            );

            if (result) {
                await (
                    await this.afAuth.currentUser
                ).updateProfile({
                    displayName: user.displayname,
                    photoURL: '',
                });

                this.storageService.set('emailCurrentUser', result.user.email);
                this.storageService.set('currentUser', result.user.displayName);
                this.storageService.set('currentUserID', result.user.uid);

                this.toast.create({
                    message: 'Registrierung erfolgreich',
                    color: 'success',
                    duration: 2000,
                })
                .then((toast) => toast.present());
            }
            if (redirectToURL) {
                this.router.navigateByUrl(redirectToURL);
            }
        } catch (e) {
            console.log(e);
            this.toast
                .create({
                    message: `Registrierung fehlgeschlagen!`,
                    color: 'danger',
                    duration: 3000,
                })
                .then((toast) => toast.present());
        }
    }
    // Returns true if user is logged in
    get authenticated(): boolean {
        return this.afAuth.currentUser !== null;
    }

    logout() {
        this.menuCtrl.enable(false);
        this.afAuth.signOut().then(() => {
            console.log('User succesfully logged out!');
            this.router.navigateByUrl('/login');
        });
    }
}
