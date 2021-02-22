/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


/**
 * A schema definition associated with an NgModule.
 *
 * 与 NgModule 关联的架构定义。
 *
 * @see `@NgModule`, `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`
 *
 * @param name The name of a defined schema.
 *
 * 定义的架构的名称。
 *
 * @publicApi
 */
export interface SchemaMetadata {
  name: string;
}

/**
 * Defines a schema that allows an NgModule to contain the following:
 *
 * 定义一个架构，该架构允许 NgModule 包含以下内容：
 *
 * - Non-Angular elements named with dash case (`-`).
 *
 *   使用（`-`）命名法的非 Angular 元素。
 *
 * - Element properties named with dash case (`-`).
 * Dash case is the naming convention for custom elements.
 *
 *     使用（`-`）命名的元素属性。中线命名法是自定义元素的命名约定。
 *
 * @publicApi
 */
export const CUSTOM_ELEMENTS_SCHEMA: SchemaMetadata = {
  name: 'custom-elements'
};

/**
 * Defines a schema that allows any property on any element.
 *
 * 定义一个架构，该架构允许任何元素上的任何属性。
 *
 * @publicApi
 */
export const NO_ERRORS_SCHEMA: SchemaMetadata = {
  name: 'no-errors-schema'
};
