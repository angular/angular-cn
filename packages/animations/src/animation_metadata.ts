/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Represents a set of CSS styles for use in an animation style.
 *
 * 表示一组要用在动画样式中的 CSS 样式。
 */
export interface ɵStyleData {
  [key: string]: string|number;
}

/**
 * Represents animation-step timing parameters for an animation step.
 *
 * 表示一个动画步骤中的动画时序参数。
 *
* @see `animate()`
 *
 * @publicApi
 */
export declare type AnimateTimings = {
  /**
   * The full duration of an animation step. A number and optional time unit,
   * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
   * The default unit is milliseconds.
   *
   * 此动画步骤的完整持续时间。包括一个数字和一个可选的时间单位，比如 "1s" 表示一秒 或 "10ms" 表示 10 毫秒。
   * 默认的单位是毫秒。
   */
  duration: number,
  /**
   * The delay in applying an animation step. A number and optional time unit.
   * The default unit is milliseconds.
   *
   * 此动画步骤的延迟时间。包括一个数字和一个可选的时间单位。
   * 默认单位是毫秒。
   */
  delay: number,
  /**
   * An easing style that controls how an animations step accelerates
   * and decelerates during its run time. An easing function such as `cubic-bezier()`,
   * or one of the following constants:
   *
   * 一种缓动风格，用于控制此动画步骤在运行期间如何加速和减速。动画函数或者是像 `cubic-bezier()` 这样的函数，或者是下列常量之一：
   *
   * - `ease-in`
   * - `ease-out`
   * - `ease-in-and-out`
   */
  easing: string | null
};

/**
 * @description Options that control animation styling and timing.
 *
 * 用来控制动画样式和时序的选项。
 *
 * The following animation functions accept `AnimationOptions` data:
 *
 * 下列动画函数可以接受 `AnimationOptions` 数据：
 *
 * - `transition()`
 * - `sequence()`
 * - `{@link animations/group group()}`
 * - `query()`
 * - `animation()`
 * - `useAnimation()`
 * - `animateChild()`
 *
 * Programmatic animations built using the `AnimationBuilder` service also
 * make use of `AnimationOptions`.
 *
 * 利用 `AnimationBuilder` 服务构建程序化动画时也会用到 `AnimationBuilder`。
 *
 * @publicApi
 */
export declare interface AnimationOptions {
  /**
   * Sets a time-delay for initiating an animation action.
   * A number and optional time unit, such as "1s" or "10ms" for one second
   * and 10 milliseconds, respectively.The default unit is milliseconds.
   * Default value is 0, meaning no delay.
   *
   * 设置第一个动画动作开始前的延迟时间。
   * 包括一个数字和一个可选的时间单位，比如 "1s" 表示一秒，"10ms" 表示十毫秒。
   * 默认单位是毫秒。
   * 默认值为 0，表示不延迟。
   */
  delay?: number|string;
  /**
   * A set of developer-defined parameters that modify styling and timing
   * when an animation action starts. An array of key-value pairs, where the provided value
   * is used as a default.
   *
   * 一组可由开发人员来定义的参数，用于在动画开始时修改样式和时序。
   * 这是一组键值对，它所提供的值会用做默认值。
  */
  params?: {[name: string]: any};
}

/**
 * Adds duration options to control animation styling and timing for a child animation.
 *
 * 添加持续时间选项，以控制子动画的动画样式和时序。
 *
 * @see `animateChild()`
 *
 * @publicApi
 */
export declare interface AnimateChildOptions extends AnimationOptions {
  duration?: number|string;
}

/**
 * @description Constants for the categories of parameters that can be defined for animations.
 *
 * 一组可以为动画定义参数类别的常量。
 *
 * A corresponding function defines a set of parameters for each category, and
 * collects them into a corresponding `AnimationMetadata` object.
 *
 * 相应的函数为每个类别定义了一组参数，并把它们汇集进相应的 `AnimationMetadata` 对象中。
 *
 * @publicApi
 */
export const enum AnimationMetadataType {
  /**
   * Associates a named animation state with a set of CSS styles.
   * See `state()`
   *
   * 把一个命名的动画状态和一组 CSS 样式关联起来。
   * 参见 `state()`。
   */
  State = 0,
  /**
   * Data for a transition from one animation state to another.
   * See `transition()`
   *
   * 用于从一个动画状态过渡到另一个状态的数据。
   * 参见 `transition()`
   */
  Transition = 1,
  /**
   * Contains a set of animation steps.
   * See `sequence()`
   *
   * 包含一组动画步骤。
   * 参见 `sequence()`
   */
  Sequence = 2,
  /**
   * Contains a set of animation steps.
   * See `{@link animations/group group()}`
   *
   * 包含一组动画步骤。
   * 参见 `{@link animations/group group()}`
   */
  Group = 3,
  /**
   * Contains an animation step.
   * See `animate()`
   *
   * 包含一个动画步骤。
   * 参见 `animate()`
   */
  Animate = 4,
  /**
   * Contains a set of animation steps.
   * See `keyframes()`
   *
   * 包含一组动画步骤。
   * 参见 `keyframes()`
   */
  Keyframes = 5,
  /**
   * Contains a set of CSS property-value pairs into a named style.
   * See `style()`
   *
   * 包含一组 CSS 属性键值对和命名样式的对照表。
   * 参见 `style()`
   */
  Style = 6,
  /**
   * Associates an animation with an entry trigger that can be attached to an element.
   * See `trigger()`
   *
   * 把一个动画和一个可附加到元素上的触发器关联起来。
   * 参见 `trigger()`
   */
  Trigger = 7,
  /**
   * Contains a re-usable animation.
   * See `animation()`
   *
   * 包含一个可复用的动画。
   * 参见 `animation()`
   */
  Reference = 8,
  /**
   * Contains data to use in executing child animations returned by a query.
   * See `animateChild()`
   *
   * 包含一些数据，用于执行一些由查询返回的自动化。
   * 参见 `animateChild()`
   */
  AnimateChild = 9,
  /**
   * Contains animation parameters for a re-usable animation.
   * See `useAnimation()`
   *
   * 包含一些供可复用动画使用的动画参数。
   * 参见 `useAnimation()`
   */
  AnimateRef = 10,
  /**
   * Contains child-animation query data.
   * See `query()`
   *
   * 包含子动画的查询数据。
   * 参见 `query()`
   */
  Query = 11,
  /**
   * Contains data for staggering an animation sequence.
   * See `stagger()`
   *
   * 包含动画序列的交错数据。
   * 参见 `stagger()`
   */
  Stagger = 12
}

/**
 * Specifies automatic styling.
 *
 * 用于指定自动化样式。
 *
 * @publicApi
 */
export const AUTO_STYLE = '*';

/**
 * Base for animation data structures.
 *
 * 动画数据结构的基类。
 *
 * @publicApi
 */
export interface AnimationMetadata {
  type: AnimationMetadataType;
}

/**
 * Contains an animation trigger. Instantiated and returned by the
 * `trigger()` function.
 *
 * 包含一个动画触发器。由 `trigger()` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationTriggerMetadata extends AnimationMetadata {
  /**
   * The trigger name, used to associate it with an element. Unique within the component.
   *
   * 触发器名称，用于把它和元素关联起来。在组件内要唯一。
    */
  name: string;
  /**
   * An animation definition object, containing an array of state and transition declarations.
   *
   * 一个动画定义对象，包含一组状态和转场声明。
   */
  definitions: AnimationMetadata[];
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个选项对象，包含延迟和一些由开发人员定义的参数。这些参数用来提供样式的默认值，并且可以在调用时重写。
   * 默认的延迟为 0。
   */
  options: {params?: {[name: string]: any}}|null;
}

