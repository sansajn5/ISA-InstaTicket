import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../@theme/services/auth.service";
import {NbSpinnerService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'ngx-logout-helper',
  template: '',
})
export class LogoutHelperComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.logout();
    this.router.navigateByUrl('auth/sign-in');
    this.toastr.success('Uspešno ste se odjavili')
    this.spinnerService.registerLoader(this.authService.logout().toPromise()
      .then( () => {
        this.router.navigateByUrl('auth/sign-in');
        this.toastr.clear();
        this.toastr.success('Uspešno ste se odjavili')
      })
      .catch(
        error => {
        }));
    this.spinnerService.load();
  }

}
