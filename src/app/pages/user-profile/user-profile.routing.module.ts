import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserProfileComponent } from './user-profile.component';
import { ProfileComponent } from './profile/profile.component';
import {VotePlaceComponent} from "./vote-place/votePlace.component";
import {VoteEventComponent} from "./vote-event/voteEvent.component";

const routes: Routes = [
    { path: 'profile/:username' , component: ProfileComponent },
    { path: 'profile/:username/vote-for-place/:id' , component: VotePlaceComponent } ,
    { path: 'profile/:username/vote-for-event/:id/event/:idEvent' , component: VoteEventComponent } ,
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileRoutingModule {

}
