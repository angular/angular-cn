# Missing `@Directive()`/`@Component()` decorator migration

# 缺少 `@Directive()` / `@Component()` 装饰器的迁移

## What does this migration do?

## 这个迁移是做什么的？

This migration adds an empty `@Directive()` decorator to undecorated
base classes that:

此迁移会把一个空的 `@Directive()` 装饰器添加到一些不带装饰器的基类中：

- use Angular features

  使用了 Angular 的特性

- are extended by directives or components

  被指令或组件继承（extend）

For example, in the diff below, a `@Directive()` decorator is added to `BaseMenu` because `BaseMenu` uses dependency injection.

例如，在下面的对比中，把一个 `@Directive()` 装饰器加到了 `BaseMenu` 上是因为 `BaseMenu` 使用了依赖性注入。

  **Before:**

  **之前:**

  ```ts
  export class BaseMenu {
    constructor(private vcr: ViewContainerRef) {}
  }

  @Directive({selector: '[settingsMenu]'})
  export class SettingsMenu extends BaseMenu {}
  ```

  **After:**

  **之后:**

  ```ts
  @Directive()
  export class BaseMenu {
    constructor(private vcr: ViewContainerRef) {}
  }

  @Directive({selector: '[settingsMenu]'})
  export class SettingsMenu extends BaseMenu {}
  ```

In the event that a directive or component is extended by a class without a decorator, the schematic copies any inherited directive or component metadata to the derived class.

如果指令或组件是在没有装饰器的情况下被类扩展的，那么该原理图就会把任何继承来的指令或组件元数据复制到派生类中。

**Before:**

**之前：**

```ts
@Component({
  selector: 'base-menu',
  template: '<div></div>'
})
class BaseMenu {}

export class SettingsMenu extends BaseMenu {}
```

**After:**

**之后：**

```ts
@Component({
  selector: 'base-menu',
  template: '<div></div>'
})
class BaseMenu {}

@Component({
  selector: 'base-menu',
  template: '<div></div>'
})
export class SettingsMenu extends BaseMenu {}
```

This schematic also decorates classes that use Angular field decorators, including:

这个原理图还装饰了使用 Angular 字段装饰器的类，包括：

- `@Input()`
- `@Output()`
- `@HostBinding()`
- `@HostListener()`
- `@ViewChild()` / `@ViewChildren()`
- `@ContentChild()` / `@ContentChildren()`


**Before:**

**之前：**

```ts
class Base {
  @Output()
  countChanged = new EventEmitter<number>();
}

@Directive({
  selector: '[myDir]'
})
class Dir extends Base {
}
```

**After:**

**之后：**

```ts
@Directive() // schematic adds @Directive()
class Base {
  @Output()
  countChanged = new EventEmitter<number>();
}

@Directive({
  selector: '[myDir]'
})
class Dir extends Base {
}
```

## Why is this migration necessary?

## 为何此迁移是必要的？

### Migrating classes that use DI

### 迁移使用了 DI 的类

When a class has a `@Directive()` or `@Component()` decorator, the Angular compiler generates extra code to inject dependencies into the constructor.
When using inheritance, Ivy needs both the parent class and the child class to apply a decorator to generate the correct code.

当一个类有 `@Directive()` 或者 `@Component()` 装饰器时，Angular 编译器会生成一些额外的代码来把这些依赖注入到构造函数中。当使用继承时，Ivy 既要让父类、也要让子类应用装饰器来生成正确的代码。

You can think of this change as two cases: a parent class is missing a
decorator or a child class is missing a decorator.
In both scenarios, Angular's runtime needs additional information from the compiler.
This additional information comes from adding decorators.

你可以把这种变化看作两种情况：父类缺少装饰器，或者子类缺少装饰器。在这两种场景中，Angular 的运行时都需要得到来自编译器的额外信息。这些额外信息来自所添加的装饰器。

#### Decorator missing from parent class

#### 父类缺少了装饰器

When the decorator is missing from the parent class, the subclass will inherit a constructor from a class for which the compiler did not generate special constructor info (because it was not decorated as a directive).
When Angular then tries to create the subclass, it doesn't have the correct info to create it.

当父类中缺少装饰器时，该子类会继承一个构造函数，而这个构造函数并没有为编译器生成特殊的构造函数信息（因为它没有指令装饰器）。当 Angular 尝试创建子类时，它没有正确的信息来创建它。

In View Engine, the compiler has global knowledge, so it can look up the missing data.
However, the Ivy compiler only processes each directive in isolation.
This means that compilation can be faster, but the compiler can't automatically infer the same information as before.
Adding the `@Directive()` explicitly provides this information.

在 View Engine 中，编译器具有全局知识，可以查找丢失的数据。然而，Ivy 编译器只是孤立地处理每个指令。这意味着编译可以更快，但编译器无法自动推断出和以前一样的信息。添加 `@Directive()` 可以明确提供这些信息。

In the future, add `@Directive()` to base classes that do not already have decorators and are extended by directives.

未来，会把 `@Directive()` 添加到那些还没有装饰器而且被指令扩展的基类中。

#### Decorator missing from child class

#### 子类缺少装饰器

