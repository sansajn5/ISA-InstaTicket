import { Component, Input } from '@angular/core';

@Component({
    selector: 'ngx-card-picker',
    templateUrl: './card-picker.component.html',
    styleUrls: ['./card-picker.component.scss'],
})
export class CardPickerComponent {

    @Input() type: string;
    @Input() image: string;


    onImgClick(): void { }
}