/**
 * Encapsulates an animation state by associating a state name with a set of CSS styles.
 * Instantiated and returned by the `state()` function.
 *
 * 通过将状态名称和一组 CSS 样式相关联来封装一个动画状态。
 * 由 `state()` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationStateMetadata extends AnimationMetadata {
  /**
   * The state name, unique within the component.
   *
   * 状态名，在组件内要唯一。
   */
  name: string;
  /**
   *  The CSS styles associated with this state.
   *
   *  与该状态相关联的一些 CSS 样式。
   */
  styles: AnimationStyleMetadata;
  /**
   * An options object containing
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation.
   *
   * 一个配置对象，包含一些由开发人员定义的参数，以提供默认样式，并可以在调用时重写。
   */
  options?: {params: {[name: string]: any}};
}

/**
 * Encapsulates an animation transition. Instantiated and returned by the
 * `transition()` function.
 *
 * 封装一个转场动画。由 `transition()` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationTransitionMetadata extends AnimationMetadata {
  /**
   * An expression that describes a state change.
   *
   * 用于描述状态变更的表达式。
   */
  expr: string|
      ((fromState: string, toState: string, element?: any,
        params?: {[key: string]: any}) => boolean);
  /**
   * One or more animation objects to which this transition applies.
   *
   * 该转场动画所包含的一个或多个动画对象。
   */
  animation: AnimationMetadata|AnimationMetadata[];
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
   * 默认延迟为 0。
   */
  options: AnimationOptions|null;
}

/**
 * Encapsulates a reusable animation, which is a collection of individual animation steps.
 * Instantiated and returned by the `animation()` function, and
 * passed to the `useAnimation()` function.
 *
 * 封装一个可复用的动画，包括一组独立的动画步骤。由 `animation()` 函数返回，并传给 `useAnimation()` 函数。
 *
 * @publicApi
 */
export interface AnimationReferenceMetadata extends AnimationMetadata {
  /**
   *  One or more animation step objects.
   *
   *  一个或多个动画步骤对象。
   */
  animation: AnimationMetadata|AnimationMetadata[];
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
   * 默认延迟为 0。
   */
  options: AnimationOptions|null;
}

/**
 * Encapsulates an animation query. Instantiated and returned by
 * the `query()` function.
 *
 * 封装一个动画查询。由 `query()` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationQueryMetadata extends AnimationMetadata {
  /**
   *  The CSS selector for this query.
   *
   *  该查询的 CSS 选择器。
   */
  selector: string;
  /**
   * One or more animation step objects.
   *
   * 一个或多个动画步骤对象。
   */
  animation: AnimationMetadata|AnimationMetadata[];
  /**
   * A query options object.
   *
   * 一个查询选项对象。
   */
  options: AnimationQueryOptions|null;
}

/**
 * Encapsulates a keyframes sequence. Instantiated and returned by
 * the `keyframes()` function.
 *
 * 封装一个关键帧序列。由 `keyframes()` 函数进行实例化并返回。
 *
 * @publicApi
 */
export interface AnimationKeyframesSequenceMetadata extends AnimationMetadata {
  /**
   * An array of animation styles.
   *
   * 一个由动画样式构成的数组。
   */
  steps: AnimationStyleMetadata[];
}

/**
 * Encapsulates an animation style. Instantiated and returned by
 * the `style()` function.
 *
 * 封装一个动画样式。由 `style()` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationStyleMetadata extends AnimationMetadata {
  /**
   * A set of CSS style properties.
   *
   * 一组 CSS 样式属性。
   */
  styles: '*'|{[key: string]: string | number}|Array<{[key: string]: string | number}|'*'>;
  /**
   * A percentage of the total animate time at which the style is to be applied.
   *
   * 应用该样式的那个时间点在总动画时序中的百分比。
   */
  offset: number|null;
}

/**
 * Encapsulates an animation step. Instantiated and returned by
 * the `animate()` function.
 *
 * 封装一个动画步骤。由 `animate()` 函数进行实例化并返回。
 *
 * @publicApi
 */
export interface AnimationAnimateMetadata extends AnimationMetadata {
  /**
   * The timing data for the step.
   *
   * 该步骤的时序数据。
   */
  timings: string|number|AnimateTimings;
  /**
   * A set of styles used in the step.
   *
   * 用在该步骤中的一组样式。
   */
  styles: AnimationStyleMetadata|AnimationKeyframesSequenceMetadata|null;
}

/**
 * Encapsulates a child animation, that can be run explicitly when the parent is run.
 * Instantiated and returned by the `animateChild` function.
 *
 * 封装一个子动画，父动画可以显式的运行它。
 * 由 `animateChild` 函数进行初始化和返回。
 *
 * @publicApi
 */
export interface AnimationAnimateChildMetadata extends AnimationMetadata {
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
   * 默认延迟为 0。
   */
  options: AnimationOptions|null;
}

/**
 * Encapsulates a reusable animation.
 * Instantiated and returned by the `useAnimation()` function.
 *
 * 封装一个可复用的动画。
 * 由 `useAnimation()` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationAnimateRefMetadata extends AnimationMetadata {
  /**
   * An animation reference object.
   *
   * 一个动画引用对象。
   */
  animation: AnimationReferenceMetadata;
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
   * 默认延迟为 0。
   */
  options: AnimationOptions|null;
}

/**
 * Encapsulates an animation sequence.
 * Instantiated and returned by the `sequence()` function.
 *
 * 封装一个动画序列。
 * 由 `sequence()` 函数进行实例化并返回。
 *
 * @publicApi
 */
export interface AnimationSequenceMetadata extends AnimationMetadata {
  /**
   *  An array of animation step objects.
   *
   *  一个由动画步骤对象构成的数组。
   */
  steps: AnimationMetadata[];
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
   * 默认延迟为 0。
   */
  options: AnimationOptions|null;
}

/**
 * Encapsulates an animation group.
 * Instantiated and returned by the `{@link animations/group group()}` function.
 *
 * 封装一个动画组。
 * 由 `{@link animations/group group()}` 函数实例化并返回。
 *
 * @publicApi
 */
export interface AnimationGroupMetadata extends AnimationMetadata {
  /**
   * One or more animation or style steps that form this group.
   *
   * 构成该组的一个或多个动画步骤或样式步骤。
   */
  steps: AnimationMetadata[];
  /**
   * An options object containing a delay and
   * developer-defined parameters that provide styling defaults and
   * can be overridden on invocation. Default delay is 0.
   *
   * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
   * 默认延迟为 0。
   */
  options: AnimationOptions|null;
}

/**
 * Encapsulates animation query options.
 * Passed to the `query()` function.
 *
 * 封装一些动画查询选项。
 * 传给 `query()` 函数。
 *
 * @publicApi
 */
export declare interface AnimationQueryOptions extends AnimationOptions {
  /**
   * True if this query is optional, false if it is required. Default is false.
   * A required query throws an error if no elements are retrieved when
   * the query is executed. An optional query does not.
   *
   * 如果该查询是可选的，则为 `true`，如果必选则为 `false`。默认为 `false`。
   * 当执行该查询时，如果没有取到元素，则必选查询会抛出错误，而可选查询则不会。
   */
  optional?: boolean;
  /**
   * A maximum total number of results to return from the query.
   * If negative, results are limited from the end of the query list towards the beginning.
   * By default, results are not limited.
   *
   * 从查询中返回的结果数上限。
   * 如果为负值，则从查询列表的末尾往前进行截取，直到上限。
   * 默认情况下，结果无上限。
   */
  limit?: number;
}

/**
 * Encapsulates parameters for staggering the start times of a set of animation steps.
 * Instantiated and returned by the `stagger()` function.
 *
 * 封装一组动画步骤的起始时间的交错参数。
 * 由 `stagger()` 函数实例化并返回。
 *
 *
 * @publicApi
 **/
export interface AnimationStaggerMetadata extends AnimationMetadata {
  /**
   * The timing data for the steps.
   *
   * 各个步骤的时序数据。
   */
  timings: string|number;
  /**
   * One or more animation steps.
   *
   * 一个或多个动画步骤。
   *
   */
  animation: AnimationMetadata|AnimationMetadata[];
}

/**
 * Creates a named animation trigger, containing a  list of `state()`
 * and `transition()` entries to be evaluated when the expression
 * bound to the trigger changes.
 *
 * 创建一个有名字的动画触发器，包含一个 `state()` 和 `transition()` 的列表，当此触发器的绑定表达式发生变化时，它们就会重新求值。
 *
 * @param name An identifying string.
 *
 * 一个标识字符串。
 *
 * @param definitions  An animation definition object, containing an array of `state()`
 * and `transition()` declarations.
 *
 * 一个动画定义对象，包含由 `state()` 和 `transition()` 声明构成的数组。
 *
 * @return An object that encapsulates the trigger data.
 *
 * 用于包装该触发器数据的对象。
 *
 * @usageNotes
 * Define an animation trigger in the `animations` section of `@Component` metadata.
 * In the template, reference the trigger by name and bind it to a trigger expression that
 * evaluates to a defined animation state, using the following format:
 *
 * 在 `@Component` 元数据的 `animations` 部分定义一个动画触发器。
 * 在模板中，可以按名字引用该触发器，并把它绑定到一个触发器表达式，该表达式的求值结果是一个已定义的动画状态，格式如下：
 *
 * `[@triggerName]="expression"`
 *
 * Animation trigger bindings convert all values to strings, and then match the
 * previous and current values against any linked transitions.
 * Booleans can be specified as `1` or `true` and `0` or `false`.
 *
 * 动画触发器绑定会把所有值转换成字符串，然后根据其旧值和当前值匹配出一个转场动画。
 * 对于逻辑值，可以用 `'1'` 或 `'true'` 来代表 `true`，用 `'0'` 或 `'false'` 来代表 `false`。
 *
 * ### Usage Example
 *
 * ### 用法范例
 *
 * The following example creates an animation trigger reference based on the provided
 * name value.
 * The provided animation value is expected to be an array consisting of state and
 * transition declarations.
 *
 * 下面的例子使用指定的名字创建了一个动画触发器的引用。
 * 此动画的值应该是一个由状态声明和转场声明组成的数组。
 *
 * ```typescript
 * @Component({
 *   selector: "my-component",
 *   templateUrl: "my-component-tpl.html",
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component makes use of the defined trigger
 * by binding to an element within its template code.
 *
 * 该组件的相关模板通过在代码中把一个已定义的触发器绑定到一个元素上来使用此动画。
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Using an inline function
 *
 * ### 使用内联函数
 *
 * The `transition` animation method also supports reading an inline function which can decide
 * if its associated animation should be run.
 *
 * `transition` 动画方法也支持读取内联函数，该函数可以决定是否应该运行相关的动画。
 *
 * ```typescript
 * // this method is run each time the `myAnimationTrigger` trigger value changes.
 * function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
 string]: any}): boolean {
 *   // notice that `element` and `params` are also available here
 *   return toState == 'yes-please-animate';
 * }
 *
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger('myAnimationTrigger', [
 *       transition(myInlineMatcherFn, [
 *         // the animation sequence code
 *       ]),
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "yes-please-animate";
 * }
 * ```
 *
 * ### Disabling Animations
 *
 * ### 禁用动画
 *
 * When true, the special animation control binding `@.disabled` binding prevents
 * all animations from rendering.
 * Place the  `@.disabled` binding on an element to disable
 * animations on the element itself, as well as any inner animation triggers
 * within the element.
 *
 * 当为真时，则一个特殊的动画控制绑定 `@.disabled` 将会在渲染时阻止所有动画。
 * 把 `@.disabled` 绑定放在元素上可以防止触发该元素自身的动画，及其子元素上的所有动画触发器。
 *
 * The following example shows how to use this feature:
 *
 * 下面的例子展示了如何使用此特性：
 *
 * ```typescript
 * @Component({
 *   selector: 'my-component',
 *   template: `
 *     <div [@.disabled]="isDisabled">
 *       <div [@childAnimation]="exp"></div>
 *     </div>
 *   `,
 *   animations: [
 *     trigger("childAnimation", [
 *       // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   isDisabled = true;
 *   exp = '...';
 * }
 * ```
 *
 * When `@.disabled` is true, it prevents the `@childAnimation` trigger from animating,
 * along with any inner animations.
 *
 * 当 `@.disabled` 为 `true` 时，它会阻止 `@childAnimation` 触发器等任何内部动画。
 *
 * ### Disable animations application-wide
 *
 * ### 在整个应用中禁用动画
 *
 * When an area of the template is set to have animations disabled,
 * **all** inner components have their animations disabled as well.
 * This means that you can disable all animations for an app
 * by placing a host binding set on `@.disabled` on the topmost Angular component.
 *
 * 当模板中的一个区域设置为禁用动画时，其**所有**内部组件上的动画也会禁用。
 * 也就是说，只要你把 Angular 根组件上放一个 `@.disabled` 的宿主绑定即可。
 *
 * ```typescript
 * import {Component, HostBinding} from '@angular/core';
 *
 * @Component({
 *   selector: 'app-component',
 *   templateUrl: 'app.component.html',
 * })
 * class AppComponent {
 *   @HostBinding('@.disabled')
 *   public animationsDisabled = true;
 * }
 * ```
 *
 * ### Overriding disablement of inner animations
 *
 * ### 改写内部动画的禁用状态
 *
 * Despite inner animations being disabled, a parent animation can `query()`
 * for inner elements located in disabled areas of the template and still animate
 * them if needed. This is also the case for when a sub animation is
 * queried by a parent and then later animated using `animateChild()`.
 *
 * 不管内部动画禁用与否，父动画总能 `query()` 模板里已禁用区域中的内部元素，如果需要，也可以播放它们。
 * 还有一种方式是当父动画查询到子动画后，用 `animateChild()` 来播放它。
 *
 * ### Detecting when an animation is disabled
 *
 * ### 检测某个动画何时被禁用
 *
 * If a region of the DOM (or the entire application) has its animations disabled, the animation
 * trigger callbacks still fire, but for zero seconds. When the callback fires, it provides
 * an instance of an `AnimationEvent`. If animations are disabled,
 * the `.disabled` flag on the event is true.
 *
 * 如果 DOM 中的某个区域（或整个应用程序）的动画被禁用时，动画触发器的回调仍然会触发，但持续 0 秒。
 * 当回调被触发时，它会提供一个 `AnimationEvent` 的例子。如果动画被禁用了，则该事件上的 `.disabled` 标志为 `true`。
 *
 * @publicApi
 */
