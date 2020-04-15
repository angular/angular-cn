# Sharing modules

# 共享特性模块

Creating shared modules allows you to organize and streamline your code. You can put commonly
used directives, pipes, and components into one module and then import just that module wherever
you need it in other parts of your app.

创建共享模块能让你更好地组织和梳理代码。你可以把常用的指令、管道和组件放进一个模块中，然后在应用中其它需要这些的地方导入该模块。

Consider the following module from an imaginary app:

想象某个应用有下列模块：

```typescript

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerComponent } from './customer.component';
import { NewItemDirective } from './new-item.directive';
import { OrdersPipe } from './orders.pipe';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ CustomerComponent, NewItemDirective, OrdersPipe ],
 exports:      [ CustomerComponent, NewItemDirective, OrdersPipe,
                 CommonModule, FormsModule ]
})
export class SharedModule { }

```

Note the following:

请注意以下几点：

* It imports the `CommonModule` because the module's component needs common directives.

   它导入了 `CommonModule`，因为该模块需要一些常用指令。

* It declares and exports the utility pipe, directive, and component classes.

   它声明并导出了一些工具性的管道、指令和组件类。

* It re-exports the `CommonModule` and `FormsModule`.

   它重新导出了 `CommonModule` 和 `FormsModule`

By re-exporting `CommonModule` and `FormsModule`, any other module that imports this
`SharedModule`, gets access to directives like `NgIf` and `NgFor` from `CommonModule`
and can bind to component properties with `[(ngModel)]`, a directive in the `FormsModule`.

通过重新导出 `CommonModule` 和 `FormsModule`，任何导入了这个 `SharedModule` 的其它模块，就都可以访问来自 `CommonModule` 的 `NgIf` 和 `NgFor` 等指令了，也可以绑定到来自 `FormsModule` 中的 `[(ngModel)]` 的属性了。

Even though the components declared by `SharedModule` might not bind
with `[(ngModel)]` and there may be no need for `SharedModule`
to import `FormsModule`, `SharedModule` can still export
`FormsModule` without listing it among its `imports`. This
way, you can give other modules access to `FormsModule` without
having to import it directly into the `@NgModule` decorator.

即使 `SharedModule` 中声明的组件没有绑定过 `[(ngModel)]`，而且`SharedModule` 也不需要导入 `FormsModule`，`SharedModule` 仍然可以导出 `FormsModule`，而不必把它列在 `imports` 中。
这种方式下，你可以让其它模块也能访问 `FormsModule`，而不用直接在自己的 `@NgModule` 装饰器中导入它。

### Using components vs services from other modules

### 使用来自其它模块的组件和服务

There is an important distinction between using another module's component and
using a service from another module. Import modules when you want to use
directives, pipes, and components. Importing a module with services means that you will have a new instance of that service, which typically is not what you need (typically one wants to reuse an existing service). Use module imports to control service instantiation.

在使用来自其它模块的组件和来自其它模块的服务时，有一个很重要的区别。
当你要使用指令、管道和组件时，导入那些模块就可以了。而导入带有服务的模块意味着你会拥有那个服务的一个新实例，这通常不会是你想要的结果（你通常会想取到现存的服务）。使用模块导入来控制服务的实例化。

The most common way to get a hold of shared services is through Angular
[dependency injection](guide/dependency-injection), rather than through the module system (importing a module will result in a new service instance, which is not a typical usage).

获取共享服务的最常见方式是通过 Angular 的[依赖注入系统](guide/dependency-injection)，而不是模块系统（导入模块将导致创建新的服务实例，那不是典型的用法）。

To read about sharing services, see [Providers](guide/providers).

要进一步了解共享服务，参见[服务提供者](guide/providers)。

<hr />

## More on NgModules

## 关于 NgModule 的更多知识

You may also be interested in the following:

你可能还对下列内容感兴趣：

* [Providers](guide/providers).

   [服务提供者](guide/providers)。

* [Types of Feature Modules](guide/module-types).

   [特性模块的分类](guide/module-types)。
