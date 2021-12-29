import { createAction, props } from '@ngrx/store';
import { Employee } from '../employee/employee.interface';

export const loginEmployee = createAction(
  '[Login Page] Login Employee',
  props<{ employee: Employee }>()
);
