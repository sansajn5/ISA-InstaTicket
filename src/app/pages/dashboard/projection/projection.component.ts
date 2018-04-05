
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectionService} from "../../../@theme/services/projection.service";

@Component({
  templateUrl: './projection.component.html',
  styleUrls: ['./projection.component.scss'],
})

export class ProjectionComponent implements OnInit {

  item: any;
  event: string;
  actors: string;
  type: string;
  director: string;
  duration: string;
  description: string;

  constructor (protected router: Router,
               private projecionService: ProjectionService,
               private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.projecionService.getProjection(id).subscribe(data => {
      this.item = data.projection;
      this.event = data.projection.event.name;
      this.director = data.projection.event.director;
      this.actors = data.projection.event.actors;
      this.type = data.projection.event.type;
    })

  }
}
