#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

const filename = 'aot-compiler.md';
translateFile(__dirname + '/../../../../../content-en/' + 'guide/' + filename, dirs.content + 'guide/' + filename);
