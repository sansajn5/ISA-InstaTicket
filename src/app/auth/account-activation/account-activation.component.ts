import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../@theme/services/auth.service";
import {NbSpinnerService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'ngx-account-activation',
  template: `
    <div class="auth-block">
      <!--<img class="logo" [src]="'assets/logo.png'" alt="logo">-->
      <h2 class="title">{{showResponse}}</h2>
      <button class="btn btn-hero-success" *ngIf="success" (click)="onLogin()">Prijavi se</button>
    </div>
  `,
})
export class AccountActivationComponent implements OnInit {

  private key: string;
  private showResponse: string;
  private success: boolean;

  constructor(protected router: Router,
              private authService: AuthService,
              private spinnerService: NbSpinnerService,
              private activeRouter: ActivatedRoute,) {}

  ngOnInit(): void {
    this.activeRouter.queryParams.subscribe(params => {
      this.key = params['key'];
    });
    this.spinnerService.registerLoader(this.authService.activeAccount(this.key).toPromise()
      .then(data => {
        console.log(data);
        this.showResponse = 'Uspesno ste aktivirali Vas nalog.';
        this.success = true;
      })
      .catch(
        error => {
          this.showResponse = 'Nalog sa ovim kljucem je vec aktiviran ili je kljuc pogresan!';
          this.success = false;
        }))
    this.spinnerService.load();
  }

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

}
