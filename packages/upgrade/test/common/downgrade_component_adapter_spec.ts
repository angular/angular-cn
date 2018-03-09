/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ApplicationRef, Compiler, Component, ComponentFactory, ComponentRef, Injector, NgModule, Testability, TestabilityRegistry} from '@angular/core';
import {TestBed, getTestBed, inject} from '@angular/core/testing';
import * as angular from '@angular/upgrade/src/common/angular1';
import {DowngradeComponentAdapter, groupNodesBySelector} from '@angular/upgrade/src/common/downgrade_component_adapter';

import {nodes, withEachNg1Version} from './test_helpers';

withEachNg1Version(() => {
  describe('DowngradeComponentAdapter', () => {
    describe('groupNodesBySelector', () => {
      it('should return an array of node collections for each selector', () => {
        const contentNodes = nodes(
            '<div class="x"><span>div-1 content</span></div>' +
            '<input type="number" name="myNum">' +
            '<input type="date" name="myDate">' +
            '<span>span content</span>' +
            '<div class="x"><span>div-2 content</span></div>');

        const selectors = ['input[type=date]', 'span', '.x'];
        const projectableNodes = groupNodesBySelector(selectors, contentNodes);
        expect(projectableNodes[0]).toEqual(nodes('<input type="date" name="myDate">'));
        expect(projectableNodes[1]).toEqual(nodes('<span>span content</span>'));
        expect(projectableNodes[2])
            .toEqual(nodes(
                '<div class="x"><span>div-1 content</span></div>' +
                '<div class="x"><span>div-2 content</span></div>'));
      });

      it('should collect up unmatched nodes for the wildcard selector', () => {
        const contentNodes = nodes(
            '<div class="x"><span>div-1 content</span></div>' +
            '<input type="number" name="myNum">' +
            '<input type="date" name="myDate">' +
            '<span>span content</span>' +
            '<div class="x"><span>div-2 content</span></div>');

        const selectors = ['.x', '*', 'input[type=date]'];
        const projectableNodes = groupNodesBySelector(selectors, contentNodes);

        expect(projectableNodes[0])
            .toEqual(nodes(
                '<div class="x"><span>div-1 content</span></div>' +
                '<div class="x"><span>div-2 content</span></div>'));
        expect(projectableNodes[1])
            .toEqual(nodes(
                '<input type="number" name="myNum">' +
                '<span>span content</span>'));
        expect(projectableNodes[2]).toEqual(nodes('<input type="date" name="myDate">'));
      });

      it('should return an array of empty arrays if there are no nodes passed in', () => {
        const selectors = ['.x', '*', 'input[type=date]'];
        const projectableNodes = groupNodesBySelector(selectors, []);
        expect(projectableNodes).toEqual([[], [], []]);
      });

      it('should return an empty array for each selector that does not match', () => {
        const contentNodes = nodes(
            '<div class="x"><span>div-1 content</span></div>' +
            '<input type="number" name="myNum">' +
            '<input type="date" name="myDate">' +
            '<span>span content</span>' +
            '<div class="x"><span>div-2 content</span></div>');

        const projectableNodes = groupNodesBySelector([], contentNodes);
        expect(projectableNodes).toEqual([]);

        const noMatchSelectorNodes = groupNodesBySelector(['.not-there'], contentNodes);
        expect(noMatchSelectorNodes).toEqual([[]]);
      });
    });

    describe('testability', () => {

      let adapter: DowngradeComponentAdapter;
      let content: string;
      let compiler: Compiler;
      let element: angular.IAugmentedJQuery;

      class mockScope implements angular.IScope {
        $new() { return this; }
        $watch(exp: angular.Ng1Expression, fn?: (a1?: any, a2?: any) => void) {
          return () => {};
        }
        $on(event: string, fn?: (event?: any, ...args: any[]) => void) {
          return () => {};
        }
        $destroy() {
          return () => {};
        }
        $apply(exp?: angular.Ng1Expression) {
          return () => {};
        }
        $digest() {
          return () => {};
        }
        $evalAsync(exp: angular.Ng1Expression, locals?: any) {
          return () => {};
        }
        $$childTail: angular.IScope;
        $$childHead: angular.IScope;
        $$nextSibling: angular.IScope;
        [key: string]: any;
        $id = 'mockScope';
        $parent: angular.IScope;
        $root: angular.IScope;
      }

      function getAdaptor(): DowngradeComponentAdapter {
        let attrs = undefined as any;
        let scope: angular.IScope;  // mock
        let ngModel = undefined as any;
        let parentInjector: Injector;  // testbed
        let $injector = undefined as any;
        let $compile = undefined as any;
        let $parse = undefined as any;
        let componentFactory: ComponentFactory<any>;  // testbed
        let wrapCallback = (cb: any) => cb;

        content = `
          <h1> new component </h1>
          <div> a great component </div>
          <comp></comp>
        `;
        element = angular.element(content);
        scope = new mockScope();

        @Component({
          selector: 'comp',
          template: '',
        })
        class NewComponent {
        }

        @NgModule({
          providers: [{provide: 'hello', useValue: 'component'}],
          declarations: [NewComponent],
          entryComponents: [NewComponent],
        })
        class NewModule {
        }

        const modFactory = compiler.compileModuleSync(NewModule);
        const module = modFactory.create(TestBed);
        componentFactory = module.componentFactoryResolver.resolveComponentFactory(NewComponent) !;
        parentInjector = TestBed;

        return new DowngradeComponentAdapter(
            element, attrs, scope, ngModel, parentInjector, $injector, $compile, $parse,
            componentFactory, wrapCallback);
      }

      beforeEach((inject([Compiler], (inject_compiler: Compiler) => {
        compiler = inject_compiler;
        adapter = getAdaptor();
      })));

      afterEach(() => {
        let registry = TestBed.get(TestabilityRegistry);
        registry.unregisterAllApplications();
      });

      it('should add testabilities hook when creating components', () => {

        let registry = TestBed.get(TestabilityRegistry);
        adapter.createComponent([]);
        expect(registry.getAllTestabilities().length).toEqual(1);

        adapter = getAdaptor();  // get a new adaptor to creat a new component
        adapter.createComponent([]);
        expect(registry.getAllTestabilities().length).toEqual(2);
      });

      it('should remove the testability hook when destroy a component', () => {
        const registry = TestBed.get(TestabilityRegistry);
        expect(registry.getAllTestabilities().length).toEqual(0);
        adapter.createComponent([]);
        expect(registry.getAllTestabilities().length).toEqual(1);
        adapter.registerCleanup();
        element.remove !();
        expect(registry.getAllTestabilities().length).toEqual(0);
      });
    });

  });
});
