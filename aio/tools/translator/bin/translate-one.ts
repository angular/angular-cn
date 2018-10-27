#!/usr/bin/env ts-node

import { dirs } from '../dirs';
import * as path from 'path';
import { translateFile } from '../translate';

const filename = path.join(dirs.content, process.argv[2]);
translateFile(filename, filename);
