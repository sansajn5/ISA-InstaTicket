import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created by <b><a href="http://www.github.com/sansajn5" target="_blank">sansajn</a></b> 2018</span>
    <div class="socials">
      <a href="http://www.github.com/sansajn5" target="_blank" class="ion ion-social-github"></a>
    </div>
  `,
})
export class FooterComponent {
}
