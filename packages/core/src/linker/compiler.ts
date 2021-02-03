/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '../di/injectable';
import {InjectionToken} from '../di/injection_token';
import {StaticProvider} from '../di/interface/provider';
import {MissingTranslationStrategy} from '../i18n/tokens';
import {Type} from '../interface/type';
import {ViewEncapsulation} from '../metadata/view';
import {ComponentFactory as ComponentFactoryR3} from '../render3/component_ref';
import {getComponentDef, getNgModuleDef} from '../render3/definition';
import {NgModuleFactory as NgModuleFactoryR3} from '../render3/ng_module_ref';
import {maybeUnwrapFn} from '../render3/util/misc_utils';

import {ComponentFactory} from './component_factory';
import {NgModuleFactory} from './ng_module_factory';



/**
 * Combination of NgModuleFactory and ComponentFactorys.
 *
 * NgModuleFactory 和一些 ComponentFactory 的组合。
 *
 * @publicApi
 */
export class ModuleWithComponentFactories<T> {
  constructor(
      public ngModuleFactory: NgModuleFactory<T>,
      public componentFactories: ComponentFactory<any>[]) {}
}


function _throwError() {
  throw new Error(`Runtime compiler is not loaded`);
}

const Compiler_compileModuleSync__PRE_R3__: <T>(moduleType: Type<T>) => NgModuleFactory<T> =
    _throwError as any;
export const Compiler_compileModuleSync__POST_R3__: <T>(moduleType: Type<T>) =>
    NgModuleFactory<T> = function<T>(moduleType: Type<T>): NgModuleFactory<T> {
  return new NgModuleFactoryR3(moduleType);
};
const Compiler_compileModuleSync = Compiler_compileModuleSync__PRE_R3__;

const Compiler_compileModuleAsync__PRE_R3__: <T>(moduleType: Type<T>) =>
    Promise<NgModuleFactory<T>> = _throwError as any;
export const Compiler_compileModuleAsync__POST_R3__: <T>(moduleType: Type<T>) =>
    Promise<NgModuleFactory<T>> = function<T>(moduleType: Type<T>): Promise<NgModuleFactory<T>> {
  return Promise.resolve(Compiler_compileModuleSync__POST_R3__(moduleType));
};
const Compiler_compileModuleAsync = Compiler_compileModuleAsync__PRE_R3__;

const Compiler_compileModuleAndAllComponentsSync__PRE_R3__: <T>(moduleType: Type<T>) =>
    ModuleWithComponentFactories<T> = _throwError as any;
export const Compiler_compileModuleAndAllComponentsSync__POST_R3__: <T>(moduleType: Type<T>) =>
    ModuleWithComponentFactories<T> = function<T>(moduleType: Type<T>):
        ModuleWithComponentFactories<T> {
  const ngModuleFactory = Compiler_compileModuleSync__POST_R3__(moduleType);
  const moduleDef = getNgModuleDef(moduleType)!;
  const componentFactories =
      maybeUnwrapFn(moduleDef.declarations)
          .reduce((factories: ComponentFactory<any>[], declaration: Type<any>) => {
            const componentDef = getComponentDef(declaration);
            componentDef && factories.push(new ComponentFactoryR3(componentDef));
            return factories;
          }, [] as ComponentFactory<any>[]);
  return new ModuleWithComponentFactories(ngModuleFactory, componentFactories);
};
const Compiler_compileModuleAndAllComponentsSync =
    Compiler_compileModuleAndAllComponentsSync__PRE_R3__;

const Compiler_compileModuleAndAllComponentsAsync__PRE_R3__: <T>(moduleType: Type<T>) =>
    Promise<ModuleWithComponentFactories<T>> = _throwError as any;
export const Compiler_compileModuleAndAllComponentsAsync__POST_R3__: <T>(moduleType: Type<T>) =>
    Promise<ModuleWithComponentFactories<T>> = function<T>(moduleType: Type<T>):
        Promise<ModuleWithComponentFactories<T>> {
  return Promise.resolve(Compiler_compileModuleAndAllComponentsSync__POST_R3__(moduleType));
};
const Compiler_compileModuleAndAllComponentsAsync =
    Compiler_compileModuleAndAllComponentsAsync__PRE_R3__;

/**
 * Low-level service for running the angular compiler during runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * 本底层服务用于供 Angular 编译器在运行期间创建 {@link ComponentFactory}，该工厂以后可用于创建和渲染组件实例。
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 *
 * 每个 `@NgModule` 为其注入器提供一个自己的编译器，它将使用此 NgModule 的指令/管道来编译组件。
 *
 * @publicApi
 */
@Injectable()
export class Compiler {
  /**
   * Compiles the given NgModule and all of its components. All templates of the components listed
   * in `entryComponents` have to be inlined.
   *
   * 编译给定的 NgModule 及其所有组件。必须内联 `entryComponents` 列出的组件的所有模板。
   *
   */
  compileModuleSync: <T>(moduleType: Type<T>) => NgModuleFactory<T> = Compiler_compileModuleSync;

  /**
   * Compiles the given NgModule and all of its components
   *
   * 编译给定的 NgModule 及其所有组件
   *
   */
  compileModuleAsync:
      <T>(moduleType: Type<T>) => Promise<NgModuleFactory<T>> = Compiler_compileModuleAsync;

  /**
   * Same as {@link #compileModuleSync} but also creates ComponentFactories for all components.
   *
   * 与 {@link #compileModuleSync} 相同，但还会为所有组件创建 ComponentFactory。
   *
   */
  compileModuleAndAllComponentsSync: <T>(moduleType: Type<T>) => ModuleWithComponentFactories<T> =
      Compiler_compileModuleAndAllComponentsSync;

  /**
   * Same as {@link #compileModuleAsync} but also creates ComponentFactories for all components.
   *
   * 与 {@link #compileModuleAsync} 相同，但还会为所有组件创建 ComponentFactory。
   *
   */
  compileModuleAndAllComponentsAsync: <T>(moduleType: Type<T>) =>
      Promise<ModuleWithComponentFactories<T>> = Compiler_compileModuleAndAllComponentsAsync;

  /**
   * Clears all caches.
   *
   * 清除所有缓存。
   *
   */
  clearCache(): void {}

  /**
   * Clears the cache for the given component/ngModule.
   *
   * 清除给定组件/ngModule 的缓存。
   *
   */
  clearCacheFor(type: Type<any>) {}

  /**
   * Returns the id for a given NgModule, if one is defined and known to the compiler.
   *
   * 返回给定 NgModule 的 ID（如果已定义且对编译器已知）。
   *
   */
  getModuleId(moduleType: Type<any>): string|undefined {
    return undefined;
  }
}

/**
 * Options for creating a compiler
 *
 * 用于创建编译器的选项
 *
 * @publicApi
 */
export type CompilerOptions = {
  useJit?: boolean,
  defaultEncapsulation?: ViewEncapsulation,
  providers?: StaticProvider[],
  missingTranslation?: MissingTranslationStrategy,
  preserveWhitespaces?: boolean,
};

/**
 * Token to provide CompilerOptions in the platform injector.
 *
 * 在平台注入器中提供 CompilerOptions 的令牌。
 *
 * @publicApi
 */
export const COMPILER_OPTIONS = new InjectionToken<CompilerOptions[]>('compilerOptions');

/**
 * A factory for creating a Compiler
 *
 * 用于创建编译器的工厂
 *
 * @publicApi
 */
export abstract class CompilerFactory {
  abstract createCompiler(options?: CompilerOptions[]): Compiler;
}
