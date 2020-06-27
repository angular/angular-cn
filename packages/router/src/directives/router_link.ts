/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {LocationStrategy} from '@angular/common';
import {Attribute, Directive, ElementRef, HostBinding, HostListener, Input, isDevMode, OnChanges, OnDestroy, Renderer2} from '@angular/core';
import {Subscription} from 'rxjs';

import {QueryParamsHandling} from '../config';
import {Event, NavigationEnd} from '../events';
import {Router} from '../router';
import {ActivatedRoute} from '../router_state';
import {UrlTree} from '../url_tree';


/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * 让你可以在应用中链接到特定的路由。
 *
 * Consider the following route configuration:
 * `[{ path: 'user/:name', component: UserCmp }]`.
 * When linking to this `user/:name` route, you use the `RouterLink` directive.
 *
 * 考虑下列路由配置：
 * `[{ path: 'user/:name', component: UserCmp }]`.
 * 如果要链接到这个 `user/:name` 路由，你可以使用 `RouterLink` 指令。
 *
 * If the link is static, you can use the directive as follows:
 * `<a routerLink="/user/bob">link to user component</a>`
 *
 * 如果该链接是静态的，你可以使用下列指令：
 * `<a routerLink="/user/bob">链接到 user 组件</a>`
 *
 * If you use dynamic values to generate the link, you can pass an array of path
 * segments, followed by the params for each segment.
 *
 * 如果你要用动态值来生成该链接，你可以传入一组路径片段，每个片段后面都可以跟一些参数。
 *
 * For instance `['/team', teamId, 'user', userName, {details: true}]`
 * means that we want to generate a link to `/team/11/user/bob;details=true`.
 *
 * 比如 `['/team', teamId, 'user', userName, {details: true}]` 表示我们要生成一个到 `/team/11/user/bob;details=true` 的链接。
 *
 * Multiple static segments can be merged into one
 * (e.g., `['/team/11/user', userName, {details: true}]`).
 *
 * 多个静态片段可以合并为一个（比如 `['/team/11/user', userName, {details: true}]`）。
 *
 * The first segment name can be prepended with `/`, `./`, or `../`:
 *
 * 第一个参数名可以使用 `/`、`./` 或 `../` 前缀：
 *
 * * If the first segment begins with `/`, the router will look up the route from the root of the
 *   app.
 *
 *   如果第一个片段用 `/` 开头，则路由器会从应用的根路由开始查找。
 *
 * * If the first segment begins with `./`, or doesn't begin with a slash, the router will
 *   instead look in the children of the current activated route.
 *
 *   如果第一个片段用 `./` 开头或者没有用斜杠开头，路由器就会从当前激活路由开始查找。
 *
 * * And if the first segment begins with `../`, the router will go up one level.
 *
 *   如果第一个片段以 `../` 开头，则路由器将会向上找一级。
 *
 * You can set query params and fragment as follows:
 *
 * 你可以像这样设置查询参数和 `#` 片段：
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" fragment="education">
 *   link to user component
 * </a>
 * ```
 * RouterLink will use these to generate this link: `/user/bob?debug=true#education`.
 *
 * RouterLink 将会使用它们生成如下链接：`/user/bob#education?debug=true`。
 *
 * (Deprecated in v4.0.0 use `queryParamsHandling` instead) You can also tell the
 * directive to preserve the current query params and fragment:
 *
 * （从 v4.0.0 中开始已废弃，请用 `queryParamsHandling` 来代替）你还可以告诉该指令保留当前的查询参数（`?`）和 `#` 片段：
 *
 * ```
 * <a [routerLink]="['/user/bob']" preserveQueryParams preserveFragment>
 *   link to user component
 * </a>
 * ```
 *
 * You can tell the directive how to handle queryParams. Available options are:
 *
 * 你可以告诉该指令要如何处理查询参数，有效的选项包括：
 *
 *  - `'merge'`: merge the queryParams into the current queryParams
 *
 *    `'merge'`：把老的查询参数合并进新的查询参数中
 *
 *  - `'preserve'`: preserve the current queryParams
 *
 *    `'preserve'`：保持当前的查询参数
 *
 *  - default/`''`: use the queryParams only
 *
 *    默认 / `''`：只使用当前查询参数
 *
 * Same options for {@link NavigationExtras#queryParamsHandling
 * NavigationExtras#queryParamsHandling}.
 *
 * 这个选项和 {@link NavigationExtras#queryParamsHandling
 * NavigationExtras#queryParamsHandling} 的一样。
 *
 * ```
 * <a [routerLink]="['/user/bob']" [queryParams]="{debug: true}" queryParamsHandling="merge">
 *   link to user component
 * </a>
 * ```
 *
 * You can provide a `state` value to be persisted to the browser's History.state
 * property (See https://developer.mozilla.org/en-US/docs/Web/API/History#Properties). It's
 * used as follows:
 *
 * ```
 * <a [routerLink]="['/user/bob']" [state]="{tracingId: 123}">
 *   link to user component
 * </a>
 * ```
 *
 * And later the value can be read from the router through `router.getCurrentNavigation`.
 * For example, to capture the `tracingId` above during the `NavigationStart` event:
 *
 * ```
 * // Get NavigationStart events
 * router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe(e => {
 *   const navigation = router.getCurrentNavigation();
 *   tracingService.trace({id: navigation.extras.state.tracingId});
 * });
 * ```
 *
 * The router link directive always treats the provided input as a delta to the current url.
 *
 * `RouterLink` 指令总是把新提供的输入看作是对当前 URL 的增量修改。
 *
 * For instance, if the current url is `/user/(box//aux:team)`.
 *
 * 例如，如果当前 url 是 `/user/(box//aux:team)`，
 *
 * Then the following link `<a [routerLink]="['/user/jim']">Jim</a>` will generate the link
 * `/user/(jim//aux:team)`.
 *
 * 那么 `<a [routerLink]="['/user/jim']">Jim</a>` 生成的链接将是 `/user/(jim//aux:team)`。
 *
 * See {@link Router#createUrlTree createUrlTree} for more information.
 *
 * 欲知详情，参见 {@link Router#createUrlTree createUrlTree}。
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Directive({selector: ':not(a):not(area)[routerLink]'})
export class RouterLink {
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#queryParams NavigationExtras#queryParams}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() queryParams!: {[k: string]: any};
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#fragment NavigationExtras#fragment}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() fragment!: string;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#queryParamsHandling NavigationExtras#queryParamsHandling}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() queryParamsHandling!: QueryParamsHandling;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#preserveFragment NavigationExtras#preserveFragment}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() preserveFragment!: boolean;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#skipLocationChange NavigationExtras#skipLocationChange}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() skipLocationChange!: boolean;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#replaceUrl NavigationExtras#replaceUrl}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() replaceUrl!: boolean;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#state NavigationExtras#state}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input() state?: {[k: string]: any};
  private commands: any[] = [];
  private preserve!: boolean;

  constructor(
      private router: Router, private route: ActivatedRoute,
      @Attribute('tabindex') tabIndex: string, renderer: Renderer2, el: ElementRef) {
    if (tabIndex == null) {
      renderer.setAttribute(el.nativeElement, 'tabindex', '0');
    }
  }

  /**
   * @param commands An array of commands to pass to {@link Router#createUrlTree
   *     Router#createUrlTree}.
   *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
   *   - **null|undefined**: shorthand for an empty array of commands, i.e. `[]`
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input()
  set routerLink(commands: any[]|string|null|undefined) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = [];
    }
  }

  /**
   * @deprecated As of Angular v4.0 use `queryParamsHandling` instead.
   */
  @Input()
  set preserveQueryParams(value: boolean) {
    if (isDevMode() && <any>console && <any>console.warn) {
      console.warn('preserveQueryParams is deprecated!, use queryParamsHandling instead.');
    }
    this.preserve = value;
  }

  @HostListener('click')
  onClick(): boolean {
    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl),
      state: this.state,
    };
    this.router.navigateByUrl(this.urlTree, extras);
    return true;
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      preserveQueryParams: attrBoolValue(this.preserve),
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment),
    });
  }
}

