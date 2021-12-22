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
  numberOfEmployees: Observable<number> = new Observable();
  numberOfDepartments: Observable<number> = new Observable();
  numberOfTeams: Observable<number> = new Observable();
  ngOnInit(): void {
    this.numberOfEmployees = this.appStateService.getNumberOfEmployees();
    this.numberOfDepartments = this.appStateService.getNumberOfDepartments();
    this.numberOfTeams = this.appStateService.getNumberOfTeams();
  }
}
