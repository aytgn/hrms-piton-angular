import { createAction, props } from '@ngrx/store';
import { Employee } from './employee.interface';

export const retrieveEmployees = createAction(
  '[Employee List] Retrieve Employees',
  props<{ employees: Array<Employee> }>()
);
