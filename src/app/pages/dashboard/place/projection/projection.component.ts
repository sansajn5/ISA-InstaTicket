
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectionService} from "../../../../@theme/services/projection.service";

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
  hall: string;
  startTime: string;
  endTime: string;
  date: string;
  starRate;
  imageRoute = '../../../assets/images/';
  image: string;

  constructor (protected router: Router,
               private projecionService: ProjectionService,
               private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    const idProjection = this.route.snapshot.params.idProjection;

    this.projecionService.getProjection(idProjection).subscribe(data => {
      this.item = data.projection;
      this.event = data.projection.event.name;
      this.director = data.projection.event.director;
      this.actors = data.projection.event.actors;
      this.type = data.projection.event.type;
      this.duration = data.projection.event.duration;
      this.description = data.projection.event.description;
      this.hall = data.projection.hall.name;
      this.startTime = data.projection.startTime;
      this.endTime = data.projection.endTime;
      this.date = data.projection.date;
      this.image = this.imageRoute + 'm.jpg';

      this.projecionService.getVoteForEvent(idProjection).subscribe(data => {
        this.starRate = data.vote;
      })
    })



  }
  back() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    const repertory = this.route.snapshot.params.idRepertory;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/repertory/' + repertory
    + '/projections');

  }
}
