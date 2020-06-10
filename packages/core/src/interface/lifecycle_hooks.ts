/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {SimpleChanges} from './simple_change';


/**
 * @description
 * A lifecycle hook that is called when any data-bound property of a directive changes.
 * Define an `ngOnChanges()` method to handle the changes.
 *
 * 一个生命周期钩子，当指令的任何一个可绑定属性发生变化时调用。
 * 定义一个 `ngOnChanges()` 方法来处理这些变更。
 *
 * @see `DoCheck`
 * @see `OnInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define an on-changes handler for an input property.
 *
 * 下列代码片段展示了组件要如何实现本接口来定义一个输入属性的变更处理器。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnChanges'}
 *
 * @publicApi
 */
export interface OnChanges {
  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * 如果至少发生了一次变更，则该回调方法会在默认的变更检测器检查完可绑定属性之后、视图子节点和内容子节点检查完之前调用。
   *
   * @param changes The changed properties.
   *
   * 那些发生了变化的属性。
   */
  ngOnChanges(changes: SimpleChanges): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has initialized
 * all data-bound properties of a directive.
 * Define an `ngOnInit()` method to handle any additional initialization tasks.
 *
 * 一个生命周期钩子，它会在 Angular 初始化完了该指令的所有数据绑定属性之后调用。
 * 定义 `ngOnInit()` 方法可以处理所有附加的初始化任务。
 *
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own initialization method.
 *
 * 下列片段展示了组件要如何实现此接口，以定义它自己的初始化方法。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnInit'}
 *
 * @publicApi
 */
export interface OnInit {
  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   *
   * 它的调用时机在默认的变更检测器首次检查完该指令的所有数据绑定属性之后，任何子视图或投影内容检查完之前。
   * 它会且只会在指令初始化时调用一次。
   */
  ngOnInit(): void;
}

/**
 * A lifecycle hook that invokes a custom change-detection function for a directive,
 * in addition to the check performed by the default change-detector.
 *
 * 一个生命周期钩子，除了使用默认的变更检查器执行检查之外，还会为指令执行自定义的变更检测函数。
 *
 * The default change-detection algorithm looks for differences by comparing
 * bound-property values by reference across change detection runs. You can use this
 * hook to check for and respond to changes by some other means.
 *
 * 在变更检测期间，默认的变更检测算法会根据引用来比较可绑定属性，以查找差异。
 * 你可以使用此钩子来用其他方式检查和响应变更。
 *
 * When the default change detector detects changes, it invokes `ngOnChanges()` if supplied,
 * regardless of whether you perform additional change detection.
 * Typically, you should not use both `DoCheck` and `OnChanges` to respond to
 * changes on the same input.
 *
 * 当默认的变更检测器检查更改时，它会执行 `ngOnChanges()`（如果有），而不在乎你是否进行了额外的变更检测。
 * 一般来说，你不应该同时使用 `DoCheck` 和 `OnChanges` 这两个钩子来响应在同一个输入上发生的更改。
 *
 * @see `OnChanges`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to invoke it own change-detection cycle.
 *
 * 下列代码片段展示了组件如何实现该接口，以执行自定义的变更检测周期。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='DoCheck'}
 *
 * @publicApi
 */
export interface DoCheck {
  /**
   * A callback method that performs change-detection, invoked
   * after the default change-detector runs.
   * See `KeyValueDiffers` and `IterableDiffers` for implementing
   * custom change checking for collections.
   *
   * 一个回调方法。它会在默认的变更检测器执行之后调用，并进行变更检测。
     * 参见 `KeyValueDiffers` 和 `IterableDiffers`，以实现针对集合对象的自定义变更检测逻辑。
     */
  ngDoCheck(): void;
}

/**
 * A lifecycle hook that is called when a directive, pipe, or service is destroyed.
 * Use for any custom cleanup that needs to occur when the
 * instance is destroyed.
 *
 * 一个生命周期钩子，它会在指令、管道或服务被销毁时调用。
 * 用于在实例被销毁时，执行一些自定义清理代码。
 *
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface
 * to define its own custom clean-up method.
 *
 * 下列代码片段展示了组件如何实现该接口，以定义它自己的清理逻辑。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='OnDestroy'}
 *
 * @publicApi
 */
export interface OnDestroy {
  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   *
   * 一个用于执行清理逻辑的回调方法，会在指令、管道、服务的实例被销毁后立即调用。
   */
  ngOnDestroy(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * all content of a directive.
 * Define an `ngAfterContentInit()` method to handle any additional initialization tasks.
 *
 * 一个生命周期钩子，它会在 Angular 完全实例化了指令的所有内容之后调用。
 * 定义一个 `ngAfterContentInit()` 方法来处理额外的初始化任务。
 *
 * @see `OnInit`
 * @see `AfterViewInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own content initialization method.
 *
 * 下列代码展示了组件如何实现该接口，并定义它自己的内容初始化逻辑。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentInit'}
 *
 * @publicApi
 */
export interface AfterContentInit {
  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   *
   * 一个回调方法，它会在 Angular 初始化完该指令的所有内容之后立即调用。
   * 在指令初始化完成之后，它只会调用一次。
   *
   */
  ngAfterContentInit(): void;
}

/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking all content of a directive.
 *
 * 一个生命周期钩子，它会在默认的变更检测器对指令的所有内容完成了变更检查之后调用。
 *
 * @see `AfterViewChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * 下列代码展示了组件如何实现该接口，已定义它在检查后要执行的自定义功能。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterContentChecked'}
 *
 * @publicApi
 */
export interface AfterContentChecked {
  /**
   * A callback method that is invoked immediately after the
   * default change detector has completed checking all of the directive's
   * content.
   *
   * 一个回调函数，会在默认的变更检测器对该指令下的所有内容完成了变更检测之后立即调用。
   */
  ngAfterContentChecked(): void;
}

/**
 * @description
 * A lifecycle hook that is called after Angular has fully initialized
 * a component's view.
 * Define an `ngAfterViewInit()` method to handle any additional initialization tasks.
 *
 * 一个生命周期钩子，会在 Angular 完全初始化了组件的视图后调用。
 * 定义一个 `ngAfterViewInit()` 方法来处理一些额外的初始化任务。
 *
 * @see `OnInit`
 * @see `AfterContentInit`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own view initialization method.
 *
 * 下列代码片段展示了组件如何实现该接口，以定义自己的视图初始化逻辑。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewInit'}
 *
 * @publicApi
 */
export interface AfterViewInit {
  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of a component's view.
   * It is invoked only once when the view is instantiated.
   *
   * 一个回调方法，它会在 Angular 完成了组件视图的初始化逻辑之后立即调用。
   * 在视图初始化完成之后，它只会调用一次。
   */
  ngAfterViewInit(): void;
}

/**
 * @description
 * A lifecycle hook that is called after the default change detector has
 * completed checking a component's view for changes.
 *
 * 一个生命周期钩子，它会在默认的变更检测器完成了对组件视图的变更检测之后调用。
 *
 * @see `AfterContentChecked`
 * @see [Lifecycle Hooks](guide/lifecycle-hooks#onchanges) guide
 *
 * [生命周期钩子](guide/lifecycle-hooks#onchanges)
 *
 * @usageNotes
 * The following snippet shows how a component can implement this interface to
 * define its own after-check functionality.
 *
 * 下面的代码片段展示了组件如何实现该接口，以定义在完成检查之后要执行的自定义逻辑。
 *
 * {@example core/ts/metadata/lifecycle_hooks_spec.ts region='AfterViewChecked'}
 *
 * @publicApi
 */
export interface AfterViewChecked {
  /**
   * A callback method that is invoked immediately after the
   * default change detector has completed one change-check cycle
   * for a component's view.
   *
   * 一个回调方法，它会在默认的变更检测器对组件视图完成了一轮变更检测周期之后立即调用。
   */
  ngAfterViewChecked(): void;
}
