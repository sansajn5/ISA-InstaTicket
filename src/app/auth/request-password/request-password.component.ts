import {Component} from "@angular/core";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../@theme/services/auth.service";
import {NbSpinnerService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {RequestPassword} from "../../@theme/models/RequestPassword";

@Component({
  selector: 'ngx-forgor-password',
  styleUrls: ['./request-password.component.scss'],
  templateUrl: './request-password.component.html',
})
export class RequestPasswordComponent {

  public form: FormGroup;
  public email: AbstractControl;

  constructor(private fb: FormBuilder,
              protected router: Router,
              private authService: AuthService,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      'email': ['', Validators.compose([Validators.required , Validators.minLength(5), Validators.maxLength(20)])],
     });
    this.email = this.form.controls['email'];

  }

  requestPassword(): any {
    const requestPassword = new RequestPassword (
      this.email.value,

    );
    this.authService.requestPassword(requestPassword).toPromise()
      .then(data => {
        this.toastr.clear();
        this.toastr.success('Uspesno !');
      })
  }
  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }
}
