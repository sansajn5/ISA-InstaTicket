import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaceService} from "../../../@theme/services/place.service";
import {id} from "@swimlane/ngx-charts/release/utils";
import {HallService} from "../../../@theme/services/hall.service";
import {AbstractControl, FormGroup} from "@angular/forms";

@Component ({
  templateUrl: './addProjection.component.html',
  styleUrls: ['./addProjection.component.scss'],
})

export class AddProjectionComponent implements OnInit {
  type: string;
  eventsPlace = []
  halls = []
  id: string;

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

}
