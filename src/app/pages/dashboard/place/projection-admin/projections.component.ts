import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {RepertoryService} from "../../../../@theme/services/repertory.service";
import {ProjectionService} from "../../../../@theme/services/projection.service";

@Component({
  templateUrl: './projections.component.html',
  styleUrls: ['./projections.component.scss'],

})

export class ProjectionsComponent implements OnInit {

  items = []

  constructor(private repertoryService: RepertoryService,
              private projectionService: ProjectionService,
              protected router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService
  ) {}

  ngOnInit() {
    const idRepertory = this.route.snapshot.params.idRepertory;
    this.repertoryService.getAllProjectionInRepertory(idRepertory).subscribe(data => {
      this.items = data.projections;
    })

  }

  deleteProjection(id): any {

    this.projectionService.deleteProjection(id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisao!');
        this.items = this.items.filter(el => el.id != id);
      })
      .catch(err => {
        this.toastr.error("Greska pri brisanju");
      });

  }

  back() {
    const place = this.route.snapshot.params.place;
    const id = this.route.snapshot.params.id;
    this.router.navigateByUrl('dashboard/pages/place/' + place + '/place/' + id + '/repertories-in-place-detail')

  }

}
