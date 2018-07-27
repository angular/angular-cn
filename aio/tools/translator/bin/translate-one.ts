#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

const filename = 'guide/reactive-forms.md';
translateFile(__dirname + '/../../../../../angular/aio/content/' + filename, dirs.content + filename);
