import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Injectable({
    providedIn: 'root',
})
export class WillkommenGuard implements CanLoad {
    constructor(
        private storageService: StorageService,
        private router: Router
    ) {}

    async canLoad(): Promise<boolean> {
        let welcomeDone = await this.storageService.get('welcomeDone');
        if (welcomeDone) {
            await this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }
    }
}
