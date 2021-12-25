import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss'],
})
export class DoughnutChartComponent implements OnInit, OnChanges {
  constructor() {}
  @Input() numberOfEmployeeInTeamOne: number = 0;

  doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [this.numberOfEmployeeInTeamOne, 450, 100] },
      { data: [50, 150, 120] },
      { data: [250, 130, 70] },
    ],
  };
  doughnutChartType: ChartType = 'doughnut';
  // events
  chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }
  chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active);
  }
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: [this.numberOfEmployeeInTeamOne, 450, 100] },
        { data: [50, 150, 120] },
        { data: [250, 130, 70] },
      ],
    };
  }
}
