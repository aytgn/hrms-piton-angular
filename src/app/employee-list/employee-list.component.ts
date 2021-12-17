import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Employee } from 'src/state/employee/employee.interface';
import { AppStateService } from '../services/appState.service';
import { EmployeeListService } from './employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  providers: [EmployeeListService],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  //SUBSCRIPTIONS
  getEmployeesSub: Subscription = new Subscription();
  filterFormSub: Subscription = new Subscription();
  constructor(
    private appStateService: AppStateService,
    private employeeListService: EmployeeListService
  ) {}
  employees: Array<Employee> = [];
  filteredEmployees: Array<Employee> = [];

  //form

  filterForm = new FormGroup({
    idFilter: new FormControl(''),
    nameFilter: new FormControl(''),
    salaryFilter: new FormControl(''),
    emailFilter: new FormControl(''),
    teamFilter: new FormControl(''),
    departmentFilter: new FormControl(''),
  });

  ngOnInit() {
    this.getEmployeesSub = this.appStateService
      .getEmployees()
      .subscribe((employees) => {
        this.employees = employees;
        this.filteredEmployees = this.employees;
      });

    this.filterFormSub = this.filterForm.valueChanges.subscribe(
      ({
        idFilter: id,
        nameFilter: name,
        salaryFilter: salary,
        emailFilter: email,
        teamFilter: team,
        departmentFilter: department,
      }) => {
        this.filteredEmployees = this.employees
          .filter((employee) => {
            return id != '' ? employee.id === Number(id) : true;
          })
          .filter((employee) => {
            return name != ''
              ? employee.name.toLowerCase().includes(name.toLowerCase())
              : true;
          })
          .filter((employee) => {
            return salary != '' ? employee.salary > Number(salary) : true;
          })
          .filter((employee) => {
            return email != ''
              ? employee.email.toLowerCase().includes(email.toLowerCase())
              : true;
          })
          .filter((employee) => {
            return team != ''
              ? employee.team.toLowerCase().includes(team.toLowerCase())
              : true;
          })
          .filter((employee) => {
            return department != ''
              ? employee.department
                  .toLowerCase()
                  .includes(department.toLowerCase())
              : true;
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.getEmployeesSub.unsubscribe();
    this.filterFormSub.unsubscribe();
  }
}