/**
 * @description
 *
 * Lets you link to specific routes in your app.
 *
 * 允许你在应用中链接到特定的路由。
 *
 * See `RouterLink` for more information.
 *
 * 欲知详情，参见 `RouterLink`。
 *
 * @ngModule RouterModule
 *
 * @publicApi
 */
@Directive({selector: 'a[routerLink],area[routerLink]'})
export class RouterLinkWithHref implements OnChanges, OnDestroy {
  // TODO(issue/24571): remove '!'.
  @HostBinding('attr.target') @Input() target!: string;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#queryParams NavigationExtras#queryParams}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() queryParams!: {[k: string]: any};
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#fragment NavigationExtras#fragment}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() fragment!: string;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#queryParamsHandling NavigationExtras#queryParamsHandling}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() queryParamsHandling!: QueryParamsHandling;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#preserveFragment NavigationExtras#preserveFragment}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() preserveFragment!: boolean;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#skipLocationChange NavigationExtras#skipLocationChange}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() skipLocationChange!: boolean;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#replaceUrl NavigationExtras#replaceUrl}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  // TODO(issue/24571): remove '!'.
  @Input() replaceUrl!: boolean;
  /**
   * Passed to {@link Router#createUrlTree Router#createUrlTree} as part of the `NavigationExtras`.
   * @see {@link NavigationExtras#state NavigationExtras#state}
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input() state?: {[k: string]: any};
  private commands: any[] = [];
  private subscription: Subscription;
  // TODO(issue/24571): remove '!'.
  private preserve!: boolean;

  // the url displayed on the anchor element.
  // TODO(issue/24571): remove '!'.
  @HostBinding() href!: string;

  constructor(
      private router: Router, private route: ActivatedRoute,
      private locationStrategy: LocationStrategy) {
    this.subscription = router.events.subscribe((s: Event) => {
      if (s instanceof NavigationEnd) {
        this.updateTargetUrlAndHref();
      }
    });
  }

  /**
   * @param commands An array of commands to pass to {@link Router#createUrlTree
   *     Router#createUrlTree}.
   *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
   *   - **null|undefined**: shorthand for an empty array of commands, i.e. `[]`
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
  @Input()
  set routerLink(commands: any[]|string|null|undefined) {
    if (commands != null) {
      this.commands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.commands = [];
    }
  }

  /**
   * @deprecated As of Angular v4.0 use `queryParamsHandling` instead.
   */
  @Input()
  set preserveQueryParams(value: boolean) {
    if (isDevMode() && <any>console && <any>console.warn) {
      console.warn('preserveQueryParams is deprecated, use queryParamsHandling instead.');
    }
    this.preserve = value;
  }

  ngOnChanges(changes: {}): any {
    this.updateTargetUrlAndHref();
  }
  ngOnDestroy(): any {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event.button', '$event.ctrlKey', '$event.metaKey', '$event.shiftKey'])
  onClick(button: number, ctrlKey: boolean, metaKey: boolean, shiftKey: boolean): boolean {
    if (button !== 0 || ctrlKey || metaKey || shiftKey) {
      return true;
    }

    if (typeof this.target === 'string' && this.target != '_self') {
      return true;
    }

    const extras = {
      skipLocationChange: attrBoolValue(this.skipLocationChange),
      replaceUrl: attrBoolValue(this.replaceUrl),
      state: this.state
    };
    this.router.navigateByUrl(this.urlTree, extras);
    return false;
  }

  private updateTargetUrlAndHref(): void {
    this.href = this.locationStrategy.prepareExternalUrl(this.router.serializeUrl(this.urlTree));
  }

  get urlTree(): UrlTree {
    return this.router.createUrlTree(this.commands, {
      relativeTo: this.route,
      queryParams: this.queryParams,
      fragment: this.fragment,
      preserveQueryParams: attrBoolValue(this.preserve),
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment),
    });
  }
}

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}
