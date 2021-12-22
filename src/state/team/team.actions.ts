import { createAction, props } from '@ngrx/store';
import { Team } from './team.interface';

export const retrieveTeams = createAction(
  '[Team List] Retrieve Teams',
  props<{ teams: Array<Team> }>()
);
