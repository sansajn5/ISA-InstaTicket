import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Offer} from "../../../../@theme/models/offer.model";

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
  public date: any;

  public dateValid: boolean = true;

  constructor(private fb: FormBuilder,
              protected router: Router,
              private fanZoneService: FanZoneService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {


    this.form = this.fb.group({

      'name' : ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description' : ['', Validators.compose([Validators.required,
        Validators.minLength(3), Validators.maxLength(200)])],
      'price' : ['', Validators.compose([Validators.required,
        Validators.pattern('[0-9]+')])],
      'image' : ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],

    });

    this.name = this.form.controls['name'];
    this.description = this.form.controls['description'];
    this.price = this.form.controls['price'];
    this.image = this.form.controls['image'];


  }



  ngOnInit(){



  }

  confirmClick(){

    this.addNewOffer();
  }


  checkDate(date: string) {

    let entered_date = new Date(date);

    let today_date = new Date();

    if(entered_date <= today_date) {
      this.dateValid = false;
    }

  }


  addNewOffer() {




    let date = document.getElementById('date_picker').getAttribute('date');

    this.dateValid = true;
    this.checkDate(date);

    if (date === 'undefined-undefined-undefined') {



      this.toastr.clear();
      this.toastr.error('Obavezan unos datuma isticanja licitacije');

    }

    else if (!this.dateValid) {

      this.toastr.clear();
      this.toastr.error('Pogresno unet datum isticanja licitacije');

    }

    else {

      const offer = new Offer(
        this.name.value,
        this.description.value,
        this.image.value,
        this.price.value,
        date,
      );
      this.fanZoneService.addOffer(offer).toPromise()
        .then(data=>{
          this.toastr.clear();
          this.toastr.success('Uspesno dodat oglas!');

          this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
        })

    }

  }





  closeNewOfferForm(): void{

    //alert('DATUMM ' + document.getElementById('date_picker').getAttribute('date'));

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

  }

}
