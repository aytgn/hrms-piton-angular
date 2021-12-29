import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { editModeOff, editModeOn } from 'src/state/editMode/editMode.actions';
import { Employee } from 'src/state/employee/employee.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.scss'],
})
export class EmployeePageComponent implements OnInit, OnDestroy {
  employee: Observable<Employee> = new Observable();
  editMode: boolean = false;
  sub1: Subscription = new Subscription();
  constructor(
    private route: ActivatedRoute,
    private appStateService: AppStateService,
    private store: Store
  ) {}
  //Events
  editModeOn() {
    this.store.dispatch(editModeOn());
  }
  editModeOff() {
    this.store.dispatch(editModeOff());
  }

  ngOnInit(): void {
    this.employee = this.route.params.pipe(
      mergeMap((params) => {
        return this.appStateService.getEmployeeById(Number(params.employeeId));
      })
    ) as Observable<Employee>;
    this.sub1 = this.appStateService.getEditMode().subscribe((editMode) => {
      this.editMode = editMode;
      console.log(editMode);
    });
  }
  ngOnDestroy(): void {}
}
