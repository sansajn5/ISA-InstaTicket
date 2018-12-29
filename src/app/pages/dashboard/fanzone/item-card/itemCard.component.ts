import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { Router } from '@angular/router';
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector : 'ngx-item-card',
  templateUrl: './itemCard.component.html',
  styleUrls: ['./itemCard.component.scss'],
})


export class ItemCardComponent implements OnInit {

  @Input() image: string;
  @Input() name: string;
  @Input() description: string;
  @Input() price: string;
  @Input() id: any;

  @Output() refreshList:EventEmitter<any> = new EventEmitter()

  public visible = true;

  actionAllowed: boolean = false;
  roles: any;

  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              ) {


  }


  ngOnInit() {

    this.roles = localStorage.getItem('role')

    var rolesSliced = this.roles.slice(1, -1);
    var rolesSplited = rolesSliced.split(',');

    for(let role of rolesSplited){

      if (role.replace(/\s/g, '') === 'FANZONE_ADMIN') {

        this.actionAllowed = true;
      }

    }

  }

  editItem() {
      console.log('krenulo' + this.id);

      this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/edit/' + this.id);
  }

  deleteItem(): any {


    this.fanZoneService.deleteItem(this.id).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno obrisan rekvizit!');
        this.visible = false;

        this.refreshList.emit(data);
      })
  }

  itemReservation() {

    console.log('haha')

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items/item/reservation/' + this.id);
  }



}
