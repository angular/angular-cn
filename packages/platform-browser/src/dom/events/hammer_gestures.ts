/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT} from '@angular/common';
import {Inject, Injectable, InjectionToken, NgModule, Optional, Provider, ɵConsole as Console} from '@angular/core';

import {EVENT_MANAGER_PLUGINS, EventManagerPlugin} from './event_manager';



/**
 * Supported HammerJS recognizer event names.
 */
const EVENT_NAMES = {
  // pan
  'pan': true,
  'panstart': true,
  'panmove': true,
  'panend': true,
  'pancancel': true,
  'panleft': true,
  'panright': true,
  'panup': true,
  'pandown': true,
  // pinch
  'pinch': true,
  'pinchstart': true,
  'pinchmove': true,
  'pinchend': true,
  'pinchcancel': true,
  'pinchin': true,
  'pinchout': true,
  // press
  'press': true,
  'pressup': true,
  // rotate
  'rotate': true,
  'rotatestart': true,
  'rotatemove': true,
  'rotateend': true,
  'rotatecancel': true,
  // swipe
  'swipe': true,
  'swipeleft': true,
  'swiperight': true,
  'swipeup': true,
  'swipedown': true,
  // tap
  'tap': true,
  'doubletap': true
};

/**
 * DI token for providing [HammerJS](https://hammerjs.github.io/) support to Angular.
 *
 * DI 令牌，用于为 [Angular 提供 HammerJS](https://hammerjs.github.io/)支持。
 *
 * @see `HammerGestureConfig`
 *
 * @ngModule HammerModule
 * @publicApi
 */
export const HAMMER_GESTURE_CONFIG = new InjectionToken<HammerGestureConfig>('HammerGestureConfig');


/**
 * Function that loads HammerJS, returning a promise that is resolved once HammerJs is loaded.
 *
 * 加载 HammerJS 的函数，返回一个在 HammerJs 加载后解析的 Promise。
 *
 * @publicApi
 */
export type HammerLoader = () => Promise<void>;

/**
 * Injection token used to provide a {@link HammerLoader} to Angular.
 *
 * 用于向 Angular 提供 {@link HammerLoader} 的注入令牌。
 *
 * @publicApi
 */
export const HAMMER_LOADER = new InjectionToken<HammerLoader>('HammerLoader');

export interface HammerInstance {
  on(eventName: string, callback?: Function): void;
  off(eventName: string, callback?: Function): void;
  destroy?(): void;
}

/**
 * An injectable [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
 * for gesture recognition. Configures specific event recognition.
 *
 * 用于手势识别的可注入 [HammerJS 管理器](https://hammerjs.github.io/api/#hammermanager)。配置事件识别的选项。
 *
 * @publicApi
 */
@Injectable()
export class HammerGestureConfig {
  /**
   * A set of supported event names for gestures to be used in Angular.
   * Angular supports all built-in recognizers, as listed in
   * [HammerJS documentation](https://hammerjs.github.io/).
   *
   * Angular 中所用的一组受支持的手势事件名。Angular 支持所有的内置识别器，如 [HammerJS 文档中](https://hammerjs.github.io/)所列。
   *
   */
  events: string[] = [];

  /**
   * Maps gesture event names to a set of configuration options
   * that specify overrides to the default values for specific properties.
   *
   * 将手势事件名映射到一组配置选项，这些配置选项用于覆盖特定属性的默认值。
   *
   * The key is a supported event name to be configured,
   * and the options object contains a set of properties, with override values
   * to be applied to the named recognizer event.
   * For example, to disable recognition of the rotate event, specify
   *  `{"rotate": {"enable": false}}`.
   *
   * 键名是要配置的受支持事件名称，options 对象包含一组属性，以及将套用到命名识别器事件的替代值。例如，要禁用对 Rotate 事件的识别，请指定 `{"rotate": {"enable": false}}` 。
   *
   * Properties that are not present take the HammerJS default values.
   * For information about which properties are supported for which events,
   * and their allowed and default values, see
   * [HammerJS documentation](https://hammerjs.github.io/).
   *
   * 未提供的属性采用 HammerJS 默认值。有关哪些事件支持哪些属性以及它们的允许值和默认值的信息，请参见 [HammerJS 文档](https://hammerjs.github.io/)。
   *
   */
  overrides: {[key: string]: Object} = {};

  /**
   * Properties whose default values can be overridden for a given event.
   * Different sets of properties apply to different events.
   * For information about which properties are supported for which events,
   * and their allowed and default values, see
   * [HammerJS documentation](https://hammerjs.github.io/).
   *
   * 用来为给定事件覆盖其默认值的属性。不同的属性集适用于不同的事件。有关哪些事件支持哪些属性以及它们的允许值和默认值的信息，请参见 [HammerJS 文档](https://hammerjs.github.io/)。
   *
   */
  options?: {
    cssProps?: any;
    domEvents?: boolean;
    enable?: boolean | ((manager: any) => boolean);
    preset?: any[];
    touchAction?: string;
    recognizers?: any[];
    inputClass?: any;
    inputTarget?: EventTarget;
  };

