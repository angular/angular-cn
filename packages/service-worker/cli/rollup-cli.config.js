/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  entry: '../../dist/all/@angular/service-worker/cli-custom/main.js',
  dest: '../../dist/packages-dist/service-worker/ngsw-config-tmp.js',
  format: 'iife',
  plugins: [resolve()],
  external: [
    'fs',
    'path',
    '@angular/service-worker/config',
  ],
};
