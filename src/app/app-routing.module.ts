import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentsPageComponent } from './departments-page/departments-page.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';

const routes: Routes = [
  {
    path: 'employee_page/:employeeId',
    component: EmployeePageComponent,
  },
  {
    path: 'employee_list',
    component: EmployeeListComponent,
  },
  {
    path: 'departments_page',
    component: DepartmentsPageComponent,
  },
  {
    path: 'teams_page',
    component: TeamsPageComponent,
  },
  {
    path: 'login_page',
    component: LoginPageComponent,
  },
  {
    path: 'home_page',
    component: DashboardComponent,
  },
  {
    path: '',
    redirectTo: '/login_page',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
