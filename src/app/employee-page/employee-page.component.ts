import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
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
  paramId: number = 0;
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();
  loggedEmployee: Employee | undefined;
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
  submitChanges() {
    if (this.loggedEmployee == undefined || this.loggedEmployee.id == 0) {
      return console.log('no user logged');
    } else if (this.loggedEmployee.auth === 'admin') {
      console.log(this.employeeEditForm.value);
      fetch(`http://localhost:1337/api/employees/${this.paramId}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8', // Indicates the content
        },
        body: JSON.stringify({
          data: {
            name: this.employeeEditForm.value.name,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log('unaothorized!');
    }
  }
  //FORM
  employeeEditForm = new FormGroup({
    name: new FormControl(''),
  });

  //LIFECYCLE
  ngOnInit(): void {
    this.employee = this.route.params.pipe(
      mergeMap((params) => {
        return this.appStateService.getEmployeeById(Number(params.employeeId));
      })
    ) as Observable<Employee>;
    this.sub1 = this.appStateService.getEditMode().subscribe((editMode) => {
      this.editMode = editMode;
    });
    this.sub2 = this.route.params.subscribe((params) => {
      this.paramId = params.employeeId;
    });
    this.sub3 = this.appStateService
      .getLoggedEmployee()
      .subscribe((employee) => {
        this.loggedEmployee = employee;
      });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }
}
