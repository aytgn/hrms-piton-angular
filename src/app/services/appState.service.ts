import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Employee } from 'src/state/employee/employee.interface';
import { selectDepartments } from 'src/state/selectors';
import { selectEmployees } from 'src/state/selectors';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _employees: Observable<Array<Employee>>;
  private _departments: Observable<Array<Department>>;
  constructor(private store: Store) {
    this._employees = this.store.select(selectEmployees);
    this._departments = this.store.select(selectDepartments);
  }
  getEmployees() {
    return this._employees;
  }
  getDepartments() {
    return this._departments;
  }
}
