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
        const teamNameArr: Array<string> = [];
        const teamSalaryArr: Array<number> = [];
        data.forEach(({ teamName, teamSalary }) => {
          teamNameArr.push(teamName);
          teamSalaryArr.push(teamSalary);
        });
        this.doughnutChartData = {
          labels: teamNameArr,
          datasets: [{ data: teamSalaryArr }],
        };
        this.doughnutChartType = 'doughnut';
      });
    }
    if (this.dataType === 'departmentSalary') {
      this.sub2 = this.appStateService
        .getDepartmentsSalary()
        .subscribe((data) => {
          const departmentNameArr: Array<string> = [];
          const departmentSalaryArr: Array<number> = [];
          data.forEach(({ departmentName, departmentSalary }) => {
            departmentNameArr.push(departmentName);
            departmentSalaryArr.push(departmentSalary);
          });
          this.doughnutChartData = {
            labels: departmentNameArr,
            datasets: [{ data: departmentSalaryArr }],
          };
          this.doughnutChartType = 'doughnut';
        });
    }
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
