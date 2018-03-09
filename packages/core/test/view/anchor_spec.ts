/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {getDebugNode} from '@angular/core';
import {NodeFlags, anchorDef, asElementData, elementDef} from '@angular/core/src/view/index';
import {getDOM} from '@angular/platform-browser/src/dom/dom_adapter';

import {compViewDef, createAndGetRootNodes} from './helper';

{
  describe(`View Anchor`, () => {

    describe('create', () => {
      it('should create anchor nodes without parents', () => {
        const rootNodes = createAndGetRootNodes(compViewDef([
                            anchorDef(NodeFlags.None, null, null, 0)
                          ])).rootNodes;
        expect(rootNodes.length).toBe(1);
      });

      it('should create views with multiple root anchor nodes', () => {
        const rootNodes =
            createAndGetRootNodes(compViewDef([
              anchorDef(NodeFlags.None, null, null, 0), anchorDef(NodeFlags.None, null, null, 0)
            ])).rootNodes;
        expect(rootNodes.length).toBe(2);
      });

      it('should create anchor nodes with parents', () => {
        const rootNodes = createAndGetRootNodes(compViewDef([
                            elementDef(0, NodeFlags.None, null, null, 1, 'div'),
                            anchorDef(NodeFlags.None, null, null, 0),
                          ])).rootNodes;
        expect(getDOM().childNodes(rootNodes[0]).length).toBe(1);
      });

      it('should add debug information to the renderer', () => {
        const someContext = new Object();
        const {view, rootNodes} = createAndGetRootNodes(
            compViewDef([anchorDef(NodeFlags.None, null, null, 0)]), someContext);
        expect(getDebugNode(rootNodes[0]) !.nativeNode).toBe(asElementData(view, 0).renderElement);
      });
    });
  });
}
