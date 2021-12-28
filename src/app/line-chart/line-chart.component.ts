import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Department } from 'src/state/department/department.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnChanges, OnDestroy {
  constructor(private appStateService: AppStateService) {}
  @Input() department: Department = {
    id: 0,
    name: '',
    teamIds: [],
    managerId: 0,
  };
  teamNames: Array<string> = [];
  teamSalaries: Array<number> = [];
  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  //CHART
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Team Salary',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };
  lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
  };
  lineChartType: ChartType = 'line';

  //Events
  chartClicked({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }
  chartHovered({ event, active }: { event?: ChartEvent; active?: {}[] }): void {
    console.log(event, active);
  }
  //LIFECYCLE
  ngOnChanges(changes: SimpleChanges): void {
    this.sub1 = this.appStateService
      .getTeamsByDepartment(this.department)
      .subscribe((teams) => {
        console.log(teams);
        const teamNamesArr: Array<string> = [];
        teams.forEach((team) => {
          teamNamesArr.push(team.name);
        });
        this.teamNames = teamNamesArr;
        console.log(this.teamNames);
      });
    this.sub2 = this.appStateService
      .getTeamsSalary()
      .pipe(
        map((teamsSalary) => {
          return teamsSalary.filter((teamSalary) => {
            return this.teamNames.includes(teamSalary.teamName);
          });
        })
      )
      .subscribe((teamsSalary) => {
        const teamSalaries: Array<number> = [];
        teamsSalary.forEach((teamSalary) => {
          teamSalaries.push(teamSalary.teamSalary);
        });
        this.teamSalaries = teamSalaries;
        console.log(this.teamSalaries);
      });

    this.lineChartData = {
      datasets: [
        {
          data: this.teamSalaries,
          label: 'Team Salary',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: this.teamNames,
    };
    this.lineChartOptions = {
      elements: {
        line: {
          tension: 0.5,
        },
      },
    };
    this.lineChartType = 'line';
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
