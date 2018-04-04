
import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({

  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})

export class PlaceComponent implements OnInit {

   nameTitle: string;
   desc: string;
   adr: string;
   items = []

  constructor(private placeService: PlaceService,
              protected router: Router, private route: ActivatedRoute
  ) {}


  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.placeService.getPlace(id).subscribe(data  => {

      this.nameTitle = data.place.name;
      this.desc = data.place.description;
      this.adr = data.place.address;
    })

    this.placeService.getRepertoriesInPlace(id).subscribe(data => {
      this.items = data.repertories;
    })

  }
}
