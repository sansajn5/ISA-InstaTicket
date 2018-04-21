import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS, MENU_USER} from './pages-menu';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;
  roles: any;
  flag:boolean = false;
   ngOnInit() {

     this.roles = localStorage.getItem('role')

     var rolesSliced = this.roles.slice(1, -1);
     var rolesSplited = rolesSliced.split(',');


     for(let role of rolesSplited){

       if (role.replace(/\s/g, '') === 'ADMIN') {
         this.menu = MENU_ITEMS;
         this.flag=true;
       } else if (role.replace(/\s/g, '') !== 'ADMIN' && this.flag === false) {
         this.menu = MENU_USER;
       }
}

