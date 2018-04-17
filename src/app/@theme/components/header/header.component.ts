import { Component, Input, OnInit } from '@angular/core';
import {  NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [
    { title: 'My Profile' },  
    { title: 'Odjavi se' },
  ];

  constructor(private sidebarService: NbSidebarService,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  goToHome() {
    this.router.navigateByUrl('');
  }

  menuClick(event) {
    if(event.title === 'Odjavi se') {
      this.logout();
    } else if (event.title === 'My Profile') {
      const username = localStorage.getItem('user');
      this.router.navigateByUrl(`dashboard/user/profile/${username}`);
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('auth/login');
    this.toastr.success('Uspešno ste se odjavili')
  }

}
