import { createReducer, on } from '@ngrx/store';
import { retrieveTeams } from './team.actions';
import { Team } from './team.interface';

export const initialState: Array<Team> = [];

export const teamReducer = createReducer(
  initialState,
  on(retrieveTeams, (state, { teams }) => {
    return teams;
  })
);
