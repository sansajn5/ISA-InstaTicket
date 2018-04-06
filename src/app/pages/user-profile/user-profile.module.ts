import { UserProfileComponent } from "./user-profile.component";
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserProfileRoutingModule } from './user-profile.routing.module';
import { ProfileComponent} from './profile/profile.component';

const USER_PROFILE_COMPONENTS = [
    UserProfileComponent,
    ProfileComponent,
]

@NgModule({
    imports: [
    ThemeModule,
    UserProfileRoutingModule,
    ],
    declarations: [
        ...USER_PROFILE_COMPONENTS,
    ],
})
export class UserProfileModule {

}