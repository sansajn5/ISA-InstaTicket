import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RepertoryService} from "../../../../@theme/services/repertory.service";
@Component({
  templateUrl: './repertory.component.html',
  styleUrls: ['./repertory.component.scss'],

})

export class RepertoryComponent implements OnInit {
  items = []
  imageRoute = '../../../assets/images/';
  movieImage: string;

  constructor(protected router: Router,
              private  repertoryService: RepertoryService,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idRepertory = this.route.snapshot.params.idRepertory;

    this.repertoryService.getAllProjectionInRepertory(idRepertory).subscribe(data => {
      this.items = data.projections;
      this.movieImage = this.imageRoute + 'm.jpg';
    })

  }

  detailProjection(id) {
    const idPlace = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    const idRepertory = this.route.snapshot.params.idRepertory;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + idPlace + '/repertory/' + idRepertory
      + '/projection/' + id);
  }

  back() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id );
  }
}
