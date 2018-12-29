import {Component, Input} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import { ChangeDetectorRef } from '@angular/core';
import {element} from "protractor";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.html',
  styleUrls: ['./datepicker-popup.scss'],
  host: {
    "[attr.date]" : "date"
  }
})
export class NgbdDatepickerPopup {

  message:Subject<string> = new BehaviorSubject('loading :(');

  model : any;


  date: any = 'undefined-undefined-undefined';

  public form: FormGroup;
  public dateInput: AbstractControl;

  constructor(private fb: FormBuilder,
              private cdRef: ChangeDetectorRef ){

    this.form = this.fb.group({
      'dateInput' : [''],
    })

    this.dateInput = this.form.controls['dateInput'];


  }

  change() {

     var dat = [];


    for(let prop in this.model) {
      console.log(this.model[prop]);
      dat.push(this.model[prop]);
    }

    this.date = dat[0] + '-' + dat[1] + '-' + dat[2];


    console.log(this.date)
    this.cdRef.detectChanges();
    this.message.next('all done loading');
  }



}
