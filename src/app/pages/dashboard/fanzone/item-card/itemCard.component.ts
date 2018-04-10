import {Component, EventEmitter, Input, Output} from "@angular/core";
import { Router } from '@angular/router';
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector : 'ngx-item-card',
  templateUrl: './itemCard.component.html',
  styleUrls: ['./itemCard.component.scss'],
})


export class ItemCardComponent {

  @Input() image: string;
  @Input() name: string;
  @Input() description: string;
  @Input() price: string;
  @Input() id: any;

  @Output() refreshList:EventEmitter<any> = new EventEmitter()

  public visible = true;

  constructor(private fanZoneService: FanZoneService,
              protected router: Router,
              private toastr: ToastrService,
              ) {


  }


  ngOnInit() {


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



}
