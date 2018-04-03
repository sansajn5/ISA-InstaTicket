import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";

@Component({
    selector: 'ngx-cinema',
    templateUrl: './cinema.component.html',
    styleUrls: ['./cinema.component.scss'],
})
export class CinemaComponent implements OnInit {

   items = []

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    this.placeService.getCinemas().subscribe(data => {
      console.log(data);
      this.items = data.cinemas;
    })
  }


}
