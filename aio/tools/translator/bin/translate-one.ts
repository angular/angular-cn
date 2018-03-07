#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

const filename = 'attribute-directives.md';
translateFile(__dirname + '/../../../../../content-en/' + 'guide/' + filename, dirs.content + 'guide/' + filename);
