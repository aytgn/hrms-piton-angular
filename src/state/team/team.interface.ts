import { Department } from '../department/department.interface';
import { Employee } from '../employee/employee.interface';

export interface Team {
  id: number;
  name: string;
  departmentId: number;
  employeeIds: Array<number>;
}
