import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Employee } from 'src/state/employee/employee.interface';
import {
  selectDepartments,
  selectLoggedEmployee,
  selectTeams,
} from 'src/state/selectors';
import { selectEmployees } from 'src/state/selectors';
import { map } from 'rxjs/operators';
import { Team } from 'src/state/team/team.interface';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private _employees: Observable<Array<Employee>>;
  private _departments: Observable<Array<Department>>;
  private _teams: Observable<Array<Team>>;
  private _loggedEmployee: Observable<Employee>;

  constructor(private store: Store) {
    this._employees = this.store.select(selectEmployees);
    this._departments = this.store.select(selectDepartments);
    this._teams = this.store.select(selectTeams);
    this._loggedEmployee = this.store.select(selectLoggedEmployee);
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
  getLoggedEmployee(): Observable<Employee> {
    return this._loggedEmployee;
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
  getTeamsSalary(): Observable<{ teamName: string; teamSalary: number }[]> {
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
          teamSalaryArray.push({ teamName: team.name, teamSalary: teamSalary });
        });
        return teamSalaryArray;
      })
    );
  }
  getDepartmentsSalary(): Observable<
    { departmentName: string; departmentSalary: number }[]
  > {
    return combineLatest([
      this._departments,
      this._employees,
      this._teams,
    ]).pipe(
      map((data) => {
        const departmentsArr = data[0];
        const employeesArr = data[1];
        const teamsArr = data[2];
        const departmentSalaryArr: Array<{
          departmentName: string;
          departmentSalary: number;
        }> = [];
        departmentsArr.forEach((department) => {
          const departmentTeamIds = department.teamIds;
          const departmentTeams = teamsArr.filter((team) => {
            return departmentTeamIds.includes(team.id);
          });
          const departmentEmployeesId: Array<any> = [];
          departmentTeams.forEach((team) => {
            departmentEmployeesId.push(...team.employeeIds);
          });
          const departmentEmployees = employeesArr.filter((employee) => {
            return departmentEmployeesId.includes(employee.id);
          });
          let departmentSalary: number = 0;
          departmentEmployees.forEach((employee) => {
            departmentSalary += employee.salary;
          });
          departmentSalaryArr.push({
            departmentName: department.name,
            departmentSalary: departmentSalary,
          });
        });
        return departmentSalaryArr;
      })
    );
  }
  getTeamsByDepartment(department: Department) {
    return this._teams.pipe(
      map((teams) => {
        return teams.filter((team) => {
          return department.teamIds.includes(team.id);
        });
      })
    );
  }
  getEmployeesByTeam(team: Team) {
    return this._employees.pipe(
      map((employees) => {
        return employees.filter((employee) => {
          return team.employeeIds.includes(employee.id);
        });
      })
    );
  }
  getEmployeeByEmail(email: string): Observable<Employee | undefined> {
    return this._employees.pipe(
      map((employees) => {
        return employees.find((employee) => {
          return employee.email === email;
        });
      })
    );
  }
}
