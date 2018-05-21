# Angular Elements Overview

# Angular 元素（Elements）概览

Angular Elements are Angular components packaged as custom elements, a web standard for defining new html elements in a framework-agnostic way.

Angular 元素就是打包成自定义元素的 Angular 组件。所谓自定义元素就是一套与具体框架无关的用于定义新 HTML 元素的 Web 标准。

[Custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) are a Web Platform feature currently supported by Chrome, Opera, and Safari, and available in other browsers through polyfills (see [Browser Support](#browser-support)).
A custom element extends HTML by allowing you to define a tag whose content is created and controlled by JavaScript code. 
The browser maintains a `CustomElementRegistry` of defined custom elements (also called Web Components), which maps an instantiable JavaScript class to an HTML tag.

[自定义元素](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)这项特性目前受到了 Chrome、Opera 和 Safari 的支持，在其它浏览器中也能通过腻子脚本（参见[浏览器支持](#browser-support)）加以支持。
自定义元素扩展了 HTML，它允许你定义一个由 JavaScript 代码创建和控制的标签。
浏览器会维护一个自定义元素（也叫 Web Components）的注册表 `CustomElementRegistry`，它把一个可实例化的 JavaScript 类映射到 HTML 标签上。

The `@angular/elements` package exports a `createCustomElement()` API that provides a bridge from Angular's component interface and change detection functionality to the built-in DOM API. 

`@angular/elements` 包导出了一个 `createCustomElement()` API，它在 Angular 组件接口与变更检测功能和内置 DOM API 之间建立了一个桥梁。

Transforming a component to a custom element makes all of the required Angular infrastructure available to the browser. Creating a custom element is simple and straightforward, and automatically connects your component-defined view with change detection and data binding, mapping Angular functionality to the corresponding native HTML equivalents. 

把组件转换成自定义元素会让所需的 Angular 基础设施也可用在浏览器中。创建自定义元素非常简单直接，它会自动把你的组件视图对接到变更检测和数据绑定机制，会把 Angular 的功能映射到原生 HTML 中的等价物。

## Using custom elements

## 使用自定义元素

Custom elements bootstrap themselves - they start automatically when they are added to the DOM, and are automatically destroyed when removed from the DOM. Once a custom element is added to the DOM for any page, it looks and behaves like any other HTML element, and does not require any special knowledge of Angular terms or usage conventions.  

自定义元素会自己启动 —— 它们在添加到 DOM 中时就会自动启动自己，并在从 DOM 中移除时自动销毁自己。一旦自定义元素添加到了任何页面的 DOM 中，它的外观和行为就和其它的 HTML 元素一样了，不需要对 Angular 的术语或使用约定有任何特殊的了解。

- <b>Easy dynamic content in an Angular app</b>

   <b>Angular 应用中的简易动态内容</b>

  Transforming a component to a custom element provides an easy path to creating dynamic HTML content in your Angular app. HTML content that you add directly to the DOM in an Angular app is normally displayed without Angular processing, unless you define a _dynamic component_, adding your own code to connect the HTML tag to your app data, and participate in change detection. With a custom element, all of that wiring is taken care of automatically.

  把组件转换成自定义元素为你在 Angular 应用中创建动态 HTML 内容提供了一种简单的方式。
  在 Angular 应用中，你直接添加到 DOM 中的 HTML 内容是不会经过 Angular 处理的，除非你使用*动态组件*来借助自己的代码把 HTML 标签与你的应用数据关联起来并参与变更检测。而使用自定义组件，所有这些装配工作都会自动进行。

- <b>Content-rich applications</b>

   <b>富内容应用</b>

  If you have a content-rich app, such as the Angular app that presents this documentation, custom elements let you give your content providers sophisticated Angular functionality without requiring knowledge of Angular. For example, an Angular guide like this one is added directly to the DOM by the Angular navigation tools, but can include special elements like `<code-snippet>` that perform complex operations. All you need to tell your content provider is the syntax of your custom element. They don't need to know anything about Angular, or anything about your component's data structures or implementation.

   如果你有一个富内容应用（比如正在展示本文档的这个），自定义元素可以为你的内容提供方赋予复杂的 Angular 功能，而不用要求他了解 Angular 的知识。比如，像本文档一样的 Angular 指南是使用 Angular 导航工具直接添加到 DOM 中的，但是其中可以包含特殊的元素，比如 `<code-snippet>`，它可以执行复杂的操作。
   你所要告诉你的内容提供方的一切，就是这个自定义元素的语法。他们不需要了解关于 Angular 的任何知识，也不需要了解你的组件的数据结构或实现。

### How it works

### 工作原理

Use the `createCustomElement()` function to convert a component into a class that can be registered with the browser as a custom element. 
After you register your configured class with the browser's custom-element registry, you can use the new element just like a built-in HTML element in content that you add directly into the DOM: 

使用 `createCustomElement()` 函数来把组件转换成一个可注册为浏览器中自定义元素的类。
注册完这个配置好的类之后，你就可以在内容中像内置 HTML 元素一样使用这个新元素了，比如直接把它加到 DOM 中：

```

<my-popup message="Use Angular!"></my-popup>

```

When your custom element is placed on a page, the browser creates an instance of the registered class and adds it to the DOM. The content is provided by the component's template, which  uses Angular template syntax, and is rendered using the component and DOM data. Input properties in the component correspond to input attributes for the element. 

当你的自定义元素放进页面中时，浏览器会创建一个已注册类的实例。其内容是由组件模板提供的，它使用 Angular 模板语法，并且使用组件和 DOM 数据进行渲染。组件的输入属性（Property）对应于该元素的输入属性（Attribute）。

<figure>

<img src="generated/images/guide/elements/customElement1.png" alt="Custom element in browser" class="left">

</figure>

<hr class="clear">

<div class="l-sub-section">

    We are working on custom elements that can be used by web apps built on other frameworks. 
    A minimal, self-contained version of the Angular framework will be injected as a service to support the component's change-detection and data-binding functionality. 
    For more about the direction of development, check out this [video presentation](https://www.youtube.com/watch?v=vHI5C-9vH-E).

    我们正在使用的这些自定义元素也可以被用在使用其它框架构建的 Web 应用中。
    Angular 框架的一个最小化的、自包含的版本，会作为服务注册组件，以支持变更检测和数据绑定功能。
    要了解更多，参见这个[视频演讲](https://www.youtube.com/watch?v=vHI5C-9vH-E)。

</div>

## Transforming components to custom elements

## 把组件转换成自定义元素

Angular provides the `createCustomElement()` function for converting an Angular component, 
together with its dependencies, to a custom element. The function collects the component's 
observable properties, along with the Angular functionality the browser needs to 
create and destroy instances, and to detect and respond to changes. 

Angular 提供了 `createCustomElement()` 函数来支持把 Angular 组件及其依赖转换成自定义元素。该函数会收集该组件的 `Observable` 型属性，提供浏览器创建和销毁实例时所需的 Angular 功能，还会对变更进行检测并做出响应。

The conversion process implements the `NgElementConstructor` interface, and creates a 
constructor class that is configured to produce a self-bootstrapping instance of your component. 

这个转换过程实现了 `NgElementConstructor` 接口，并创建了一个构造器类，用于生成该组件的一个自举型实例。

Use a JavaScript function, `customElements.define()`,  to register the configured constructor 
and its associated custom-element tag with the browser's `CustomElementRegistry`. 
When the browser encounters the tag for the registered element, it uses the constructor to create a custom-element instance.

然后用 JavaScript 的 `customElements.define()` 函数把这个配置好的构造器和相关的自定义元素标签注册到浏览器的 `CustomElementRegistry` 中。
当浏览器遇到这个已注册元素的标签时，就会使用该构造器来创建一个自定义元素的实例。

<figure>

<img src="generated/images/guide/elements/createElement.png" alt="Transform a component to a custom element" class="left">  

</figure>

### Mapping 

### 映射

A custom element _hosts_ an Angular component, providing a bridge between the data and logic defined in the component and standard DOM APIs. Component properties and logic maps directly into HTML attributes and the browser's event system.

*寄宿*着 Angular 组件的自定义元素在组件中定义的数据及逻辑和标准的 DOM API 之间建立了一座桥梁。组件的属性和逻辑会直接映射到 HTML 属性和浏览器的事件系统中。

- The creation API parses the component looking for input properties, and defines corresponding attributes for the custom element. It transforms the property names to make them compatible with custom elements, which do not recognize case distinctions. The resulting attribute names use dash-separated lowercase. For example, for a component with `@Input('myInputProp') inputProp`, the corresponding custom element defines an attribute `my-input-prop`.

   用于创建的 API 会解析该组件，以查找输入属性（Property），并在这个自定义元素上定义响应的属性（Attribute）。
   它把属性名转换成与自定义元素兼容的形式（自定义元素不区分大小写），生成的属性名会使用中线分隔的小写形式。
   比如，对于带有 `@Input('myInputProp') inputProp` 的组件，其对应的自定义元素会带有一个 `my-input-prop` 属性。

- Component outputs are dispatched as HTML [Custom Events](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent), with the name of the custom event matching the output name. For example, for a component with `@Output() valueChanged = new EventEmitter()`, the corresponding custom element will dispatch events with the name "valueChanged", and the emitted data will be stored on the event’s `detail` property. If you provide an alias, that value is used; for example, `@Output('myClick') clicks = new EventEmitter<string>();` results in dispatch events with the name "myClick".

   组件的输出属性会用 HTML [自定义事件](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)的形式进行分发，自定义事件的名字就是这个输出属性的名字。
   比如，对于带有 `@Output() valueChanged = new EventEmitter()` 属性的组件，其相应的自定义元素将会分发名为 "valueChanged" 的事件，事件中所携带的数据存储在该事件对象的 `detail` 属性中。
   如果你提供了别名，那就会用这个别名。比如，`@Output('myClick') clicks = new EventEmitter<string>();` 会导致分发名为 "myClick" 事件。

For more information, see Web Component documentation for [Creating custom events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events).

要了解更多，请参见 Web Components 的文档：[Creating custom events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events#Creating_custom_events)。

{@a browser-support}

## Browser support for custom elements

## 自定义元素的浏览器支持

The recently-developed [custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) Web Platform feature is currently supported natively in a number of browsers. Support is pending or planned in other browsers. 

最近开发的 Web 平台特性：[自定义元素](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)目前在一些浏览器中实现了原生支持，而其它浏览器或者尚未决定，或者已经制订了计划。

<table>
<tr>

  <th>

      Browser

      浏览器

  </th>

  <th>

      Custom Element Support

      自定义元素支持

  </th>

</tr>
<tr>

  <td>

      Chrome

  </td>

  <td>

      Supported natively.

      原生支持。

  </td>

</tr>
<tr>

  <td>

      Opera

  </td>

  <td>

      Supported natively.

      原生支持。

  </td>

</tr>
<tr>

  <td>

      Safari

  </td>

  <td>

      Supported natively.

      原生支持。

  </td>

</tr>
<tr>

  <td>

      Firefox

  </td>

  <td>

       Set the <code>dom.webcomponents.enabled</code> and <code>dom.webcomponents.customelements.enabled</code> preferences to true. Planned to be enabled by default in version 60/61.

       把 <code>dom.webcomponents.enabled</code> 和 <code>dom.webcomponents.customelements.enabled</code> 首选项设置为 true。计划在版本 60/61 中提供原生支持。

  </td>

</tr>
<tr>

  <td>

      Edge

  </td>

  <td>

      Working on an implementation. <br>    

      正在实现。<br>

  </td>

</tr>
</table>

In browsers that support Custom Elements natively, the specification requires developers use ES2015 classes to define Custom Elements - developers can opt-in to this by setting the `target: "es2015"` property in their project's `tsconfig.json`. As Custom Element and ES2015 support may not be available in all browsers, developers can instead choose to use a polyfill to support older browsers and ES5 code.

对于原生支持了自定义元素的浏览器，该规范要求开发人员使用 ES2016 的类来定义自定义元素 —— 开发人员可以在项目的 `tsconfig.json` 中设置 `target: "es2015"` 属性来满足这一要求。并不是所有浏览器都支持自定义元素和 ES2015，开发人员也可以选择使用腻子脚本来让它支持老式浏览器和 ES5 的代码。

Use the [Angular CLI](https://cli.angular.io/) to automatically set up your project with the correct polyfill: `ng add @angular/elements --name=*your_project_name*`.

使用 [Angular CLI](https://cli.angular.io/) 可以自动为你的项目添加正确的腻子脚本：`ng add @angular/elements --name=*your_project_name*`。

- For more information about polyfills, see [polyfill documentation](https://www.webcomponents.org/polyfills). 

   要了解关于腻子脚本的更多信息，参见[腻子脚本的相关文档](https://www.webcomponents.org/polyfills)。

- For more information about Angular browser support, see [Browser Support](guide/browser-support).

   要了解 Angular 浏览器支持的更多信息，参见[浏览器支持](guide/browser-support)。

## Example: A Popup Service

## 范例：弹窗服务

Previously, when you wanted to add a component to an app at runtime, you had to define a _dynamic component_. The app module would have to list your dynamic component under `entryComponents`, so that the app wouldn't expect it to be present at startup, and then you would have to load it, attach it to an element in the DOM, and wire up all of the dependencies, change detection, and event handling, as described in [Dynamic Component Loader](guide/dynamic-component-loader).

以前，如果你要在运行期间把一个组件添加到应用中，就不得不定义*动态组件*。应用模块不得不把你的动态组件添加到 `entryComponents` 列表中，以便应用在启动时能找到它，然后你还要加载它、把它附加到 DOM 中的元素上，并且装配所有的依赖、变更检测和事件处理，详见[动态组件加载器](guide/dynamic-component-loader)。

Using an Angular custom element makes the process much simpler and more transparent, by providing all of the infrastructure and framework automatically&mdash;all you have to do is define the kind of event handling you want. (You do still have to exclude the component from compilation, if you are not going to use it in your app.)

用 Angular 自定义组件会让这个过程更简单、更透明。只要自动提供所有基础设施和框架即可，你所要做的一切就是定义所需的各种事件处理逻辑。（如果你不准备在应用中直接用它，还要把该组件从编译中排除出去。）

The Popup Service example app defines a component that you can either load dynamically or convert to a custom element. 

这个弹窗服务的范例应用定义了一个组件，你可以动态加载它也可以把它转换成自定义组件。

- `popup.component.ts`  defines a simple pop-up element that displays an input message, with some animation and styling. 

   `popup.component.ts` 定义了一个简单的弹窗元素，用于显示一条输入消息，附带一些动画和样式。

- `popup.service.ts` creates an injectable service that provides two different ways to invoke the PopupComponent; as a dynamic component, or as a custom element. Notice how much more setup is required for the dynamic-loading method.

   `popup.service.ts` 创建了一个可注入的服务，它提供了两种方式来执行 PopupComponent：作为动态组件或作为自定义元素。注意动态组件的方式需要更多的代码来做搭建工作。

- `app.module.ts` adds the PopupComponent in the module's `entryComponents` list, to exclude it from compilation and avoid startup warnings or errors.

   `app.module.ts` 把 PopupComponent 添加到模块的 `entryComponents` 列表中，而从编译过程中排除它，以消除启动时的警告和错误。

- `app.component.ts` defines the app's root component, which uses the PopupService to add the pop-up to the DOM at run time. When the app runs, the root component's constructor converts PopupComponent to a custom element. 

   `app.component.ts` 定义了该应用的根组件，它借助 PopupService 在运行时把这个弹窗添加到 DOM 中。在应用运行期间，根组件的构造函数会把 PopupComponent 转换成自定义元素。

For comparison, the demo shows both methods. One button adds the popup using the dynamic-loading method, and the other uses the custom element. You can see that the result is the same; only the preparation is different.

为了对比，这个范例中同时演示了这两种方式。一个按钮使用动态加载的方式添加弹窗，另一个按钮使用自定义元素的方式。可以看到，两者的结果是一样的，其差别只是准备过程不同。

<code-tabs>

  <code-pane title="popup.component.ts" path="elements/src/app/popup.component.ts">

  </code-pane>

  <code-pane title="popup.service.ts" path="elements/src/app/popup.service.ts">

  </code-pane>

  <code-pane title="app.module.ts" path="elements/src/app/app.module.ts">

  </code-pane>

  <code-pane title="app.component.ts" path="elements/src/app/app.component.ts">

  </code-pane>
</code-tabs>
