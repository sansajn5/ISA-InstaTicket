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
  attendence = false;
  inCome = false;
  dataInCome : any;
  optionsInCome: any;
  today: number = Date.now();


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

  setChart() {
    let labes = [];
    let dates = [];
    this.attendenceList.forEach( elementUnizu => {
      labes.push(elementUnizu.date)
      dates.push(elementUnizu.attendence)
    })

    this.data = {
        labels: labes,
          datasets: [{
        data: dates,
            label: 'Posecenost' ,
        backgroundColor: 'rgba(0, 0, 255, 0.6)',
      }],
    };

    this.options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: 'black',
          tooltipFontWeight: 5 ,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: 'black',
            },
            ticks: {
              fontColor: 'black',

            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: 'black',
            },
            ticks: {
              fontColor: 'black',
              beginAtZero: true,
              max: 10,
              min: 0,
              stepSize: 5
            },
          },
        ],
      },
    };
  }

  setChartInCome() {
    let labes = [];
    let dates = [];
    this.inComeList.forEach( elementUnizu => {
      labes.push(elementUnizu.date)
      dates.push(elementUnizu.attendence)
    })

    this.dataInCome = {
      labels: labes,
      datasets: [{
        data: dates,
        label: 'Posecenost' ,
        backgroundColor: 'rgba(0, 0, 255, 0.6)',
      }],
    };

    this.optionsInCome = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: 'black',
          tooltipFontWeight: 5 ,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: 'black',
            },
            ticks: {
              fontColor: 'black',

            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: 'black',
            },
            ticks: {
              fontColor: 'black',
              beginAtZero: true,
              max: 3000,
              min: 0,
              stepSize: 1000
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
          this.setChart()
          this.attendence = true;
          this.inCome = false;
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
          this.setChartInCome();
          this.attendence = false;
          this.inCome = true;
        })
    }
  }

}
