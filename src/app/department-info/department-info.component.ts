import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Department } from 'src/state/department/department.interface';
import { Team } from 'src/state/team/team.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-department-info',
  templateUrl: './department-info.component.html',
  styleUrls: ['./department-info.component.scss'],
})
export class DepartmentInfoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() department: Department = {
    id: 0,
    name: '',
    teamIds: [],
    managerId: 0,
  };
  departmentTeams: Array<Team> = [];
  managerName: string = '';
  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  constructor(private appStateService: AppStateService) {}

  //LIFECYCLE
  ngOnChanges(changes: SimpleChanges): void {
    this.sub1 = this.appStateService
      .getTeamsByDepartment(this.department)
      .subscribe((teams) => {
        this.departmentTeams = teams;
      });
    this.sub2 = this.appStateService
      .getEmployeeById(this.department.managerId)
      .subscribe((employee) => {
        this.managerName = employee?.name as string;
      });
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }
}
