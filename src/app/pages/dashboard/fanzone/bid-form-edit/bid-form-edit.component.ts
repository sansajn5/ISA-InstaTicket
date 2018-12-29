import {Component, OnInit, Input} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Bid} from "../../../../@theme/models/bid.model";
import {BidEdit} from "../../../../@theme/models/bidEdit";


@Component({
  selector: 'ngx-bid-form-edit',
  templateUrl: './bid-form-edit.component.html',
  styleUrls: ['./bid-form-edit.component.scss']
})
export class BidFormEditComponent implements OnInit {

  bidPrice: any = '';

  @Input() offerName: string;

  offerId: any;
  id: any

  public form: FormGroup;
  public bPrice: AbstractControl;


  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {


    this.id = this.route.snapshot.params.id;
    this.offerId = this.route.snapshot.params.offerId;

    this.form = this.fb.group({

      'bPrice': ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')])],

    });

    this.bPrice = this.form.controls['bPrice'];
  }


  ngOnInit() {

    this.fanZoneService.getOffers().toPromise()
      .then(data => {

        for (let offer of data.offers) {

          if (this.offerId == offer.id) {
            this.offerName = offer.name;
          }
        }
      })

  }

  closeEditBidForm() {


    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/bids/' + this.offerId);

  }

  onKeyPrice(event: any) {
    this.bidPrice = event.target.value;

  }

  confirmEditing() {

    const bidEdit = new BidEdit(this.id, this.bidPrice);

    this.fanZoneService.editBid(bidEdit).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Uspesno izmenjena ponuda!');

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/bids/' + this.offerId);

      })
  }



}
