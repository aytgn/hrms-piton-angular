import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private appStateService: AppStateService) {}
  numberOfEmployees: number = 0;
  numberOfDepartments: number = 0;
  numberOfTeams: number = 0;
  monthlySalaryExpense: number = 0;
  teamIds: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8];
  teamEmployees: Array<object> = [];
  numberOfEmployeesTeamOne: number = 0;

  ngOnInit(): void {
    this.appStateService.getNumberOfEmployees().subscribe((number) => {
      this.numberOfEmployees = number;
    });
    this.appStateService.getNumberOfDepartments().subscribe((number) => {
      this.numberOfDepartments = number;
    });
    this.appStateService.getNumberOfTeams().subscribe((number) => {
      this.numberOfTeams = number;
    });
    this.appStateService.getMonthlySalaryExpense().subscribe((number) => {
      this.monthlySalaryExpense = number;
    });
    this.appStateService.getTeams().subscribe((teams) => {
      const team = teams.find((team) => {
        return team.id === 1;
      });
      console.log(team?.employeeIds.length);
      team
        ? (this.numberOfEmployeesTeamOne = team.employeeIds.length)
        : (this.numberOfEmployeesTeamOne = 0);
    });
  }
}
