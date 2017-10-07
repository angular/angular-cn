<h1 class="no-toc">Cheat Sheet</h1>

<h1 class="no-toc">速查表</h1>

<div id="cheatsheet">
<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Bootstrapping</p>
<p>启动</p>
</th>
<th><p><code>import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';</code>
</p>
</th>
</tr>
<tr>
<td><code><b>platformBrowserDynamic().bootstrapModule</b>(AppModule);</code></td>
<td><p>Bootstraps the app, using the root component from the specified <code>NgModule</code>. </p>
<p>用 <code>NgModule</code> 中指定的根组件进行启动。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th><p>NgModules</p>
<p>Angular 模块</p>
</th>
<th><p><code>import { NgModule } from '@angular/core';</code>
</p>
</th>
</tr>
<tr>
<td><code>@<b>NgModule</b>({ declarations: ..., imports: ...,<br>     exports: ..., providers: ..., bootstrap: ...})<br>class MyModule {}</code></td>
<td><p>Defines a module that contains components, directives, pipes, and providers.</p>
<p>定义一个模块，其中可以包含组件、指令、管道和服务提供商。</p>
</td>
</tr><tr>
<td><code><b>declarations:</b> [MyRedComponent, MyBlueComponent, MyDatePipe]</code></td>
<td><p>List of components, directives, and pipes that belong to this module.</p>
<p>属于当前模块的组件、指令和管道的列表。</p>
</td>
</tr><tr>
<td><code><b>imports:</b> [BrowserModule, SomeOtherModule]</code></td>
<td><p>List of modules to import into this module. Everything from the imported modules
is available to <code>declarations</code> of this module.</p>
<p>本模块所导入的模块列表</p>
</td>
</tr><tr>
<td><code><b>exports:</b> [MyRedComponent, MyDatePipe]</code></td>
<td><p>List of components, directives, and pipes visible to modules that import this module.</p>
<p>那些导入了本模块的模块所能看到的组件、指令和管道的列表</p>
</td>
</tr><tr>
<td><code><b>providers:</b> [MyService, { provide: ... }]</code></td>
<td><p>List of dependency injection providers visible both to the contents of this module and to importers of this module.</p>
<p>依赖注入提供商的列表，本模块以及本模块导入的所有模块中的内容都可以看见它们。</p>
</td>
</tr><tr>
<td><code><b>bootstrap:</b> [MyAppComponent]</code></td>
<td><p>List of components to bootstrap when this module is bootstrapped.</p>
<p>当本模块启动时，随之启动的组件列表。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Template syntax</p>
<p>模板语法</p>
</th>
<th></th>
</tr>
<tr>
<td><code>&lt;input <b>[value]</b>="firstName"&gt;</code></td>
<td><p>Binds property <code>value</code> to the result of expression <code>firstName</code>.</p>
<p>把<code>value</code>属性绑定到表达式<code>firstName</code></p>
</td>
</tr><tr>
<td><code>&lt;div <b>[attr.role]</b>="myAriaRole"&gt;</code></td>
<td><p>Binds attribute <code>role</code> to the result of expression <code>myAriaRole</code>.</p>
<p>把属性（Attribute）<code>role</code>绑定到表达式<code>myAriaRole</code>的结果。</p>
</td>
</tr><tr>
<td><code>&lt;div <b>[class.extra-sparkle]</b>="isDelightful"&gt;</code></td>
<td><p>Binds the presence of the CSS class <code>extra-sparkle</code> on the element to the truthiness of the expression <code>isDelightful</code>.</p>
<p>根据<code>isDelightful</code>表达式的结果是否为真，决定CSS类<code>extra-sparkle</code>是否出现在当前元素上。</p>
</td>
</tr><tr>
<td><code>&lt;div <b>[style.width.px]</b>="mySize"&gt;</code></td>
<td><p>Binds style property <code>width</code> to the result of expression <code>mySize</code> in pixels. Units are optional.</p>
<p>把CSS样式属性<code>width</code>的px（像素）值绑定到表达式<code>mySize</code>的结果。单位是可选的。</p>
</td>
</tr><tr>
<td><code>&lt;button <b>(click)</b>="readRainbow($event)"&gt;</code></td>
<td><p>Calls method <code>readRainbow</code> when a click event is triggered on this button element (or its children) and passes in the event object.</p>
<p>当这个按钮元素（及其子元素）上的click事件触发时，调用方法<code>readRainbow</code>，并把这个事件对象作为参数传进去。</p>
</td>
</tr><tr>
<td><code>&lt;div title="Hello <b>{{ponyName}}</b>"&gt;</code></td>
<td><p>Binds a property to an interpolated string, for example, "Hello Seabiscuit". Equivalent to:
<code>&lt;div [title]="'Hello ' + ponyName"&gt;</code></p>
<p>把一个属性绑定到插值字符串（如"Hello Seabiscuit"）。这种写法等价于<code>&lt;div [title]="'Hello ' + ponyName"&gt;</code></p>
</td>
</tr><tr>
<td><code>&lt;p&gt;Hello <b>{{ponyName}}</b>&lt;/p&gt;</code></td>
<td><p>Binds text content to an interpolated string, for example, "Hello Seabiscuit".</p>
<p>把文本内容绑定到插值字符串（如"Hello Seabiscuit"）</p>
</td>
</tr><tr>
<td><code>&lt;my-cmp <b>[(title)]</b>="name"&gt;</code></td>
<td><p>Sets up two-way data binding. Equivalent to: <code>&lt;my-cmp [title]="name" (titleChange)="name=$event"&gt;</code></p>
<p>设置双向绑定。等价于<code>&lt;my-cmp [title]="name" (titleChange)="name=$event"&gt;</code>。</p>
</td>
</tr><tr>
<td><code>&lt;video <b>#movieplayer</b> ...&gt;<br>  &lt;button <b>(click)</b>="movieplayer.play()"&gt;<br>&lt;/video&gt;</code></td>
<td><p>Creates a local variable <code>movieplayer</code> that provides access to the <code>video</code> element instance in data-binding and event-binding expressions in the current template.</p>
<p>创建一个局部变量<code>movieplayer</code>，支持在当前模板的数据绑定和事件绑定表达式中访问<code>video</code>元素的实例。</p>
</td>
</tr><tr>
<td><code>&lt;p <b>*myUnless</b>="myExpression"&gt;...&lt;/p&gt;</code></td>
<td><p>The <code>*</code> symbol turns the current element into an embedded template. Equivalent to:
<code>&lt;template [myUnless]="myExpression"&gt;&lt;p&gt;...&lt;/p&gt;&lt;/template&gt;</code></p>
<p>星号<code>*</code>会把当前元素转换成内嵌式模板，等价于：<code>&lt;template [myUnless]="myExpression"&gt;&lt;p&gt;...&lt;/p&gt;&lt;/template&gt;</code></p>
</td>
</tr><tr>
<td><code>&lt;p&gt;Card No.: <b>{{cardNumber | myCardNumberFormatter}}</b>&lt;/p&gt;</code></td>
<td><p>Transforms the current value of expression <code>cardNumber</code> via the pipe called <code>myCardNumberFormatter</code>.</p>
<p>使用名叫<code>myCardNumberFormatter</code>的管道对表达式<code>cardNumber</code>的当前值进行变幻</p>
</td>
</tr><tr>
<td><code>&lt;p&gt;Employer: <b>{{employer?.companyName}}</b>&lt;/p&gt;</code></td>
<td><p>The safe navigation operator (<code>?</code>) means that the <code>employer</code> field is optional and if <code>undefined</code>, the rest of the expression should be ignored.</p>
<p>安全导航操作符（<code>?</code>）表示<code>employer</code>字段是可选的，如果它是 <code>undefined</code> ，那么表达式其余的部分就会被忽略，并返回 <code>undefined</code>。</p>
</td>
</tr><tr>
<td><code>&lt;<b>svg:</b>rect x="0" y="0" width="100" height="100"/&gt;</code></td>
<td><p>An SVG snippet template needs an <code>svg:</code> prefix on its root element to disambiguate the SVG element from an HTML component.</p>
<p>模板中的 SVG 片段需要给它的根元素加上<code>svg:</code>前缀，以便把 SVG 元素和 HTML 元素区分开。</p>
</td>
</tr><tr>
<td><code>&lt;<b>svg</b>&gt;<br>  &lt;rect x="0" y="0" width="100" height="100"/&gt;<br>&lt;/<b>svg</b>&gt;</code></td>
<td><p>An <code>&lt;svg&gt;</code> root element is detected as an SVG element automatically, without the prefix.</p>
<p>以<code>&lt;svg&gt;</code>作为根元素时会自动识别为 SVG 元素，不需要前缀。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Built-in directives</p>
<p>内置指令</p>
</th>
<th><p><code>import { CommonModule } from '@angular/common';</code>
</p>
</th>
</tr>
<tr>
<td><code>&lt;section <b>*ngIf</b>="showSection"&gt;</code></td>
<td><p>Removes or recreates a portion of the DOM tree based on the <code>showSection</code> expression.</p>
<p>根据<code>showSection</code>表达式的结果，移除或重新创建 DOM 树的一部分。</p>
</td>
</tr><tr>
<td><code>&lt;li <b>*ngFor</b>="let item of list"&gt;</code></td>
<td><p>Turns the li element and its contents into a template, and uses that to instantiate a view for each item in list.</p>
<p>把li元素及其内容变成一个模板，并使用这个模板为列表中的每一个条目实例化一个视图。</p>
</td>
</tr><tr>
<td><code>&lt;div <b>[ngSwitch]</b>="conditionExpression"&gt;<br>  &lt;template <b>[<b>ngSwitchCase</b>]</b>="case1Exp"&gt;...&lt;/template&gt;<br>  &lt;template <b>ngSwitchCase</b>="case2LiteralString"&gt;...&lt;/template&gt;<br>  &lt;template <b>ngSwitchDefault</b>&gt;...&lt;/template&gt;<br>&lt;/div&gt;</code></td>
<td><p>Conditionally swaps the contents of the div by selecting one of the embedded templates based on the current value of <code>conditionExpression</code>.</p>
<p>根据<code>conditionExpression</code>的当前值选择一个嵌入式模板，并用它替换这个 div 的内容。</p>
</td>
</tr><tr>
<td><code>&lt;div <b>[ngClass]</b>="{'active': isActive, 'disabled': isDisabled}"&gt;</code></td>
<td><p>Binds the presence of CSS classes on the element to the truthiness of the associated map values. The right-hand expression should return {class-name: true/false} map.</p>
<p>根据 map 中的 value 是否为真，来决定该元素上是否出现与 name 对应的 CSS 类。右侧的表达式应该返回一个形如 <code>{class-name: true/false}</code> 的 map。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Forms</p>
<p>表单</p>
</th>
<th><p><code>import { FormsModule } from '@angular/forms';</code>
</p>
</th>
</tr>
<tr>
<td><code>&lt;input <b>[(ngModel)]</b>="userName"&gt;</code></td>
<td><p>Provides two-way data-binding, parsing, and validation for form controls.</p>
<p>为表单控件提供双向数据绑定、解析和验证功能。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Class decorators</p>
<p>类装饰器（decorator）</p>
</th>
<th><p><code>import { Directive, ... } from '@angular/core';</code>
</p>
</th>
</tr>
<tr>
<td><code><b>@Component({...})</b><br>class MyComponent() {}</code></td>
<td><p>Declares that a class is a component and provides metadata about the component.</p>
<p>声明一个类是组件，并提供该组件的元数据。</p>
</td>
</tr><tr>
<td><code><b>@Directive({...})</b><br>class MyDirective() {}</code></td>
<td><p>Declares that a class is a directive and provides metadata about the directive.</p>
<p>声明一个类是指令，并提供该指令的元数据。</p>
</td>
</tr><tr>
<td><code><b>@Pipe({...})</b><br>class MyPipe() {}</code></td>
<td><p>Declares that a class is a pipe and provides metadata about the pipe.</p>
<p>声明一个类是管道，并提供该管道的元数据。</p>
</td>
</tr><tr>
<td><code><b>@Injectable()</b><br>class MyService() {}</code></td>
<td><p>Declares that a class has dependencies that should be injected into the constructor when the dependency injector is creating an instance of this class.
</p>
<p>声明一个类具有一些依赖，当依赖注入器试图创建该类的实例时，应该把这些依赖注入到该类的构造函数中。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Directive configuration</p>
<p>指令配置</p>
</th>
<th><p><code>@Directive({ property1: value1, ... })</code>
</p>
</th>
</tr>
<tr>
<td><code><b>selector:</b> '.cool-button:not(a)'</code></td>
<td><p>Specifies a CSS selector that identifies this directive within a template. Supported selectors include <code>element</code>,
<code>[attribute]</code>, <code>.class</code>, and <code>:not()</code>.</p>
<p>指定一个 CSS 选择器，用于在模板中标记出该指令。支持的选择器类型包括：<code>元素名</code>、<code>[属性名]</code>, <code>.类名</code> 和 <code>:not()</code>。</p>
<p>Does not support parent-child relationship selectors.</p>
<p>但不支持指定父子关系的选择器。</p>
</td>
</tr><tr>
<td><code><b>providers:</b> [MyService, { provide: ... }]</code></td>
<td><p>List of dependency injection providers for this directive and its children.</p>
<p>该指令及其子指令的依赖注入提供商列表。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Component configuration</p>
<p>组件配置</p>
</th>
<th><p>
<code>@Component</code> extends <code>@Directive</code>,
so the <code>@Directive</code> configuration applies to components as well</p>
<p><code>@Component</code> 继承自 <code>@Directive</code>，因此 <code>@Directive</code> 的配置也能用于 <code>@Component</code>。</p>
</th>
</tr>
<tr>
<td><code><b>moduleId:</b> module.id</code></td>
<td><p>If set, the <code>templateUrl</code> and <code>styleUrl</code> are resolved relative to the component.</p>
<p>如果设置了，那么 <code>templateUrl</code> 和 <code>styleUrl</code> 的路径就会相对于当前组件进行解析。</p>
</td>
</tr><tr>
<td><code><b>viewProviders:</b> [MyService, { provide: ... }]</code></td>
<td><p>List of dependency injection providers scoped to this component's view.</p>
<p>依赖注入提供商列表，但它们的范围被限定为当前组件的视图。</p>
</td>
</tr><tr>
<td><code><b>template:</b> 'Hello {{name}}'<br><b>templateUrl:</b> 'my-component.html'</code></td>
<td><p>Inline template or external template URL of the component's view.</p>
<p>当前组件视图的内联模板或外部模板的 URL 。</p>
</td>
</tr><tr>
<td><code><b>styles:</b> ['.primary {color: red}']<br><b>styleUrls:</b> ['my-component.css']</code></td>
<td><p>List of inline CSS styles or external stylesheet URLs for styling the component’s view.</p>
<p>用于为当前组件的视图提供样式的内联 CSS 或外部样式表 URL 的列表。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Class field decorators for directives and components</p>
<p>给指令或组件类用的属性装饰器</p>
</th>
<th><p><code>import { Input, ... } from '@angular/core';</code>
</p>
</th>
</tr>
<tr>
<td><code><b>@Input()</b> myProperty;</code></td>
<td><p>Declares an input property that you can update via property binding (example:
<code>&lt;my-cmp [myProperty]="someExpression"&gt;</code>).</p>
<p>声明一个输入属性，你可以通过属性绑定来更新它，如 <code>&lt;my-cmp [myProperty]="someExpression"&gt;</code>。 </p>
</td>
</tr><tr>
<td><code><b>@Output()</b> myEvent = new EventEmitter();</code></td>
<td><p>Declares an output property that fires events that you can subscribe to with an event binding (example: <code>&lt;my-cmp (myEvent)="doSomething()"&gt;</code>).</p>
<p>声明一个输出属性，它发出事件，你可以用事件绑定来订阅它们（如：<code>&lt;my-cmp (myEvent)="doSomething()"&gt;</code>）。</p>
</td>
</tr><tr>
<td><code><b>@HostBinding('class.valid')</b> isValid;</code></td>
<td><p>Binds a host element property (here, the CSS class <code>valid</code>) to a directive/component property (<code>isValid</code>).</p>
<p>把宿主元素的一个属性（这里是 CSS 类 <code>valid</code>）绑定到指令或组件上的 <code>isValid</code> 属性。</p>
</td>
</tr><tr>
<td><code><b>@HostListener('click', ['$event'])</b> onClick(e) {...}</code></td>
<td><p>Subscribes to a host element event (<code>click</code>) with a directive/component method (<code>onClick</code>), optionally passing an argument (<code>$event</code>).</p>
<p>用指令或组件上的<code>onClick</code>方法订阅宿主元素上的<code>click</code>事件，并从中获取<code>$event</code>参数（可选）</p>
</td>
</tr><tr>
<td><code><b>@ContentChild(myPredicate)</b> myChildComponent;</code></td>
<td><p>Binds the first result of the component content query (<code>myPredicate</code>) to a property (<code>myChildComponent</code>) of the class.</p>
<p>把组件内容查询（<code>myPredicate</code>）的第一个结果绑定到该类的 <code>myChildComponent</code> 属性上。</p>
</td>
</tr><tr>
<td><code><b>@ContentChildren(myPredicate)</b> myChildComponents;</code></td>
<td><p>Binds the results of the component content query (<code>myPredicate</code>) to a property (<code>myChildComponents</code>) of the class.</p>
<p>把组件内容查询（<code>myPredicate</code>）的全部结果绑定到该类的 <code>myChildComponents</code> 属性上</p>
</td>
</tr><tr>
<td><code><b>@ViewChild(myPredicate)</b> myChildComponent;</code></td>
<td><p>Binds the first result of the component view query (<code>myPredicate</code>) to a property (<code>myChildComponent</code>) of the class. Not available for directives.</p>
<p>把组件视图查询（<code>myPredicate</code>）的第一个结果绑定到该类的 <code>myChildComponent</code> 属性上。对指令无效。</p>
</td>
</tr><tr>
<td><code><b>@ViewChildren(myPredicate)</b> myChildComponents;</code></td>
<td><p>Binds the results of the component view query (<code>myPredicate</code>) to a property (<code>myChildComponents</code>) of the class. Not available for directives.</p>
<p>把组件视图查询（<code>myPredicate</code>）的全部结果绑定到该类的 <code>myChildComponents</code> 属性上。对指令无效。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Directive and component change detection and lifecycle hooks</p>
<p>指令和组件的变更检测与生命周期钩子</p>
</th>
<th><p>(implemented as class methods)
</p>
<p>由类的方法实现。</p>
</th>
</tr>
<tr>
<td><code><b>constructor(myService: MyService, ...)</b> { ... }</code></td>
<td><p>Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.</p>
<p>在任何其它生命周期钩子之前调用。可以用它来注入依赖项，但不要在这里做正事。</p>
</td>
</tr><tr>
<td><code><b>ngOnChanges(changeRecord)</b> { ... }</code></td>
<td><p>Called after every change to input properties and before processing content or child views.</p>
<p>每当输入属性发生变化时就会调用，但位于处理内容（`ng-content`）或子视图之前。</p>
</td>
</tr><tr>
<td><code><b>ngOnInit()</b> { ... }</code></td>
<td><p>Called after the constructor, initializing input properties, and the first call to <code>ngOnChanges</code>.</p>
<p>在调用完构造函数、初始化完所有输入属性并首次调用过<code>ngOnChanges</code>之后调用。</p>
</td>
</tr><tr>
<td><code><b>ngDoCheck()</b> { ... }</code></td>
<td><p>Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.</p>
<p>每当对组件或指令的输入属性进行变更检测时就会调用。可以用它来扩展变更检测逻辑，执行自定义的检测逻辑。</p>
</td>
</tr><tr>
<td><code><b>ngAfterContentInit()</b> { ... }</code></td>
<td><p>Called after <code>ngOnInit</code> when the component's or directive's content has been initialized.</p>
<p><code>ngOnInit</code>完成之后，当组件或指令的内容（`ng-content`）已经初始化完毕时调用。</p>
</td>
</tr><tr>
<td><code><b>ngAfterContentChecked()</b> { ... }</code></td>
<td><p>Called after every check of the component's or directive's content.</p>
<p>每当组件或指令的内容（`ng-content`）做变更检测时调用。</p>
</td>
</tr><tr>
<td><code><b>ngAfterViewInit()</b> { ... }</code></td>
<td><p>Called after <code>ngAfterContentInit</code> when the component's view has been initialized. Applies to components only.</p>
<p>当<code>ngAfterContentInit</code>完毕，并且组件的视图已经初始化完毕时调用。只适用于组件。</p>
</td>
</tr><tr>
<td><code><b>ngAfterViewChecked()</b> { ... }</code></td>
<td><p>Called after every check of the component's view. Applies to components only.</p>
<p>当组件视图每次执行变更检测时调用。只适用于组件。</p>
</td>
</tr><tr>
<td><code><b>ngOnDestroy()</b> { ... }</code></td>
<td><p>Called once, before the instance is destroyed.</p>
<p>只在实例被销毁前调用一次。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Dependency injection configuration</p>
<p>依赖注入的配置</p>
</th>
<th></th>
</tr>
<tr>
<td><code>{ <b>provide</b>: MyService, <b>useClass</b>: MyMockService }</code></td>
<td><p>Sets or overrides the provider for <code>MyService</code> to the <code>MyMockService</code> class.</p>
<p>把 <code>MyService</code> 的服务提供商设置或改写为 <code>MyMockService</code> 类。</p>
</td>
</tr><tr>
<td><code>{ <b>provide</b>: MyService, <b>useFactory</b>: myFactory }</code></td>
<td><p>Sets or overrides the provider for <code>MyService</code> to the <code>myFactory</code> factory function.</p>
<p>把 <code>MyService</code> 的服务提供商设置或改写为 <code>myFactory</code> 工厂函数。</p>
</td>
</tr><tr>
<td><code>{ <b>provide</b>: MyValue, <b>useValue</b>: 41 }</code></td>
<td><p>Sets or overrides the provider for <code>MyValue</code> to the value <code>41</code>.</p>
<p>把 <code>MyValue</code> 的服务提供商改写为一个特定的值 <code>41</code> 。</p>
</td>
</tr>
</tbody></table>

