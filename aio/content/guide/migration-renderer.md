# `Renderer` to `Renderer2` migration

# `Renderer` 到 `Renderer2` 的迁移

## Migration Overview

## 迁移概述

The `Renderer` class has been marked as deprecated since Angular version 4.
This section provides guidance on migrating from this deprecated API to the newer `Renderer2` API and what it means for your app.

自 Angular 版本 4 开始，`Renderer` 类就被标记为已弃用。本节提供了一些指导，帮助你把这个已弃用的 API 迁移到更新的 `Renderer2` API，并解释了它对你的应用而言意味着什么。

## Why should I migrate to Renderer2?

## 为什么要迁移到 Renderer2？

The deprecated `Renderer` class has been removed in version 9 of Angular, so it's necessary to migrate to a supported API.
Using `Renderer2` is the recommended strategy because it supports a similar set of functionality to `Renderer`.
The API surface is quite large (with 19 methods), but the schematic should simplify this process for your applications.

已弃用的 `Renderer` 类已经在 Angular 的 9 中删除了，所以有必要迁移到支持的 API。建议使用 `Renderer2` 策略，因为它支持与 `Renderer` 很相似的一组功能。这个 API 非常庞大（有 19 种方法），但原理图会帮你简化这个过程。

## Is there action required on my end?

## 完成后我还要采取什么行动吗？

No.
The schematic should handle most cases with the exception of `Renderer.animate()` and `Renderer.setDebugInfo()`, which already aren't supported.

这个原理图应该可以处理大多数情况，仅仅不支持 `Renderer.animate()` 和 `Renderer.setDebugInfo()`。

## What are the `__ngRendererX` methods? Why are they necessary?

## 什么是 `__ngRendererX` 方法族？为什么要用它们？

Some methods either don't have exact equivalents in `Renderer2`, or they correspond to more than one expression.
For example, both renderers have a `createElement()` method, but they're not equal because a call such as `renderer.createElement(parentNode, namespaceAndName)` in the `Renderer` corresponds to the following block of code in `Renderer2`:

有些方法在 `Renderer2` 没有完全等价的东西，或者对应于多个表达式。例如，这两种渲染器都有 `createElement()` 的方法，但它们是不相等的，比如在 `Renderer` 中调用 `renderer.createElement(parentNode, namespaceAndName)` 时对应 `Renderer2` 中的如下代码块 ：

```ts
const [namespace, name] = splitNamespace(namespaceAndName);
const el = renderer.createElement(name, namespace);
if (parentNode) {
  renderer.appendChild(parentNode, el);
}
return el;
```

Migration has to guarantee that the return values of functions and types of variables stay the same.
To handle the majority of cases safely, the schematic declares helper functions at the bottom of the user's file.
These helpers encapsulate your own logic and keep the replacements inside your code down to a single function call.
Here's an example of how the `createElement()` migration looks:

迁移必须保证函数和变量类型的返回值不变。此原理图会安全地处理大多数情况，它会在用户文件的底部声明一些辅助函数。这些辅助函数封装了你自己的逻辑，把代码中要被替换的内容放到单个函数调用中。这里是 `createElement()` 迁移工作原理的一个例子：

**Before:**

**之前：**

```ts
public createAndAppendElement() {
  const el = this.renderer.createElement('span');
  el.textContent = 'hello world';
  return el;
}
```

**After:**

**之后：**

<code-example>

public createAndAppendElement() {
  const el = __ngRendererCreateElement(this.renderer, this.element, 'span');
  el.textContent = 'hello world';
  return el;
}
// Generated code at the bottom of the file
__ngRendererCreateElement(renderer: any, parentNode: any, nameAndNamespace: any) {
  const [namespace, name] = __ngRendererSplitNamespace(namespaceAndName);
  const el = renderer.createElement(name, namespace);
  if (parentNode) {
    renderer.appendChild(parentNode, el);
  }
  return el;
}
__ngRendererSplitNamespace(nameAndNamespace: any) {
  // returns the split name and namespace
}

