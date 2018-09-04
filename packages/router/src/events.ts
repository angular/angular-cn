/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Route} from './config';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from './router_state';

/**
 * @description
 *
 * Identifies the trigger of the navigation.
 *
 * 表示导航过程中的触发器。
 *
 * * 'imperative'--triggered by `router.navigateByUrl` or `router.navigate`.
 *
 *   'imperative' —— 由 `router.navigateByUrl` 或 `router.navigate` 触发。
 *
 * * 'popstate'--triggered by a popstate event
 *
 *   'popstate' —— 由 popstate 事件触发。
 *
 * * 'hashchange'--triggered by a hashchange event
 *
 *   'hashchange' —— 由 hashchange 事件触发。
 *
 * @experimental
 */
export type NavigationTrigger = 'imperative' | 'popstate' | 'hashchange';

/**
 * @description
 *
 * Base for events the Router goes through, as opposed to events tied to a specific
 * Route. `RouterEvent`s will only be fired one time for any given navigation.
 *
 * 路由器相关事件的（而不是关于特定路由的）基类。对于任何指定的导航，`RouterEvent` 只会触发一次。
 *
 * Example:
 *
 * 例子：
 *
 * ```
 * class MyService {
 *   constructor(public router: Router, logger: Logger) {
 *     router.events.filter(e => e instanceof RouterEvent).subscribe(e => {
 *       logger.log(e.id, e.url);
 *     });
 *   }
 * }
 * ```
 *
 * @experimental
 */
export class RouterEvent {
  constructor(
      /** @docsNotRequired */
      public id: number,
      /** @docsNotRequired */
      public url: string) {}
}

/**
 * @description
 *
 * Represents an event triggered when a navigation starts.
 *
 * 代表导航开始时触发的事件。
 *
 */
export class NavigationStart extends RouterEvent {
  /**
   * Identifies the trigger of the navigation.
   *
   * 表示导航过程中的触发器。
   *
   * * 'imperative'--triggered by `router.navigateByUrl` or `router.navigate`.
   *
   *   'imperative' —— 由 `router.navigateByUrl` 或 `router.navigate` 触发。
   *
   * * 'popstate'--triggered by a popstate event
   *
   *   'popstate' —— 由 popstate 事件触发。
   *
   * * 'hashchange'--triggered by a hashchange event
   *
   *   'hashchange' —— 由 hashchange 事件触发。
   *
   */
  navigationTrigger?: 'imperative'|'popstate'|'hashchange';

  /**
   * This contains the navigation id that pushed the history record that the router navigates
   * back to. This is not null only when the navigation is triggered by a popstate event.
   *
   * 这里包含的 `navigationId` 会被用于保存历史记录，以供浏览器导航回来。只有当这次导航是被 popstate 事件触发时，它才不为空。
   *
   * The router assigns a navigationId to every router transition/navigation. Even when the user
   * clicks on the back button in the browser, a new navigation id will be created. So from
   * the perspective of the router, the router never "goes back". By using the `restoredState`
   * and its navigationId, you can implement behavior that differentiates between creating new
   * states
   * and popstate events. In the latter case you can restore some remembered state (e.g., scroll
   * position).
   *
   * 路由器会把一个 `navigationId` 赋予每一次路由器过渡/导航。即使用户点击了浏览器的后退按钮，也会创建一个新的 `navigationId`。
   * 所以，从路由器的视角来看，路由器永远不会 "后退"。借助 `restoredState` 及其 navigationId，你可以区分开创建新状态和 `popstate` 事件的行为。
   * 在 `popstate` 时，你可以恢复一些以前记录的状态（如滚动到的位置）。
   */
  restoredState?: {navigationId: number}|null;

  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      navigationTrigger: 'imperative'|'popstate'|'hashchange' = 'imperative',
      /** @docsNotRequired */
      restoredState: {navigationId: number}|null = null) {
    super(id, url);
    this.navigationTrigger = navigationTrigger;
    this.restoredState = restoredState;
  }

  /** @docsNotRequired */
  toString(): string { return `NavigationStart(id: ${this.id}, url: '${this.url}')`; }
}

