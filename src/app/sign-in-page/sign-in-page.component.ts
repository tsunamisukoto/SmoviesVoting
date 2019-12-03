import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService, SignInRequest } from './authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent implements OnInit {
  public error: any;
  public formData: SignInRequest;
  constructor(readonly authService: AuthenticationService, readonly route: Router) { }

  ngOnInit(): void {
    this.formData = {
      username: '',
      password: ''
    };
  }

  signIn = () => {
    if (!this.formData.username || !this.formData.password) {
      return;
    }
    this.authService.signIn(this.formData).then(response => {
      this.route.navigate(['/home']);
    }).catch(error => {
      this.error = error;
    });
  }
}