export function trigger(name: string, definitions: AnimationMetadata[]): AnimationTriggerMetadata {
  return {type: AnimationMetadataType.Trigger, name, definitions, options: {}};
}

/**
 * Defines an animation step that combines styling information with timing information.
 *
 * 定义一个动画步骤，它把一些样式信息和时序信息组合在一起。
 *
 * @param timings Sets `AnimateTimings` for the parent animation.
 * A string in the format "duration [delay] [easing]".
 *
 * 为父动画设置 `AnimateTimings`。它的字符串格式为 "持续时间 [延迟] [缓动效果]"。
 *
 *  - Duration and delay are expressed as a number and optional time unit,
 * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
 * The default unit is milliseconds.
 *
 *    持续时间和延迟都用一个动画和一个可选的时间单位来表示，比如 "1s" 代表一秒，"10ms" 代表十毫秒。
 * 默认单位是毫秒。
 *
 *  - The easing value controls how the animation accelerates and decelerates
 * during its runtime. Value is one of  `ease`, `ease-in`, `ease-out`,
 * `ease-in-out`, or a `cubic-bezier()` function call.
 * If not supplied, no easing is applied.
 *
 *    缓动效果的值控制该动画在运行期间如何加速和减速。它的取值是 `ease`、`ease-in`、`ease-out`、
 * `ease-in-out` 之一或一个 `cubic-bezier()` 函数调用。
 * 如果未提供，则没有缓动效果。
 *
 * For example, the string "1s 100ms ease-out" specifies a duration of
 * 1000 milliseconds, and delay of 100 ms, and the "ease-out" easing style,
 * which decelerates near the end of the duration.
 *
 * 比如，字符串 "1s 100ms ease-out" 指定了一个 1000 毫秒的持续时间，一个 100 毫秒的延迟和一个 "ease-out" 缓动效果，它会快结束时减速。
 *
 * @param styles Sets AnimationStyles for the parent animation.
 * A function call to either `style()` or `keyframes()`
 * that returns a collection of CSS style entries to be applied to the parent animation.
 * When null, uses the styles from the destination state.
 * This is useful when describing an animation step that will complete an animation;
 * see "Animating to the final state" in `transitions()`.
 *
 * 为父动画设置动画样式。
 * 调用 `style()` 或 `keyframes()` 函数会返回要应用于父动画中的一组 CSS 样式，
 * 如果为 `null`，则使用目标状态中的样式，当描述一个某个动画的最后一步时，这很有用。
 * 参见 `transitions()` 中对"播放到最终状态"的说明。
 *
 * @returns An object that encapsulates the animation step.
 *
 * 一个用于封装动画步骤的对象。
 *
 * @usageNotes
 * Call within an animation `sequence()`, `{@link animations/group group()}`, or
 * `transition()` call to specify an animation step
 * that applies given style data to the parent animation for a given amount of time.
 *
 * 在一个 `sequence()`（动画序列）、`{@link animations/group group()}`（动画分组）或 `transition()`（转场动画）中调用本函数，
 * 以定义一个动画步骤，来把指定的样式数据在父动画上播放指定的时长。
 *
 * ### Syntax Examples
 *
 * ### 语法范例
 *
 * **Timing examples**
 *
 * **时序范例**
 *
 * The following examples show various `timings` specifications.
 *
 * 下面的例子展示了各种 `timings`（时序）规范。
 *
 * - `animate(500)` : Duration is 500 milliseconds.
 *
 *   `animate(500)`：持续 500 毫秒。
 *
 * - `animate("1s")` : Duration is 1000 milliseconds.
 *
 *   `animate("1s")`：持续 1000 毫秒。
 *
 * - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
 *
 *   `animate("100ms 0.5s")`：持续 100 毫秒，延迟 500 毫秒。
 *
 * - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
 *
 *   `animate("5s ease-in")`：持续 5000 毫秒，缓动进入（ease-in）。
 *
 * - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10
 * milliseconds, easing according to a bezier curve.
 *
 *   `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")`：持续 5000 毫秒，延迟 10 毫秒，基于一条 Bezier 曲线进行缓动。
 *
 * **Style examples**
 *
 * **样式范例**
 *
 * The following example calls `style()` to set a single CSS style.
 *
 * 下面的例子调用 `style()` 来设置单个的 CSS 样式。
 *
 * ```typescript
 * animate(500, style({ background: "red" }))
 * ```
 * The following example calls `keyframes()` to set a CSS style
 * to different values for successive keyframes.
 *
 * 下面的例子调用 `keyframes()` 来为各个相邻的关键帧分别设置 CSS 样式。
 *
 * ```typescript
 * animate(500, keyframes(
 *  [
 *   style({ background: "blue" })),
 *   style({ background: "red" }))
 *  ])
 * ```
 *
 * @publicApi
 */
export function animate(
    timings: string|number,
    styles: AnimationStyleMetadata|AnimationKeyframesSequenceMetadata|null =
        null): AnimationAnimateMetadata {
  return {type: AnimationMetadataType.Animate, styles, timings};
}

/**
 * @description Defines a list of animation steps to be run in parallel.
 *
 * 定义一个可以并行运行的动画步骤列表。
 *
 * @param steps An array of animation step objects.
 *
 * 一个由动画步骤对象构成的数组。
 *
 * - When steps are defined by `style()` or `animate()`
 * function calls, each call within the group is executed instantly.
 *
 *   当步骤由 `style()` 或 `animate()` 的函数调用定义时，组中的每个调用都会立即执行。
 *
 * - To specify offset styles to be applied at a later time, define steps with
 * `keyframes()`, or use `animate()` calls with a delay value.
 *
 *   要指定供带有延迟的偏移样式，请使用 `keyframes()` 调用来定义步骤；如果要指定延迟的时长，则改用 `animate()` 调用。
 *
 * For example:
 *
 * 例如：
 *
 * ```typescript
 * group([
 *   animate("1s", style({ background: "black" })),
 *   animate("2s", style({ color: "white" }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数用于提供样式的默认值，并可在调用时重写。
 *
 * @return An object that encapsulates the group data.
 *
 * 一个封装了该组数据的对象。
 *
 * @usageNotes
 * Grouped animations are useful when a series of styles must be
 * animated at different starting times and closed off at different ending times.
 *
 * 当一系列样式分别需要在不同的起始时间开始动画并在不同的结束时间停止时，分组动画非常有用。
 *
 * When called within a `sequence()` or a
 * `transition()` call, does not continue to the next
 * instruction until all of the inner animation steps have completed.
 *
 * 当在 `sequence()` 或 `transition()` 中调用它时，除非完成所有内部动画步骤，否则不会执行后续步骤。
 *
 * @publicApi
 */
export function group(
    steps: AnimationMetadata[], options: AnimationOptions|null = null): AnimationGroupMetadata {
  return {type: AnimationMetadataType.Group, steps, options};
}

