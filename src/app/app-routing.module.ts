import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TestApiComponent } from './test-api/test-api.component';
import { AdminComponent } from './admin/admin.component';
import { ConfigEventsComponent } from './config-events/config-events.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'test-api', pathMatch: 'full', component: TestApiComponent },
  {
    path: 'admin', canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', component: AdminComponent },
      { path: 'config-events', pathMatch: 'full', component: ConfigEventsComponent },
    ],

  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
