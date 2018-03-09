/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {TestBed} from '@angular/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

TestBed.initTestEnvironment(
    [BrowserDynamicTestingModule, NoopAnimationsModule], platformBrowserDynamicTesting());

(window as any).isNode = false;
(window as any).isBrowser = true;
(window as any).global = window;