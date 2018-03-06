#!/usr/bin/env ts-node
import { dirs } from '../dirs';
import { gatherFromDirectory } from '../extractor';
import { translateDirectory } from '../translate';

gatherFromDirectory(dirs.aio + '../../content-1/', dirs.here + 'dict-1.json');
gatherFromDirectory(dirs.aio + '../../content-2/', dirs.here + 'dict-2.json');
gatherFromDirectory(dirs.aio + '../../content-3/', dirs.here + 'dict-3.json');
