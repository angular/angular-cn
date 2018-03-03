#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import { translateFile } from '../translate';

translateFile(__dirname + '/../../../../../content-en/' + 'guide/http.md', dirs.content + 'guide/http.md');
