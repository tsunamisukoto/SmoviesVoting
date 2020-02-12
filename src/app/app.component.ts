import { Component } from '@angular/core';
import { AuthenticationService } from './sign-in-page/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'voting-app';
  constructor(readonly authService: AuthenticationService, readonly router: Router) {

  }
  logout = (): void => {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
