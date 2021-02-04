/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ComponentFactoryResolver, ComponentRef, Directive, Injector, Input, NgModuleFactory, NgModuleRef, OnChanges, OnDestroy, SimpleChanges, StaticProvider, Type, ViewContainerRef} from '@angular/core';


/**
 * Instantiates a single {@link Component} type and inserts its Host View into current View.
 * `NgComponentOutlet` provides a declarative approach for dynamic component creation.
 *
 * 实例化单个 {@link Component} 类型，并将其宿主视图插入当前视图。`NgComponentOutlet` 为动态组件创建提供了一种声明式方法。
 *
 * `NgComponentOutlet` requires a component type, if a falsy value is set the view will clear and
 * any existing component will get destroyed.
 *
 * `NgComponentOutlet` 所需的组件类型，如果设置为假值，则视图将被清除并且任何现有组件将被销毁。
 *
 * @usageNotes
 *
 * ### Fine tune control
 *
 * ### 微调控制
 *
 * You can control the component creation process by using the following optional attributes:
 *
 * 你可以使用以下可选属性来控制组件的创建过程：
 *
 * * `ngComponentOutletInjector`: Optional custom {@link Injector} that will be used as parent for
 * the Component. Defaults to the injector of the current view container.
 *
 *     `ngComponentOutletInjector`：可选的自定义 {@link Injector}，将用作此组件的父级。默认为当前视图容器的注入器。
 *
 * * `ngComponentOutletContent`: Optional list of projectable nodes to insert into the content
 * section of the component, if exists.
 *
 *     `ngComponentOutletContent`：要插入到组件内容部分的可投影节点的可选列表（如果存在）。
 *
 * * `ngComponentOutletNgModuleFactory`: Optional module factory to allow dynamically loading other
 * module, then load a component from that module.
 *
 *     `ngComponentOutletNgModuleFactory`：可选模块工厂，允许动态加载其他模块，然后从该模块加载组件。
 *
 * ### Syntax
 *
 * ### 语法
 *
 * Simple
 *
 * 简单
 *
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression"></ng-container>
 * ```
 *
 * Customized injector/content
 *
 * 定制的注入器/内容
 *
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   injector: injectorExpression;
 *                                   content: contentNodesExpression;">
 * </ng-container>
 * ```
 *
 * Customized ngModuleFactory
 *
 * 定制的 ngModuleFactory
 *
 * ```
 * <ng-container *ngComponentOutlet="componentTypeExpression;
 *                                   ngModuleFactory: moduleFactory;">
 * </ng-container>
 * ```
 *
 * ### A simple example
 *
 * ### 一个简单的例子
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='SimpleExample'}
 *
 * A more complete example with additional options:
 *
 * {@example common/ngComponentOutlet/ts/module.ts region='CompleteExample'}
 *
 * @publicApi
 * @ngModule CommonModule
 */
@Directive({selector: '[ngComponentOutlet]'})
export class NgComponentOutlet implements OnChanges, OnDestroy {
  // TODO(issue/24571): remove '!'.
  @Input() ngComponentOutlet!: Type<any>;
  // TODO(issue/24571): remove '!'.
  @Input() ngComponentOutletInjector!: Injector;
  // TODO(issue/24571): remove '!'.
  @Input() ngComponentOutletContent!: any[][];
  // TODO(issue/24571): remove '!'.
  @Input() ngComponentOutletNgModuleFactory!: NgModuleFactory<any>;

  private _componentRef: ComponentRef<any>|null = null;
  private _moduleRef: NgModuleRef<any>|null = null;

  constructor(private _viewContainerRef: ViewContainerRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this._viewContainerRef.clear();
    this._componentRef = null;

    if (this.ngComponentOutlet) {
      const elInjector = this.ngComponentOutletInjector || this._viewContainerRef.parentInjector;

      if (changes['ngComponentOutletNgModuleFactory']) {
        if (this._moduleRef) this._moduleRef.destroy();

        if (this.ngComponentOutletNgModuleFactory) {
          const parentModule = elInjector.get(NgModuleRef);
          this._moduleRef = this.ngComponentOutletNgModuleFactory.create(parentModule.injector);
        } else {
          this._moduleRef = null;
        }
      }

      const componentFactoryResolver = this._moduleRef ? this._moduleRef.componentFactoryResolver :
                                                         elInjector.get(ComponentFactoryResolver);

      const componentFactory =
          componentFactoryResolver.resolveComponentFactory(this.ngComponentOutlet);

      this._componentRef = this._viewContainerRef.createComponent(
          componentFactory, this._viewContainerRef.length, elInjector,
          this.ngComponentOutletContent);
    }
  }

  ngOnDestroy() {
    if (this._moduleRef) this._moduleRef.destroy();
  }
}
