import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private readonly http: HttpClient) { }

  signIn = (request: SignInRequest): Promise<SignInResponse> => {
    return of(null).toPromise();
    //return this.http.post<SignInResponse>('test', request).toPromise();
  }
}

export class SignInRequest {
  username: string;
  password: string;
}

export class SignInResponse {

}