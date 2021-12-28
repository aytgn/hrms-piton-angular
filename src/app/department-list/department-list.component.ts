import { Component, Input, OnInit } from '@angular/core';
import { Department } from 'src/state/department/department.interface';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent implements OnInit {
  @Input() departments: Array<Department> = [];

  constructor() {}

  ngOnInit(): void {}
}
