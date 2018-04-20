import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {AccountActivationComponent} from './account-activation/account-activation.component';
import {RequestPasswordComponent} from "./request-password/request-password.component";

const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [{
      path: 'login', component: LoginComponent,
    }, {
      path: 'sign-up', component: RegisterComponent,
    }, {
      path: 'activate', component: AccountActivationComponent,
    }, {
    path: 'forgot-password', component: RequestPasswordComponent,
    },
    {
      path: '',
      redirectTo: 'sign-up',
      pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule { }
