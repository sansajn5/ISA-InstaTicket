
import {Component, OnInit} from "@angular/core";
import {PlaceService} from "../../../@theme/services/place.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({

  templateUrl: './place.component.html',
  styleUrls: ['./place.component.scss'],
})

export class PlaceComponent implements OnInit {

   nameTitle: string;
   desc: string;
   adr: string;
   items = []
   type: string;
   place: string;

  constructor(private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {}


  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.place = this.route.snapshot.params.place;
    if (this.place === 'cinemas') {
      this.type = 'Filmovi';
    } else {
      this.type = 'Predstave';
    }
    this.placeService.getPlace(id).subscribe(data  => {

      this.nameTitle = data.place.name;
      this.desc = data.place.descripton;
      this.adr = data.place.address;
    })

    this.placeService.getRepertoriesInPlace(id).subscribe(data => {
      this.items = data.repertories;
    })

  }

  getEvents() {
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/' + this.place + '/' + id + '/events');
  }

  getHalls() {
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/' + this.place + '/' + id + '/halls');
  }

  getProjections(id) {
    this.router.navigateByUrl('dashboard/place/repertory/' + id);
  }

  getRepertories() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/place/' + place + '/' + id + '/repertories-in-place')
  }
}
