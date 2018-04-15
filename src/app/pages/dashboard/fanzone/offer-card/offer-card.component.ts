import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";
import {Bid} from "../../../../@theme/models/bid.model";


@Component({
  selector : 'ngx-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss'],
})


export class OfferCardComponent {

  @Input() id: any;
  @Input() name: string;
  @Input() description: string;
  @Input() price: string;
  @Input() image: string;
  @Input() date: string;
  @Input() bestPrice: string;

  bidPrice: any = '';

  @Output() refreshOffersRequests: EventEmitter<any> = new EventEmitter()

  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService) {}



  addNewBid() {



    const bid = new Bid(this.bidPrice);

    this.fanZoneService.addNewBid(bid, this.id).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Uspesno dodata ponuda!');

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
      })

  }


  onKeyPrice(event: any) {
    this.bidPrice = event.target.value;

  }
}
