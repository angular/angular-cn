/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
* Wraps a function in a new function which sets up document and HTML for running a test.
*
* This function is intended to wrap an existing testing function. The wrapper
* adds HTML to the `body` element of the `document` and subsequently tears it down.
*
* This function is intended to be used with `async await` and `Promise`s. If the wrapped
* function returns a promise (or is `async`) then the teardown is delayed until that `Promise`
* is resolved.
*
* On `node` this function detects if `document` is present and if not it will create one by
* loading `domino` and installing it.
*
* Example:
*
* ```
* describe('something', () => {
*   it('should do something', withBody('<my-app></my-app>', async () => {
*     const myApp = renderComponent(MyApp);
*     await whenRendered(myApp);
*     expect(getRenderedText(myApp)).toEqual('Hello World!');
*   }));
* });
* ```
*
* @param html HTML which should be inserted into `body` of the `document`.
* @param blockFn function to wrap. The function can return promise or be `async`.
* @experimental
*/
export function withBody<T>(html: string, blockFn: T): T {
  return function(done: {(): void, fail(): void}) {
    ensureDocument();
    let returnValue: any = undefined;
    if (typeof blockFn === 'function') {
      document.body.innerHTML = html;
      let blockReturn = blockFn();
      if (blockReturn instanceof Promise) {
        blockReturn = blockReturn.then(done, done.fail);
      } else {
        done();
      }
    }
  } as any;
}

let savedDocument: Document|undefined = undefined;
let savedRequestAnimationFrame: ((callback: FrameRequestCallback) => number)|undefined = undefined;
let requestAnimationFrameCount = 0;

/**
 * System.js uses regexp to look for `require` statements. `domino` has to be
 * extracted into a constant so that the regexp in the System.js does not match
 * and does not try to load domino in the browser.
 */
const domino: any = (function(domino) {
  if (typeof global == 'object' && global.process && typeof require == 'function') {
    try {
      return require(domino);
    } catch (e) {
      // It is possible that we don't have domino available in which case just give up.
    }
  }
  // Seems like we don't have domino, give up.
  return null;
})('domino');

/**
 * Ensure that global has `Document` if we are in node.js
 * @experimental
 */
export function ensureDocument(): void {
  if (domino) {
    // we are in node.js.
    const window = domino.createWindow('', 'http://localhost');
    savedDocument = (global as any).document;
    (global as any).document = window.document;
    // Trick to avoid Event patching from
    // https://github.com/angular/angular/blob/7cf5e95ac9f0f2648beebf0d5bd9056b79946970/packages/platform-browser/src/dom/events/dom_events.ts#L112-L132
    // It fails with Domino with TypeError: Cannot assign to read only property
    // 'stopImmediatePropagation' of object '#<Event>'
    (global as any).Event = null;

    savedRequestAnimationFrame = (global as any).requestAnimationFrame;
    (global as any).requestAnimationFrame = function(cb: FrameRequestCallback): number {
      setImmediate(cb);
      return requestAnimationFrameCount++;
    };
  }
}

/**
 * Restore the state of `Document` between tests.
 * @experimental
 */
export function cleanupDocument(): void {
  if (savedDocument) {
    (global as any).document = savedDocument;
    savedDocument = undefined;
  }
  if (savedRequestAnimationFrame) {
    (global as any).requestAnimationFrame = savedRequestAnimationFrame;
    savedRequestAnimationFrame = undefined;
  }
}

if (typeof beforeEach == 'function') beforeEach(ensureDocument);
if (typeof afterEach == 'function') beforeEach(cleanupDocument);