<table class="is-full-width is-fixed-layout">
<tbody><tr>
<th>
<p>Routing and navigation</p>
<p>路由与导航</p>
</th>
<th><p><code>import { Routes, RouterModule, ... } from '@angular/router';</code>
</p>
</th>
</tr>
<tr>
<td><code>const routes: <b>Routes</b> = [<br>  { path: '', component: HomeComponent },<br>  { path: 'path/:routeParam', component: MyComponent },<br>  { path: 'staticPath', component: ... },<br>  { path: '**', component: ... },<br>  { path: 'oldPath', redirectTo: '/staticPath' },<br>  { path: ..., component: ..., data: { message: 'Custom' } }<br>]);<br><br>const routing = RouterModule.forRoot(routes);</code></td>
<td><p>Configures routes for the application. Supports static, parameterized, redirect, and wildcard routes. Also supports custom route data and resolve.</p>
<p>为该应用配置路由。支持静态、参数化、重定向和通配符路由。也支持自定义路由数据和解析（resolve）函数。</p>
</td>
</tr><tr>
<td><code><br>&lt;<b>router-outlet</b>&gt;&lt;/<b>router-outlet</b>&gt;<br>&lt;<b>router-outlet</b> name="aux"&gt;&lt;/<b>router-outlet</b>&gt;<br></code></td>
<td><p>Marks the location to load the component of the active route.</p>
<p>标记出一个位置，用来加载活动路由的组件。</p>
</td>
</tr><tr>
<td><code><br>&lt;a routerLink="/path"&gt;<br>&lt;a <b>[routerLink]</b>="[ '/path', routeParam ]"&gt;<br>&lt;a <b>[routerLink]</b>="[ '/path', { matrixParam: 'value' } ]"&gt;<br>&lt;a <b>[routerLink]</b>="[ '/path' ]" [queryParams]="{ page: 1 }"&gt;<br>&lt;a <b>[routerLink]</b>="[ '/path' ]" fragment="anchor"&gt;<br></code></td>
<td><p>Creates a link to a different view based on a route instruction consisting of a route path, required and optional parameters, query parameters, and a fragment. To navigate to a root route, use the <code>/</code> prefix; for a child route, use the <code>./</code>prefix; for a sibling or parent, use the <code>../</code> prefix.</p>
<p>使用路由体系创建一个到其它视图的链接。路由体系由路由路径、必要参数、可选参数、查询参数和文档片段组成。要导航到根路由，请使用<code>/</code>前缀；要导航到子路由，使用<code>./</code>前缀；要导航到兄弟路由或父级路由，使用<code>../</code>前缀。</p>
</td>
</tr><tr>
<td><code>&lt;a [routerLink]="[ '/path' ]" routerLinkActive="active"&gt;</code></td>
<td><p>The provided classes are added to the element when the <code>routerLink</code> becomes the current active route.</p>
<p>当 <code>routerLink</code> 指向的路由变成活动路由时，为当前元素添加一些类（比如这里的 `active`）。</p>
</td>
</tr><tr>
<td><code>class <b>CanActivate</b>Guard implements <b>CanActivate</b> {<br>    canActivate(<br>      route: ActivatedRouteSnapshot,<br>      state: RouterStateSnapshot<br>    ): Observable&lt;boolean&gt;|Promise&lt;boolean&gt;|boolean { ... }<br>}<br><br>{ path: ..., canActivate: [<b>CanActivate</b>Guard] }</code></td>
<td><p>An interface for defining a class that the router should call first to determine if it should activate this component. Should return a boolean or an Observable/Promise that resolves to a boolean.</p>
<p>用来定义类的接口。路由器会首先调用本接口来决定是否激活该路由。应该返回一个 `boolean` 或能解析成 `boolean` 的 `Observable/Promise`。</p>
</td>
</tr><tr>
<td><code>class <b>CanDeactivate</b>Guard implements <b>CanDeactivate</b>&lt;T&gt; {<br>    canDeactivate(<br>      component: T,<br>      route: ActivatedRouteSnapshot,<br>      state: RouterStateSnapshot<br>    ): Observable&lt;boolean&gt;|Promise&lt;boolean&gt;|boolean { ... }<br>}<br><br>{ path: ..., canDeactivate: [<b>CanDeactivate</b>Guard] }</code></td>
<td><p>An interface for defining a class that the router should call first to determine if it should deactivate this component after a navigation. Should return a boolean or an Observable/Promise that resolves to a boolean.</p>
<p>用来定义类的接口。路由器会在导航离开前首先调用本接口以决定是否取消激活本路由。应该返回一个 `boolean` 或能解析成 `boolean` 的 `Observable/Promise`。</p>
</td>
</tr><tr>
<td><code>class <b>CanActivateChild</b>Guard implements <b>CanActivateChild</b> {<br>    canActivateChild(<br>      route: ActivatedRouteSnapshot,<br>      state: RouterStateSnapshot<br>    ): Observable&lt;boolean&gt;|Promise&lt;boolean&gt;|boolean { ... }<br>}<br><br>{ path: ..., canActivateChild: [CanActivateGuard],<br>    children: ... }</code></td>
<td><p>An interface for defining a class that the router should call first to determine if it should activate the child route. Should return a boolean or an Observable/Promise that resolves to a boolean.</p>
<p>用来定义类的接口。路由器会首先调用本接口来决定是否激活一个子路由。应该返回一个 `boolean` 或能解析成 `boolean` 的 `Observable/Promise`。</p>
</td>
</tr><tr>
<td><code>class <b>Resolve</b>Guard implements <b>Resolve</b>&lt;T&gt; {<br>    resolve(<br>      route: ActivatedRouteSnapshot,<br>      state: RouterStateSnapshot<br>    ): Observable&lt;any&gt;|Promise&lt;any&gt;|any { ... }<br>}<br><br>{ path: ..., resolve: [<b>Resolve</b>Guard] }</code></td>
<td><p>An interface for defining a class that the router should call first to resolve route data before rendering the route. Should return a value or an Observable/Promise that resolves to a value.</p>
<p>用来定义类的接口。路由器会在渲染该路由之前，首先调用它来解析路由数据。应该返回一个值或能解析成值的 `Observable/Promise`。</p>
</td>
</tr><tr>
<td><code>class <b>CanLoad</b>Guard implements <b>CanLoad</b> {<br>    canLoad(<br>      route: Route<br>    ): Observable&lt;boolean&gt;|Promise&lt;boolean&gt;|boolean { ... }<br>}<br><br>{ path: ..., canLoad: [<b>CanLoad</b>Guard], loadChildren: ... }</code></td>
<td><p>An interface for defining a class that the router should call first to check if the lazy loaded module should be loaded. Should return a boolean or an Observable/Promise that resolves to a boolean.</p>
<p>用来定义类的接口。路由器会首先调用它来决定是否应该加载一个惰性加载模块。应该返回一个 `boolean` 或能解析成 `boolean` 的 `Observable/Promise`。</p>
</td>
</tr>
</tbody></table>
</div>
