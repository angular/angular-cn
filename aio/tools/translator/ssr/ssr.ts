import * as fs from 'fs';
import * as klawSync from 'klaw-sync';
import { concat, defer, Observable } from 'rxjs';
import * as fetch from 'node-fetch';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import * as path from 'path';
import { minify } from 'html-minifier';
import mkdirp = require('mkdirp');

const minifyOptions = {
  collapseWhitespace: true,
  ignoreCustomFragments: [/<code>[\s\S]*?<\/code>/],
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

function renderPage(url: string): Observable<void> {
  return defer(() => fromPromise(fetch(`http://localhost:3000/render?url=http://localhost:4200/${url}`).then(resp => resp.text()))).pipe(
    map(content => {
      const filename = path.join('dist', `${url}.html`);
      mkdirp.sync(path.dirname(filename));
      fs.writeFileSync(filename, minify(content, minifyOptions), 'utf-8');
      console.log(`rendered ${url}...`);
    }),
  );
}

function getGuideUrls(): string[] {
  const navigation = fs.readFileSync('./content/navigation.json', 'utf-8');
  return (navigation.match(/"url": "(.*?)"/g) || [])
    .map((entry) => entry.replace(/^"url": "(.*?)".*$/, '$1'))
    .filter(url => url.slice(0, 4) !== 'http');
}

function getApiUrls(): string[] {
  return klawSync('./dist/generated/docs/api', { nodir: true })
    .map(file => file.path.replace(/^.*generated\/docs\/(.*).json$/, '$1'));
}

const urls = [...getGuideUrls(), ...getApiUrls(), 'index.html'];
const tasks = urls.map(url => renderPage(url));
concat(...tasks).subscribe((url) => {
}, () => {
}, () => {
  process.exit(0);
});

// 不自动退出
setInterval(function () {
}, 24 * 60 * 60 * 1000);

