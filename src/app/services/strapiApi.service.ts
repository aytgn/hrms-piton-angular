import { Injectable } from '@angular/core';
import { Employee } from 'src/state/employee/employee.interface';

@Injectable({ providedIn: 'root' })
export class StrapiApiService {
  constructor() {}
  //helper Functions
  private _employeesDepartment(team: string) {
    switch (team) {
      case 'finance':
        return 'accounting';
      case 'recruitment':
        return 'human_resources';
      case 'selling':
        return 'marketing';
      case 'development':
      case 'robotic':
      case 'mechanic':
      case 'design':
        return 'production';
      case 'purchase':
        return 'purchasing';
      default:
        return 'unknown';
    }
  }
  //MAIN METHODS
  async getEmployees() {
    return fetch('http://localhost:1337/api/employees?populate=*')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const employeesData: Array<any> = data.data;
        const employees: Array<Employee> = [];
        employeesData.forEach((employeeData) => {
          let employee: Employee;
          const id: number = employeeData.id;
          const {
            name,
            email,
            salary,
            phone,
            address,
            imageUrl,
          }: {
            name: string;
            email: string;
            salary: number;
            phone: string;
            address: string;
            imageUrl: string;
          } = employeeData.attributes;
          const auth: string =
            employeeData.attributes.auth.data.attributes.name;
          const team: string =
            employeeData.attributes.team.data.attributes.name;
          const department = this._employeesDepartment(team);
          employee = {
            id,
            name,
            email,
            salary,
            auth,
            team,
            department,
            phone,
            address,
            imageUrl,
          };
          employees.push(employee);
        });
        return employees;
      });
  }
  async getDepartments() {
    return fetch('http://localhost:1337/api/departments?populate=*')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const departmentsData: Array<any> = data.data;
        const departments: Array<any> = [];
        departmentsData.forEach((departmentData) => {
          const id = departmentData.id;
          const name = departmentData.attributes.name;
          const teams: Array<any> = [];
          departmentData.attributes.teams.data.forEach((teamData: any) => {
            let name = teamData.attributes.name;
            teams.push(name);
          });
          const department = { id, name, teams };
          departments.push(department);
        });
        return departments;
      });
  }
}
