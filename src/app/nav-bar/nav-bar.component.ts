import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/state/employee/employee.interface';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private appStateService: AppStateService) {}
  loggedEmployee: Employee = {
    id: 0,
    name: '',
    auth: '',
    salary: 0,
    email: '',
    team: '',
    department: '',
    phone: '',
    address: '',
    imageUrl: '',
  };
  ngOnInit(): void {
    this.appStateService.getLoggedEmployee().subscribe((employee) => {
      this.loggedEmployee = employee;
    });
  }
}
