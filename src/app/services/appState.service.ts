import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Employee } from 'src/state/employee/employee.interface';
import { selectDepartments } from 'src/state/selectors';
import { selectEmployees } from 'src/state/selectors';
import { filter, map, single } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _employees: Observable<Array<Employee>>;
  private _departments: Observable<Array<Department>>;
  constructor(private store: Store) {
    this._employees = this.store.select(selectEmployees);
    this._departments = this.store.select(selectDepartments);
  }
  getEmployees(): Observable<Array<Employee>> {
    return this._employees;
  }
  getDepartments(): Observable<Array<Department>> {
    return this._departments;
  }
  getEmployeeById(employeeId: number): Observable<Employee | undefined> {
    return this._employees.pipe(
      map((employees) => {
        return employees.find((employee) => {
          if (employee.id === employeeId) return true;
          else
            return {
              id: 0,
              name: 'string',
              auth: 'string',
              salary: 0,
              email: 'string',
              team: 'string',
              department: 'string',
            };
        });
      })
    );
  }
}
