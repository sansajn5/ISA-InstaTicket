import { LoginComponent } from "./login/login.component";
import { AuthComponent } from "./auth.component";
import { ThemeModule } from "../@theme/theme.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { NgModule } from "@angular/core";
import {RegisterComponent} from "./register/register.component";

const AUTH_COMPONENTS = [
  AuthComponent,
  LoginComponent,
  RegisterComponent,
];

@NgModule({
  imports: [
    ThemeModule,
    AuthRoutingModule,
  ],
  declarations: [
    ...AUTH_COMPONENTS,
  ],
  providers: [
  ],
})
export class AuthModule { }
