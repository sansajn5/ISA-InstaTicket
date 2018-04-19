
import { Component } from '@angular/core';
import { FanZoneComponent } from './fanzone.component';
import { ItemFormComponent } from './item-form/itemForm.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FanZoneItems } from './fan-zone-items/fan-zone-items.component';
import {OfferFormComponent} from "./offer-form/offer-form.component";
import {OffersRequestsComponent} from "./offers-requests/offers-requests.component";
import {BidsComponent} from "./bids/bids.component";
import {ItemReservationComponent} from "./item-reservation/item-reservation.component";
import {BidFormComponent} from "./bid-form/bid-form.component";
import {BidFormEditComponent} from "./bid-form-edit/bid-form-edit.component";


const routes: Routes = [
    { path: '', component: FanZoneItems },
    { path: 'fan-zone-items', component: FanZoneItems },
    { path: 'fan-zone-items/:mode', component: ItemFormComponent },


    { path: 'fan-zone-items/:mode/:id', component: ItemFormComponent },
    { path: 'fan-zone-items/offers/offers/add', component: OfferFormComponent},
    { path: 'fan-zone-items/offers/offers/requests', component: OffersRequestsComponent},
    { path: 'fan-zone-items/offers/offers/bids/:id', component: BidsComponent},
    { path: 'fan-zone-items/item/reservation/:id', component: ItemReservationComponent },
    { path: 'fan-zone-items/offers/offers/bids/new/:id', component: BidFormComponent},
    { path: 'fan-zone-items/offers/offers/bids/edit/:offerId/:id', component: BidFormEditComponent},

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FanZoneRoutingModule {}
