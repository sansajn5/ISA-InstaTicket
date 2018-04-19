import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {NbColorHelper} from "@nebular/theme";
import {AttendanceModel} from "../../../../@theme/models/Attendance.model";
import {PlaceService} from "../../../../@theme/services/place.service";
import {ToastrService} from "ngx-toastr";

@Component ({
  selector: 'ngx-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})

export class ResourceComponent implements OnInit {

  mode: string;
  from: string;
  to: string;
  attendenceList = []
  inComeList = []
  sumAttendence;
  sumInCome;

  constructor (private route: ActivatedRoute,
               protected router: Router,
               private placeService: PlaceService,
               private toastr: ToastrService) {

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

  getStatistic() {
    const mode = this.route.snapshot.params.mode;
    const id = this.route.snapshot.params.id;
    if(document.getElementById('date_picker_from').getAttribute('date') === 'undefined-undefined-undefined'){
      this.toastr.clear();
      this.toastr.success('Morate uneti pocetno vreme za dan ili period dana !');
    } else if (mode == 'attendence') {
      const attendence = new AttendanceModel(
        document.getElementById('date_picker_from').getAttribute('date'),
        document.getElementById('date_picker_to').getAttribute('date'),
      );
      this.placeService.getAttendence(id, attendence).toPromise()
        .then(data=> {
          this.attendenceList = data.list;
          this.sumAttendence = data.sum;
          console.log( this.attendenceList);
          console.log( this.sum)
          this.toastr.clear();
          this.toastr.success('Uspesno !');
        })


    }else  {
      const attendence = new AttendanceModel(
        document.getElementById('date_picker_from').getAttribute('date'),
        document.getElementById('date_picker_to').getAttribute('date'),
      );
      this.placeService.getInCome(id, attendence).toPromise()
        .then(data=> {
          this.inComeList = data.list;
          this.sumInCome = data.sum;
          console.log( this.inComeList)
          console.log( this.sumInCome)
          this.toastr.clear();
          this.toastr.success('Uspesno !');
        })
    }
  }

}
