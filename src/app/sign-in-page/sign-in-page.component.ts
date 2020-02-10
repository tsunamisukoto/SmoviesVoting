import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthenticationService, SignInRequest } from './authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService, FacebookLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInPageComponent implements OnInit {
  public error: any;
  public formData: SignInRequest;
  returnUrl: string;
  constructor(readonly authService: AuthenticationService,
    readonly route: ActivatedRoute,
    readonly router: Router,
    private externalAuth: AuthService) {

  }

  ngOnInit(): void {
    this.formData = {
      username: '',
      password: ''
    };
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  signIn = () => {
    if (!this.formData.username || !this.formData.password) {
      return;
    }
    this.authService.signIn(this.formData).then(response => {
      this.router.navigate([this.returnUrl]);
    }).catch(error => {
      this.error = error;
    });
  }
  signInWithFB(): void {
    this.authService.signInWithFacebook({
      "id": "10157095968229565",
      "name": "Scott Becker",
      "email": "tsunamisukoto@hotmail.com",
      "photoUrl": "https://graph.facebook.com/10157095968229565/picture?type=normal",
      "firstName": "Scott",
      "lastName": "Becker",
      "authToken": "EAAGdH8hpe8ABADVEAyLOoiU6PiepTIuVBCyUzMMOmUUm5YhmaS7iqn4EiUbcE7CkQGU8Aw2ZAIG71RZCQwBjTAemSZBM3gcu4A7ogFdkHo9elEgBPtt4eNjggKBexl2uW2pxW7rlwuOEGFZAywuHvk1NCZC6WzHwrKd57HcSyaoXKPW0I6ocecFWZAmjluDi2CDhKlZBlxFPAZDZD",
      "facebook": {
        "name": "Scott Becker",
        "email": "tsunamisukoto@hotmail.com",
        "picture":
        {
          "data":
          {
            "height": 50,
            "is_silhouette": false,
            "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10157095968229565&height=50&width=50&ext=1579484711&hash=AeSuSVa6Vniib7KQ",
            "width": 50

          }
        },
        "first_name": "Scott",
        "last_name": "Becker",
        "id": "10157095968229565"
      },
      "provider": "FACEBOOK"
    } as any).then((response) =>
      this.router.navigate([this.returnUrl])
    );
    // this.externalAuth.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
    //   return user;
    // }).then(this.authService.signInWithFacebook).then((response) =>
    //   this.route.navigate(['/home'])
    // );
  }
}
