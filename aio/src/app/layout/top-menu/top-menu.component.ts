import { Component, Input } from '@angular/core';
import { NavigationNode } from 'app/navigation/navigation.service';

@Component({
  selector: 'aio-top-menu',
  styles: [`
    .nav-link.highlight {
      color: yellow;
    }
  `],
  template: `
    <ul role="navigation">
      <li *ngFor="let node of nodes"><a class="nav-link" [class.highlight]="node.highlight" [href]="node.url" [title]="node.title">{{ node.title }}</a></li>
    </ul>`
})
export class TopMenuComponent {
  @Input() nodes: NavigationNode[];

}
