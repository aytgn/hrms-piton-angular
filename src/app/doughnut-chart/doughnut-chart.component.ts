import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { Subscription } from 'rxjs';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit, OnDestroy {
  constructor(private appStateService: AppStateService) {}
  @Input() dataType = '';
  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  //Doughnut
  teamNameArr: Array<string> = [];
  teamSalaryArr: Array<number> = [];
  departmentNameArr: Array<string> = [];
  departmentSalaryArr: Array<number> = [];
  doughnutChartLabels: string[] = [];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [],
  };
  doughnutChartType: ChartType = 'doughnut';
  //Events
  chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }
  chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }
  //lIFECYCLE
  ngOnInit(): void {
    if (this.dataType === 'teamSalary') {
      this.sub1 = this.appStateService.getTeamsSalary().subscribe((data) => {
        data.map(({ teamName, teamSalary }) => {
          this.teamNameArr.push(teamName);
          this.teamSalaryArr.push(teamSalary);
        });
        this.doughnutChartData = {
          labels: this.doughnutChartLabels,
          datasets: [
            {
              data: this.teamSalaryArr,
            },
          ],
        };
        this.doughnutChartLabels = this.teamNameArr;
      });
    }
    if (this.dataType === 'departmentSalary') {
      this.sub2 = this.appStateService
        .getDepartmentsSalary()
        .subscribe((data) => {
          data.map(({ departmentName, departmentSalary }) => {
            console.log(departmentName);
            this.departmentNameArr.push(departmentName);
            this.departmentSalaryArr.push(departmentSalary);
          });
          this.doughnutChartData = {
            labels: this.doughnutChartLabels,
            datasets: [
              {
                data: this.departmentSalaryArr,
              },
            ],
          };
          this.doughnutChartLabels = this.departmentNameArr;
        });
    }
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
