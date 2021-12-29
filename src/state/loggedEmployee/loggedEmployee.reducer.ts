import { createReducer, on } from '@ngrx/store';
import { Employee } from '../employee/employee.interface';
import { loginEmployee } from './loggedEmployee.actions';

export const initialState: Employee = {
  id: 0,
  name: '',
  auth: '',
  salary: 0,
  email: '',
  team: '',
  department: '',
  phone: '',
  address: '',
  imageUrl: '',
};

export const loggedEmployeeReducer = createReducer(
  initialState,
  on(loginEmployee, (state, { employee }) => {
    return employee;
  })
);