</code-example>

When implementing these helper functions, the schematic ensures that they're only declared once per file and that their names are unique enough that there's a small chance of colliding with pre-existing functions in your code. The schematic also keeps their parameter types as `any` so that it doesn't have to insert extra logic that ensures that their values have the correct type.

当实现了这些辅助函数时，此原理图会确保它们在每个文件中都只声明一次，并且它们的名字是唯一的，因此和你的代码中已经存在的函数几乎不可能冲突。该原理图还会把它们的参数类型设为 `any`， 使其不必插入额外的逻辑就能确保它们的值有正确的类型。

### I’m a library author. Should I run this migration?

### 我是库作者。我应该运行这次迁移吗？

**Library authors should definitely use this migration to move away from the `Renderer`. Otherwise, the libraries won't work with applications built with version 9.**

**库的作者肯定要做这种迁移来远离 `Renderer`。否则，这些库将不再适用于用 Angular 9 构建的应用。**

### Full list of method migrations

### 方法迁移的完整列表

The following table shows all methods that the migration maps from `Renderer` to `Renderer2`.

下表列出了从 `Renderer` 到 `Renderer2` 要迁移的所有方法。

|Renderer|Renderer2|
|---|---|
|`listen(renderElement, name, callback)`|`listen(renderElement, name, callback)`|
|`setElementProperty(renderElement, propertyName, propertyValue)`|`setProperty(renderElement, propertyName, propertyValue)`|
|`setText(renderNode, text)`|`setValue(renderNode, text)`|
|`listenGlobal(target, name, callback)`|`listen(target, name, callback)`|
|`selectRootElement(selectorOrNode, debugInfo?)`|`selectRootElement(selectorOrNode)`|
|`createElement(parentElement, name, debugInfo?)`|`appendChild(parentElement, createElement(name))`|
|`setElementStyle(el, style, value?)`|`value == null ? removeStyle(el, style) : setStyle(el, style, value)`
|`setElementAttribute(el, name, value?)`|`attributeValue == null ? removeAttribute(el, name) : setAttribute(el, name, value)`
|`createText(parentElement, value, debugInfo?)`|`appendChild(parentElement, createText(value))`|
|`createTemplateAnchor(parentElement)`|`appendChild(parentElement, createComment(''))`|
|`setElementClass(renderElement, className, isAdd)`|`isAdd ? addClass(renderElement, className) : removeClass(renderElement, className)`|
|`projectNodes(parentElement, nodes)`|`for (let i = 0; i < nodes.length; i++) { appendChild(parentElement, nodes[i]); }`|
|`attachViewAfter(node, viewRootNodes)`|`const parentElement = parentNode(node); const nextSibling = nextSibling(node); for (let i = 0; i < viewRootNodes.length; i++) { insertBefore(parentElement, viewRootNodes[i], nextSibling);}`|
|`detachView(viewRootNodes)`|`for (let i = 0; i < viewRootNodes.length; i++) {const node = viewRootNodes[i]; const parentElement = parentNode(node); removeChild(parentElement, node);}`|
|`destroyView(hostElement, viewAllNodes)`|`for (let i = 0; i < viewAllNodes.length; i++) { destroyNode(viewAllNodes[i]); }`|
|`setBindingDebugInfo()`|This function is a noop in `Renderer2`.|
|`setBindingDebugInfo()`|该函数在 `Renderer2` 中无用。|
|`createViewRoot(hostElement)`|Should be replaced with a reference to `hostElement`|
|`createViewRoot(hostElement)`|应该替换成到 `hostElement` 的引用|
|`invokeElementMethod(renderElement, methodName, args?)`|`(renderElement as any)[methodName].apply(renderElement, args);`|
|`animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers?)`|Throws an error (same behavior as `Renderer.animate()`)|
|`animate(element, startingStyles, keyframes, duration, delay, easing, previousPlayers?)`|抛出一个错误 (和 `Renderer.animate()` 一样)|

