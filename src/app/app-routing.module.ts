import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.page';
import { WillkommenGuard } from './_guards/welcome.guard';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/compat/auth-guard';

// TODO: Standardverhalten definieren
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToRoot = () => redirectLoggedInTo(['shopping-lists']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => 
    import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then(
        m => m.WelcomePageModule
      ),
    canLoad: [WillkommenGuard],
  },
  {
    path: 'register',
    loadChildren: () => 
    import('./register/register.module').then(
      m => m.RegisterPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'forgot-password',
    loadChildren: () => 
    import('./forgot-password/forgot-password.module').then(
      m => m.ForgotPasswordPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectLoggedInToRoot },
  },
  {
    path: 'shopping-lists',
    loadChildren: () => 
    import('./shopping-lists/shopping-lists.module').then(
      m => m.ShoppingListsPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'product',
    loadChildren: () => 
    import('./product/product.module').then(
      m => m.ProductPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'shopping-list',
    loadChildren: () => 
    import('./shopping-list/shopping-list.module').then(
      m => m.ShoppingListPageModule
      ),
      canActivate: [AngularFireAuthGuard],
      data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
