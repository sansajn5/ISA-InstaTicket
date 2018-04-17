import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../@theme/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { User } from '../../@theme/models/user.model';
import { NbSpinnerService } from '@nebular/theme';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-sign-in',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  user: User;

  constructor(private fb: FormBuilder,
              protected router: Router,
              private authService: AuthService,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(5)])],
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  signIn(): any {
    const user = new User(this.username.value, this.password.value);
    this.spinnerService.registerLoader(this.authService.signIn(user).toPromise()
      .then(data => {
        localStorage.setItem('token', data.id_token);
        localStorage.setItem('user', data.username);
        localStorage.setItem('role',data.role);
        this.toastr.clear();
        this.toastr.success('Prijavljivanje uspešno', 'Dobrodošli ' + data.username);
        this.router.navigateByUrl('dashboard');
      })
      .catch(
        error => {
          this.toastr.error('Doslo je do greske na serveru', 'Greska' );
        }))
    this.spinnerService.load();
  }

  onRegister(): void {
    this.router.navigateByUrl('auth/sign-up');
  }

}
