#!/usr/bin/env ts-node
import { dirs } from '../dirs';
import { gatherFromDirectory } from '../extractor';

gatherFromDirectory(dirs.content, dirs.here + 'dict-latest.json');
