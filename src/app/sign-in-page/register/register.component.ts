import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService, RegisterRequest } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  public error: any;
  public formData: RegisterRequest;
  constructor(readonly authService: AuthenticationService, readonly route: Router) { }

  ngOnInit(): void {
    this.formData = {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      role: ''
    };
  }

  register = () => {
    if (!this.formData.username || !this.formData.password) {
      return;
    }
    this.authService.register(this.formData).then(response => {
      this.route.navigate(['/home']);
    }).catch(error => {
      this.error = error;
    });
  }
}
