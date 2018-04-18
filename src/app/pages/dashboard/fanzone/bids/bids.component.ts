import {Component, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'ngx-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss']
})
export class BidsComponent implements OnInit{

  bids = [];
  name: any = '';


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {}



  ngOnInit() {


    const idOffer = this.route.snapshot.params.id;

    this.fanZoneService.getBidsForOffer(idOffer).subscribe(data => {

      this.bids = data.bids;
      this.name = data.offer.name;


    })
  }

  closingClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
    this.fanZoneService.changeMessage('offers');
  }



}
