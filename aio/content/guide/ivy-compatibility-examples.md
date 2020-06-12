# Ivy compatibility examples

# Ivy 的兼容性例子

This appendix is intended to provide more background on Ivy changes. Many of these examples list error messages you may see, so searching by error message might be a good idea if you are debugging.

本附录旨在为 Ivy 的变更提供更多背景信息。其中很多例子列出了你可能会看到的错误信息，所以如果你正在调试，按错误信息搜索可能是个好主意。

<div class="alert is-critical">
NOTE: Most of these issues affect a small percentage of applications encountering unusual or rare edge cases.
</div>

{@a content-children-descendants}

## @ContentChildren queries only match direct children by default

## @ContentChildren 查询默认只匹配直接子组件

### Basic example of change

### 变更的基本例子

Let's say a component (`Comp`) has a `@ContentChildren` query for `'foo'`:

假设某个组件（ `Comp` ）对 `'foo'` 有 `@ContentChildren` 查询：

```html
<comp>
    <div>
         <div #foo></div>   <!-- matches in old runtime, not in new runtime -->
    </div>
</comp>
```

In the previous runtime, the `<div>` with `#foo` would match.
With Ivy, that `<div>` does not match because it is not a direct child of `<comp>`.

在之前的运行时中，带 `#foo` 的 `<div>` 会匹配到。而在 Ivy 中， `<div>` 不能匹配，因为它不是 `<comp>` 的直接子节点。

### Background

### 背景

By default, `@ContentChildren` queries have the `descendants` flag set to `false`.

默认情况下， `@ContentChildren` 查询的 `descendants` 标志设置为 `false` 。

In the previous rendering engine, "descendants" referred to "descendant directives".
An element could be a match as long as there were no other directives between the element and the requesting directive.
This made sense for directives with nesting like tabs, where nested tab directives might not be desirable to match.
However, this caused surprising behavior for users because adding an unrelated directive like `ngClass` to a wrapper element could invalidate query results.

在前面的渲染引擎中，“descendants” 指的是“后代指令”。只要元素和请求指令之间没有其它指令，元素就可以匹配。这对于类似于 tabs （页标签组）的嵌套的指令是有意义的，其中嵌套的 tab 指令可能不适合匹配。但是，这会给用户带来令人惊讶的行为，因为只要在包装器元素中添加一个不相关的指令（如 `ngClass`） 就可能会让查询结果无效。

For example, with the content query and template below, the last two `Tab` directives would not be matches:

例如，如果使用下面的内容查询和模板，最后两个 `Tab` 指令不匹配：

```
@ContentChildren(Tab, {descendants: false}) tabs: QueryList<Tab>
```

```
<tab-list>
  <div>
    <tab> One </tab>     <!-- match (nested in element) -->
  </div>
  <tab>                  <!-- match (top level) -->
    <tab> A </tab>       <!-- not a match (nested in tab) -->
  </tab>
  <div [ngClass]="classes">
    <tab> Two </tab>     <!-- not a match (nested in ngClass) -->
  </div>
</tab-list>
```

In addition, the differences between type and string predicates were subtle and sometimes unclear.
For example, if you replace the type predicate above with a `'foo'` string predicate, the matches change:

另外，使用类型谓词和使用字符串谓词之间的差异很微妙，有时甚至都分不清。例如，如果用 `'foo'` 字符串谓词替换上面的类型谓词，匹配就会改变：

```
@ContentChildren('foo', {descendants: false}) foos: QueryList<ElementRef>
```

```
<tab-list>
  <div>
    <div #foo> One </div>     <!-- match (nested in element) -->
  </div>
  <tab #foo>                  <!-- match (top level) -->
    <div #foo> A </div>       <!-- match (nested in tab) -->
  </tab>
  <div [ngClass]="classes">
    <div #foo> Two </div>     <!-- match (nested in ngClass) -->
  </div>
</tab-list>
```

Because the previous behavior was inconsistent and surprising to users, we did not want to reproduce it in Ivy.
Instead, we simplified the mental model so that "descendants" refers to DOM nesting only.
Any DOM element between the requesting component and a potential match will invalidate that match.
Type predicates and string predicates also have identical matching behavior.

由于之前的行为对用户来说是不一致和令人惊讶的，所以我们不打算在 Ivy 中重现它。相反，我们简化了其心智模型，以便 “descendants” 只标识 DOM 嵌套。位于发出请求的组件和潜在匹配项之间的任何 DOM 元素都会使该匹配失效。类型谓词和字符串谓词也有了相同的匹配行为。

Ivy behavior for directive/string predicates:

指令/字符串谓词的 Ivy 行为：

