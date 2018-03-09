// #docplaster
// #docregion
// #docregion imports
import { Component, Inject } from '@angular/core';

import { APP_CONFIG, AppConfig } from './app.config';
import { UserService } from './user.service';
// #enddocregion imports

@Component({
  selector: 'app-root',
  template:  `
    <h1>{{title}}</h1>
    <app-car></app-car>
    <app-injectors></app-injectors>
    <app-tests></app-tests>
    <h2>User</h2>
    <p id="user">
      {{userInfo}}
      <button (click)="nextUser()">Next User</button>
    <p>
    <app-heroes id="authorized" *ngIf="isAuthorized"></app-heroes>
    <app-heroes id="unauthorized" *ngIf="!isAuthorized"></app-heroes>
    <app-providers></app-providers>
  `
})
export class AppComponent {
  title: string;

  // #docregion ctor
  constructor(
    @Inject(APP_CONFIG) config: AppConfig,
    private userService: UserService) {
    this.title = config.title;
  }
  // #enddocregion ctor

  get isAuthorized() { return this.user.isAuthorized; }
  nextUser()         { this.userService.getNewUser(); }
  get user()         { return this.userService.user; }

  get userInfo()     {
    return `Current user, ${this.user.name}, is ` +
           `${this.isAuthorized ? '' : 'not'} authorized. `;
  }
}
