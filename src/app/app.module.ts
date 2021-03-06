import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from 'src/state/employee/employee.reducer';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeePageComponent } from './employee-page/employee-page.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { departmentReducer } from 'src/state/department/department.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { teamReducer } from 'src/state/team/team.reducer';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { CardDashBoardComponent } from './card-dash-board/card-dash-board.component';
import { DepartmentsPageComponent } from './departments-page/departments-page.component';
import { DepartmentInfoComponent } from './department-info/department-info.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { DepartmentTeamListComponent } from './department-team-list/department-team-list.component';
import { TeamCardComponent } from './team-card/team-card.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { loggedEmployeeReducer } from 'src/state/loggedEmployee/loggedEmployee.reducer';
import { LoginPageComponent } from './login-page/login-page.component';
import { EmployeeAccordionComponent } from './employee-accordion/employee-accordion.component';
import { editModeReducer } from 'src/state/editMode/editMode.reducer';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeePageComponent,
    DashboardComponent,
    DoughnutChartComponent,
    CardDashBoardComponent,
    DepartmentsPageComponent,
    DepartmentInfoComponent,
    DepartmentListComponent,
    LineChartComponent,
    TeamsPageComponent,
    DepartmentTeamListComponent,
    TeamCardComponent,
    NavBarComponent,
    FooterComponent,
    LoginPageComponent,
    EmployeeAccordionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      employees: employeeReducer,
      departments: departmentReducer,
      teams: teamReducer,
      loggedEmployee: loggedEmployeeReducer,
      editMode: editModeReducer,
    }),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule,
    NgChartsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
