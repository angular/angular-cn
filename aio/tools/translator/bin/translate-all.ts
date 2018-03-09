#!/usr/bin/env ts-node
import { dirs } from '../dirs';
import { translateDirectory } from '../translate';

translateDirectory(__dirname + '/../../../../../content-en/', dirs.content);
