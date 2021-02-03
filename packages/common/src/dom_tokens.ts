/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {InjectionToken} from '@angular/core';

/**
 * A DI Token representing the main rendering context. In a browser this is the DOM Document.
 *
 * 表示主要渲染上下文的 DI 令牌。在浏览器中，这是 DOM 文档。
 *
 * Note: Document might not be available in the Application Context when Application and Rendering
 * Contexts are not the same (e.g. when running the application in a Web Worker).
 *
 * 注意：当应用程序上下文和渲染上下文不同时（例如，在 Web Worker 中运行应用程序时），document 可能在应用程序上下文中不可用。
 *
 * @publicApi
 */
export const DOCUMENT = new InjectionToken<Document>('DocumentToken');