  /**
   * Creates a [HammerJS Manager](https://hammerjs.github.io/api/#hammermanager)
   * and attaches it to a given HTML element.
   *
   * 创建一个 [HammerJS](https://hammerjs.github.io/api/#hammermanager) 管理器，并将其附加到给定的 HTML 元素。
   *
   * @param element The element that will recognize gestures.
   *
   * 要识别手势的元素。
   *
   * @returns A HammerJS event-manager object.
   *
   * 一个 HammerJS 事件管理器对象。
   *
   */
  buildHammer(element: HTMLElement): HammerInstance {
    const mc = new Hammer!(element, this.options);

    mc.get('pinch').set({enable: true});
    mc.get('rotate').set({enable: true});

    for (const eventName in this.overrides) {
      mc.get(eventName).set(this.overrides[eventName]);
    }

    return mc;
  }
}

/**
 * Event plugin that adds Hammer support to an application.
 *
 * @ngModule HammerModule
 */
@Injectable()
export class HammerGesturesPlugin extends EventManagerPlugin {
  constructor(
      @Inject(DOCUMENT) doc: any,
      @Inject(HAMMER_GESTURE_CONFIG) private _config: HammerGestureConfig, private console: Console,
      @Optional() @Inject(HAMMER_LOADER) private loader?: HammerLoader|null) {
    super(doc);
  }

  supports(eventName: string): boolean {
    if (!EVENT_NAMES.hasOwnProperty(eventName.toLowerCase()) && !this.isCustomEvent(eventName)) {
      return false;
    }

    if (!(window as any).Hammer && !this.loader) {
      this.console.warn(
          `The "${eventName}" event cannot be bound because Hammer.JS is not ` +
          `loaded and no custom loader has been specified.`);
      return false;
    }

    return true;
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    const zone = this.manager.getZone();
    eventName = eventName.toLowerCase();

    // If Hammer is not present but a loader is specified, we defer adding the event listener
    // until Hammer is loaded.
    if (!(window as any).Hammer && this.loader) {
      // This `addEventListener` method returns a function to remove the added listener.
      // Until Hammer is loaded, the returned function needs to *cancel* the registration rather
      // than remove anything.
      let cancelRegistration = false;
      let deregister: Function = () => {
        cancelRegistration = true;
      };

      this.loader()
          .then(() => {
            // If Hammer isn't actually loaded when the custom loader resolves, give up.
            if (!(window as any).Hammer) {
              this.console.warn(
                  `The custom HAMMER_LOADER completed, but Hammer.JS is not present.`);
              deregister = () => {};
              return;
            }

            if (!cancelRegistration) {
              // Now that Hammer is loaded and the listener is being loaded for real,
              // the deregistration function changes from canceling registration to removal.
              deregister = this.addEventListener(element, eventName, handler);
            }
          })
          .catch(() => {
            this.console.warn(
                `The "${eventName}" event cannot be bound because the custom ` +
                `Hammer.JS loader failed.`);
            deregister = () => {};
          });

      // Return a function that *executes* `deregister` (and not `deregister` itself) so that we
      // can change the behavior of `deregister` once the listener is added. Using a closure in
      // this way allows us to avoid any additional data structures to track listener removal.
      return () => {
        deregister();
      };
    }

    return zone.runOutsideAngular(() => {
      // Creating the manager bind events, must be done outside of angular
      const mc = this._config.buildHammer(element);
      const callback = function(eventObj: HammerInput) {
        zone.runGuarded(function() {
          handler(eventObj);
        });
      };
      mc.on(eventName, callback);
      return () => {
        mc.off(eventName, callback);
        // destroy mc to prevent memory leak
        if (typeof mc.destroy === 'function') {
          mc.destroy();
        }
      };
    });
  }

  isCustomEvent(eventName: string): boolean {
    return this._config.events.indexOf(eventName) > -1;
  }
}

/**
 * In Ivy, support for Hammer gestures is optional, so applications must
 * import the `HammerModule` at root to turn on support. This means that
 * Hammer-specific code can be tree-shaken away if not needed.
 */
export const HAMMER_PROVIDERS__POST_R3__ = [];

/**
 * In View Engine, support for Hammer gestures is built-in by default.
 */
export const HAMMER_PROVIDERS__PRE_R3__: Provider[] = [
  {
    provide: EVENT_MANAGER_PLUGINS,
    useClass: HammerGesturesPlugin,
    multi: true,
    deps: [DOCUMENT, HAMMER_GESTURE_CONFIG, Console, [new Optional(), HAMMER_LOADER]]
  },
  {provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig, deps: []},
];

export const HAMMER_PROVIDERS = HAMMER_PROVIDERS__PRE_R3__;

/**
 * Adds support for HammerJS.
 *
 * 添加了对 HammerJS 的支持。
 *
 * Import this module at the root of your application so that Angular can work with
 * HammerJS to detect gesture events.
 *
 * 将此模块导入应用程序的根模块，以便 Angular 可以与 HammerJS 一起使用以检测手势事件。
 *
 * Note that applications still need to include the HammerJS script itself. This module
 * simply sets up the coordination layer between HammerJS and Angular's EventManager.
 *
 * 请注意，应用程序仍需要包含 HammerJS 脚本本身。该模块只是在 HammerJS 和 Angular 的 EventManager 之间建立了一个协调层。
 *
 * @publicApi
 */
@NgModule({providers: HAMMER_PROVIDERS__PRE_R3__})
export class HammerModule {
}
