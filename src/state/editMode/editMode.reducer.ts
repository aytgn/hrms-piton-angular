import { createReducer, on } from '@ngrx/store';
import { editModeOff, editModeOn } from './editMode.actions';

export const initialState: boolean = false;

export const editModeReducer = createReducer(
  initialState,
  on(editModeOn, (state) => {
    return true;
  }),
  on(editModeOff, (state) => {
    return false;
  })
);
