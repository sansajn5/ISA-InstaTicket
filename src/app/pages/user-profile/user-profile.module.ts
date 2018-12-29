import { UserProfileComponent } from "./user-profile.component";
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { UserProfileRoutingModule } from './user-profile.routing.module';
import { ProfileComponent} from './profile/profile.component';
import {VotePlaceComponent} from "./vote-place/votePlace.component";
import {VoteEventComponent} from "./vote-event/voteEvent.component";
import {RankComponent} from "./rank/rank.component";

const USER_PROFILE_COMPONENTS = [
    UserProfileComponent,
    ProfileComponent,
    VotePlaceComponent,
    VoteEventComponent,
    RankComponent,


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
