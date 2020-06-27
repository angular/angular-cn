/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Observable} from 'rxjs';

import {Route} from './config';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from './router_state';
import {UrlSegment, UrlTree} from './url_tree';


/**
 * @description
 *
 * Interface that a class can implement to be a guard deciding if a route can be activated.
 * If all guards return `true`, navigation will continue. If any guard returns `false`,
 * navigation will be cancelled. If any guard returns a `UrlTree`, current navigation will
 * be cancelled and a new navigation will be kicked off to the `UrlTree` returned from the
 * guard.
 *
 * 一个接口，某些类可以实现它以扮演一个守卫，来决定该路由能否激活。
 * 如果所有守卫都返回 `true`，就会继续导航。如果任何一个守卫返回了 `false`，就会取消导航。
 * 如果任何一个守卫返回了 `UrlTree`，就会取消当前导航，并开始导航到这个守卫所返回的 `UrlTree`。
 *
 * ```
 * class UserToken {}
 * class Permissions {
 *   canActivate(user: UserToken, id: string): boolean {
 *     return true;
 *   }
 * }
 *
 * @Injectable()
 * class CanActivateTeam implements CanActivate {
 *   constructor(private permissions: Permissions, private currentUser: UserToken) {}
 *
 *   canActivate(
 *     route: ActivatedRouteSnapshot,
 *     state: RouterStateSnapshot
 *   ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
 *     return this.permissions.canActivate(this.currentUser, route.params.id);
 *   }
 * }
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'team/:id',
 *         component: TeamComponent,
 *         canActivate: [CanActivateTeam]
 *       }
 *     ])
 *   ],
 *   providers: [CanActivateTeam, UserToken, Permissions]
 * })
 * class AppModule {}
 * ```
 *
 * You can alternatively provide a function with the `canActivate` signature:
 *
 * 你还可以转而实现一个带有 `canActivate` 签名的函数：
 *
 * ```
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'team/:id',
 *         component: TeamComponent,
 *         canActivate: ['canActivateTeam']
 *       }
 *     ])
 *   ],
 *   providers: [
 *     {
 *       provide: 'canActivateTeam',
 *       useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
 *     }
 *   ]
 * })
 * class AppModule {}
 * ```
 *
 * @publicApi
 */
export interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;
}

export type CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;

/**
 * @description
 *
 * Interface that a class can implement to be a guard deciding if a child route can be activated.
 * If all guards return `true`, navigation will continue. If any guard returns `false`,
 * navigation will be cancelled. If any guard returns a `UrlTree`, current navigation will
 * be cancelled and a new navigation will be kicked off to the `UrlTree` returned from the
 * guard.
 *
 * 一个接口，某些类可以实现它以扮演一个守卫，来决定该路由的子路由能否激活。
 * 如果所有守卫都返回 `true`，就会继续导航。如果任何一个守卫返回了 `false`，就会取消导航。
 * 如果任何一个守卫返回了 `UrlTree`，就会取消当前导航，并开始导航到这个守卫所返回的 `UrlTree`。
 *
 * ```
 * class UserToken {}
 * class Permissions {
 *   canActivate(user: UserToken, id: string): boolean {
 *     return true;
 *   }
 * }
 *
 * @Injectable()
 * class CanActivateTeam implements CanActivateChild {
 *   constructor(private permissions: Permissions, private currentUser: UserToken) {}
 *
 *   canActivateChild(
 *     route: ActivatedRouteSnapshot,
 *     state: RouterStateSnapshot
 *   ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
 *     return this.permissions.canActivate(this.currentUser, route.params.id);
 *   }
 * }
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'root',
 *         canActivateChild: [CanActivateTeam],
 *         children: [
 *           {
 *              path: 'team/:id',
 *              component: TeamComponent
 *           }
 *         ]
 *       }
 *     ])
 *   ],
 *   providers: [CanActivateTeam, UserToken, Permissions]
 * })
 * class AppModule {}
 * ```
 *
 * You can alternatively provide a function with the `canActivateChild` signature:
 *
 * 你还可以转而提供一个具有 `canActivateChild` 签名的函数：
 *
 * ```
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'root',
 *         canActivateChild: ['canActivateTeam'],
 *         children: [
 *           {
 *             path: 'team/:id',
 *             component: TeamComponent
 *           }
 *         ]
 *       }
 *     ])
 *   ],
 *   providers: [
 *     {
 *       provide: 'canActivateTeam',
 *       useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => true
 *     }
 *   ]
 * })
 * class AppModule {}
 * ```
 *
 * @publicApi
 */
export interface CanActivateChild {
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;
}

export type CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;

