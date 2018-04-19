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

  data: any;
  options: any;

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

    this.setChart()
  }

  setChart() {
    this.data = {
      labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      datasets: [{
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: NbColorHelper.hexToRgbA('blue', 0.8),
      }, {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: NbColorHelper.hexToRgbA('blue', 0.8),
      }],
    };

    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: 'red',
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: 'red',
            },
            ticks: {
              fontColor: 'red',
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: 'red',
            },
            ticks: {
              fontColor: 'red',
            },
          },
        ],
      },
    };
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
          console.log( this.sumAttendence)
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
