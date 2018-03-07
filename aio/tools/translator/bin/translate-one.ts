#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

const filename = 'guide/i18n.md';
translateFile(__dirname + '/../../../../../content-en/' + filename, dirs.content + filename);