/**
 * @description
 *
 * Interface that a class can implement to be a guard deciding if a route can be deactivated.
 * If all guards return `true`, navigation will continue. If any guard returns `false`,
 * navigation will be cancelled. If any guard returns a `UrlTree`, current navigation will
 * be cancelled and a new navigation will be kicked off to the `UrlTree` returned from the
 * guard.
 *
 * 一个接口，某些类可以实现它以扮演一个守卫，来决定该路由能否停用。
 * 如果所有守卫都返回 `true`，就会继续导航。如果任何一个守卫返回了 `false`，就会取消导航。
 * 如果任何一个守卫返回了 `UrlTree`，就会取消当前导航，并开始导航到这个守卫所返回的 `UrlTree`。
 *
 * ```
 * class UserToken {}
 * class Permissions {
 *   canDeactivate(user: UserToken, id: string): boolean {
 *     return true;
 *   }
 * }
 *
 * @Injectable()
 * class CanDeactivateTeam implements CanDeactivate<TeamComponent> {
 *   constructor(private permissions: Permissions, private currentUser: UserToken) {}
 *
 *   canDeactivate(
 *     component: TeamComponent,
 *     currentRoute: ActivatedRouteSnapshot,
 *     currentState: RouterStateSnapshot,
 *     nextState: RouterStateSnapshot
 *   ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
 *     return this.permissions.canDeactivate(this.currentUser, route.params.id);
 *   }
 * }
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'team/:id',
 *         component: TeamComponent,
 *         canDeactivate: [CanDeactivateTeam]
 *       }
 *     ])
 *   ],
 *   providers: [CanDeactivateTeam, UserToken, Permissions]
 * })
 * class AppModule {}
 * ```
 *
 * You can alternatively provide a function with the `canDeactivate` signature:
 *
 * 你还可以转而提供具有 `canDeactivate` 签名的函数：
 *
 * ```
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'team/:id',
 *         component: TeamComponent,
 *         canDeactivate: ['canDeactivateTeam']
 *       }
 *     ])
 *   ],
 *   providers: [
 *     {
 *       provide: 'canDeactivateTeam',
 *       useValue: (component: TeamComponent, currentRoute: ActivatedRouteSnapshot, currentState:
 * RouterStateSnapshot, nextState: RouterStateSnapshot) => true
 *     }
 *   ]
 * })
 * class AppModule {}
 * ```
 *
 * @publicApi
 */
export interface CanDeactivate<T> {
  canDeactivate(
      component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
      nextState?: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean
      |UrlTree;
}

export type CanDeactivateFn<T> =
    (component: T, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot,
     nextState?: RouterStateSnapshot) =>
        Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;

/**
 * @description
 *
 * Interface that classes can implement to be a data provider.
 * A data provider class can be used with the router to resolve data during navigation.
 * The interface defines a `resolve()` method that will be invoked when the navigation starts.
 * The router will then wait for the data to be resolved before the route is finally activated.
 *
 * 一个接口，某些类可以实现它以扮演一个数据提供者。
 *
 * ```
 * @Injectable({ providedIn: 'root' })
 * export class HeroResolver implements Resolve<Hero> {
 *   constructor(private service: HeroService) {}
 *
 *   resolve(
 *     route: ActivatedRouteSnapshot,
 *     state: RouterStateSnapshot
 *   ): Observable<any>|Promise<any>|any {
 *     return this.service.getHero(route.paramMap.get('id'));
 *   }
 * }
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'detail/:id',
 *         component: HeroDetailComponent,
 *         resolve: {
 *           hero: HeroResolver
 *         }
 *       }
 *     ])
 *   ],
 *   exports: [RouterModule]
 * })
 * export class AppRoutingModule {}
 * ```
 *
 * You can alternatively provide a function with the `resolve` signature:
 *
 * 你还可以转而提供一个具有 `resolve` 签名的函数：
 *
 * ```
 * export const myHero: Hero = {
 *   // ...
 * }
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'detail/:id',
 *         component: HeroComponent,
 *         resolve: {
 *           hero: 'heroResolver'
 *         }
 *       }
 *     ])
 *   ],
 *   providers: [
 *     {
 *       provide: 'heroResolver',
 *       useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => myHero
 *     }
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * @publicApi
 */
export interface Resolve<T> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T>|Promise<T>|T;
}


/**
 * @description
 *
 * Interface that a class can implement to be a guard deciding if children can be loaded.
 * If all guards return `true`, navigation will continue. If any guard returns `false`,
 * navigation will be cancelled. If any guard returns a `UrlTree`, current navigation will
 * be cancelled and a new navigation will be kicked off to the `UrlTree` returned from the
 * guard.
 *
 * 一个接口，某些类可以实现它以扮演一个守卫，来决定该路由的子路由能否加载。
 *
 * ```
 * class UserToken {}
 * class Permissions {
 *   canLoadChildren(user: UserToken, id: string, segments: UrlSegment[]): boolean {
 *     return true;
 *   }
 * }
 *
 * @Injectable()
 * class CanLoadTeamSection implements CanLoad {
 *   constructor(private permissions: Permissions, private currentUser: UserToken) {}
 *
 *   canLoad(route: Route, segments: UrlSegment[]): Observable<boolean>|Promise<boolean>|boolean {
 *     return this.permissions.canLoadChildren(this.currentUser, route, segments);
 *   }
 * }
 *
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'team/:id',
 *         component: TeamComponent,
 *         loadChildren: 'team.js',
 *         canLoad: [CanLoadTeamSection]
 *       }
 *     ])
 *   ],
 *   providers: [CanLoadTeamSection, UserToken, Permissions]
 * })
 * class AppModule {}
 * ```
 *
 * You can alternatively provide a function with the `canLoad` signature:
 *
 * 你还可以转而提供一个具有 `canLoad` 签名的函数：
 *
 * ```
 * @NgModule({
 *   imports: [
 *     RouterModule.forRoot([
 *       {
 *         path: 'team/:id',
 *         component: TeamComponent,
 *         loadChildren: 'team.js',
 *         canLoad: ['canLoadTeamSection']
 *       }
 *     ])
 *   ],
 *   providers: [
 *     {
 *       provide: 'canLoadTeamSection',
 *       useValue: (route: Route, segments: UrlSegment[]) => true
 *     }
 *   ]
 * })
 * class AppModule {}
 * ```
 *
 * @publicApi
 */
export interface CanLoad {
  canLoad(route: Route, segments: UrlSegment[]):
      Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;
}

export type CanLoadFn = (route: Route, segments: UrlSegment[]) =>
    Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree;
