import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';

const routes: Routes = [
  {
    path: 'employee_page/:employeeId',
    component: EmployeePageComponent,
  },
  {
    path: '',
    component: EmployeeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
