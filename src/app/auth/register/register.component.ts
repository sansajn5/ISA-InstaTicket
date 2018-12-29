import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NbSpinnerService} from '@nebular/theme';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../@theme/models/user.model';
import {AuthService} from '../../@theme/services/auth.service';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {

  public form: FormGroup;
  public username: AbstractControl;
  public password: AbstractControl;
  public rePassword: AbstractControl;
  public email: AbstractControl;
  public name: AbstractControl;
  public lastName: AbstractControl;
  public city: AbstractControl;
  public address: AbstractControl;
  public number: AbstractControl;
  public submitted: boolean = false;
  user: User;

  constructor(private fb: FormBuilder,
              protected router: Router,
              private authService: AuthService,
              private spinnerService: NbSpinnerService,
              private toastr: ToastrService) {
    this.form = this.fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      'rePassword': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)])],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(12)])],
      'city': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      'address': ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])],
      'number': ['', Validators.compose([Validators.required, Validators.minLength(9), Validators.maxLength(15)])],
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
    this.rePassword = this.form.controls['rePassword'];
    this.email = this.form.controls['email'];
    this.name = this.form.controls['name'];
    this.lastName = this.form.controls['lastName'];
    this.city = this.form.controls['city'];
    this.address = this.form.controls['address'];
    this.number = this.form.controls['number'];
  }

  signUp(): any {
    const user = new User(this.username.value,
                          this.password.value,
                          this.rePassword.value,
                          this.name.value,
                          this.lastName.value,
                          this.email.value,
                          this.city.value,
                          this.address.value,
                          this.number.value,
                          );
    if(this.password.value !== this.rePassword.value)
       this.toastr.error('Unete sifre se moraju podudarati!');
    else {
      this.spinnerService.registerLoader(this.authService.signUp(user).toPromise()
        .then(data => {
          this.toastr.clear();
          this.toastr.success('Procitajte Vas email' + this.email.value, 'Uspešna registracija');
          return this.router.navigateByUrl('auth/login');
        })
        .catch(
          error => {
            this.toastr.error('Doslo je do greske na serveru', 'Greska' );
          }))
      this.spinnerService.load();
      }
  }

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

}