```
<tab-list>
  <div>
    <tab> One </tab>     <!-- not a match (nested in element) -->
  </div>
  <tab>                  <!-- match (top level) -->
    <tab> A </tab>       <!-- not a match (nested in tab) -->
  </tab>
  <div [ngClass]="classes">
    <tab> Two </tab>     <!-- not a match (nested in div) -->
  </div>
</tab-list>
```

### Example of error

### 错误信息的例子

The error message that you see will depend on how the particular content query is used in the application code.
Frequently, an error is thrown when a property is referenced on the content query result (which is now `undefined`).

你看到的错误信息取决于应用代码中特定的内容查询的使用方式。当在内容查询结果中引用一个属性（这里是 `undefined`）时，就会抛出一个错误。

For example, if the component sets the content query results to a property, `foos`, `foos.first.bar` would throw the error:

例如，如果组件把内容查询结果设置为属性，那么 `foos`、`foos.first.bar` 会抛出错误：

```
Uncaught TypeError: Cannot read property 'bar' of undefined
```

If you see an error like this, and the `undefined` property refers to the result of a `@ContentChildren` query, it may well be caused by this change.

如果你看到这样的错误，并且 `undefined` 属性引用了 `@ContentChildren` 查询的结果，那么很可能就是由于这个变化造成的。

### Recommended fix

### 推荐的修复方式

You can either add the `descendants: true` flag to ignore wrapper elements or remove the wrapper elements themselves.

你可以添加 `descendants: true` 标志来忽略包装元素，也可以自己删除包装元素。

Option 1:

方案 1：

```
@ContentChildren('foo', {descendants: true}) foos: QueryList<ElementRef>;
```

Option 2:

方案 2：

```
<comp>
   <div #foo></div>   <!-- matches in both old runtime and  new runtime -->
</comp>
```

{@a undecorated-classes}

## All classes that use Angular DI must have an Angular class-level decorator

## 所有使用 Angular DI 的类都必须有一个 Angular 类级装饰器

### Basic example of change:

### 变更的基本例子：

In the previous rendering engine, the following would work:

在以前的渲染引擎中，下列代码可以正常工作：

```
export class DataService {
  constructor(@Inject('CONFIG') public config: DataConfig) {}
}

@Injectable()
export class AppService extends DataService {...}
```

In Ivy, it will throw an error because `DataService` is using Angular dependency injection, but is missing an `@Injectable` decorator.

在 Ivy 中，它会抛出一个错误，因为 `DataService` 正在使用 Angular 依赖注入，但它却缺少一个 `@Injectable` 装饰器。

The following would also work in the previous rendering engine, but in Ivy would require a `@Directive` decorator because it uses DI:

下列渲染引擎也能正常工作，但是 Ivy 需要一个 `@Directive` 装饰器，因为它使用了 DI：

```
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}
```

The same is true if your directive class extends a decorated directive, but does not have a decorator of its own.

如果指令类扩展了装饰指令，但却没有自己的装饰器，那也是如此。

If you're using the CLI, there are two automated migrations that should transition your code for you ([this one](guide/migration-injectable) and [this one](guide/migration-undecorated-classes)).
However, as you're adding new code in version 9, you may run into this difference.

如果你正在使用 CLI，那么有两个自动迁移应该为你转移你的代码（ [本章](guide/migration-injectable)和[本章](guide/migration-undecorated-classes) ）。但是，当你在版本 9 中添加新代码时，可能会遇到这种不同。

### Background

### 背景

When a class has an Angular decorator like `@Injectable` or `@Directive`, the Angular compiler generates extra code to support injecting dependencies into the constructor of your class.
When using inheritance, Ivy needs both the parent class and the child class to apply a decorator to generate the correct code.
Otherwise, when the decorator is missing from the parent class, the subclass will inherit a constructor from a class for which the compiler did not generate special constructor info, and Angular won't have the dependency info it needs to create it properly.

当一个类有一个像 `@Injectable` 或 `@Directive` 这样的 Angular 装饰器时，Angular 编译器会生成额外的代码，以支持把依赖注入到类的构造函数中。当使用继承时，Ivy 既需要父类，也要让子类应用装饰器来生成正确的代码。否则，当父类中缺少装饰器时，该子类将继承一个构造函数，而这个构造函数并没有为编译器生成特殊的构造函数信息，而 Angular 也没有正确创建它所需的依赖信息。

In the previous rendering engine, the compiler had global knowledge, so in some cases (such as AOT mode or the presence of certain injection flags), it could look up the missing data.
However, the Ivy compiler only processes each class in isolation.
This means that compilation has the potential to be faster (and opens the framework up for optimizations and features going forward), but the compiler can't automatically infer the same information as before.

在之前的渲染引擎中，编译器具有全局知识，所以在某些情况下（比如 AOT 模式或某些注入标志的存在），它可以查找丢失的数据。然而，Ivy 编译器只是孤立地处理每个类。这意味着编译有可能更快（并为今后的优化和特性打开框架），但编译器不能自动推断出和以前一样的信息。

