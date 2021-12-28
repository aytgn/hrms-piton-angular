import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Team } from 'src/state/team/team.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-departments-page',
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.scss'],
})
export class DepartmentsPageComponent implements OnInit, OnDestroy {
  constructor(private appStateService: AppStateService) {}
  sub1: Subscription = new Subscription();
  departments: Array<Department> = [];
  departmentTeams: Array<Team> = [];
  selectedDepartment: Department = {
    id: 0,
    name: '',
    teamIds: [],
    managerId: 0,
  };
  //Events
  setSelectedDepartment(event: any) {
    const departmentName = event.target.innerText;
    this.selectedDepartment = this.departments.find((department) => {
      return department.name === departmentName;
    }) as Department;
  }
  //LIFECYCLE
  ngOnInit(): void {
    this.sub1 = this.appStateService
      .getDepartments()
      .subscribe((departments) => {
        this.departments = departments;
      });
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
