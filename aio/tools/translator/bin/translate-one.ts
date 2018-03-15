#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

const filename = 'guide/testing.md';
translateFile(__dirname + '/../../../../../content-en/' + filename, dirs.content + filename);
