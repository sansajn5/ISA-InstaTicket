import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Routes } from "@angular/router/src/config";
import { RouterModule } from "@angular/router";
import { CinemaComponent } from "./cinema/cinema.component";

const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'cinema', component: CinemaComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule { }