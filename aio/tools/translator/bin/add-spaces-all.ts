import * as fs from 'fs';
import { dirs } from '../dirs';
import { listMarkdownFiles } from '../extractor';

export function addSpaces(sourceDir: string): void {
  const files = listMarkdownFiles(sourceDir);
  files.forEach(fileName => {
    console.log('adding spaces ...', fileName);
    const content = fs.readFileSync(fileName, 'utf8');
    const result = content
      .replace(/([\u4e00-\u9fa5])([a-zA-Z0-9`])/g, '$1 $2')
      .replace(/([a-zA-Z0-9`])([\u4e00-\u9fa5])/g, '$1 $2')
      .replace(/([*-]+)(\w+)([*-]+)([\u4e00-\u9fa5])/g, '$1$2$3 $4')
      .replace(/([\u4e00-\u9fa5])([*-]+)(\w+)([*-]+)/g, '$1 $2$3$4')
    ;
    fs.writeFileSync(fileName, result, 'utf8');
    console.log('added spaces ', fileName);
  });
}

addSpaces(dirs.content);
