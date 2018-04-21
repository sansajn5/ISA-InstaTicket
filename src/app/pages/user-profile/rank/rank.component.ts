import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'ngx-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit {

  @Input() points: any;

  basicMem: boolean = true;
  bronzeMem: boolean = false;
  silverMem: boolean = false;
  goldMem: boolean = false;


  constructor(protected router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute,) {
  }


  ngOnInit() {

    let pointss = Number(this.points);

    if(pointss <= 10) {

      this.basicMem = true;
      this.bronzeMem = false;
      this.silverMem = false;
      this.goldMem = false;
    }
    else if (pointss > 10 && pointss <= 20) {

      this.basicMem = false;
      this.bronzeMem = true;
      this.silverMem = false;
      this.goldMem = false;
    }

    else if (pointss > 20 && pointss <= 30) {

      this.basicMem = false;
      this.bronzeMem = false;
      this.silverMem = true;
      this.goldMem = false;
    }
    else{
      this.basicMem = false;
      this.bronzeMem = false;
      this.silverMem = false;
      this.goldMem = true;
    }
  }

}
