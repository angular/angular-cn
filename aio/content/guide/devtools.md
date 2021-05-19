# DevTools Overview

# DevTools 概述

Angular DevTools is a Chrome extension that provides debugging and profiling capabilities for Angular applications. Angular DevTools supports Angular v9 and above, with Ivy enabled.

Angular DevTools 是一个 Chrome 扩展程序，可为 Angular 应用程序提供调试和剖析功能。 Angular DevTools 支持 Angular v9 及更高版本，并支持 Ivy。

You can find Angular DevTools in the [Chrome Web Store](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh).

你可以在 [Chrome 网上应用店](https://chrome.google.com/webstore/detail/angular-developer-tools/ienfalfjdbdpebioblfackkekamfmbnh)中找到 Angular DevTools。

After installing Angular DevTools, you can find the extension under the Angular tab in Chrome DevTools.

安装 Angular DevTools 后，你可以在 Chrome DevTools 的 Angular 标签下找到本扩展程序。

<div class="lightbox">
  <img src="generated/images/guide/devtools/devtools.png" alt="devtools">
</div>

When you open the extension, you'll see two additional tabs:

打开扩展程序时，你还会看到另外两个选项卡：

- [Components](#components) - lets you explore the components and directives in your application and preview or edit their state.

  [Components](#components) - 使你可以浏览应用程序中的组件和指令，并预览或编辑它们的状态。

- [Profiler](#profiler) - lets you profile your application and understand what the performance bottleneck is during change detection execution.

  [Profiler](#profiler) - 使你可以剖析应用程序并了解变更检测执行期间的性能瓶颈。

<div class="lightbox">
  <img src="generated/images/guide/devtools/devtools-tabs.png" alt="devtools tabs">
</div>

In the top-right corner of Angular DevTools you'll find which version of Angular is running on the page as well as the latest commit hash for the extension.

在 Angular DevTools 的右上角，你将找到页面上正在运行哪个版本的 Angular 以及该扩展的最后一次提交的哈希串。

## Bug reports

## 错误报告

You can report issues and feature requests on [GitHub](https://github.com/rangle/angular-devtools/issues).

你可以在 [GitHub](https://github.com/rangle/angular-devtools/issues) 上报告问题和特性请求。

To report an issue with the Profiler, export the Profiler recording by clicking the **Save Profile** button, and then attaching that export as a file in the issue.

要报告 Profiler 的问题，请通过单击 **Save Profile（保存配置文件）** 按钮导出 Profiler 记录，然后将该导出内容作为该问题的附件。

> Make sure that the Profiler recording does not contain any confidential information.
>
> 请确保 Profiler 记录中不包含任何机密信息。
>

{@a components}

## Debug your application

## 调试你的应用程序

The **Components** tab lets you explore the structure of your application. You can visualize and inspect the component and directive instances and preview or modify their state. In the next couple of sections we'll look into how you can use this tab effectively to debug your application.

**Components** 选项卡使你可以浏览应用程序的结构。你可以可视化并检查组件和指令实例，并预览或修改它们的状态。在接下来的两节中，我们将研究如何有效使用此选项卡来调试应用程序。

### Explore the application structure

### 浏览应用程序的结构

<div class="lightbox">
  <img src="generated/images/guide/devtools/component-explorer.png" alt="component-explorer">
</div>

In the preceding screenshot, you can see the component tree of an application.

在前面的屏幕截图中，你可以看到应用程序的组件树。

The component tree displays a hierarchical relationship of the *components and directives* within your application. When you select a component or a directive instance, Angular DevTools presents additional information about that instance.

组件树显示应用程序中*组件和指令*之间的层次关系。选择组件或指令实例时，Angular DevTools 会提供有关该实例的其他信息。

### View properties

### 查看属性

Click the individual components or directives in the component explorer to select them and preview their properties. Angular DevTools displays their properties and metadata on the right-hand side of the component tree.

单击组件浏览器中的各个组件或指令，以选择它们并预览其属性。 Angular DevTools 在组件树的右侧显示其属性和元数据。

You can navigate in the component tree using the mouse or the following keyboard shortcuts:

你可以使用鼠标或下列键盘快捷键在组件树中导航：

- Up and down arrows select the previous and next nodes.

  用上下箭头键选择上一个或下一个节点。

- Left and right arrows collapse and expand a node.

  用左右箭头键折叠或展开一个节点。

To look up a component or directive by name use the search box above the component tree. To navigate to the next search match, press `Enter`. To navigate to the previous search match, press `Shift + Enter`.

要通过名称查找组件或指令，请使用组件树上方的搜索框。要导航至下一个搜索匹配项，请按 `Enter`。要导航至上一个搜索匹配项，请按 `Shift + Enter` 。

<div class="lightbox">
  <img src="generated/images/guide/devtools/search.png" alt="search">
</div>

### Navigate to the host node

### 导航到宿主节点

To go to the host element of a particular component or directive, find it in the component explorer and double-click it. Chrome DevTools opens the Elements tab and selects the associated DOM node.

要转到特定组件或指令的宿主元素，请在组件浏览器中找到它，然后双击它。 Chrome DevTools 将打开 “Elements” 选项卡，然后选择关联的 DOM 节点。

### Navigate to source

### 导航到源码

For components, Angular DevTools also lets you navigate to the component definition in the source tab. After you select a particular component, click the icon at the top-right of the properties view:

对于组件，Angular DevTools 还允许你导航到源码选项卡中的组件定义。选择特定组件后，单击属性视图右上角的图标：

<div class="lightbox">
  <img src="generated/images/guide/devtools/navigate-source.png" alt="navigate source">
</div>

### Update property value

### 修改属性值

Like Chrome DevTools, the properties view allows you to edit the value of an input, output, or another property. Right-click on the property value. If edit functionality is available for this value type, you'll see a text input. Type the new value and press `Enter`.

与 Chrome DevTools 一样，属性视图可让你编辑输入属性、输出属性或其他属性的值。右键单击属性值。如果此值类型可使用编辑功能，则将看到一个文本输入框。键入新值，然后按 Enter 键。

<div class="lightbox">
  <img src="generated/images/guide/devtools/update-property.png" alt="update property">
</div>

### Access selected component or directive in console

### 在控制台中访问选定的组件或指令

As a shortcut in the console, Angular DevTools provides you access to instances of the recently selected components or directives. Type `$ng0` to get a reference to the instance of the currently selected component or directive, and type `$ng1` for the previously selected instance.

作为控制台中的快捷方式，Angular DevTools 可以让你访问最近选择的组件或指令的实例。键入 `$ng0` 以获取对当前所选组件或指令的实例的引用，键入 `$ng1` 来获取前一个选择的实例。

<div class="lightbox">
  <img src="generated/images/guide/devtools/access-console.png" alt="access console">
</div>

### Select a directive or component

### 选择指令或组件

Similar to Chrome DevTools, you can inspect the page to select a particular component or directive. Click the ***Inspect element*** icon at the top left corner within Devtools and hover over a DOM element on the page. Angular DevTools recognizes the associated directives and/or components and lets you select the corresponding element in the Component tree.

与 Chrome DevTools 相似，你可以检查页面以选择特定的组件或指令。单击Devtools 中左上角的 ***Inspect element（审查元素）***图标，然后将鼠标悬停在页面上的 DOM 元素上。 Angular DevTools 可以识别关联的指令和/或组件，并允许你在组件树中选择相应的元素。

<div class="lightbox">
  <img src="generated/images/guide/devtools/inspect-element.png" alt="selecting dom node">
</div>

{@a profiler}

## Profile your application

## 剖析你的应用程序

The **Profiler** tab lets you preview the execution of Angular's change detection.

**Profiler** 选项卡使你可以预览 Angular 变更检测的执行。

<div class="lightbox">
  <img src="generated/images/guide/devtools/profiler.png" alt="profiler">
</div>

The Profiler lets you start profiling or import an existing profile. To start profiling your application, hover over the circle at the top-left corner within the **Profiler** tab and click **Start recording**.

通过 Profiler，你可以开始进行剖析或导入现有的剖析记录文件。要开始对应用程序进行性能剖析，请将鼠标悬停在 **Profiler** 选项卡内左上角的圆圈上，然后点击 **Start recording**。

During profiling, Angular DevTools captures execution events, such as change detection and lifecycle hook execution. To finish recording, click the circle again to **Stop recording**.

在剖析过程中，Angular DevTools 会捕获执行过的事件，例如变更检测和生命周期挂钩。要完成录制，请再次单击那个圆圈以 **Stop recording**。

You can also import an existing recording. Read more about this feature in the [Import recording](#) section.

你也可以导入现有剖析记录。在[导入记录](#)部分了解有关此功能的更多信息。

### Understand your application's execution

### 了解应用程序的执行过程

In the following screenshot, you can find the default view of the Profiler after you complete recording.

在下面的屏幕截图中，你可以在完成录制后找到 Profiler 的默认视图。

<div class="lightbox">
  <img src="generated/images/guide/devtools/default-profiler-view.png" alt="default profiler view">
</div>

Near the top of the view you can see a sequence of bars, each one of them symbolizing change detection cycles in your app. The taller a bar is, the longer your application has spent in this cycle. When you select a bar, DevTools renders a bar chart with all the components and directives that it captured during this cycle.

在此视图的顶部附近，你可以看到一系列条形图，每个条形图表示应用程序中的变更检测周期。竖线越高，应用程序在此周期中花费的时间越长。选择条形图时，DevTools 会渲染一个条形图，其中包含在此循环中捕获的所有组件和指令。

<div class="lightbox">
  <img src="generated/images/guide/devtools/profiler-selected-bar.png" alt="profiler selected bar">
</div>

Above the change detection timeline, you can find how much time Angular spent in this cycle. Angular DevTools attempts to estimate the frame drop at this point to indicate when the execution of your application might impact the user experience.

在变更检测时间轴上方，你可以发现 Angular 在此周期中花费了多少时间。 Angular DevTools 会试图估算出掉帧情况，以指示应用程序的执行何时可能会影响用户体验。

Angular DevTools also indicates what triggered the change detection (that is, the change detection's source).

Angular DevTools 还会指出触发这次变更检测的原因（即变更检测的来源）。

### Understand component execution

### 了解组件的执行过程

When you click on a bar, you'll find a detailed view about how much time your application spent in the particular directive or component:

单击条形图时，你会发现有关应用程序在特定指令或组件上花费了多少时间的详细视图：

<div class="lightbox">
  <img src="generated/images/guide/devtools/directive-details.png" alt="directive details">
</div>

Figure shows the total time spent by NgforOf directive and which method was called in it. It also shows the parent hierarchy of the directive selected.

这张图展示了 NgForOf 指令花费的总时间，以及其中调用了哪个方法。它还展示了所选指令的父级层次。

### Hierarchical views

### 分层视图

<div class="lightbox">
  <img src="generated/images/guide/devtools/flame-graph-view.png" alt="flame graph view">
</div>

You can also preview the change detection execution in a flame graph-like view. Each tile in the graph represents an element on the screen at a specific position in the render tree.

你也可以在类似火焰图的视图中预览变更检测的执行情况。该图形中的每个图块代表屏幕上渲染树中位于特定位置的元素。

For example, if during one change detection cycle at a specific position in the component tree we had `ComponentA`, this component was removed and in its place Angular rendered `ComponentB`, you'll see both components at the same tile.

例如，如果在组件树中特定位置的一个变更检测周期中，我们原本有一个 `ComponentA`，然后该组件被删除，而在它的位置上，Angular 再渲染出 `ComponentB`，这样你就会在同一图块上看到两个组件。

Each tile is colored depending on how much time Angular has spent there. DevTools determines the intensity of the color by the time spent relative to the tile where we've spent the most time in change detection.

每个图块的颜色取决于 Angular 在这里花费了多少时间。 DevTools 通过相对于我们花费最多时间进行变更检测的图块所花费的时间来确定颜色的深浅。

When you click on a certain tile, you'll see details about it in the panel on the right. Double-clicking the tile zooms it in so you can preview the nested children.

单击某个图块时，你会在右侧面板中看到关于该图块的详细信息。双击图块将其放大，以便你可以预览嵌套的子级图块。

### Debug OnPush

### 调试 OnPush

To preview the components in which Angular did change detection, select the **Change detection** checkbox at the top, above the flame graph.

要预览 Angular 进行变更检测的组件，请选择火焰图上方顶部的 **Change detection** 复选框。

This view will color all the tiles in which Angular performed change detection in green, and the rest in gray:

此视图将把所有在 Angular 中执行过变更检测的图块显示为绿色，其余显示为灰色：

<div class="lightbox">
  <img src="generated/images/guide/devtools/debugging-onpush.png" alt="debugging onpush">
</div>

### Import recording

### 导入剖析记录

Click the **Save Profile** button at the top-left of a recorded profiling session to export it as a JSON file and save it to the disk. Then, you can import the file in the initial view of the profiler by clicking the **Choose file** input:

单击已记录的性能剖析会话左上角的 **Save Profile** 按钮，以将其导出为 JSON 文件并将其保存到磁盘。然后，你可以通过单击 **Choose file** 输入框来将此文件导入到剖析器的初始视图中：

<div class="lightbox">
  <img src="generated/images/guide/devtools/save-profile.png" alt="save profile">
</div>
