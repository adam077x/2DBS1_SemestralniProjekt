import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'reports', component: ReportsComponent }
];
