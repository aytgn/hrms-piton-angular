import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Employee } from 'src/state/employee/employee.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee.page.component.html',
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  currentEmployee: Employee | undefined;
  currentEmployeeSub: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService
  ) {}
  ngOnInit(): void {
    this.currentEmployeeSub = this.route.params
      .pipe(
        mergeMap((params) => {
          return this.appStateService.getEmployeeById(
            Number(params.employeeId)
          );
        })
      )
      .subscribe((employee) => {
        this.currentEmployee = employee;
      });
  }
  ngOnDestroy(): void {
    this.currentEmployeeSub.unsubscribe();
  }
}
