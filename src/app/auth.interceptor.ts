import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

const PROTECTED_PATH: string = environment.apiPath;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const l = document.createElement("a");
        l.href = req.url;

        if (l.pathname.startsWith(PROTECTED_PATH)) {
            const idToken = localStorage.getItem("id_token");
            if (idToken) {
                const cloned = req.clone({
                    headers: req.headers.set("Authorization", "Bearer " + idToken)
                });
                return next.handle(cloned);
            }
            else {
                return next.handle(req);
            }
        } else {
            return next.handle(req);
        }




    }
}
