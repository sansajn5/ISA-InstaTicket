import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ToastrService} from 'ngx-toastr';
import {Router} from "@angular/router";


@Component({
  selector : 'ngx-offer-request-card',
  templateUrl: './offer-request-card.component.html',
  styleUrls: ['./offer-request-card.component.scss'],
})


export class OfferRequestCardComponent {

  @Input() id: any;
  @Input() name: string;
  @Input() description: string;
  @Input() price: string;
  @Input() image: string;
  @Input() date: string;

  @Output() refreshOffersRequests: EventEmitter<any> = new EventEmitter()

  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,) {}


  acceptOfferRequest(): any {


    this.fanZoneService.acceptOfferRequest(this.id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Odobren oglas!');
        //this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/requests');

        this.refreshOffersRequests.emit(data);
      })
  }

  deleteOffer(): any {

    this.fanZoneService.deleteOffer(this.id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Odbijen oglas!');
        //this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/offers/offers/requests');

        this.refreshOffersRequests.emit(data);
      })
  }



}
