import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RepertoryService} from "../../../../@theme/services/repertory.service";
import {PlaceService} from "../../../../@theme/services/place.service";
@Component({
  templateUrl: './repertories.component.html',
  styleUrls: ['./repertories.component.scss'],

})

export class RepertoriesComponent implements OnInit {
  items = []


  constructor(private repertoryService: RepertoryService,
              private placeService: PlaceService,
              protected router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    this.placeService.getRepertoriesInPlace(id).subscribe(data => {
      this.items = data.repertories;
    })

  }

  deleteRepertory(id): any {

    this.repertoryService.deleteRepertory(id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisao!');
        this.items = this.items.filter(el => el.id != id);
      })
      .catch(err => {
        this.toastr.error("Greska pri brisanju");
      });

  }

  getProjections(idRepertory): any {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/repertory/' + idRepertory)
  }

  addProjection() {
    const id = this.route.snapshot.params.id;
    const place = this.route.snapshot.params.place;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/add-projection' );
  }
}
