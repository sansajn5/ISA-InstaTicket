import {Component, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {PlaceService} from "../../../../@theme/services/place.service";

@Component({
  selector: 'ngx-item-reservation',
  templateUrl: './item-reservation.component.html',
  styleUrls: ['./item-reservation.component.scss']
})
export class ItemReservationComponent implements OnInit {


  id : any;
  name: string = '';
  description: string;
  price: string;
  image: string;
  userName: string;
  placeName: string = '';

  selectedPlace: Object = {};

  places: any = []

  constructor(private fanZoneService: FanZoneService,
              private placeService: PlaceService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {

    this.id = this.route.snapshot.params.id;

    this.fanZoneService.itemReservation(this.id).toPromise()
      .then(data=>{

        this.name = data.item.name;
        this.description = data.item.description;
        this.image = data.item.image;
        this.price = data.item.price;
        this.userName = data.user.username;


      })

    this.placeService.getCinemas().toPromise()
      .then(data=>{

        for(let place of data.cinemas){
          this.places.push(place);

        }


      })

    this.placeService.getTheathres().toPromise()
      .then(data=>{

        for(let place of data.theaters){
          this.places.push(place);

        }


      })





  }

  closingClick() {

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
    this.fanZoneService.changeMessage('official');

  }

  confirmReservation() {

   /* if(this.selectedPlace.name === 'null') {

      this.toastr.error('Niste uneli mesto preuzimanja rekvizita!');
    }
    else{

      this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
      this.fanZoneService.changeMessage('official');
    }
*/
  }
}
