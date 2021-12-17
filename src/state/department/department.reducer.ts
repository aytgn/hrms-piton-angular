import { createReducer, on } from '@ngrx/store';
import { retrieveDepartments } from './department.actions';
import { Department } from './department.interface';

export const initialState: Array<Department> = [];

export const departmentReducer = createReducer(
  initialState,
  on(retrieveDepartments, (state, { departments }) => {
    return departments;
  })
);
