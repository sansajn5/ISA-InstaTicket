import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {PlaceService} from "../../../@theme/services/place.service";

@Component({

  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],

})

export class EventComponent implements OnInit{
  items = []

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.placeService.getEventInPlace(id).subscribe(data => {
      this.items = data.events;
    })

  }

}