When the child class is missing the decorator, the child class inherits from the parent class yet has no decorators of its own.
Without a decorator, the compiler has no way of knowing that the class is a `@Directive` or `@Component`, so it doesn't generate the proper instructions for the directive.

当子类缺少装饰器时，子类继承自父类，但却没有自己的装饰器。如果没有装饰器，编译器就无法知道该类是 `@Directive` 还是 `@Component`，所以它无法为该指令生成正确的代码。

### Migrating classes that use field decorators

### 迁移使用了字段装饰器的类

In ViewEngine, base classes with field decorators like `@Input()` worked even when the class did not have a `@Directive()` or `@Component()` decorator.
For example:

在 ViewEngine 中，包含 `@Input()` 等字段装饰器的基类在组件没有 `@Directive()` 或者 `@Component()` 装饰器时也能正常工作。例如：

```ts
class Base {
  @Input()
  foo: string;
}

@Directive(...)
class Dir extends Base {
  ngOnChanges(): void {
    // notified when bindings to [foo] are updated
  }
}
```

However, this example won't compile with Ivy because the `Base` class _requires_ either a `@Directive()` or `@Component()` decorator to generate code for inputs, outputs, queries, and host bindings.

但是，这个例子无法用 Ivy 编译，因为 `Base` 类*需要*一个 `@Directive()` 或者 `@Component()` 装饰器来为输入、输出、查询和宿主绑定生成代码。

Always requiring a class decorator leads to two main benefits for Angular:

所以始终都需要一个类装饰器，这会给 Angular 带来两大好处：

1. The previous behavior was inconsistent.
   Some Angular features required a decorator (dependency injection), but others did not.
   Now, all Angular features consistently require a class decorator.

   以前的行为是不一致的。一些 Angular 特性需要装饰器（依赖注入），但其它的则不需要。现在，所有的 Angular 特性都需要一个类装饰器。

1. Supporting undecorated classes increases the code size and complexity of Angular.
   Always requiring class decorators allows the framework to become smaller and simpler for all users.

   支持不带装饰器的类会增加 Angular 的代码大小和复杂性。如果总是要求类装饰器，对于所有用户来说框架都会变得更小、更简单。

## What does it mean to have a `@Directive()` decorator with no metadata inside of it?

## `@Directive()` 装饰器里面没有元数据是怎么回事？

The presence of the `@Directive` decorator causes Angular to generate extra code for the affected class.
If that decorator includes no properties (metadata), the directive won't be matched to elements or instantiated directly, but other classes that _extend_ the directive class will inherit this generated code.
You can think of this as an "abstract" directive.

`@Directive` 装饰器的出现让 Angular 为受其影响的类生成了额外的代码。如果该装饰器不包含任何属性（元数据），该指令就不会与任何元素匹配或者被直接实例化，但*扩展*该指令类的其它类也会继承这些生成的代码。你可以把它看作一个“抽象”的指令。

Adding an abstract directive to an `NgModule` will cause an error.
A directive must have a `selector` property defined in order to match some element in a template.

把一个抽象指令添加到 `NgModule` 中会导致错误。非抽象指令必须定义一个 `selector` 属性，才能匹配模板中的某些元素。

## When do I need a `@Directive()` decorator without a selector?

## 我什么时候需要一个没有选择器的 `@Directive()` 装饰器？

If you're using dependency injection, or any Angular-specific feature, such as `@HostBinding()`, `@ViewChild()`, or `@Input()`, you need a `@Directive()` or `@Component()` decorator.
The decorator lets the compiler know to generate the correct instructions to create that class and any classes that extend it.
If you don't want to use that base class as a directive directly, leave the selector blank.
If you do want it to be usable independently, fill in the metadata as usual.

如果你正在使用依赖注入或任何 Angular 特有的特性，比如 `@HostBinding()`，`@ViewChild()` 或者 `@Input()`，你就需要一个 `@Directive()` 或者 `@Component()` 装饰器。装饰器能让编译器知道如何生成正确的指令来创建该类以及那些扩展了它的类。如果你不想直接把那个基类用作指令，那就不写这个选择器。如果你确实希望它可以独立使用，那就像往常一样填写元数据。

Classes that don't use Angular features don't need an Angular decorator.

那些没有使用 Angular 特性的类不需要 Angular 装饰器。

## I'm a library author. Should I add the `@Directive()` decorator to base classes?

## 我是库作者。我应该把 `@Directive()` 装饰器添加到基类中吗？

As support for selectorless decorators is introduced in Angular version 9, if you want to support Angular version 8 and earlier, you shouldn't add a selectorless `@Directive()` decorator.
You can either add `@Directive()` with a selector or move the Angular-specific features to affected subclasses.

由于 Angular 9 中引入了对无选择器装饰器的支持，如果你想支持 Angular 8 及更早版本，就不应该添加一个无选择器的 `@Directive()` 装饰器。你可以添加带选择器的 `@Directive()`，或者把 Angular 特有的特性移动到受影响的子类中。

## What about applications using non-migrated libraries?

## 那些使用未迁移库的应用呢？

The [Angular compatibility compiler](guide/glossary#ngcc) (`ngcc`) should automatically transform any non-migrated libraries to generate the proper code.

[Angular 兼容性编译器](guide/glossary#ngcc) （ `ngcc` ）应该会自动转换所有未迁移的库来生成合适的代码。
