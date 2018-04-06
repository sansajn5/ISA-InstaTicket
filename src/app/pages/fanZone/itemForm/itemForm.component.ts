
import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanZoneService} from "../../../@theme/services/fanZone.service";
import {ToastrService} from 'ngx-toastr';
import {Item} from "../../../@theme/models/item.model";

@Component({
  selector : 'ngx-new-item',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.scss'],
})


export class ItemFormComponent {

  public form: FormGroup;
  public name: AbstractControl;
  public description: AbstractControl;
  public price: AbstractControl;
  public image: AbstractControl;
  item: Item;



  constructor(private fb: FormBuilder,
              protected router: Router,
              private fanZoneService: FanZoneService,
              private toastr: ToastrService) {

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

  closeNewItemForm(): void{

    this.router.navigateByUrl('dashboard/fanZoneItems');

  }


  addNewItem() {

    const item = new Item(this.name.value,
                          this.description.value,
                          this.image.value,
                          this.price.value,
                          );

    this.fanZoneService.addNewItem(item).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Uspesno dodat rekvizit!');

        this.router.navigateByUrl('dashboard/fanZoneItems');
      })
  }


}
