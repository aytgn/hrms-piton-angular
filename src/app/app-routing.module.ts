import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';

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
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'graph',
    component: DoughnutChartComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
