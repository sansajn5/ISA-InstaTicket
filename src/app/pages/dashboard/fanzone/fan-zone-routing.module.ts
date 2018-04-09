
import { Component } from '@angular/core';
import { FanZoneComponent } from './fanzone.component';
import { ItemFormComponent } from './itemForm/itemForm.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FanZoneItems } from './fan-zone-items/fan-zone-items.component';


const routes: Routes = [
    { path: '', component: FanZoneItems },
    { path: 'fan-zone-items', component: FanZoneItems },
    { path: 'fan-zone-items/:mode', component: ItemFormComponent },
    { path: 'fan-zone-items/:mode/:id', component: ItemFormComponent },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FanZoneRoutingModule {}