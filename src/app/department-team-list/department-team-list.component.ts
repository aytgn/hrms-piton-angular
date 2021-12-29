import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Team } from 'src/state/team/team.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-department-team-list',
  templateUrl: './department-team-list.component.html',
  styleUrls: ['./department-team-list.component.scss'],
})
export class DepartmentTeamListComponent implements OnInit, OnDestroy {
  @Input() department: Department = {
    id: 0,
    name: '',
    teamIds: [],
    managerId: 0,
  };
  teams: Array<Team> = [];
  sub1: Subscription = new Subscription();
  randomNumber: number = 0;
  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.sub1 = this.appStateService
      .getTeamsByDepartment(this.department)
      .subscribe((teams) => {
        this.teams = teams;
      });
    this.randomNumber = Math.random();
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
