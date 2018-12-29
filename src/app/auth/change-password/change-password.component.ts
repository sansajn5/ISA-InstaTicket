import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../@theme/services/auth.service";
import {NbSpinnerService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'ngx-change-password',
  styleUrls: ['./change-password.component.scss'],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent {

  public form: FormGroup;
  public password: AbstractControl;
  public rePassword: AbstractControl;

  constructor(private fb: FormBuilder,
              protected router: Router,
              private authService: AuthService,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      'password': ['', Validators.compose([Validators.required])],

      'rePassword': ['', Validators.compose([Validators.required])],
    });
    this.password = this.form.controls['password'];
    this.rePassword = this.form.controls['rePassword'];

  }

  changePassword(): void {
    if(this.password.value === this.rePassword.value) {
      this.spinnerService.registerLoader(this.authService.changedRole(this.password.value,this.rePassword.value).toPromise().then(data => {
        this.router.navigateByUrl('auth/login');
      }))
      this.spinnerService.load();
    }else 
    this.toastr.error('Sifre se moraju poklapati', 'Greska');
  }

  onLogin() {
    this.router.navigateByUrl('auth/login');
  }

}
