
import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {HallService} from "../../../@theme/services/hall.service";

@Component({

  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss'],

})

export class HallComponent implements OnInit {
  items = []

  constructor(private hallService: HallService,
              protected router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.hallService.getHallsInPlace(id).subscribe(data => {
      this.items = data.halls;
    })

  }

}
