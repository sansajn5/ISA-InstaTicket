import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector : 'ngx-new-offer',
  templateUrl: './offer-form.component.html',
  styleUrls: ['./offer-form.component.scss'],
})


export class OfferFormComponent implements OnInit{

  title_name = 'Novi oglas:';

  public form: FormGroup;
  public name: AbstractControl;
  public description: AbstractControl;
  public price: AbstractControl;
  public image: AbstractControl;
  public date : AbstractControl;

  licitation_date = "";

  constructor(private fb: FormBuilder,
              protected router: Router,
              private fanZoneService: FanZoneService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {


    this.form = this.fb.group({

      'name' : [''],
      'description' : [''],
      'price' : [''],
      'image' : [''],

    });

    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    this.price = this.form.controls['price'];
    this.image = this.form.controls['image'];


  }



  ngOnInit(){



  }

  confirmClick(){

  }

  closeNewOfferForm(): void{

    alert('DATUMM ' + document.getElementById('date_picker').getAttribute('date'));

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

  }

}
