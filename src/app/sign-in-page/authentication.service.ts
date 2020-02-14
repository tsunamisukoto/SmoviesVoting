import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SocialUser } from 'angularx-social-login';
import * as  moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http: HttpClient) { }
  signInWithFacebook = (user: SocialUser): Promise<any> => {
    return this.http.post<SignInResponse>('api/auth/facebookLogin', user)
      .pipe(map(token => this.setSession(token)))
      .toPromise();
  }
  signIn = (request: SignInRequest): Promise<SignInResponse> => {
    return this.http.post<SignInResponse>('api/auth/login', request)
      .pipe(map(token => this.setSession(token)))
      .toPromise();
  }

  register = (request: RegisterRequest): Promise<SignInResponse> => {
    return this.http.post<SignInResponse>('api/auth/register', request)
      .toPromise().then(response => this.setSession(response));
  }
  private setSession = (authResult: SignInResponse): SignInResponse => {
    const expiresAt = moment().add(authResult.expiresIn, 'hour');

    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    return authResult;
  }

  logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  isLoggedIn = (): boolean => {
    console.log((this.getExpiration()));
    console.log(moment().isBefore(this.getExpiration()));
    return localStorage.getItem('id_token') && moment().isBefore(this.getExpiration());
  }

  isLoggedOut = (): boolean => {
    return !this.isLoggedIn();
  }

  authToken(): string {
    return localStorage.getItem('id_token') as string;
  }

  getExpiration = (): any => {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

export class SignInRequest {
  username: string;
  password: string;
}

export class RegisterRequest {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
  role: string;
}
export class SignInResponse {
  token: string;
  expiresIn: string;
}
