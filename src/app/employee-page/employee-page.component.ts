import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { Employee } from 'src/state/employee/employee.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  employee: Observable<Employee> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService
  ) {}
  ngOnInit(): void {
    this.employee = this.route.params.pipe(
      mergeMap((params) => {
        return this.appStateService.getEmployeeById(Number(params.employeeId));
      })
    ) as Observable<Employee>;
  }
  ngOnDestroy(): void {}
}
