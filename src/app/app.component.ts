import { Component } from '@angular/core';
import { AuthenticationService } from './sign-in-page/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'voting-app';
  constructor() {

  }
  logout = (): void => {
  }
}
