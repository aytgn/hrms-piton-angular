import { createAction, props } from '@ngrx/store';
import { Department } from './department.interface';

export const retrieveDepartments = createAction(
  '[Department List] Retrieve Departments',
  props<{ departments: Array<Department> }>()
);
