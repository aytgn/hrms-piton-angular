import { createReducer, on } from '@ngrx/store';
import { retrieveEmployees } from './employee.actions';
import { Employee } from './employee.interface';

export const initialState: Array<Employee> = [];

export const employeeReducer = createReducer(
  initialState,
  on(retrieveEmployees, (state, { employees }) => {
    return employees;
  })
);
