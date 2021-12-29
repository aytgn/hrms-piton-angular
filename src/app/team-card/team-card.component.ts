import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Employee } from 'src/state/employee/employee.interface';
import { Team } from 'src/state/team/team.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss'],
})
export class TeamCardComponent implements OnInit, OnDestroy {
  @Input() team: Team = { id: 0, name: '', employeeIds: [], departmentId: 0 };
  sub1: Subscription = new Subscription();
  employees: Array<Employee> = [];
  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.sub1 = this.appStateService
      .getEmployeesByTeam(this.team)
      .subscribe((employees) => {
        this.employees = employees;
      });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
