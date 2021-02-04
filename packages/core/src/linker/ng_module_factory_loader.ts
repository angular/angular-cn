/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgModuleType} from '../metadata/ng_module_def';
import {NgModuleFactory as R3NgModuleFactory} from '../render3/ng_module_ref';

import {NgModuleFactory} from './ng_module_factory';
import {getRegisteredNgModuleType} from './ng_module_factory_registration';


/**
 * Used to load ng module factories.
 *
 * 用来加载 ng 模块工厂。
 *
 * @publicApi
 * @deprecated the `string` form of `loadChildren` is deprecated, and `NgModuleFactoryLoader` is
 * part of its implementation. See `LoadChildren` for more details.
 *
 * 不建议使用 `loadChildren` 的 `string` 形式，`NgModuleFactoryLoader` 是其实现的一部分。欲知详情，请参见 `LoadChildren`
 *
 */
export abstract class NgModuleFactoryLoader {
  abstract load(path: string): Promise<NgModuleFactory<any>>;
}

export function getModuleFactory__PRE_R3__(id: string): NgModuleFactory<any> {
  const factory = getRegisteredNgModuleType(id) as NgModuleFactory<any>| null;
  if (!factory) throw noModuleError(id);
  return factory;
}

export function getModuleFactory__POST_R3__(id: string): NgModuleFactory<any> {
  const type = getRegisteredNgModuleType(id) as NgModuleType | null;
  if (!type) throw noModuleError(id);
  return new R3NgModuleFactory(type);
}

/**
 * Returns the NgModuleFactory with the given id, if it exists and has been loaded.
 * Factories for modules that do not specify an `id` cannot be retrieved. Throws if the module
 * cannot be found.
 *
 * 返回具有给定 id 的 NgModuleFactory（如果存在并且已加载）。无法检索未指定过 `id` 的模块工厂。如果找不到模块，则抛出该异常。
 *
 * @publicApi
 */
export const getModuleFactory: (id: string) => NgModuleFactory<any> = getModuleFactory__PRE_R3__;

function noModuleError(
    id: string,
    ): Error {
  return new Error(`No module with ID ${id} loaded`);
}
