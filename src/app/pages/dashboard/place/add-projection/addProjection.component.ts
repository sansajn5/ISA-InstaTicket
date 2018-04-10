import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormGroup} from "@angular/forms";
import {PlaceService} from "../../../../@theme/services/place.service";
import {HallService} from "../../../../@theme/services/hall.service";
//import {IMyDpOptions} from 'mydatepicker';

@Component ({
  templateUrl: './addProjection.component.html',
  styleUrls: ['./addProjection.component.scss'],
})

export class AddProjectionComponent implements OnInit {
  type: string;
  eventsPlace = []
  halls = []
  id: string;
  date: string;

  public form: FormGroup;
  public eventInPlace: AbstractControl;
  public hall: AbstractControl;

  constructor(protected router: Router,
              private route: ActivatedRoute,
              private placeService: PlaceService,
              private  hallService: HallService) {
  }

  ngOnInit() {
    const place = this.route.snapshot.params.place;
    this.id = this.route.snapshot.params.id;

    if (place === 'cinemas') {
      this.type = 'Film';
    } else {
      this.type = 'Predstava';
    }
    this.placeService.getEventInPlace(this.id).subscribe(data => {
      this.eventsPlace = data.events;
    })

    this.hallService.getHallsInPlace(this.id).subscribe(data => {
      this.halls = data.halls;
    })
  }

  //
  // public myDatePickerOptions: IMyDpOptions = {
  //   // other options...
  //   dateFormat: 'dd.mm.yyyy',
  // };

  exit() {
    const place = this.route.snapshot.params.place;
    this.id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + this.id + '/repertories-in-place-detail')

  }

}
