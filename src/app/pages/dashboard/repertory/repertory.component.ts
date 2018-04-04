import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {RepertoryService} from "../../../@theme/services/repertory.service";

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
    const id = this.route.snapshot.params.id;

    this.repertoryService.getAllProjectionInRepertory(id).subscribe(data => {
      this.items = data.projections;
      this.movieImage = this.imageRoute + 'm.jpg';
    })

  }

}
