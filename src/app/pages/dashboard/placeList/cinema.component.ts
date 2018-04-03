import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";
import {Router} from "@angular/router";

@Component({
    selector: 'ngx-cinema',
    templateUrl: './cinema.component.html',
    styleUrls: ['./cinema.component.scss'],
})
export class CinemaComponent implements OnInit {

   items = []

  constructor(private placeService: PlaceService,
              protected router: Router
  ) {}

  ngOnInit() {
    this.placeService.getCinemas().subscribe(data => {
      this.items = data.cinemas;
    })
  }
 onClick(text) {
     this.router.navigateByUrl('dashboard/place/' + text);
 }

}
