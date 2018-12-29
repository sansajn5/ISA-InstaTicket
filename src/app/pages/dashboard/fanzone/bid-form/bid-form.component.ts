import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Bid} from "../../../../@theme/models/bid.model";


@Component({
  selector: 'ngx-bid-form',
  templateUrl: './bid-form.component.html',
  styleUrls: ['./bid-form.component.scss']
})
export class BidFormComponent implements OnInit {

  bidPrice: any = '';

  @Input() offerName: string;

  offerId: any;

  public form: FormGroup;
  public bPrice: AbstractControl;


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {


    this.offerId = this.route.snapshot.params.id;

    this.form = this.fb.group({

      'bPrice' : ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')])],

    });

    this.bPrice = this.form.controls['bPrice'];
  }


  ngOnInit() {

    this.fanZoneService.getOffers().toPromise()
      .then(data=>{

        for(let offer of data.offers){

          if (this.offerId == offer.id) {
            this.offerName = offer.name;
          }
        }
      })

  }

  closeNewBidForm() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/bids/' + this.offerId);

  }

  onKeyPrice(event: any) {
    this.bidPrice = event.target.value;

  }

  addNewBid() {

    const bid = new Bid(this.bidPrice);

    this.fanZoneService.addNewBid(bid, this.offerId).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Uspesno dodata ponuda!');

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/bids/' + this.offerId);
        this.fanZoneService.changeMessage('offers');
      })
  }

}