/**
 * @description
 *
 * Represents an event triggered when a navigation ends successfully.
 *
 * 表示当导航成功结束时触发的事件。
 *
 */
export class NavigationEnd extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public urlAfterRedirects: string) {
    super(id, url);
  }

  /** @docsNotRequired */
  toString(): string {
    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
  }
}

/**
 * @description
 *
 * Represents an event triggered when a navigation is canceled.
 *
 * 表示当导航被取消时触发的事件。
 *
 */
export class NavigationCancel extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public reason: string) {
    super(id, url);
  }

  /** @docsNotRequired */
  toString(): string { return `NavigationCancel(id: ${this.id}, url: '${this.url}')`; }
}

/**
 * @description
 *
 * Represents an event triggered when a navigation fails due to an unexpected error.
 *
 * 表示当导航出错时触发的事件。
 *
 */
export class NavigationError extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public error: any) {
    super(id, url);
  }

  /** @docsNotRequired */
  toString(): string {
    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
  }
}

/**
 * @description
 *
 * Represents an event triggered when routes are recognized.
 *
 * 表示当路由被识别出来时触发的事件。
 *
 */
export class RoutesRecognized extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public urlAfterRedirects: string,
      /** @docsNotRequired */
      public state: RouterStateSnapshot) {
    super(id, url);
  }

  /** @docsNotRequired */
  toString(): string {
    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}

/**
 * @description
 *
 * Represents the start of the Guard phase of routing.
 *
 * 表示路由的守卫（`Guard`）阶段的开始。
 *
 * @experimental
 */
export class GuardsCheckStart extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public urlAfterRedirects: string,
      /** @docsNotRequired */
      public state: RouterStateSnapshot) {
    super(id, url);
  }

  toString(): string {
    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}

/**
 * @description
 *
 * Represents the end of the Guard phase of routing.
 *
 * 表示路由的守卫（`Guard`）阶段的结束。
 *
 * @experimental
 */
export class GuardsCheckEnd extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public urlAfterRedirects: string,
      /** @docsNotRequired */
      public state: RouterStateSnapshot,
      /** @docsNotRequired */
      public shouldActivate: boolean) {
    super(id, url);
  }

  toString(): string {
    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
  }
}

/**
 * @description
 *
 * Represents the start of the Resolve phase of routing. The timing of this
 * event may change, thus it's experimental. In the current iteration it will run
 * in the "resolve" phase whether there's things to resolve or not. In the future this
 * behavior may change to only run when there are things to be resolved.
 *
 * 表示路由解析（`Resolve`）阶段的开始。该事件的触发时机将来可能会改变，因为它是试验性的。
 * 在当前的迭代中，它将会在 `resolve` 阶段执行，而不管有没有东西要 `resolve`。
 * 将来，这种行为可能会修改成只有当有东西要 `resolve` 时才执行。
 *
 * @experimental
 */
export class ResolveStart extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public urlAfterRedirects: string,
      /** @docsNotRequired */
      public state: RouterStateSnapshot) {
    super(id, url);
  }

  toString(): string {
    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}

/**
 * @description
 *
 * Represents the end of the Resolve phase of routing. See note on
 * `ResolveStart` for use of this experimental API.
 *
 * 表示路由解析（`Resolve`）阶段的结束。参见 `ResolveStart` 上的注释以了解这个试验性 API 的用法。
 *
 * @experimental
 */
export class ResolveEnd extends RouterEvent {
  constructor(
      /** @docsNotRequired */
      id: number,
      /** @docsNotRequired */
      url: string,
      /** @docsNotRequired */
      public urlAfterRedirects: string,
      /** @docsNotRequired */
      public state: RouterStateSnapshot) {
    super(id, url);
  }

