import {Component, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import { Router } from "@angular/router";

@Component({
    selector: 'ngx-fan-zone-items',
    templateUrl: './fan-zone-items.component.html',
    styleUrls: ['./fan-zone-items.component.scss']
})
export class FanZoneItems implements OnInit{

  items = []
  offers = []

  roles: any;

  actionAllowed: boolean = false;

  message: string = 'official';

  public class_tab1 = 'nav-link';
  public class_tab2 = 'nav-link';

  public show_items = true;
  public show_offers = false;

  constructor(private fanZoneService: FanZoneService, protected router: Router) {}

  ngOnInit() {

    this.fanZoneService.currentMessage.subscribe(message => this.message = message)

    this.fanZoneService.getItems().subscribe(data => {

      //this.items = data.items;

      for(let item of data.items) {
        if(item.sold === false) {
          this.items.push(item);
        }
      }

    })

    this.fanZoneService.getOffers().subscribe(data => {

      this.offers = data.offers;

    })

    if (this.message === 'official'){

      this.class_tab1 = 'nav-link active';
      this.class_tab2 = 'nav-link';
      this.show_items = true;
      this.show_offers = false;
    }
    else {

      this.class_tab2 = 'nav-link active';
      this.class_tab1 = 'nav-link';
      this.show_items = false;
      this.show_offers = true;
    }

    this.message = 'official';

    this.roles = localStorage.getItem('role')

    var rolesSliced = this.roles.slice(1, -1);
    var rolesSplited = rolesSliced.split(',');

    for(let role of rolesSplited){

      if (role.replace(/\s/g, '') === 'FANZONE_ADMIN') {

        this.actionAllowed = true;
      }

    }



  }

  addNewItem() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/add');




  }


  officialShopClick() {
    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');


    this.class_tab1 = 'nav-link active';
    this.class_tab2 = 'nav-link';
    this.show_items = true;
    this.show_offers = false;

    this.fanZoneService.changeMessage('official');

  }

  offersClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

    this.class_tab2 = 'nav-link active';
    this.class_tab1 = 'nav-link';

    this.show_items = false;
    this.show_offers = true;

    this.fanZoneService.changeMessage('offers');


  }


  addNewOffer() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/add');
  }

  offersRequestsClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/requests');
  }

  updateList(data) {
    console.log(data);
    this.items =  this.items.filter(el => el.id != data.item.id);
  }

  updateEditedList(data) {
    this.items = data.items;
  }

}
