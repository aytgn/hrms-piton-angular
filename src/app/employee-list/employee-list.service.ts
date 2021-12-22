import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/state/employee/employee.interface';

@Injectable()
export class EmployeeListService {
  constructor(private router: Router) {}
  filterEmployees(
    employees: Array<Employee>,
    {
      id,
      name,
      salary,
      email,
      team,
      department,
    }: {
      id: string;
      name: string;
      salary: string;
      email: string;
      team: string;
      department: string;
    }
  ): Array<Employee> {
    return employees
      .filter((employee) => {
        return id != '' ? employee.id === Number(id) : true;
      })
      .filter((employee) => {
        return name != ''
          ? employee.name.toLowerCase().includes(name.toLowerCase())
          : true;
      })
      .filter((employee) => {
        return salary != '' ? employee.salary >= Number(salary) : true;
      })
      .filter((employee) => {
        return email != ''
          ? employee.email.toLowerCase().includes(email.toLowerCase())
          : true;
      })
      .filter((employee) => {
        return team != ''
          ? employee.team.toLowerCase().includes(team.toLowerCase())
          : true;
      })
      .filter((employee) => {
        return department != ''
          ? employee.department.toLowerCase().includes(department.toLowerCase())
          : true;
      });
  }
}
