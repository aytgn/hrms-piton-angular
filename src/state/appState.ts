import { Department } from './department/department.interface';
import { Employee } from './employee/employee.interface';
import { Team } from './team/team.interface';

export interface AppState {
  employees: Array<Employee>;
  departments: Array<Department>;
  teams: Array<Team>;
  loggedEmployee: Employee;
}
