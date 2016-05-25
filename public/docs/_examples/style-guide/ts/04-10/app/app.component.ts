// #docregion
import { Component } from '@angular/core';

// #docregion example
import { HeroesComponent } from './+heroes/index';
// #enddocregion example

@Component({
  selector: 'sg-app',
  template: '<toh-heroes></toh-heroes>',
  directives: [HeroesComponent]
})
export class AppComponent { }
