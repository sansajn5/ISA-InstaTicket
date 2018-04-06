import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'ngx-card-picker',
    templateUrl: './card-picker.component.html',
    styleUrls: ['./card-picker.component.scss'],
})
export class CardPickerComponent {

    @Input() type: string;
    @Input() image: string;
    @Input() url: string;

    constructor(private router: Router) {}

    onImgClick(): void {
        this.router.navigateByUrl(this.url);
     }

    onNameClick(): void {
      this.router.navigateByUrl(this.url);
    }
}
