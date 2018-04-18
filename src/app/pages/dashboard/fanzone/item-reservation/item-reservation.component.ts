import {Component, OnInit} from "@angular/core";
import { FanZoneService } from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";
import {PlaceService} from "../../../../@theme/services/place.service";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ItemReservation} from "../../../../@theme/models/itemReservation.model";

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

  public placeName: AbstractControl;


  places: any = []

  constructor(private fanZoneService: FanZoneService,
              private placeService: PlaceService,
              protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,
              private fb: FormBuilder,) {

    this.form = this.fb.group({

      'placeName': ['', Validators.compose([Validators.required])];
    });

    this.placeName = this.form.controls['placeName'];
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

    if(this.placeName.value === '') {

      this.toastr.clear();
      this.toastr.error('Niste uneli mesto preuzimanja rekvizita');
    }
    else{

      const itemReservation = new ItemReservation(
        this.id,
        this.userName,
        this.placeName.value,
      );



      this.fanZoneService.confirmItemReservation(itemReservation).toPromise()
        .then(data=>{
          this.toastr.clear();
          this.toastr.success('Uspesno rezervisan rekvizit pod nazivom: ' + data.item.name);

          this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
          this.fanZoneService.changeMessage('official');
        })




    }



  }
}
