import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { TestApiResponse } from './test-api-response';

const BACKEND_URL: string = environment.backendUrl;
const LOGIN_PATH: string = environment.loginPath;
const API_PATH: string = environment.apiPath;

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) { }


    getBaseApiPath(): string {
        const url: string = BACKEND_URL;
        const apiPath: string = API_PATH;
        return url + apiPath;
    }
    login(username: string, password: string) {
        console.log("logging in to backend");
        return this.http.post<any>(BACKEND_URL + LOGIN_PATH, { username, password })
    }
    ping(): Observable<TestApiResponse> {
        const url: string = BACKEND_URL;
        return this.http.get<TestApiResponse>(url + '/ping');
    }
    protected(): Observable<TestApiResponse> {
        return this.http.get<TestApiResponse>(this.getBaseApiPath());
    }

}