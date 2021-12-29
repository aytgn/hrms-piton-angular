import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loginEmployee } from 'src/state/loggedEmployee/loggedEmployee.actions';
import { AppStateService } from '../services/appState.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  sub1: Subscription = new Subscription();
  constructor(
    private appStateService: AppStateService,
    private store: Store,
    private router: Router
  ) {}
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.appStateService
      .getEmployeeByEmail(this.email)
      .subscribe((employee) => {
        console.log(employee);
        if (employee) {
          password === '123';
          this.store.dispatch(loginEmployee({ employee }));
          this.router.navigate(['/home_page']);
        }
      })
      .unsubscribe();
  }
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
