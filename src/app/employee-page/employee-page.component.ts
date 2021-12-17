import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee.page.component.html',
})
export class EmployeePageComponent implements OnInit {
  employeeId: number = 0;
  constructor(private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.employeeId = params['employeeId'];
      console.log(this.employeeId);
    });
  }
}