/**
 * Defines a list of animation steps to be run sequentially, one by one.
 *
 * 定义一个动画步骤列表，逐个依次运行它们。
 *
 * @param steps An array of animation step objects.
 *
 * 一个由动画步骤对象构成的数组。
 *
 * - Steps defined by `style()` calls apply the styling data immediately.
 *
 *   由 `style()` 调用定义的步骤会立即应用样式数据。
 *
 * - Steps defined by `animate()` calls apply the styling data over time
 *   as specified by the timing data.
 *
 *   由 `animate()` 调用定义的步骤会根据时序数据中的规定，在一段时间内应用样式数据。
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 }),
 *   animate("1s", style({ opacity: 1 }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * 一个配置对象，包含一个延迟和一些由开发人员定义的参数，这些参数会提供样式的默认值，并可在调用时重写。
 *
 * @return An object that encapsulates the sequence data.
 *
 * 一个封装了该动画序列数据的对象。
 *
 * @usageNotes
 * When you pass an array of steps to a
 * `transition()` call, the steps run sequentially by default.
 * Compare this to the `{@link animations/group group()}` call, which runs animation steps in
 *parallel.
 *
 * 当你把一个步骤数组传给 `transition()` 调用时，这些步骤默认会顺序执行。
 * 作为对比，`{@link animations/group group()}` 的调用会并行执行各个动画步骤。
 *
 * When a sequence is used within a `{@link animations/group group()}` or a `transition()` call,
 * execution continues to the next instruction only after each of the inner animation
 * steps have completed.
 *
 * 当在 `{@link animations/group group()}` 或 `transition()` 调用中应用动画序列时，
 * 只有当每个内部动画步骤都完成之后，才会继续执行下一个指令。
 * @publicApi
 **/
export function sequence(
    steps: AnimationMetadata[], options: AnimationOptions|null = null): AnimationSequenceMetadata {
  return {type: AnimationMetadataType.Sequence, steps, options};
}

/**
 * Declares a key/value object containing CSS properties/styles that
 * can then be used for an animation `state`, within an animation `sequence`,
 * or as styling data for calls to `animate()` and `keyframes()`.
 *
 * 声明一个包含 CSS 属性/样式的键值对象，可在动画序列中用作动画状态（`state`），或在调用 `animate()` 和 `keyframes()` 时作为传入的样式数据。
 *
 * @param tokens A set of CSS styles or HTML styles associated with an animation state.
 * The value can be any of the following:
 *
 * 一组 CSS 样式或与动画状态相关联的 HTML 样式。
 * 它可以是下列值之一：
 *
 * - A key-value style pair associating a CSS property with a value.
 *
 *   一个键值对，把 CSS 属性和值关联起来。
 *
 * - An array of key-value style pairs.
 *
 *   一组表示样式的键值对。
 *
 * - An asterisk (*), to use auto-styling, where styles are derived from the element
 * being animated and applied to the animation when it starts.
 *
 *   一个星号（`*`），表示自动样式，其样式值会在应用此样式的时刻从目标元素中取得，并用作动画参数。
 *
 * Auto-styling can be used to define a state that depends on layout or other
 * environmental factors.
 *
 * 自动样式可用于定义一个需要依赖布局或其它环境因素的状态。
 *
 * @return An object that encapsulates the style data.
 *
 * 一个封装了样式数据的对象。
 *
 * @usageNotes
 * The following examples create animation styles that collect a set of
 * CSS property values:
 *
 * 下面的例子创建了一些带有一组 CSS 属性值的动画样式：
 *
 * ```typescript
 * // string values for CSS properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical pixel values
 * style({ width: 100, height: 0 })
 * ```
 *
 * The following example uses auto-styling to allow a component to animate from
 * a height of 0 up to the height of the parent element:
 *
 * 下面的例子使用了自动样式，以允许此动画将组件的高度从 0 逐渐增长到其父元素的高度：
 *
 * ```
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * @publicApi
 **/
export function style(tokens: '*'|{[key: string]: string | number}|
                      Array<'*'|{[key: string]: string | number}>): AnimationStyleMetadata {
  return {type: AnimationMetadataType.Style, styles: tokens, offset: null};
}

/**
 * Declares an animation state within a trigger attached to an element.
 *
 * 在附加到元素的触发器上，声明一个动画状态。
 *
 * @param name One or more names for the defined state in a comma-separated string.
 * The following reserved state names can be supplied to define a style for specific use
 * cases:
 *
 * 所定义的状态的一个或多个名字（用逗号分隔）。
 * 下面这些保留的状态名可用于为一些特殊用例定义样式：
 *
 * - `void` You can associate styles with this name to be used when
 * the element is detached from the application. For example, when an `ngIf` evaluates
 * to false, the state of the associated element is void.
 *
 *   `void` 你可以使用该名称关联一些样式，用于定义当该元素从应用中移除时的样式。比如，当 `ngIf` 的值为 `false` 时，相关元素的状态就是 `void`。
 *
 *  - `*` (asterisk) Indicates the default state. You can associate styles with this name
 * to be used as the fallback when the state that is being animated is not declared
 * within the trigger.
 *
 *    `*`（星号）表示默认状态。当触发器中未声明要设置的动画状态时，就会把该名称所关联的样式用作回退（fallback）值。
 *
 * @param styles A set of CSS styles associated with this state, created using the
 * `style()` function.
 * This set of styles persists on the element once the state has been reached.
 *
 * 一组与该状态相关的 CSS 样式，使用 `style()` 函数创建。
 * 一旦到达该状态，这组样式就会永久性的应用在该元素上。
 *
 * @param options Parameters that can be passed to the state when it is invoked.
 * 0 or more key-value pairs.
 *
 * 一些在调用它时可传给该状态的参数。
 * 包含 0 或多个键值对。
 *
 * @return An object that encapsulates the new state data.
 *
 * 一个封装了新状态数据的对象。
 *
 * @usageNotes
 * Use the `trigger()` function to register states to an animation trigger.
 * Use the `transition()` function to animate between states.
 * When a state is active within a component, its associated styles persist on the element,
 * even when the animation ends.
 *
 * 使用 `trigger()` 函数来为动画触发器注册状态。
 * 使用 `transition()` 函数来在状态之间执行动画。
 * 当某个状态在组件中激活时，它所关联的样式会永久性的作用在该元素上 —— 即使该动画已经结束了。
 *
 *
 * @publicApi
 **/
export function state(
    name: string, styles: AnimationStyleMetadata,
    options?: {params: {[name: string]: any}}): AnimationStateMetadata {
  return {type: AnimationMetadataType.State, name, styles, options};
}