  toString(): string {
    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
  }
}

/**
 * @description
 *
 * Represents an event triggered before lazy loading a route config.
 *
 * 表示在惰性加载某个路由配置前触发的事件。
 *
 * @experimental
 */
export class RouteConfigLoadStart {
  constructor(
      /** @docsNotRequired */
      public route: Route) {}
  toString(): string { return `RouteConfigLoadStart(path: ${this.route.path})`; }
}

/**
 * @description
 *
 * Represents an event triggered when a route has been lazy loaded.
 *
 * 表示当某个路由被惰性加载时触发的事件。
 *
 * @experimental
 */
export class RouteConfigLoadEnd {
  constructor(
      /** @docsNotRequired */
      public route: Route) {}
  toString(): string { return `RouteConfigLoadEnd(path: ${this.route.path})`; }
}

/**
 * @description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ChildActivationEnd` for use of this experimental API.
 *
 * @experimental
 */
export class ChildActivationStart {
  constructor(
      /** @docsNotRequired */
      public snapshot: ActivatedRouteSnapshot) {}
  toString(): string {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
    return `ChildActivationStart(path: '${path}')`;
  }
}

/**
 * @description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ChildActivationStart` for use of this experimental API.
 *
 * @experimental
 */
export class ChildActivationEnd {
  constructor(
      /** @docsNotRequired */
      public snapshot: ActivatedRouteSnapshot) {}
  toString(): string {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
    return `ChildActivationEnd(path: '${path}')`;
  }
}

/**
 * @description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ActivationEnd` for use of this experimental API.
 *
 * @experimental
 */
export class ActivationStart {
  constructor(
      /** @docsNotRequired */
      public snapshot: ActivatedRouteSnapshot) {}
  toString(): string {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
    return `ActivationStart(path: '${path}')`;
  }
}

/**
 * @description
 *
 * Represents the start of end of the Resolve phase of routing. See note on
 * `ActivationStart` for use of this experimental API.
 *
 * @experimental
 */
export class ActivationEnd {
  constructor(
      /** @docsNotRequired */
      public snapshot: ActivatedRouteSnapshot) {}
  toString(): string {
    const path = this.snapshot.routeConfig && this.snapshot.routeConfig.path || '';
    return `ActivationEnd(path: '${path}')`;
  }
}

/**
 * @description
 *
 * Represents a scrolling event.
 *
 * 表示一个滚动事件。
 */
export class Scroll {
  constructor(
      /** @docsNotRequired */
      readonly routerEvent: NavigationEnd,

      /** @docsNotRequired */
      readonly position: [number, number]|null,

      /** @docsNotRequired */
      readonly anchor: string|null) {}

  toString(): string {
    const pos = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
    return `Scroll(anchor: '${this.anchor}', position: '${pos}')`;
  }
}

/**
 * @description
 *
 * Represents a router event, allowing you to track the lifecycle of the router.
 *
 * 表示一个路由器事件，允许你跟踪路由器本身的生命周期。
 *
 * The sequence of router events is:
 *
 * 路由器事件的顺序是：
 *
 * - `NavigationStart`,
 * - `RouteConfigLoadStart`,
 * - `RouteConfigLoadEnd`,
 * - `RoutesRecognized`,
 * - `GuardsCheckStart`,
 * - `ChildActivationStart`,
 * - `ActivationStart`,
 * - `GuardsCheckEnd`,
 * - `ResolveStart`,
 * - `ResolveEnd`,
 * - `ActivationEnd`
 * - `ChildActivationEnd`
 * - `NavigationEnd`,
 * - `NavigationCancel`,
 * - `NavigationError`
 * - `Scroll`
 *
 *
 */
export type Event = RouterEvent | RouteConfigLoadStart | RouteConfigLoadEnd | ChildActivationStart |
    ChildActivationEnd | ActivationStart | ActivationEnd | Scroll;
