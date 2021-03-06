import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from 'src/state/employee/employee.interface';
import { AppStateService } from '../services/appState.service';
import { EmployeeListService } from './employee-list.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  providers: [EmployeeListService],
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  //SUBSCRIPTIONS
  getEmployeesSub: Subscription = new Subscription();
  filterFormSub: Subscription = new Subscription();
  //CONSTRUCTOR
  constructor(
    private appStateService: AppStateService,
    private employeeListService: EmployeeListService,
    private router: Router
  ) {}
  //MAIN SELECTORS
  employees: Array<Employee> = [];
  filteredEmployees: Array<Employee> = [];
  filterForm = new FormGroup({
    idFilter: new FormControl(''),
    nameFilter: new FormControl(''),
    salaryFilter: new FormControl(''),
    emailFilter: new FormControl(''),
    teamFilter: new FormControl(''),
    departmentFilter: new FormControl(''),
  });
  goEmployeePage(event: any) {
    if (event.target.nodeName === 'BUTTON') {
      const employeeId = Number(
        event.target.parentNode.parentNode.firstChild.firstChild.nodeValue
      );
      console.log(employeeId);
      this.router.navigate(['/employee_page', employeeId]);
    }
  }
  //LIFECYCLE METHODS
  ngOnInit() {
    //Get Employees from STATE
    this.getEmployeesSub = this.appStateService
      .getEmployees()
      .subscribe((employees) => {
        this.employees = employees;
        this.filteredEmployees = this.employees;
      });
    // Filter Employees
    this.filterFormSub = this.filterForm.valueChanges.subscribe(
      ({
        idFilter: id,
        nameFilter: name,
        salaryFilter: salary,
        emailFilter: email,
        teamFilter: team,
        departmentFilter: department,
      }) => {
        this.filteredEmployees = this.employeeListService.filterEmployees(
          this.employees,
          { id, name, salary, email, team, department }
        );
      }
    );
  }
  ngOnDestroy(): void {
    //Unsubscribe
    this.getEmployeesSub.unsubscribe();
    this.filterFormSub.unsubscribe();
  }
}
