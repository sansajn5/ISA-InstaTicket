import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";


@Component({
  selector: 'ngx-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.scss']
})
export class BidComponent implements OnInit {

  @Input() id: any;
  @Input() sum: any;
  @Input() ordNum: any;
  @Input() username: any;
  @Input() offerId: any;
  @Input() owner: any;

  editAllowed: boolean = false;
  acceptAllowed: boolean = false;

  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {

    const logged = localStorage.getItem('user');

    if(this.username == logged) {
      this.editAllowed = true;
    }

    if(this.owner == logged) {
      this.acceptAllowed = true;
    }
  }






  acceptBid() {

    this.fanZoneService.acceptBid(this.id).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Oglas prodat korisniku "' + data.bid.userName + '"');

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
        this.fanZoneService.changeMessage('offers');
      })
  }

  editBid() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/bids/edit/' + this.offerId + '/' + this.id);
  }



}
