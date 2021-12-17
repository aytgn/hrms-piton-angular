import { Component, OnInit } from '@angular/core';
import { StrapiApiService } from './services/strapiApi.service';
import { Store } from '@ngrx/store';
import { retrieveEmployees } from 'src/state/employee/employee.actions';
import { retrieveDepartments } from 'src/state/department/department.actions';
import { AppStateService } from './services/appState.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private strapiApiService: StrapiApiService,
    private store: Store
  ) {}
  ngOnInit() {
    this.strapiApiService.getEmployees().then((employees) => {
      this.store.dispatch(retrieveEmployees({ employees }));
    });

    this.strapiApiService.getDepartments().then((departments) => {
      this.store.dispatch(retrieveDepartments({ departments }));
    });
  }
}
