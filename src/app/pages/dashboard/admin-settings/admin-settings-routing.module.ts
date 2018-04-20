import {RouterModule, Routes} from "@angular/router";
import {AdminSettingsComponent} from "./admin-settings.component";
import {NgModule} from "@angular/core";
import {AdminSettingsHomeComponent} from "./admin-settings-home/admin-settings-home.component";
import {AdminSettingsSystemComponent} from "./admin-settings-system/admin-settings-system.component";
import {AdminSettingsPlaceComponent} from "./admin-settings-place/admin-settings-place.component";
import {AdminSettingsFanzoneComponent} from "./admin-settings-fanzone/admin-settings-fanzone.component";
import {AdminSettingsPlaceSpecificComponent} from "./admin-settings-place-specific/admin-settings-place-specific.component";

const routes: Routes = [
  { path: '', component: AdminSettingsHomeComponent },
  { path: 'admin-settings', component: AdminSettingsHomeComponent },
  { path: 'system', component: AdminSettingsSystemComponent },
  { path: 'place', component: AdminSettingsPlaceComponent },
  { path: 'fanzone', component: AdminSettingsFanzoneComponent },
  { path: 'place/:id', component: AdminSettingsPlaceSpecificComponent},



]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminSettingsRoutingModule {}
