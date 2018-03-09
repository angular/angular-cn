/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as fs from 'fs';
import * as path from 'path';
import {SymbolExtractor} from './symbol_extractor';

// These keys are arbitrary and local to this test.
const update_var = 'UPDATE_GOLDEN';
const update_val = 1;

if (require.main === module) {
  const doUpdate = process.env[update_var] == update_val;
  const args = process.argv.slice(2) as[string, string];
  process.exitCode = main(args, doUpdate) ? 0 : 1;
}

/**
 * CLI main method.
 *
 * ```
 *   cli javascriptFilePath.js goldenFilePath.json
 * ```
 */
function main(argv: [string, string], doUpdate: boolean): boolean {
  const javascriptFilePath = require.resolve(argv[0]);
  const goldenFilePath = require.resolve(argv[1]);

  const javascriptContent = fs.readFileSync(javascriptFilePath).toString();
  const goldenContent = fs.readFileSync(goldenFilePath).toString();

  const symbolExtractor = new SymbolExtractor(javascriptFilePath, javascriptContent);

  let passed: boolean = false;
  if (doUpdate) {
    fs.writeFileSync(goldenFilePath, JSON.stringify(symbolExtractor.actual, undefined, 2));
    console.error('Updated gold file:', goldenFilePath);
    passed = true;
  } else {
    passed = symbolExtractor.compareAndPrintError(goldenFilePath, goldenContent);
    if (!passed) {
      console.error(`TEST FAILED!`);
      console.error(`  To update the golden file run: `);
      console.error(
          `    bazel run --define ${update_var}=${update_val} ${process.env['BAZEL_TARGET']}`);
    }
  }
  return passed;
}
