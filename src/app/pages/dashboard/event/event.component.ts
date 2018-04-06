import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaceService} from "../../../@theme/services/place.service";

@Component({

  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],

})

export class EventComponent implements OnInit{
  items = []
  add: string;
  type: string;

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const place =  this.route.snapshot.params.place;
    const id = this.route.snapshot.params.id;
    if (place === 'cinemas') {
      this.add = 'Dodaj film';
      this.type = 'Film';
    } else {
      this.add = 'Dodaj predstavu';
      this.type = 'Predstava';
    }

    this.placeService.getEventInPlace(id).subscribe(data => {
      this.items = data.events;
    })

  }

}
