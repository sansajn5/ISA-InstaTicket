import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NbColorHelper} from "@nebular/theme";

@Component ({
  selector: 'ngx-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})

export class ResourceComponent implements OnInit {

  mode: string;
chart;

  constructor (private route: ActivatedRoute,
               protected router: Router) {

  }

  ngOnInit() {
    const mode = this.route.snapshot.params.mode;
    if (mode == 'attendence') {
      this.mode = 'Posecenost :'
    } else if (mode == 'in-come') {
      this.mode = 'Prihodi :'
    } else {
      const place = this.route.snapshot.params.place;
      this.router.navigateByUrl('dashboard/pages/statistic/' + place )
    }
  }

  back() {
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/statistic/' + place )
  }

}
