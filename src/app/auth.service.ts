import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

import * as moment from "moment";

const BACKEND_URL: string = environment.backendUrl;
const LOGIN_PATH: string = environment.loginPath;

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private backendService: BackendService) { }

    login(username: string, password: string) {
        return this.backendService.login(username, password)
            .pipe(
                tap(res => this.setSession(res)),
                tap(_ => console.log('Successfully logged in')),
                shareReplay(1)
            );
    }
    private setSession(authResult) {
        console.log("expiresIn", authResult.expiresIn);
        const expiresAt = moment().add(authResult.expiresIn, 'second');
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
        localStorage.setItem("username", authResult.username);
    }
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("username");
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    public getLoggedInUser() {
        if (this.isLoggedIn()) {
            return localStorage.getItem("username");
        }
        return null;
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
