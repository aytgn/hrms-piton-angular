import { Component, OnInit } from '@angular/core';
import { Department } from 'src/state/department/department.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss'],
})
export class TeamsPageComponent implements OnInit {
  numbers: Array<number> = [1, 2, 3, 4];
  departments: Array<Department> = [];

  constructor(private appStateService: AppStateService) {}

  ngOnInit(): void {
    this.appStateService.getDepartments().subscribe((departments) => {
      this.departments = departments;
      console.log(this.departments);
    });
  }
}
