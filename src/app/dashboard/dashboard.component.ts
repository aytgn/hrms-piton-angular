import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private appStateService: AppStateService) {}
  numberOfEmployees: number = 0;
  numberOfDepartments: number = 0;
  numberOfTeams: number = 0;
  monthlySalaryExpense: number = 0;
  teamEmployees: object[] = [];
  numberOfEmployeesTeamOne: number = 0;
  teamNameArr: string[] = [];
  teamSalaryArr: number[] = [];
  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  sub3: Subscription = new Subscription();
  sub4: Subscription = new Subscription();
  sub5: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub1 = this.appStateService
      .getNumberOfEmployees()
      .subscribe((number) => {
        this.numberOfEmployees = number;
      });
    this.sub2 = this.appStateService
      .getNumberOfDepartments()
      .subscribe((number) => {
        this.numberOfDepartments = number;
      });
    this.sub3 = this.appStateService.getNumberOfTeams().subscribe((number) => {
      this.numberOfTeams = number;
    });
    this.sub4 = this.appStateService
      .getMonthlySalaryExpense()
      .subscribe((number) => {
        this.monthlySalaryExpense = number;
      });
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }
}
