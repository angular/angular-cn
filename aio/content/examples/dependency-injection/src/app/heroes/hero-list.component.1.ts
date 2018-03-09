// #docregion
import { Component }   from '@angular/core';
import { HEROES }      from './mock-heroes';

@Component({
  selector: 'app-hero-list',
  template: `
    <div *ngFor="let hero of heroes">
      {{hero.id}} - {{hero.name}}
    </div>
  `
})
// #docregion class
export class HeroListComponent {
  heroes = HEROES;
}
// #enddocregion class
