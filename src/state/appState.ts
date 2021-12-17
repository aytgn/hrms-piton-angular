import { Department } from './department/department.interface';
import { Employee } from './employee/employee.interface';

export interface AppState {
  employees: Array<Employee>;
  departments: Array<Department>;
}
