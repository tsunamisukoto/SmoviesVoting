import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../sign-in-page/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(readonly authService: AuthenticationService) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.authToken()) {
            req = req.clone({
                setHeaders: {
                    auth: this.authService.authToken()
                }
            });
        }
        return next.handle(req);
    }
}
