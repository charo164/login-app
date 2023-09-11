import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard, authLoginGuard } from './services/auth.guard';
import { UserInfosComponent } from './components/home/user-infos/user-infos.component';
import { UserEditComponent } from './components/home/user-edit/user-edit.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: UserInfosComponent,
      },
      {
        path: 'edit',
        component: UserEditComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [authLoginGuard],
    children: [
      {
        path: 'login',
        component: SignInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
