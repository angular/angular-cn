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
      <li *ngFor="let node of nodes">
        <a class="nav-link" [class.highlight]="node.highlight" [href]="node.url" [title]="node.tooltip || node.title"
           [target]="node.external?'_blank':null">
          <span class="nav-link-inner">{{ node.title }}</span>
        </a>
      </li>
    </ul>`,
})
export class TopMenuComponent {
  @Input() nodes: NavigationNode[];

}
