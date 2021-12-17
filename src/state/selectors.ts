import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Department } from './department/department.interface';
import { Employee } from './employee/employee.interface';

export const selectDepartments =
  createFeatureSelector<Array<Department>>('departments');
export const selectEmployees =
  createFeatureSelector<Array<Employee>>('employees');