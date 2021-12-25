import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, concat, forkJoin, merge, Observable } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Employee } from 'src/state/employee/employee.interface';
import { selectDepartments, selectTeams } from 'src/state/selectors';
import { selectEmployees } from 'src/state/selectors';
import { map } from 'rxjs/operators';
import { Team } from 'src/state/team/team.interface';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _employees: Observable<Array<Employee>>;
  private _departments: Observable<Array<Department>>;
  private _teams: Observable<Array<Team>>;

  constructor(private store: Store) {
    this._employees = this.store.select(selectEmployees);
    this._departments = this.store.select(selectDepartments);
    this._teams = this.store.select(selectTeams);
  }
  getEmployees(): Observable<Array<Employee>> {
    return this._employees;
  }
  getDepartments(): Observable<Array<Department>> {
    return this._departments;
  }
  getTeams(): Observable<Array<Team>> {
    return this._teams;
  }
  getEmployeeById(employeeId: number): Observable<Employee | undefined> {
    return this._employees.pipe(
      map((employees) => {
        return employees.find((employee) => {
          return employee.id === employeeId;
        });
      })
    );
  }
  getNumberOfEmployees(): Observable<number> {
    return this._employees.pipe(
      map((employees) => {
        return employees.length;
      })
    );
  }
  getNumberOfDepartments(): Observable<number> {
    return this._departments.pipe(
      map((departments) => {
        return departments.length;
      })
    );
  }
  getNumberOfTeams(): Observable<number> {
    return this._teams.pipe(
      map((teams) => {
        return teams.length;
      })
    );
  }
  getMonthlySalaryExpense(): Observable<number> {
    return this._employees.pipe(
      map((employees) => {
        let expense: number = 0;
        employees.forEach((employee) => {
          expense += employee.salary;
        });
        return expense;
      })
    );
  }
  getTeamEmployeeIds(teamId: number) {
    return this._teams.pipe(
      map((teams) => {
        return teams.find((team) => team.id === teamId);
      }),
      map((team) => {
        return team?.employeeIds;
      })
    );
  }
  getTeamsSalary() {
    return combineLatest([this._teams, this._employees]).pipe(
      map((data) => {
        const teamsArray = data[0];
        const employeeArray = data[1];

        const teamSalaryArray: any[] = [];
        teamsArray.forEach((team) => {
          let teamSalary = 0;
          const teamEmployees = employeeArray.filter((employee) => {
            return team.employeeIds.includes(employee.id);
          });
          teamEmployees.forEach((employee) => {
            teamSalary += employee.salary;
          });
          console.log(team.name);
          console.log(teamSalary);

          teamSalaryArray.push({ teamName: team.name, teamSalary: teamSalary });
          console.log(teamSalaryArray);
        });
      })
    );
  }
}