Adding the proper decorator explicitly provides this information.

添加合适的装饰器会明确提供这些信息。

### Example of error

### 错误信息的例子

In JIT mode, the framework will throw the following error:

在 JIT 模式下，该框架会抛出以下错误：

```
ERROR: This constructor is not compatible with Angular Dependency Injection because its dependency at index X of the parameter list is invalid.
This can happen if the dependency type is a primitive like a string or if an ancestor of this class is missing an Angular decorator.

Please check that 1) the type for the parameter at index X is correct and 2) the correct Angular decorators are defined for this class and its ancestors.
```

In AOT mode, you'll see something like:

在 AOT 模式下，你会看到如下内容：

```
X inherits its constructor from Y, but the latter does not have an Angular decorator of its own.
Dependency injection will not be able to resolve the parameters of Y's constructor. Either add a
@Directive decorator to Y, or add an explicit constructor to X.
```

In some cases, the framework may not be able to detect the missing decorator.
In these cases, you'll generally see a runtime error thrown when there is a property access attempted on the missing dependency.
If dependency was `foo`, you'd see an error when accessing something like `foo.bar`:

在某些情况下，框架可能无法检测到丢失的装饰器。在这种情况下，你会发现试图对所缺的依赖项进行属性访问时，就会抛出一个运行时错误。如果依赖是 `foo` ，你在访问 `foo.bar` 这样的东西时会看到一个错误：

```
Uncaught TypeError: Cannot read property 'bar' of undefined
```

If you see an error like this, and the `undefined` value refers to something that should have been injected, it may be this change.

如果你看到这样的错误，并且 `undefined` 值引用了应该注入的内容，那么可能就是这种变化。

### Recommended fix

### 推荐的修复方式

- Add an `@Injectable` decorator to anything you plan to provide or inject.

  把 `@Injectable` 装饰器添加到你打算提供或注入的东西中。

```
@Injectable()
export class DataService {
  constructor(@Inject('CONFIG') public config: DataConfig) {}
}

@Injectable()
export class AppService extends DataService {...}
```

