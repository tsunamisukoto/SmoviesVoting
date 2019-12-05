import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http: HttpClient) { }

  signIn = (request: SignInRequest): Promise<string> => {
    // return of(null).toPromise();
    return this.http.post<string>('api/auth/login', request, { responseType: 'text' })
      .toPromise().then(this.setSession);
  }
  private setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult.idToken);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
    return true;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  // getExpiration() {
  //   const expiration = localStorage.getItem("expires_at");
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }
}

export class SignInRequest {
  username: string;
  password: string;
}

export class SignInResponse {

}