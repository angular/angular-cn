import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component.1';
import { HeroService }  from './heroes/hero.service.1';

bootstrap(AppComponent);

function discouraged() {
  //#docregion bootstrap
  bootstrap(AppComponent,
           [HeroService]); // DISCOURAGED (but works)不推荐（但可用）
  //#enddocregion bootstrap
}

