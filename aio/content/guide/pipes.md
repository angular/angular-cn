# Transforming Data Using Pipes

# 用管道转换数据

Use [pipes](guide/glossary#pipe "Definition of a pipe") to transform and format strings, currency amounts, dates, and other display data.
Pipes are simple functions you can use in [template expressions](/guide/glossary#template-expression "Definition of template expression") to accept an input value and return a transformed value.
For example, you would use a pipe to show a date as **April 15, 1988** rather than the raw string format.

[管道](guide/glossary#pipe "管道的定义")用来对字符串、货币金额、日期和其他显示数据进行转换和格式化。管道是一些简单的函数，可以在[模板表达式](/guide/glossary#template-expression "模板表达式的定义")中用来接受输入值并返回一个转换后的值。例如，你可以使用一个管道把日期显示为 **1988 年 4 月 15 日**，而不是其原始字符串格式。

<div class="alert is-helpful">

  For the sample app used in this topic, see the <live-example></live-example>.

  本主题中使用的范例应用，参见<live-example></live-example>。

</div>

Angular provides built-in pipes for typical data transformations, including transformations for internationalization (i18n), which use locale information to format data.
The following are commonly used built-in pipes for data formatting:

Angular 为典型的数据转换提供了内置的管道，包括国际化的转换（i18n），它使用本地化信息来格式化数据。数据格式化常用的内置管道如下：

* [`DatePipe`](api/common/DatePipe): Formats a date value according to locale rules.

  [`DatePipe`](api/common/DatePipe)：根据本地环境中的规则格式化日期值。

* [`UpperCasePipe`](api/common/UpperCasePipe): Transforms text to all upper case.

  [`UpperCasePipe`](api/common/UpperCasePipe)：把文本全部转换成大写。

* [`LowerCasePipe`](api/common/LowerCasePipe): Transforms text to all lower case.

  [`LowerCasePipe`](api/common/LowerCasePipe) ：把文本全部转换成小写。

* [`CurrencyPipe`](api/common/CurrencyPipe): Transforms a number to a currency string, formatted according to locale rules.

  [`CurrencyPipe`](api/common/CurrencyPipe) ：把数字转换成货币字符串，根据本地环境中的规则进行格式化。

* [`DecimalPipe`](/api/common/DecimalPipe): Transforms a number into a string with a decimal point, formatted according to locale rules.

  [`DecimalPipe`](/api/common/DecimalPipe)：把数字转换成带小数点的字符串，根据本地环境中的规则进行格式化。

* [`PercentPipe`](api/common/PercentPipe): Transforms a number to a percentage string, formatted according to locale rules.

  [`PercentPipe`](api/common/PercentPipe) ：把数字转换成百分比字符串，根据本地环境中的规则进行格式化。

<div class="alert is-helpful">

* For a complete list of built-in pipes, see the [pipes API documentation](/api/common#pipes "Pipes API reference summary").

  有关内置管道的完整列表，请参阅[管道 API 文档](/api/common#pipes "管道 API 参考总结") 。

* To learn more about using pipes for internationalization (i18n) efforts, see [formatting data based on locale](/guide/i18n#i18n-pipes "Formatting data based on locale").

  要了解有关使用管道进行国际化（i18n）工作的更多信息，请参阅[根据本地环境格式化数据](/guide/i18n#i18n-pipes "根据本地环境格式化数据") 。

</div>

You can also create pipes to encapsulate custom transformations and use your custom pipes in template expressions.

你还可以创建管道来封装自定义转换，并在模板表达式中使用自定义管道。

## Prerequisites

## 先决条件

To use pipes you should have a basic understanding of the following:

要想使用管道，你应该对这些内容有基本的了解：

* [Typescript](guide/glossary#typescript "Definition of Typescript") and HTML5 programming

  [Typescript](guide/glossary#typescript "Typescript 的定义") 和 HTML5 编程

* [Templates](guide/glossary#template "Definition of a template") in HTML with CSS styles

  带有 CSS 样式的 HTML [模板](guide/glossary#template "模板的定义")

* [Components](guide/glossary#component "Definition of a component")

  [组件](guide/glossary#component "组件的定义")

## Using a pipe in a template

## 在模板中使用管道

To apply a pipe, use the pipe operator (`|`) within a template expression as shown in the following code example, along with the *name* of the pipe, which is `date` for the built-in [`DatePipe`](api/common/DatePipe).
The tabs in the example show the following:

要应用管道，请如下所示在模板表达式中使用管道操作符（`|`），紧接着是该管道的*名字*，对于内置的 [`DatePipe`](api/common/DatePipe) 它的名字是 `date` 。这个例子中的显示如下：

* `app.component.html` uses `date` in a separate template to display a birthday.

  `app.component.html` 在另一个单独的模板中使用 `date` 来显示生日。

* `hero-birthday1.component.ts` uses the same pipe as part of an in-line template in a component that also sets the birthday value.

  `hero-birthday1.component.ts` 使用相同的管道作为组件内嵌模板的一部分，同时该组件也会设置生日值。

<code-tabs>
  <code-pane
    header="src/app/app.component.html"
    region="hero-birthday-template"
    path="pipes/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="src/app/hero-birthday1.component.ts"
    path="pipes/src/app/hero-birthday1.component.ts">
  </code-pane>
</code-tabs>

The component's `birthday` value flows through the
[pipe operator](guide/template-syntax#pipe) ( | ) to the [`date`](api/common/DatePipe)
function.

该组件的 `birthday` 值通过[管道操作符](guide/template-syntax#pipe)（|）流向 [`date`](api/common/DatePipe) 函数。

{@a parameterizing-a-pipe}

## Formatting data with parameters and chained pipes

## 使用参数和管道链来格式化数据

Use optional parameters to fine-tune a pipe's output.
For example, you can use the [`CurrencyPipe`](api/common/CurrencyPipe "API reference") with a country code such as EUR as a parameter.
The template expression `{{ amount | currency:'EUR' }}` transforms the `amount` to currency in euros.
Follow the pipe name (`currency`) with a colon (`:`) and the parameter value (`'EUR'`).

可以用可选参数微调管道的输出。例如，你可以使用 [`CurrencyPipe`](api/common/CurrencyPipe "API 参考") 和国家代码（如 EUR）作为参数。模板表达式 `{{ amount | currency:'EUR' }}` 会把 `amount` 转换成欧元。紧跟在管道名称（ `currency` ）后面的是冒号（`:`）和参数值（`'EUR'`）。

If the pipe accepts multiple parameters, separate the values with colons.
For example, `{{ amount | currency:'EUR':'Euros '}}` adds the second parameter, the string literal `'Euros '`, to the output string. You can use any valid template expression as a parameter, such as a string literal or a component property.

如果管道能接受多个参数，就用冒号分隔这些值。例如，`{{ amount | currency:'EUR':'Euros '}}` 会把第二个参数（字符串 `'Euros '`）添加到输出字符串中。你可以使用任何有效的模板表达式作为参数，比如字符串字面量或组件的属性。

Some pipes require at least one parameter and allow more optional parameters, such as [`SlicePipe`](/api/common/SlicePipe "API reference for SlicePipe"). For example, `{{ slice:1:5 }}` creates a new array or string containing a subset of the elements starting with element `1` and ending with element `5`.

有些管道需要至少一个参数，并且允许使用更多的可选参数，比如 [`SlicePipe`](/api/common/SlicePipe "SlicePipe 的 API 参考") 。例如， `{{ slice:1:5 }}` 会创建一个新数组或字符串，它以第 `1` 个元素开头，并以第 `5` 个元素结尾。

### Example: Formatting a date

### 示例：格式化日期

The tabs in the following example demonstrates toggling between two different formats (`'shortDate'` and `'fullDate'`):

下面的例子显示了两种不同格式（`'shortDate'` 和 `'fullDate'`）之间的切换：

* The `app.component.html` template uses a format parameter for the [`DatePipe`](api/common/DatePipe) (named `date`) to show the date as **04/15/88**.

  该 `app.component.html` 模板使用 [`DatePipe`](api/common/DatePipe) （名为 `date`）的格式参数把日期显示为 **04/15/88** 。

* The `hero-birthday2.component.ts` component binds the pipe's format parameter to the component's `format` property in the `template` section, and adds a button for a click event bound to the component's `toggleFormat()` method.

  `hero-birthday2.component.ts` 组件把该管道的 format 参数绑定到 `template` 中组件的 `format` 属性，并添加了一个按钮，其 click 事件绑定到了该组件的 `toggleFormat()` 方法。

* The `hero-birthday2.component.ts` component's `toggleFormat()` method toggles the component's `format` property between a short form
(`'shortDate'`) and a longer form (`'fullDate'`).

  `hero-birthday2.component.ts` 组件的 `toggleFormat()` 方法会在短格式（`'shortDate'`）和长格式（`'fullDate'`）之间切换该组件的 `format` 属性。

<code-tabs>
  <code-pane
    header="src/app/app.component.html"
    region="format-birthday"
    path="pipes/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="src/app/hero-birthday2.component.ts (template)"
    region="template"
    path="pipes/src/app/hero-birthday2.component.ts">
  </code-pane>
  <code-pane
    header="src/app/hero-birthday2.component.ts (class)"
    region="class"
    path="pipes/src/app/hero-birthday2.component.ts">
  </code-pane>
</code-tabs>

Clicking the **Toggle Format** button alternates the date format between **04/15/1988** and **Friday, April 15, 1988** as shown in Figure 1.

点击 **Toggle Format** 按钮可以在 **04/15/1988** 和 **Friday, April 15, 1988** 之间切换日期格式，如图 1 所示。

<div class="lightbox">
  <img src='generated/images/guide/pipes/date-format-toggle-anim.gif' alt="Date Format Toggle">
</div>

**Figure 1.** Clicking the button toggles the date format

**图 1.** 单击该按钮切换日期格式

<div class="alert is-helpful">

For `date` pipe format options, see [DatePipe](api/common/DatePipe "DatePipe API Reference page").

关于 `date` 管道的格式选项，参见 [DatePipe](api/common/DatePipe "DatePipe API 参考手册页面") 。

</div>

### Example: Applying two formats by chaining pipes

### 示例：通过串联管道应用两种格式

You can chain pipes so that the output of one pipe becomes the input to the next.

你可以对管道进行串联，以便一个管道的输出成为下一个管道的输入。

In the following example, chained pipes first apply a format to a date value, then convert the formatted date to uppercase characters.
The first tab for the `src/app/app.component.html` template chains `DatePipe` and `UpperCasePipe` to display the birthday as **APR 15, 1988**.
The second tab for the `src/app/app.component.html` template passes the `fullDate` parameter to `date` before chaining to `uppercase`, which produces **FRIDAY, APRIL 15, 1988**.

在下面的示例中，串联管道首先将格式应用于一个日期值，然后将格式化之后的日期转换为大写字符。 `src/app/app.component.html` 模板的第一个标签页把 `DatePipe` 和 `UpperCasePipe` 的串联起来，将其显示为 **APR 15, 1988**。`src/app/app.component.html` 模板的第二个标签页在串联 `uppercase` 之前，还把 `fullDate` 参数传递给了 `date`，将其显示为 **FRIDAY, APRIL 15, 1988**。

<code-tabs>
  <code-pane
    header="src/app/app.component.html (1)"
    region="chained-birthday"
    path="pipes/src/app/app.component.html">
  </code-pane>
  <code-pane
    header="src/app/app.component.html (2)"
    region="chained-parameter-birthday"
    path="pipes/src/app/app.component.html">
  </code-pane>
</code-tabs>

{@a Custom-pipes}

## Creating pipes for custom data transformations

## 为自定义数据转换创建管道

Create custom pipes to encapsulate transformations that are not provided with the built-in pipes.
You can then use your custom pipe in template expressions, the same way you use built-in pipes—to transform input values to output values for display.

创建自定义管道来封装那些内置管道没有提供的转换。然后你就可以在模板表达式中使用你的自定义管道，就像内置管道一样，把输入值转换成显示输出。

### Marking a class as a pipe

### 把一个类标记为一个管道

To mark a class as a pipe and supply configuration metadata, apply the [`@Pipe`](/api/core/Pipe "API reference for Pipe") [decorator](/guide/glossary#decorator--decoration "Definition for decorator") to the class.
Use [UpperCamelCase](guide/glossary#case-types "Definition of case types") (the general convention for class names) for the pipe class name, and [camelCase](guide/glossary#case-types "Definition of case types") for the corresponding `name` string.
Do not use hyphens in the `name`.
For details and more examples, see [Pipe names](guide/styleguide#pipe-names "Pipe names in the Angular coding style guide").

要把类标记为管道并提供配置元数据，请把 [`@Pipe`](/api/core/Pipe "Pipe 的 API 引用") [装饰器](/guide/glossary#decorator--decoration "装饰器的定义")应用到这个类上。管道类名是 [UpperCamelCase](guide/glossary#case-types "案例类型的定义")（类名的一般约定），相应的 `name` 字符串是 [camelCase](guide/glossary#case-types "案例类型的定义") 的。不要在 `name` 中使用连字符。详细信息和更多示例，请参阅[管道名称](guide/styleguide#pipe-names "Angular 编码风格指南中的管道名称") 。

Use `name` in template expressions as you would for a built-in pipe.

在模板表达式中使用 `name` 就像在内置管道中一样。

<div class="alert is-important">

* Include your pipe in the `declarations` field of the `NgModule` metadata in order for it to be available to a template. See the `app.module.ts` file in the example app (<live-example></live-example>). For details, see [NgModules](guide/ngmodules "NgModules introduction").

  把你的管道包含在 `NgModule` 元数据的 `declarations` 字段中，以便它能用于模板。请查看示例应用中的 `app.module.ts` 文件（<live-example></live-example>）。有关详细信息，请参阅 [NgModules](guide/ngmodules "NgModules 简介") 。

* Register your custom pipes. The [Angular CLI](cli "CLI Overview and Command Reference") [`ng generate pipe`](cli/generate#pipe "ng generate pipe in the CLI Command Reference") command registers the pipe automatically.

  注册自定义管道。[Angular CLI](cli "CLI 概述和命令参考") 的 [`ng generate pipe`](cli/generate#pipe "ng 在 CLI Command Reference 中生成管道") 命令会自动注册该管道。

</div>

### Using the PipeTransform interface

### 使用 PipeTransform 接口

Implement the [`PipeTransform`](/api/core/PipeTransform "API reference for PipeTransform") interface in your custom pipe class to perform the transformation.

在自定义管道类中实现 [`PipeTransform`](/api/core/PipeTransform "PipeTransform 的 API 参考") 接口来执行转换。

Angular invokes the `transform` method with the value of a binding as the first argument, and any parameters as the second argument in list form, and returns the transformed value.

Angular 调用 `transform` 方法，该方法使用绑定的值作为第一个参数，把其它任何参数都以列表的形式作为第二个参数，并返回转换后的值。

### Example: Transforming a value exponentially

### 示例：指数级转换

In a game, you may want to implement a transformation that raises a value exponentially to increase a hero's power.
For example, if the hero's score is 2, boosting the hero's power exponentially by 10 produces a score of 1024.
You can use a custom pipe for this transformation.

在游戏中，你可能希望实现一种指数级转换，以指数级增加英雄的力量。例如，如果英雄的得分是 2，那么英雄的能量会指数级增长 10 次，最终得分为 1024。你可以使用自定义管道进行这种转换。

The following code example shows two component definitions:

下列代码示例显示了两个组件定义：

* The `exponential-strength.pipe.ts` component defines a custom pipe named `exponentialStrength` with the `transform` method that performs the transformation.
It defines an argument to the `transform` method (`exponent`) for a parameter passed to the pipe.

  `exponential-strength.pipe.ts` 通过一个执行转换的 `transform` 方法定义了一个名为 `exponentialStrength` 的自定义管道。它为传递给管道的参数定义了 `transform` 方法的一个参数（`exponent`）。

* The `power-booster.component.ts` component demonstrates how to use the pipe, specifying a value (`2`) and the exponent parameter (`10`).
Figure 2 shows the output.

  `power-booster.component.ts` 组件演示了如何使用该管道，指定了一个值（ `2` ）和一个 exponent 参数（ `10` ）。输出结果如图 2 所示。

<code-tabs>
  <code-pane
    header="src/app/exponential-strength.pipe.ts"
    path="pipes/src/app/exponential-strength.pipe.ts">
  </code-pane>
  <code-pane
    header="src/app/power-booster.component.ts"
    path="pipes/src/app/power-booster.component.ts">
  </code-pane>
</code-tabs>

<div class="lightbox">
  <img src='generated/images/guide/pipes/power-booster.png' alt="Power Booster">
</div>

**Figure 2.** Output from the `exponentialStrength` pipe

**图 2.** `exponentialStrength` 管道的输出

<div class="alert is-helpful">

To examine the behavior the `exponentialStrength` pipe in the <live-example></live-example>, change the value and optional exponent in the template.

要检查 `exponentialStrength` 管道的行为，请查看<live-example></live-example>，并在模板中修改值和可选的指数参数。

</div>

{@a change-detection}

## Detecting changes with data binding in pipes

## 通过管道中的数据绑定来检测变更

You use [data binding](/guide/glossary#data-binding "Definition of data binding") with a  pipe to display values and respond to user actions.
If the data is a primitive input value, such as `String` or `Number`, or an object reference as input, such as `Date` or `Array`, Angular executes the pipe whenever it detects a change for the input value or reference.

你可以通过带有管道的[数据绑定](/guide/glossary#data-binding "数据绑定的定义")来显示值并响应用户操作。如果是原始类型的输入值，比如 `String` 或 `Number` ，或者是对象引用型的输入值，比如 `Date` 或 `Array` ，那么每当 Angular 检测到输入值或引用有变化时，就会执行该输入管道。

For example, you could change the previous custom pipe example to use two-way data binding with `ngModel` to input the amount and boost factor, as shown in the following code example.

比如，你可以修改前面的自定义管道示例，通过 `ngModel` 的双向绑定来输入数量和提升因子，如下面的代码示例所示。

<code-example path="pipes/src/app/power-boost-calculator.component.ts" header="src/app/power-boost-calculator.component.ts">

</code-example>

The `exponentialStrength` pipe executes every time the user changes the "normal power" value or the "boost factor", as shown in Figure 3.

每当用户改变 “normal power” 值或 “boost factor” 时，就会执行 `exponentialStrength` 管道，如图 3 所示。

<div class="lightbox">
  <img src='generated/images/guide/pipes/power-boost-calculator-anim.gif' alt="Power Boost Calculator">
</div>

**Figure 3.** Changing the amount and boost factor for the `exponentialStrength` pipe

**图 3.** 更改 `exponentialStrength` 管道的数值和提升因子

Angular detects each change and immediately runs the pipe.
This is fine for primitive input values.
However, if you change something *inside* a composite object (such as the month of a date, an element of an array, or an object property), you need to understand how change detection works, and how to use an `impure` pipe.

Angular 会检测每次变更，并立即运行该管道。对于原始输入值，这很好。但是，如果要在复合对象中更改某些*内部值*（例如日期中的月份、数组中的元素或对象中的属性），就需要了解变更检测的工作原理，以及如何使用 `impure`（非纯）管道。

### How change detection works

### 变更检测的工作原理

Angular looks for changes to data-bound values in a [change detection](guide/glossary#change-detection "Definition of change detection") process that runs after every DOM event: every keystroke, mouse move, timer tick, and server response.
The following example, which doesn't use a pipe, demonstrates how Angular uses its default change detection strategy to monitor and update its display of every hero in the `heroes` array.
The example tabs show the following:

Angular 会在每次 DOM 事件（每次按键、鼠标移动、计时器滴答和服务器响应）之后运行的[变更检测](guide/glossary#change-detection "变更检测的定义")过程中查找对数据绑定值的[更改](guide/glossary#change-detection "变更检测的定义")。下面这段不使用管道的例子演示了 Angular 如何利用默认的变更检测策略来监控和更新 `heroes` 数组中每个英雄的显示效果。示例显示如下：

* In the `flying-heroes.component.html (v1)` template, the `*ngFor` repeater displays the hero names.

  在 `flying-heroes.component.html (v1)` 模板中， `*ngFor` 会重复显示英雄的名字。

* Its companion component class `flying-heroes.component.ts (v1)` provides heroes, adds heroes into the array, and resets the array.

  与之相伴的组件类 `flying-heroes.component.ts (v1)` 提供了一些英雄，把这些英雄添加到数组中，并重置了该数组。

<code-tabs>
  <code-pane
    header="src/app/flying-heroes.component.html (v1)"
    region="template-1"
    path="pipes/src/app/flying-heroes.component.html">
  </code-pane>
  <code-pane
    header="src/app/flying-heroes.component.ts (v1)"
    region="v1"
    path="pipes/src/app/flying-heroes.component.ts">
  </code-pane>
</code-tabs>

Angular updates the display every time the user adds a hero.
If the user clicks the **Reset** button, Angular replaces `heroes` with a new array of the original heroes and updates the display.
If you add the ability to remove or change a hero, Angular would detect those changes and update the display as well.

每次用户添加一个英雄时，Angular 都会更新显示内容。如果用户点击了 **Reset** 按钮，Angular 就会用原来这些英雄组成的新数组来替换 `heroes` ，并更新显示。如果你添加删除或更改了某个英雄的能力，Angular 也会检测这些变化并更新显示。

However, executing a pipe to update the display with every change would slow down your app's performance.
So Angular uses a faster change-detection algorithm for executing a pipe, as described in the next section.

然而，如果对于每次更改都执行一个管道来更新显示，就会降低你应用的性能。因此，Angular 会使用更快的变更检测算法来执行管道，如下一节所述。

{@a pure-and-impure-pipes}

### Detecting pure changes to primitives and object references

### 检测原始类型和对象引用的纯变更

By default, pipes are defined as *pure* so that Angular executes the pipe only when it detects a *pure change* to the input value.
A pure change is either a change to a primitive input value (such as `String`, `Number`, `Boolean`, or `Symbol`), or a changed object reference (such as `Date`, `Array`, `Function`, or `Object`).

通过默认情况下，管道会定义成*纯的(pure)*，这样 Angular 只有在检测到输入值发生了*纯变更*时才会执行该管道。春变更是对原始输入值（比如 `String`、`Number`、`Boolean` 或 `Symbol` ）的变更，或是对对象引用的变更（比如 `Date`、`Array`、`Function`、`Object`）。

{@a pure-pipe-pure-fn}

A pure pipe must use a pure function, which is one that processes inputs and returns values without side effects.
In other words, given the same input, a pure function should always return the same output.

纯管道必须使用纯函数，它能处理输入并返回没有副作用的值。换句话说，给定相同的输入，纯函数应该总是返回相同的输出。

With a pure pipe, Angular ignores changes within composite objects, such as a newly added element of an existing array, because checking a primitive value or object reference is much faster than performing a deep check for differences within objects.
Angular can quickly determine if it can skip executing the pipe and updating the view.

使用纯管道，Angular 会忽略复合对象中的变化，例如往现有数组中新增的元素，因为检查原始值或对象引用比对对象中的差异进行深度检查要快得多。Angular 可以快速判断是否可以跳过执行该管道并更新视图。

However, a pure pipe with an array as input may not work the way you want.
To demonstrate this issue, change the previous example to filter the list of heroes to just those heroes who can fly.
Use the `FlyingHeroesPipe` in the `*ngFor` repeater as shown in the following code.
The tabs for the example show the following:

但是，以数组作为输入的纯管道可能无法正常工作。为了演示这个问题，修改前面的例子来把英雄列表过滤成那些会飞的英雄。在 `*ngFor` 中使用 `FlyingHeroesPipe` ，代码如下。这个例子的显示如下：

* The template (`flying-heroes.component.html (flyers)`) with the new pipe.

  带有新管道的模板（`flying-heroes.component.html (flyers)`）。

* The `FlyingHeroesPipe` custom pipe implementation (`flying-heroes.pipe.ts`).

  `FlyingHeroesPipe` 自定义管道实现（`flying-heroes.pipe.ts`）。

<code-tabs>
  <code-pane
    header="src/app/flying-heroes.component.html (flyers)"
    region="template-flying-heroes"
    path="pipes/src/app/flying-heroes.component.html">
  </code-pane>
  <code-pane
    header="src/app/flying-heroes.pipe.ts"
    region="pure"
    path="pipes/src/app/flying-heroes.pipe.ts">
  </code-pane>
</code-tabs>

The app now shows unexpected behavior: When the user adds flying heroes, none of them appear under "Heroes who fly."
This happens because the code that adds a hero does so by pushing it onto the `heroes` array:

该应用现在展示了意想不到的行为：当用户添加了会飞的英雄时，它们都不会出现在 “Heroes who fly” 中。发生这种情况是因为添加英雄的代码会把它 push 到 `heroes` 数组中：

<code-example path="pipes/src/app/flying-heroes.component.ts" region="push" header="src/app/flying-heroes.component.ts"></code-example>

The change detector ignores changes to elements of an array, so the pipe doesn't run.

而变更检测器会忽略对数组元素的更改，所以管道不会运行。

The reason Angular ignores the changed array element is that the *reference* to the array hasn't changed.
Since the array is the same, Angular does not update the display.

Angular 忽略了被改变的数组元素的原因是对数组的*引用*没有改变。由于 Angular 认为该数组仍是相同的，所以不会更新其显示。

One way to get the behavior you want is to change the object reference itself.
You can replace the array with a new array containing the newly changed elements, and then input the new array to the pipe.
In the above example, you can create an array with the new hero appended, and assign that to `heroes`. Angular detects the change in the array reference and executes the pipe.

获得所需行为的方法之一是更改对象引用本身。你可以用一个包含新更改过的元素的新数组替换该数组，然后把这个新数组作为输入传给管道。在上面的例子中，你可以创建一个附加了新英雄的数组，并把它赋值给 `heroes`。 Angular 检测到了这个数组引用的变化，并执行了该管道。

To summarize, if you mutate the input array, the pure pipe doesn't execute.
If you *replace* the input array, the pipe executes and the display is updated, as shown in Figure 4.

总结一下，如果修改了输入数组，纯管道就不会执行。如果*替换*了输入数组，就会执行该管道并更新显示，如图 4 所示。

<div class="lightbox">
  <img src='generated/images/guide/pipes/flying-heroes-anim.gif' alt="Flying Heroes">
</div>

**Figure 4.** The `flyingHeroes` pipe filtering the display to flying heroes

**图 4.** `flyingHeroes` 管道把显示过滤为会飞的英雄

The above example demonstrates changing a component's code to accommodate a pipe.

上面的例子演示了如何更改组件的代码来适应某个管道。

To keep your component simpler and independent of HTML templates that use pipes, you can, as an alternative, use an *impure* pipe to detect changes within composite objects such as arrays, as described in the next section.

为了让你的组件更简单，独立于那些使用管道的 HTML，你可以用一个*不纯的*管道来检测复合对象（如数组）中的变化，如下一节所述。

{@a impure-flying-heroes}

### Detecting impure changes within composite objects

### 检测复合对象中的非纯变更

To execute a custom pipe after a change *within* a composite object, such as a change to an element of an array, you need to define your pipe as `impure` to detect impure changes.
Angular executes an impure pipe every time it detects a change with every keystroke or mouse movement.

要在复合对象*内部*进行更改后执行自定义管道（例如更改数组元素），就需要把管道定义为 `impure` 以检测非纯的变更。每当按键或鼠标移动时，Angular 都会检测到一次变更，从而执行一个非纯管道。

<div class="alert is-important">

While an impure pipe can be useful, be careful using one. A long-running impure pipe could dramatically slow down your app.

虽然非纯管道很实用，但要小心使用。长时间运行非纯管道可能会大大降低你的应用速度。

</div>

Make a pipe impure by setting its `pure` flag to `false`:

通过把 `pure` 标志设置为 `false` 来把管道设置成非纯的：

<code-example path="pipes/src/app/flying-heroes.pipe.ts" region="pipe-decorator" header="src/app/flying-heroes.pipe.ts"></code-example>

The following code shows the complete implementation of `FlyingHeroesImpurePipe`, which extends `FlyingHeroesPipe` to inherit its characteristics.
The example shows that you don't have to change anything else—the only difference is setting the `pure` flag as `false` in the pipe metadata.

下面的代码显示了 `FlyingHeroesImpurePipe` 的完整实现，它扩展了 `FlyingHeroesPipe` 以继承其特性。这个例子表明你不需要修改其他任何东西 - 唯一的区别就是在管道元数据中把 `pure` 标志设置为 `false` 。

<code-tabs>
  <code-pane
    header="src/app/flying-heroes.pipe.ts (FlyingHeroesImpurePipe)"
    region="impure"
    path="pipes/src/app/flying-heroes.pipe.ts">
  </code-pane>
  <code-pane
    header="src/app/flying-heroes.pipe.ts (FlyingHeroesPipe)"
    region="pure"
    path="pipes/src/app/flying-heroes.pipe.ts">
  </code-pane>
</code-tabs>

`FlyingHeroesImpurePipe` is a good candidate for an impure pipe because the `transform` function is trivial and fast:

对于非纯管道，`FlyingHeroesImpurePipe` 是个不错的选择，因为它的 `transform` 函数非常简单快捷：

<code-example path="pipes/src/app/flying-heroes.pipe.ts" header="src/app/flying-heroes.pipe.ts (filter)" region="filter"></code-example>

You can derive a `FlyingHeroesImpureComponent` from `FlyingHeroesComponent`.
As shown in the code below, only the pipe in the template changes.

你可以从 `FlyingHeroesComponent` 派生一个 `FlyingHeroesImpureComponent`。如下面的代码所示，只有模板中的管道发生了变化。

<code-example path="pipes/src/app/flying-heroes-impure.component.html" header="src/app/flying-heroes-impure.component.html (excerpt)" region="template-flying-heroes"></code-example>

<div class="alert is-helpful">

  To confirm that the display updates as the user adds heroes, see the <live-example></live-example>.

  要想确认是否在用户添加英雄时更新了显示，请参阅<live-example></live-example>。

</div>

{@a async-pipe}

## Unwrapping data from an observable

## 从一个可观察对象中解包数据

[Observables](/guide/glossary#observable "Definition of observable") let you pass messages between parts of your application.
Observables are recommended for event handling, asynchronous programming, and handling multiple values.
Observables can deliver single or multiple values of any type, either synchronously (as a function delivers a value to its caller) or asynchronously on a schedule. 

[可观察对象](/guide/glossary#observable "可观察对象的定义")能让你在应用的各个部分之间传递消息。建议在事件处理、异步编程以及处理多个值时使用这些可观察对象。可观察对象可以提供任意类型的单个或多个值，可以是同步的（作为一个函数为它的调用者提供一个值），也可以是异步的。

<div class="alert is-helpful">

For details and examples of observables, see the [Observables Overview](/guide/observables#using-observables-to-pass-values "Using observables to pass values"").

有关可观察对象的详细信息和示例，请参阅[可观察对象概览](/guide/observables#using-observables-to-pass-values "使用可观察对象传递值“")。

</div>

Use the built-in [`AsyncPipe`](/api/common/AsyncPipe "API description of AsyncPipe") to accept an observable as input and subscribe to the input automatically.
Without this pipe, your component code would have to subscribe to the observable to consume its values, extract the resolved values, expose them for binding, and unsubscribe when the observable is destroyed in order to prevent memory leaks. `AsyncPipe` is an impure pipe that saves boilerplate code in your component to maintain the subscription and keep delivering values from that observable as they arrive.

使用内置的 [`AsyncPipe`](/api/common/AsyncPipe "AsyncPipe 的 API 描述") 接受一个可观察对象作为输入，并自动订阅输入。如果没有这个管道，你的组件代码就必须订阅这个可观察对象来使用它的值，提取已解析的值、把它们公开进行绑定，并在销毁这段可观察对象时取消订阅，以防止内存泄漏。 `AsyncPipe` 是一个非纯管道，可以节省组件中的样板代码，以维护订阅，并在数据到达时持续从该可观察对象中提供值。

The following code example binds an observable of message strings
(`message$`) to a view with the `async` pipe.

下列代码示例使用 `async` 管道将带有消息字符串（ `message$` ）的可观察对象绑定到视图中。

<code-example path="pipes/src/app/hero-async-message.component.ts" header="src/app/hero-async-message.component.ts">

</code-example>

{@a no-filter-pipe}

## Caching HTTP requests

## 缓存 HTTP 请求

To [communicate with backend services using HTTP](/guide/http "Communicating with backend services using HTTP"), the `HttpClient` service uses observables and offers the `HTTPClient.get()` method to fetch data from a server.
The aynchronous method sends an HTTP request, and returns an observable that emits the requested data for the response.

为了[使用 HTTP 与后端服务进行通信](/guide/http "使用 HTTP 与后端服务进行通信")，`HttpClient` 服务使用了可观察对象，并提供了 `HTTPClient.get()` 方法来从服务器获取数据。这个异步方法会发送一个 HTTP 请求，并返回一个可观察对象，它会发出请求到的响应数据。

As shown in the previous section, you can use the impure `AsyncPipe` to accept an observable as input and subscribe to the input automatically.
You can also create an impure pipe to make and cache an HTTP request.

如 `AsyncPipe` 所示，你可以使用非纯管道 `AsyncPipe` 接受一个可观察对象作为输入，并自动订阅输入。你也可以创建一个非纯管道来建立和缓存 HTTP 请求。

Impure pipes are called whenever change detection runs for a component, which could be every few milliseconds for `CheckAlways`.
To avoid performance problems, call the server only when the requested URL changes, as shown in the following example, and use the pipe to cache the server response.
The tabs show the following:

每当组件运行变更检测时就会调用非纯管道，在 `CheckAlways` 策略下会每隔几毫秒运行一次。为避免出现性能问题，只有当请求的 URL 发生变化时才会调用该服务器（如下例所示），并使用该管道缓存服务器的响应。显示如下：

* The `fetch` pipe (`fetch-json.pipe.ts`).

  `fetch` 管道（ `fetch-json.pipe.ts` ）。

* A harness component (`hero-list.component.ts`) for demonstrating the request, using a template that defines two bindings to the pipe requesting the heroes from the `heroes.json` file. The second binding chains the `fetch` pipe with the built-in `JsonPipe` to display the same hero data in JSON format.

  一个用于演示该请求的挽具组件（`hero-list.component.ts`），它使用一个模板，该模板定义了两个到该管道的绑定，该管道会向 `heroes.json` 文件请求英雄数组。第二个绑定把 `fetch` 管道与内置的 `JsonPipe` 串联起来，以 JSON 格式显示同一份英雄数据。

<code-tabs>
  <code-pane
    header="src/app/fetch-json.pipe.ts"
    path="pipes/src/app/fetch-json.pipe.ts">
  </code-pane>
  <code-pane
    header="src/app/hero-list.component.ts"
    path="pipes/src/app/hero-list.component.ts">
  </code-pane>
</code-tabs>

In the above example, a breakpoint on the pipe's request for data shows the following:

在上面的例子中，管道请求数据时的剖面展示了如下几点：

* Each binding gets its own pipe instance.

  每个绑定都有自己的管道实例。

* Each pipe instance caches its own URL and data and calls the server only once.

  每个管道实例都会缓存自己的 URL 和数据，并且只调用一次服务器。

The `fetch` and `fetch-json` pipes display the heroes as shown in Figure 5.

`fetch` 和 `fetch-json` 管道会显示英雄，如图 5 所示。

<div class="lightbox">
  <img src='generated/images/guide/pipes/hero-list.png' alt="Hero List">
</div>

**Figure 5.** The `fetch` and `fetch-json` pipes displaying the heroes

**图 5.** `fetch` 和 `fetch-json` 管道显示了这些英雄。

<div class="alert is-helpful">

The built-in [JsonPipe](api/common/JsonPipe "API description for JsonPipe") provides a way to diagnose a mysteriously failing data binding or to inspect an object for future binding.

内置的 [JsonPipe](api/common/JsonPipe "JsonPipe 的 API 描述") 提供了一种方法来诊断一个离奇失败的数据绑定，或用来检查一个对象是否能用于将来的绑定。

</div>
