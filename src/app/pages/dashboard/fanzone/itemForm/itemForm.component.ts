
import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FanZoneService} from "../../../../@theme/services/fanZone.service";
import {ToastrService} from 'ngx-toastr';
import {Item} from "../../../../@theme/models/item.model";


@Component({
  selector : 'ngx-new-item',
  templateUrl: './itemForm.component.html',
  styleUrls: ['./itemForm.component.scss'],
})


export class ItemFormComponent implements OnInit{

  public form: FormGroup;
  public name: AbstractControl;
  public description: AbstractControl;
  public price: AbstractControl;
  public image: AbstractControl;
  item: Item;

  public id: any;

  @Output() refreshList:EventEmitter<any> = new EventEmitter()

  public mode = 'new';
  public title_name = 'Novi rekvizit: ';
  public method_name = 'DODAJ';



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
      const mode = this.route.snapshot.params.mode;

      if(mode == 'edit') {

        const idItem = this.route.snapshot.params.id;
          this.fanZoneService.getItemData(idItem).subscribe(data => {

            this.title_name = 'Izmeni rekvizit: ';
            this.method_name = 'IZMENI';


            this.form.controls['name'].setValue(data.item.name);
            this.form.controls['description'].setValue(data.item.description);
            this.form.controls['price'].setValue(data.item.price);
            this.form.controls['image'].setValue(data.item.image);

          })

      }else if(mode == 'add') {
        console.log('ddkkd')
      }
      else{
        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items')
      }


  }



  closeNewItemForm(): void{

    this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

  }


  confirmClick() {

    if (this.method_name === 'DODAJ'){
      this.addNewItem();
    }
    else{
      this.editItem();
    }
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

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');
      })
  }


  editItem() {

    const item = new Item(
      this.name.value,
      this.description.value,
      this.image.value,
      this.price.value,
    );

    this.id = this.route.snapshot.params.id;

    this.fanZoneService.editItem(item, this.id).toPromise()
      .then(data=>{
        this.toastr.clear();
        this.toastr.success('Uspesno izmenjen rekvizit!');

        this.router.navigateByUrl('dashboard/pages/fan-zone/fan-zone-items');

        this.refreshList.emit(data);
      })

  }



}
