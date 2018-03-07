#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

const filename = 'guide/template-syntax.md';
translateFile(__dirname + '/../../../../../content-en/' + filename, dirs.content + filename);
