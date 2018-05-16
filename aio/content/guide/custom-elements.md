# Elements

# 自定义元素（Elements）

## Release Status

## 发布状态

**Angular Labs Project** - experimental and unstable. **Breaking Changes Possible** 

**Angular 实验室项目** - 试验性的、非稳定的。**可能会发生破坏性变更** 

Targeted to land in the [6.x release cycle](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md) of Angular - subject to change

预计会包含在 Angular 的 [6.x 发布周期内](https://github.com/angular/angular/blob/master/docs/RELEASE_SCHEDULE.md) —— 也可能会改。

## Overview

## 概览

Elements provides an API that allows developers to register Angular Components as Custom Elements 
("Web Components"), and bridges the built-in DOM API to Angular's component interface and change 
detection APIs.

Angular 元素提供了一种 API，它允许开发者把 Angular 组件注册为自定义元素（Web Components），并且在内置的 DOM API 和 Angular 的组件接口与变更检测 API 之间建立一个桥梁。

```ts

//hello-world.ts
import { Component, Input, NgModule } from '@angular/core';

@Component({
  selector: 'hello-world',
  template: `<h1>Hello {{name}}</h1>`
})
export class HelloWorld {
  @Input() name: string = 'World!';
}

@NgModule({
  declarations: [ HelloWorld ],
  entryComponents: [ HelloWorld ]
})
export class HelloWorldModule {}

```

```ts

//app.component.ts
import { Component, NgModuleRef } from '@angular/core';
import { createNgElementConstructor } from '@angular/elements';

import { HelloWorld } from './hello-world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(injector: Injector) {
    const NgElementConstructor = createNgElementConstructor(HelloWorld, {injector});
    customElements.register('hello-world', NgElementConstructor);
  }
}

```

Once registered, these components can be used just like built-in HTML elements, because they *are* 
HTML Elements!

一旦注册，这些组件就可以像内置的 HTML 元素一样使用了，因为它们**就是** HTML 元素！

They can be used in any HTML page:

它们可以用在任何 HTML 页面中：

```html

<hello-world name="Angular"></hello-world>
<hello-world name="Typescript"></hello-world>

```

Custom Elements are "self-bootstrapping" - they are automatically started when they are added to the 
DOM, and automatically destroyed when removed from the DOM.

这些自定义元素是"自举"的 —— 当把它们添加到 DOM 中时，它们会自动启动；当从 DOM 中移除时，也会自动销毁。
