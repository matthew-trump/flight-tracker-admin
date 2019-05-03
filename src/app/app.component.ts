import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedInRoutes: any[] = [
    { route: ['admin'], label: 'Admin' }
  ]

  constructor(
    public authService: AuthService,
    public backendervice: BackendService,
    private router: Router) {
  }


  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
