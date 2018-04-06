import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { path: '', component: ProfileComponent },
    { path: 'profile' , component: ProfileComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {

}
