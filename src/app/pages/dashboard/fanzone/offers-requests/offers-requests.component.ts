import { Component } from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import { Router } from "@angular/router";

@Component({
  selector: 'ngx-offers-requests',
  templateUrl: './offers-requests.component.html',
  styleUrls: ['./offers-requests.component.scss']
})
export class OffersRequestsComponent {

  offers = [];

  constructor(private fanZoneService: FanZoneService,
              protected router: Router) {}



  ngOnInit() {

    this.fanZoneService.getOffersRequests().subscribe(data => {
      console.log(data);
      this.offers = data.offers;
    })
  }

  closingClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
    this.fanZoneService.changeMessage('offers');
  }

  updateOfferRequests(data) {

    this.offers =  this.offers.filter(el => el.id != data.offer.id);
  }


}
