import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    templateUrl: './placeList.component.html',
    styleUrls: ['./placeList.component.scss'],
})
export class PlaceListComponent implements OnInit {

  items = []
  imageRoute = '../../../assets/images/';
  imageCinema: string;
  urlCinema: string;

  constructor(private placeService: PlaceService,
              protected router: Router
  ) {}

  ngOnInit() {

      this.placeService.getCinemas().subscribe(data => {
        this.items = data.cinemas;
        this.imageCinema = this.imageRoute + 'cinema.jpg';

      })

  }
 onClick(text) {
     this.router.navigateByUrl('dashboard/place/' + text);
 }

}