- Add a [selectorless `@Directive` decorator](guide/migration-undecorated-classes#what-does-it-mean-to-have-a-directive-decorator-with-no-metadata-inside-of-it) to any class that extends a directive or any class from which a directive inherits.

  把 [无选择器的 `@Directive` 装饰器](guide/migration-undecorated-classes#what-does-it-mean-to-have-a-directive-decorator-with-no-metadata-inside-of-it)添加到扩展指令的类或被指令继承的任何类中。

```
@Directive()            // selectorless, so it's not usable directly
export class BaseMenu {
  constructor(private vcr: ViewContainerRef) {}
}

@Directive({selector: '[settingsMenu]'})
export class SettingsMenu extends BaseMenu {}
```

{@a select-value-binding}

## Cannot Bind to `value` property of `<select>` with `*ngFor`

## 无法使用 `*ngFor` 绑定到 `<select>` 的 `value` 属性

### Basic example of change

### 变更的基本例子

```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

In the View Engine runtime, the above code would set the initial value of the `<select>` as expected.
In Ivy, the initial value would not be set at all in this case.

在 View Engine 的运行时，上面的代码会按照预期的那样设置 `<select>` 的初始值。在 Ivy 中，在这种情况下根本不会设置初始值。

### Background

### 背景

Prior to Ivy, directive input bindings were always executed in their own change detection pass before any DOM bindings were processed.
This was an implementation detail that supported the use case in question:

在 Ivy 之前，指令输入绑定总是在处理任何 DOM 绑定之前，先在自己的变更检测过程中执行。下面是一个支持这个用例的实现细节：

```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

It happened to work because the `*ngFor` would be checked first, during the directive input binding pass, and thus create the options first.
Then the DOM binding pass would run, which would check the `value` binding.
At this time, it would be able to match the value against one of the existing options, and set the value of the `<select>` element in the DOM to display that option.

它可以工作，因为在指令输入绑定过程中会先检查 `*ngFor`，从而先创建选项。然后运行一轮 DOM 绑定，它会检查 `value` 绑定。这时，它可以把这个值与其中一个现有选项进行匹配，并在 DOM 中设置 `<select>` 元素的值，以显示该选项。

In Ivy, bindings are checked in the order they are defined in the template, regardless of whether they are directive input bindings or DOM bindings.
This change makes change detection easier to reason about for debugging purposes, since bindings will be checked in depth-first order as declared in the template.

在 Ivy 中，绑定会按模板中定义的顺序进行检查，不论它们是指令的输入绑定还是 DOM 绑定。这种变化使得变更检测更容易被调试，因为绑定会按照模板中声明的顺序进行深度优先的检查。

In this case, it means that the `value` binding will be checked before the `*ngFor` is checked, as it is declared above the `*ngFor` in the template.
Consequently, the value of the `<select>` element will be set before any options are created, and it won't be able to match and display the correct option in the DOM.

在这种情况下，这意味着在检查 `*ngFor` 之前，会先检查 `value` 绑定，因为它是在模板的 `*ngFor` 上面声明的。因此，`<select>` 元素的值会在创建任何选项之前设置，并且无法在 DOM 中匹配并显示正确的选项。

### Example of error

### 错误信息的例子

There is no error thrown, but the `<select>` in question will not have the correct initial value displayed in the DOM.

不会抛出任何错误，但是问题中的 `<select>` 没有在 DOM 中显示正确的初始值。

### Recommended fix

### 推荐的修复方式

To fix this problem, we recommend binding to the `selected` property on the `<option>` instead of the `value` on the `<select>`.

为了解决这个问题，我们建议绑定 `<option>` 上的 `selected` 属性，而不要绑定 `<select>` 上的 `value` 。

*Before*

*以前*

```html
<select [value]="someValue">
  <option *ngFor="let option of options" [value]="option"> {{ option }} <option>
</select>
```

*After*

*之后*

```html
<select>
  <option *ngFor="let option of options" [value]="option" [selected]="someValue == option">
    {{ option }}
  <option>
</select>
```

{@a forward-refs-directive-inputs}

## Forward references to directive inputs accessed through local refs are no longer supported.

## 不再支持对通过本地引用访问的指令输入属性的前向引用。

### Basic example of change

### 变更的基本例子

```ts
@Directive({
  selector: '[myDir]',
  exportAs: 'myDir'
})
export class MyDir {
  @Input() message: string;
}
```

```html
{{ myDir.name }}
<div myDir #myDir="myDir" [name]="myName"></div>
```

In the View Engine runtime, the above code would print out the name without any errors.
In Ivy, the `myDir.name` binding will throw an `ExpressionChangedAfterItHasBeenCheckedError`.

在 View Engine 的运行时，上面的代码会打印出这个名字而不会出现任何错误。在 Ivy 中， `myDir.name` 绑定会抛出一个 `ExpressionChangedAfterItHasBeenCheckedError` 。

### Background

### 背景

In the ViewEngine runtime, directive input bindings and element bindings were executed in different stages. Angular would process the template one full time to check directive inputs only (e.g. `[name]`), then process the whole template again to check element and text bindings only (e.g.`{{ myDir.name }}`). This meant that the `name` directive input would be checked before the `myDir.name` text binding despite their relative order in the template, which some users felt to be counterintuitive.

在 ViewEngine 的运行时里，指令输入绑定和元素绑定是在不同的阶段执行的。 Angular 会全局处理模板，先只检查指令的输入（比如 `[name]` ），然后再针对元素和文本的绑定（例如 `{{ myDir.name }}` ）处理整个模板。这意味着在 `myDir.name` 文本绑定之前会检查 `name` 指令的输入，尽管它们在模板中有相对的顺序，但有些用户会觉得这样违反直觉。

In contrast, Ivy processes the template in just one pass, so that bindings are checked in the same order that they are written in the template. In this case, it means that the `myDir.name` binding will be checked before the `name` input sets the property on the directive (and thus it will be `undefined`). Since the `myDir.name` property will be set by the time the next change detection pass runs, a change detection error is thrown.

相比之下，Ivy 只会在一轮中对模板进行处理，因此会按照它们在模板中编写的顺序来检查绑定。在这种情况下，这意味着在输入属性 `name` 设置该指令的属性之前，会检查 `myDir.name` 绑定（因此它将是 `undefined`）。`myDir.name` 属性的值是在下一次变更检测过程的运行时设置的，所以会抛出一个变更检测错误。

### Example of error

### 错误信息的例子

Assuming that the value for `myName` is `Angular`, you should see an error that looks like

假设 `myName` 的值是 `Angular` ，你会看到一个类似这样的错误

```
Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. Current value: 'Angular'.
```

### Recommended fix

### 推荐的修复方式

To fix this problem, we recommend either getting the information for the binding directly from the host component (e.g. the `myName` property from our example) or to move the data binding after the directive has been declared so that the initial value is available on the first pass.

为了解决这个问题，我们建议你直接从宿主组件中获取绑定的信息（比如我们这个例子中的 `myName` 属性），或者把数据绑定移到指令声明之后，以便初始值在第一轮中就是可用的。

*Before*

*以前*

```html
{{ myDir.name }}
<div myDir #myDir="myDir" [name]="myName"></div>
```

*After*

*之后*

```html
{{ myName }}
<div myDir [name]="myName"></div>
```
