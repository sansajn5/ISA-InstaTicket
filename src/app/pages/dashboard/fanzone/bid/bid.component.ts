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


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {
  }






  acceptBid() {

    this.fanZoneService.acceptBid(this.id).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Oglas prodat korisniku "' + data.bid.userName + '"');

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
      })
  }



}