/**
 * Defines a set of animation styles, associating each style with an optional `offset` value.
 *
 * 可定义一组动画样式，每个样式都关联着一个可选的 `offset` 值。
 *
 * @param steps A set of animation styles with optional offset data.
 * The optional `offset` value for a style specifies a percentage of the total animation
 * time at which that style is applied.
 *
 * 一组带有可选的偏移（offset）数据的动画样式。
 * 这个可选的 `offset` 值为相应的样式指定一个相对于总体动画时间的百分比，决定何时应用此样式。
 *
 * @returns An object that encapsulates the keyframes data.
 *
 * 一个封装关键帧数据的对象。
 *
 * @usageNotes
 * Use with the `animate()` call. Instead of applying animations
 * from the current state
 * to the destination state, keyframes describe how each style entry is applied and at what point
 * within the animation arc.
 * Compare [CSS Keyframe Animations](https://www.w3schools.com/css/css3_animations.asp).
 *
 * 和 `animate()` 调用一起使用。关键帧动画不会直接在当前状态和目标状态之间应用动画，而是描述在动画弧线的哪个时间点上应用哪个样式。
 * 详情参见 [CSS 关键帧动画](https://www.w3schools.com/css/css3_animations.asp)。
 *
 * ### Usage
 *
 * ### 用法
 *
 * In the following example, the offset values describe
 * when each `backgroundColor` value is applied. The color is red at the start, and changes to
 * blue when 20% of the total time has elapsed.
 *
 * 下面的例子中，偏移值描述了每个 `backgroundColor` 值应该何时应用上去。开始时的颜色是红色，在总时间的 20% 处变为蓝色。
 *
 * ```typescript
 * // the provided offset values
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * If there are no `offset` values specified in the style entries, the offsets
 * are calculated automatically.
 *
 * 如果没有指定 `offset` 值，则会自动计算偏移量。
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 *```

 * @publicApi
 */
export function keyframes(steps: AnimationStyleMetadata[]): AnimationKeyframesSequenceMetadata {
  return {type: AnimationMetadataType.Keyframes, steps};
}

/**
 * Declares an animation transition as a sequence of animation steps to run when a given
 * condition is satisfied. The condition is a Boolean expression or function that compares
 * the previous and current animation states, and returns true if this transition should occur.
 * When the state criteria of a defined transition are met, the associated animation is
 * triggered.
 *
 * 声明一个转场动画，以便在满足给定条件时运行一系列动画步骤。该条件是一个逻辑型表达式或一个函数，
 * 该函数比较以前和现在的动画状态，如果应该开始转场则返回 `true`。
 * 当满足所定义的转场动画的状态标准时，就会开始执行相关的动画。
 *
 * @param stateChangeExpr A Boolean expression or function that compares the previous and current
 * animation states, and returns true if this transition should occur. Note that  "true" and "false"
 * match 1 and 0, respectively. An expression is evaluated each time a state change occurs in the
 * animation trigger element.
 * The animation steps run when the expression evaluates to true.
 *
 * 一个逻辑表达式或一个函数，该函数用来比较以前和现在的动画状态，如果应该开始转场，则返回 `true`。注意，"true" 和 "false" 分别对应于 1 和 0。
 * 在动画触发器所在的元素中，每当状态发生变化时该表达式都会求值一次。
 * 当该表达式求值为真时，则执行这些动画步骤。
 *
 * - A state-change string takes the form "state1 => state2", where each side is a defined animation
 * state, or an asterix (*) to refer to a dynamic start or end state.
 *
 *   一个 "state1 => state2" 格式的状态变更字符串，每一侧都是一个事先定义好的动画状态，或者用星号（`*`）来动态获取起始或结束状态。
 *
 *   - The expression string can contain multiple comma-separated statements;
 * for example "state1 => state2, state3 => state4".
 *
 *     该表达式字符串可以包含多个逗号分隔的状态，比如 "state1 => state2, state3 => state4"。
 *
 *   - Special values `:enter` and `:leave` initiate a transition on the entry and exit states,
 * equivalent to  "void => *"  and "* => void".
 *
 *     特殊值 `:enter` 表示进入此状态时的转场，等价于 "void => *"，`:leave` 表示退出此状态时的转场，等价于 "* => void"。
 *
 *   - Special values `:increment` and `:decrement` initiate a transition when a numeric value has
 * increased or decreased in value.
 *
 *     特殊值 `:increment`、`:decrement` 表示数字型值增加或减小时的转场。
 *
 * - A function is executed each time a state change occurs in the animation trigger element.
 * The animation steps run when the function returns true.
 *
 *   一个函数，每当动画触发器所在的元素发生了状态变化时就会执行。
 *   当该函数返回 `true` 时，就会执行这些动画步骤。
 *
 * @param steps One or more animation objects, as returned by the `animate()` or
 * `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 *
 * 一个或多个由 `animate()` 或 `sequence()` 函数返回的动画对象，用于描述从一个状态到另一个状态的转变过程。
 * 当传入一个数组时，默认当做一个动画序列使用。
 *
 * @param options An options object that can contain a delay value for the start of the animation,
 * and additional developer-defined parameters. Provided values for additional parameters are used
 * as defaults, and override values can be passed to the caller on invocation.
 *
 * 一个配置对象，可以包含一个开始动画之前的延迟值，和一些由开发人员定义的参数。在这些参数中提供的值会被用作样式的默认值，
 * 在调用时调用者可以重写这些值。
 *
 * @returns An object that encapsulates the transition data.
 *
 * 一个封装了转场数据的对象。
 *
 * @usageNotes
 * The template associated with a component binds an animation trigger to an element.
 *
 * 与组件关联的模板会把动画触发器绑定到某个元素上。
 *
 * ```HTML
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * All transitions are defined within an animation trigger,
 * along with named states that the transitions change to and from.
 *
 * 所有转场动画以及用于供转场动画使用的命名状态，都是在动画触发器中定义的，
 *
 * ```typescript
 * trigger("myAnimationTrigger", [
 *  // define states
 *  state("on", style({ background: "green" })),
 *  state("off", style({ background: "grey" })),
 *  ...]
 * ```
 *
 * Note that when you call the `sequence()` function within a `{@link animations/group group()}`
 * or a `transition()` call, execution does not continue to the next instruction
 * until each of the inner animation steps have completed.
 *
 * 注意，当你在 `{@link animations/group group()}` 或 `transition()` 中调用 `sequence()` 函数时，除非其内部动画步骤已经执行完了，
 * 否则不会继续执行后续步骤。
 *
 * ### Syntax examples
 *
 * ### 语法范例
 *
 * The following examples define transitions between the two defined states (and default states),
 * using various options:
 *
 * 下面的例子中定义了一些在两个已定义状态（和默认状态）之间的转场动画，使用了多种选项：
 *
 * ```typescript
 * // Transition occurs when the state value
 * // bound to "myAnimationTrigger" changes from "on" to "off"
 * transition("on => off", animate(500))
 * // Run the same animation for both directions
 * transition("on <=> off", animate(500))
 * // Define multiple state-change pairs separated by commas
 * transition("on => off, off => void", animate(500))
 * ```
 *
 * ### Special values for state-change expressions
 *
 * ### 状态变更表达式的一些特殊值
 *
 * - Catch-all state change for when an element is inserted into the page and the
 * destination state is unknown:
 *
 *   当元素插入到页面中，并且目标状态未知时的所有状态变更：
 *
 * ```typescript
 * transition("void => *", [
 *  style({ opacity: 0 }),
 *  animate(500)
 *  ])
 * ```
 *
 * - Capture a state change between any states:
 *
 *   任意两个状态之间的变更：
 *
 *  `transition("* => *", animate("1s 0s"))`
 *
 * - Entry and exit transitions:
 *
 *   进场和立场时的转场动画：
 *
 * ```typescript
 * transition(":enter", [
 *   style({ opacity: 0 }),
 *   animate(500, style({ opacity: 1 }))
 *   ]),
 * transition(":leave", [
 *   animate(500, style({ opacity: 0 }))
 *   ])
 * ```
 *
 * - Use `:increment` and `:decrement` to initiate transitions:
 *
 *   使用 `:increment` 和 `:decrement` 来开始转场：
 *
 * ```typescript
 * transition(":increment", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 *
 * transition(":decrement", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 * ```
 *
 * ### State-change functions
 *
 * ### 状态变更函数
 *
 * Here is an example of a `fromState` specified as a state-change function that invokes an
 * animation when true:
 *
 * 下面的例子把 `fromState` 指定为状态变更函数，当它返回 `true` 时就会执行动画：
 *
 * ```typescript
 * transition((fromState, toState) =>
 *  {
 *   return fromState == "off" && toState == "on";
 *  },
 *  animate("1s 0s"))
 * ```
 *
 * ### Animating to the final state
 *
 * ### 把动画播放到最终状态
 *
 * If the final step in a transition is a call to `animate()` that uses a timing value
 * with no style data, that step is automatically considered the final animation arc,
 * for the element to reach the final state. Angular automatically adds or removes
 * CSS styles to ensure that the element is in the correct final state.
 *
 * 如果转场动画的最后一步是调用 `animate()`，并且只传入时序参数却不带样式数据，则该步骤会被自动当做动画弧的终点，
 * 以便让该元素达到最终状态。
 * Angular 会根据需要自动添加或移除 CSS 样式，以确保该元素处于正确的最终状态。
 *
 * The following example defines a transition that starts by hiding the element,
 * then makes sure that it animates properly to whatever state is currently active for trigger:
 *
 * 下面的例子定义了一个转场动画，它先隐藏该元素，然后确保它可以正确设置到触发器处于激活状态时的动画：
 *
 * ```typescript
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 *  ])
 * ```
 * ### Boolean value matching
 *
 * ### 逻辑值匹配
 *
 * If a trigger binding value is a Boolean, it can be matched using a transition expression
 * that compares true and false or 1 and 0. For example:
 *
 * 如果触发器的绑定值是逻辑型的，它就可以使用一个与 `true`、`false` 或 1、0 进行比较的转场表达式进行匹配。例如：
 *
 * ```
 * // in the template
 * <div [@openClose]="open ? true : false">...</div>
 * // in the component metadata
 * trigger('openClose', [
 *   state('true', style({ height: '*' })),
 *   state('false', style({ height: '0px' })),
 *   transition('false <=> true', animate(500))
 * ])
 * ```
 *
 * @publicApi
 **/
