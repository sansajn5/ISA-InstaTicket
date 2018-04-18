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

  public bidValid: boolean = true;

  public form: FormGroup;
  public bPrice: AbstractControl;

  @Output() refreshOffersRequests: EventEmitter<any> = new EventEmitter()

  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder,) {



    this.form = this.fb.group({


      'bPrice' : ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')])],

    });

    this.bPrice = this.form.controls['bPrice'];

  }


  checkBid(bidPrice: String) {

      if(Number(bidPrice) <= Number(this.bestPrice)) {
        this.bidValid = false;
      }
  }


  addNewBid() {

    this.bidValid = true;
    this.checkBid(this.bidPrice);

    if(!this.bidValid) {

      this.toastr.error('Morate uneti veću ponudu od trenutno najbolje!');
    }
    else{

      const bid = new Bid(this.bidPrice);

      this.fanZoneService.addNewBid(bid, this.id).toPromise()
        .then(data=>{
          this.toastr.clear();
          this.toastr.success('Uspesno dodata ponuda!');

          this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
          this.fanZoneService.changeMessage('offers');
        })

    }


  }


  onKeyPrice(event: any) {
    this.bidPrice = event.target.value;

  }

  bidsClick(){

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/bids/' + this.id);
  }

}
