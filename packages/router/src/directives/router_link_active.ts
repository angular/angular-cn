/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnChanges, OnDestroy, Optional, QueryList, Renderer2, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';

import {Event, NavigationEnd} from '../events';
import {Router} from '../router';

import {RouterLink, RouterLinkWithHref} from './router_link';


/**
 *
 * @description
 *
 * Lets you add a CSS class to an element when the link's route becomes active.
 *
 * 当此链接指向的路由激活时，往宿主元素上添加一个 CSS 类。
 *
 * This directive lets you add a CSS class to an element when the link's route
 * becomes active.
 *
 * 当此链接指向的路由激活时，该指令就会往宿主元素上添加一个 CSS 类。
 *
 * Consider the following example:
 *
 * 考虑下面的例子：
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link">Bob</a>
 * ```
 *
 * When the url is either '/user' or '/user/bob', the active-link class will
 * be added to the `a` tag. If the url changes, the class will be removed.
 *
 * 当浏览器的当前 url 是 '/user' 或 '/user/bob' 时，就会往 `a` 标签上添加 `active-link` 类；
 * 如果 url 发生了变化，则移除它。
 *
 * You can set more than one class, as follows:
 *
 * 你可以设置一个或多个类，例如：
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="class1 class2">Bob</a>
 * <a routerLink="/user/bob" [routerLinkActive]="['class1', 'class2']">Bob</a>
 * ```
 *
 * You can configure RouterLinkActive by passing `exact: true`. This will add the classes
 * only when the url matches the link exactly.
 *
 * 你可以通过传入 `exact: true` 来配置 RouterLinkActive。这样，只有当 url 和此链接精确匹配时才会添加这些类。
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact:
 * true}">Bob</a>
 * ```
 *
 * You can assign the RouterLinkActive instance to a template variable and directly check
 * the `isActive` status.
 *
 * 你可以把 `RouterLinkActive` 的实例赋给一个模板变量，以直接检查 `isActive` 的状态。
 *
 * ```
 * <a routerLink="/user/bob" routerLinkActive #rla="routerLinkActive">
 *   Bob {{ rla.isActive ? '(already open)' : ''}}
 * </a>
 * ```
 *
 * Finally, you can apply the RouterLinkActive directive to an ancestor of a RouterLink.
 *
 * 最后，你还可以把 `RouterLinkActive` 指令用在 `RouterLink` 的各级祖先节点上。
 *
 * ```
 * <div routerLinkActive="active-link">
 *   <a routerLink="/user/jim">Jim</a>
 *   <a routerLink="/user/bob">Bob</a>
 * </div>
 * ```
 *
 * This will set the active-link class on the div tag if the url is either '/user/jim' or
 * '/user/bob'.
 *
 * 这样，无论当前 url 是 '/user/jim' 还是 '/user/bob'，都会往 `div` 标签上添加一个 `active-link` 类。
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Directive({
  selector: '[routerLinkActive]',
  exportAs: 'routerLinkActive',
})
export class RouterLinkActive implements OnChanges, OnDestroy, AfterContentInit {
  // TODO(issue/24571): remove '!'.
  @ContentChildren(RouterLink, {descendants: true}) links!: QueryList<RouterLink>;
  // TODO(issue/24571): remove '!'.
  @ContentChildren(RouterLinkWithHref, {descendants: true})
  linksWithHrefs!: QueryList<RouterLinkWithHref>;

  private classes: string[] = [];
  private subscription: Subscription;
  public readonly isActive: boolean = false;

  @Input() routerLinkActiveOptions: {exact: boolean} = {exact: false};

  constructor(
      private router: Router, private element: ElementRef, private renderer: Renderer2,
      @Optional() private link?: RouterLink,
      @Optional() private linkWithHref?: RouterLinkWithHref) {
    this.subscription = router.events.subscribe((s: Event) => {
      if (s instanceof NavigationEnd) {
        this.update();
      }
    });
  }


  ngAfterContentInit(): void {
    this.links.changes.subscribe(_ => this.update());
    this.linksWithHrefs.changes.subscribe(_ => this.update());
    this.update();
  }

  @Input()
  set routerLinkActive(data: string[]|string) {
    const classes = Array.isArray(data) ? data : data.split(' ');
    this.classes = classes.filter(c => !!c);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private update(): void {
    if (!this.links || !this.linksWithHrefs || !this.router.navigated) return;
    Promise.resolve().then(() => {
      const hasActiveLinks = this.hasActiveLinks();
      if (this.isActive !== hasActiveLinks) {
        (this as any).isActive = hasActiveLinks;
        this.classes.forEach((c) => {
          if (hasActiveLinks) {
            this.renderer.addClass(this.element.nativeElement, c);
          } else {
            this.renderer.removeClass(this.element.nativeElement, c);
          }
        });
      }
    });
  }

  private isLinkActive(router: Router): (link: (RouterLink|RouterLinkWithHref)) => boolean {
    return (link: RouterLink|RouterLinkWithHref) =>
               router.isActive(link.urlTree, this.routerLinkActiveOptions.exact);
  }

  private hasActiveLinks(): boolean {
    const isActiveCheckFn = this.isLinkActive(this.router);
    return this.link && isActiveCheckFn(this.link) ||
        this.linkWithHref && isActiveCheckFn(this.linkWithHref) ||
        this.links.some(isActiveCheckFn) || this.linksWithHrefs.some(isActiveCheckFn);
  }
}