export function transition(
    stateChangeExpr: string|
    ((fromState: string, toState: string, element?: any, params?: {[key: string]: any}) => boolean),
    steps: AnimationMetadata|AnimationMetadata[],
    options: AnimationOptions|null = null): AnimationTransitionMetadata {
  return {type: AnimationMetadataType.Transition, expr: stateChangeExpr, animation: steps, options};
}

/**
 * Produces a reusable animation that can be invoked in another animation or sequence,
 * by calling the `useAnimation()` function.
 *
 * 生成一个可复用的动画，可以在其它动画或序列中通过 `useAnimation()` 函数进行调用。
 *
 * @param steps One or more animation objects, as returned by the `animate()`
 * or `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 *
 * 一个或多个由 `animate()` 或 `sequence()` 函数返回的动画对象，用于描述从一个状态到另一个状态的转变过程。
 * 当传入一个数组时，默认当做一个动画序列使用。
 *
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional developer-defined parameters.
 * Provided values for additional parameters are used as defaults,
 * and override values can be passed to the caller on invocation.
 *
 * 一个配置对象，可以包含一个开始动画之前的延迟值，和一些由开发人员定义的参数。在这些参数中提供的值会被用作样式的默认值，
 * 在调用时调用者可以重写这些值。
 *
 * @returns An object that encapsulates the animation data.
 *
 * 一个封装了动画数据的对象。
 *
 * @usageNotes
 * The following example defines a reusable animation, providing some default parameter
 * values.
 *
 * 下面的例子定义了一个可复用的动画，提供了一些默认的参数值。
 *
 * ```typescript
 * var fadeAnimation = animation([
 *   style({ opacity: '{{ start }}' }),
 *   animate('{{ time }}',
 *   style({ opacity: '{{ end }}'}))
 *   ],
 *   { params: { time: '1000ms', start: 0, end: 1 }});
 * ```
 *
 * The following invokes the defined animation with a call to `useAnimation()`,
 * passing in override parameter values.
 *
 * 下面的例子通过 `useAnimation()` 执行了一个已定义的动画，并传入了一些参数值来改写默认参数。
 *
 * ```js
 * useAnimation(fadeAnimation, {
 *   params: {
 *     time: '2s',
 *     start: 1,
 *     end: 0
 *   }
 * })
 * ```
 *
 * If any of the passed-in parameter values are missing from this call,
 * the default values are used. If one or more parameter values are missing before a step is
 * animated, `useAnimation()` throws an error.
 *
 * 如果本调用传入的参数中缺少了任何一个参数值，则会使用其默认值代替。
 * 如果在某个动画步骤开始播放前缺少了一个或多个参数值，则会抛出一个错误。
 *
 *
 * @publicApi
 */
export function animation(
    steps: AnimationMetadata|AnimationMetadata[],
    options: AnimationOptions|null = null): AnimationReferenceMetadata {
  return {type: AnimationMetadataType.Reference, animation: steps, options};
}

/**
 * Executes a queried inner animation element within an animation sequence.
 *
 * 在一个动画序列中执行一个查询到的内部动画元素。
 *
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional override values for developer-defined parameters.
 *
 * 一个配置对象，它可以包含一个开始动画之前的延迟数，和一些由开发人员的定义的改写参数值。
 *
 * @return An object that encapsulates the child animation data.
 *
 * 一个对象，封装了子动画数据。
 *
 * @usageNotes
 * Each time an animation is triggered in Angular, the parent animation
 * has priority and any child animations are blocked. In order
 * for a child animation to run, the parent animation must query each of the elements
 * containing child animations, and run them using this function.
 *
 * 每当 Angular 触发动画时，总是父动画优先，而子动画被阻塞。
 * 为了执行子动画，父动画必须查询每个包含子动画的元素，并使用该函数运行它们。
 *
 * Note that this feature is designed to be used with `query()` and it will only work
 * with animations that are assigned using the Angular animation library. CSS keyframes
 * and transitions are not handled by this API.
 *
 * 注意，设计该特性是为了和 `query()` 一起使用的，所以它只处理使用 Angular 动画库生成的动画。
 * 本 API 不会处理 CSS 关键帧动画和转场动画。
 *
 * @publicApi
 */
export function animateChild(options: AnimateChildOptions|null = null):
    AnimationAnimateChildMetadata {
  return {type: AnimationMetadataType.AnimateChild, options};
}

/**
 * Starts a reusable animation that is created using the `animation()` function.
 *
 * 启动一个使用 `animation()` 函数创建的可复用动画。
 *
 * @param animation The reusable animation to start.
 *
 * 要启动的可复用动画。
 *
 * @param options An options object that can contain a delay value for the start of
 * the animation, and additional override values for developer-defined parameters.
 *
 * 一个配置对象，它包含一个启动动画之前的延迟值，和一些由开发人员定义的改写参数值。
 *
 * @return An object that contains the animation parameters.
 *
 * 一个包含动画参数的对象。
 *
 *
 * @publicApi
 */
