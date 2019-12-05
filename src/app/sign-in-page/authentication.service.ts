import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http: HttpClient) { }

  signIn = (request: SignInRequest): Promise<string> => {
    // return of(null).toPromise();
    return this.http.post<{token: string}>('api/auth/login', request)
      .pipe(map(token => this.setSession(token.token)))
      .toPromise();
  }

  register = (request: RegisterRequest): Promise<string> => {
    // return of(null).toPromise();
    return this.http.post<{token: string}>('api/auth/register', request)
      .pipe(map(token => this.setSession(token.token)))
      .toPromise();
  }
  private setSession = (authResult: string): string => {
    // const expiresAt = moment().add(authResult.expiresIn, 'second');

    localStorage.setItem('id_token', authResult);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    return authResult;
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

  authToken(): string {
    return localStorage.getItem('id_token') as string;
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

export class RegisterRequest {
  username: string;
  password: string;
  confirmPassword: string;
  role: string;
}
export class SignInResponse {

}