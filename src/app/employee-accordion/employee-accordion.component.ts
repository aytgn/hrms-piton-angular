import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/state/employee/employee.interface';

@Component({
  selector: 'app-employee-accordion',
  templateUrl: './employee-accordion.component.html',
  styleUrls: ['./employee-accordion.component.scss'],
})
export class EmployeeAccordionComponent implements OnInit {
  @Input() employees: Array<Employee> = [];

  constructor() {}

  ngOnInit(): void {}
}