export function useAnimation(
    animation: AnimationReferenceMetadata,
    options: AnimationOptions|null = null): AnimationAnimateRefMetadata {
  return {type: AnimationMetadataType.AnimateRef, animation, options};
}

/**
 * Finds one or more inner elements within the current element that is
 * being animated within a sequence. Use with `animate()`.
 *
 * 在动画序列中正在播放的元素中查找一个或多个内部元素。和 `animateChild()` 一起使用。
 *
 * @param selector The element to query, or a set of elements that contain Angular-specific
 * characteristics, specified with one or more of the following tokens.
 *
 * 要查询的元素，或一组具有 Angular 中定义的某些特征的一组元素，可以用如下令牌（token）进行指定：
 *
 *  - `query(":enter")` or `query(":leave")` : Query for newly inserted/removed elements.
 *
 *    `query(":enter")` 或 `query(":leave")`：查询新插入或移除的元素。
 *
 *  - `query(":animating")` : Query all currently animating elements.
 *
 *    `query(":animating")`：查询所有正在播放动画的元素。
 *
 *  - `query("@triggerName")` : Query elements that contain an animation trigger.
 *
 *    `query("@triggerName")`：查询包含指定动画触发器的元素。
 *
 *  - `query("@*")` : Query all elements that contain an animation triggers.
 *
 *    `query("@*")`：查询所有包含任意动画触发器的元素。
 *
 *  - `query(":self")` : Include the current element into the animation sequence.
 *
 *    `query(":self")`：把当前元素包含到动画序列中。
 *
 * @param animation One or more animation steps to apply to the queried element or elements.
 * An array is treated as an animation sequence.
 *
 * 要应用到所查询到的单个或一组元素上的一个或多个动画步骤。
 * 该数组会被视为一个动画序列。
 *
 * @param options An options object. Use the 'limit' field to limit the total number of
 * items to collect.
 *
 * 一个配置对象。使用 `limit` 字段来限制要收集的条目的数量上限。
 *
 * @return An object that encapsulates the query data.
 *
 * 一个封装了查询数据的对象。
 *
 * @usageNotes
 * Tokens can be merged into a combined query selector string. For example:
 *
 * 多个令牌可以合并成复合查询选择器。比如：
 *
 * ```typescript
 *  query(':self, .record:enter, .record:leave, @subTrigger', [...])
 * ```
 *
 * The `query()` function collects multiple elements and works internally by using
 * `element.querySelectorAll`. Use the `limit` field of an options object to limit
 * the total number of items to be collected. For example:
 *
 * `query()` 函数会收集多个元素，其内部是用 `element.querySelectorAll` 实现的。
 * 用配置对象中的 `limit` 字段可以限制要收集的总数。比如：
 *
 * ```js
 * query('div', [
 *   animate(...),
 *   animate(...)
 * ], { limit: 1 })
 * ```
 *
 * By default, throws an error when zero items are found. Set the
 * `optional` flag to ignore this error. For example:
 *
 * 默认情况下，当没有找到条目时就会抛出错误。设置 `optional` 标志可以忽略此错误。比如：
 *
 * ```js
 * query('.some-element-that-may-not-be-there', [
 *   animate(...),
 *   animate(...)
 * ], { optional: true })
 * ```
 *
 * ### Usage Example
 *
 * ### 使用范例
 *
 * The following example queries for inner elements and animates them
 * individually using `animate()`.
 *
 * 下面的例子查询内部元素，并用 `animateChild()` 来独立控制它们的动画。
 *
 * ```typescript
 * @Component({
 *   selector: 'inner',
 *   template: `
 *     <div [@queryAnimation]="exp">
 *       <h1>Title</h1>
 *       <div class="content">
 *         Blah blah blah
 *       </div>
 *     </div>
 *   `,
 *   animations: [
 *    trigger('queryAnimation', [
 *      transition('* => goAnimate', [
 *        // hide the inner elements
 *        query('h1', style({ opacity: 0 })),
 *        query('.content', style({ opacity: 0 })),
 *
 *        // animate the inner elements in, one by one
 *        query('h1', animate(1000, style({ opacity: 1 }))),
 *        query('.content', animate(1000, style({ opacity: 1 }))),
 *      ])
 *    ])
 *  ]
 * })
 * class Cmp {
 *   exp = '';
 *
 *   goAnimate() {
 *     this.exp = 'goAnimate';
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export function query(
    selector: string, animation: AnimationMetadata|AnimationMetadata[],
    options: AnimationQueryOptions|null = null): AnimationQueryMetadata {
  return {type: AnimationMetadataType.Query, selector, animation, options};
}

/**
 * Use within an animation `query()` call to issue a timing gap after
 * each queried item is animated.
 *
 * 在调用 `query()` 中使用可以在每个查询到的条目开始播放动画之后插入一个时间间隔。
 *
 * @param timings A delay value.
 *
 * 延迟值。
 *
 * @param animation One ore more animation steps.
 *
 * 一个或多个动画步骤。
 *
 * @returns An object that encapsulates the stagger data.
 *
 * 一个封装了交错数据的对象。
 *
 * @usageNotes
 * In the following example, a container element wraps a list of items stamped out
 * by an `ngFor`. The container element contains an animation trigger that will later be set
 * to query for each of the inner items.
 *
 * 在下面的例子中，容器元素包含一个由 `ngFor` 标记的列表。
 * 该容器包含一个动画触发器，用于稍后查询每个内部条目。
 *
 * Each time items are added, the opacity fade-in animation runs,
 * and each removed item is faded out.
 * When either of these animations occur, the stagger effect is
 * applied after each item's animation is started.
 *
 * 每当新增条目后，就会执行一个透明度淡入动画，移除时则淡出。
 * 无论发生了哪个动画，都会在每个条目的动画开始之后，执行交错器的效果。
 *
 * ```html
 * <!-- list.component.html -->
 * <button (click)="toggle()">Show / Hide Items</button>
 * <hr />
 * <div [@listAnimation]="items.length">
 *   <div *ngFor="let item of items">
 *     {{ item }}
 *   </div>
 * </div>
 * ```
 *
 * Here is the component code:
 *
 * 下面是组件代码：
 *
 * ```typescript
 * import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
 * @Component({
 *   templateUrl: 'list.component.html',
 *   animations: [
 *     trigger('listAnimation', [
 *     ...
 *     ])
 *   ]
 * })
 * class ListComponent {
 *   items = [];
 *
 *   showItems() {
 *     this.items = [0,1,2,3,4];
 *   }
 *
 *   hideItems() {
 *     this.items = [];
 *   }
 *
 *   toggle() {
 *     this.items.length ? this.hideItems() : this.showItems();
 *    }
 *  }
 * ```
 *
 * Here is the animation trigger code:
 *
 * 下面是动画交错器代码：
 *
 * ```typescript
 * trigger('listAnimation', [
 *   transition('* => *', [ // each time the binding value changes
 *     query(':leave', [
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 0 }))
 *       ])
 *     ]),
 *     query(':enter', [
 *       style({ opacity: 0 }),
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 1 }))
 *       ])
 *     ])
 *   ])
 * ])
 * ```
 *
 * @publicApi
 */
export function stagger(timings: string|number, animation: AnimationMetadata|AnimationMetadata[]):
    AnimationStaggerMetadata {
  return {type: AnimationMetadataType.Stagger, timings, animation};
}
