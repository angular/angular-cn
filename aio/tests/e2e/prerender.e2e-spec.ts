import { browser, promise } from 'protractor';
import { readFileSync, writeFileSync } from 'fs';
import { concat, defer, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import * as path from 'path';
import * as mkdirp from 'mkdirp';
import { minify } from 'html-minifier';
import * as globby from 'globby';

const minifyOptions = {
  collapseWhitespace: true,
  ignoreCustomFragments: [/<code>[\s\S]*?<\/code>/],
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

function fromPromise<T>(input: promise.Promise<T>): Observable<T> {
  return Observable.create(observer => {
    input.then((value) => {
      observer.next(value);
      observer.complete();
    });
  });
}

function prerender(url: string): Observable<any> {
  return defer(() => fromPromise(browser.get(url))).pipe(
    tap(() => browser.executeScript('document.body.classList.add(\'no-animations\')')),
    tap(() => browser.waitForAngular()),
    switchMap(() => fromPromise(browser.executeScript('return document.documentElement.outerHTML'))),
    map(content => minify(content, minifyOptions)),
    map((content) => `<!DOCTYPE html>${content}`),
    tap((html) => {
      const filename = path.join('dist', `${url}.html`);
      mkdirp.sync(path.dirname(filename));
      writeFileSync(filename, html, 'utf-8');
    }),
    tap(() => console.log('Rendered ', url)),
  );
}

function getGuideUrls(): string[] {
  const navigation = readFileSync('./content/navigation.json', 'utf-8');
  return (navigation.match(/"url": "(.*?)"/g) || [])
    .map((entry) => entry.replace(/^"url": "(.*?)".*$/, '$1'))
    .filter(url => url.slice(0, 4) !== 'http');
}

function getApiUrls(): string[] {
  return globby.sync('./src/generated/docs/api/**/*.json')
    .map(file => file.replace(/^.*generated\/docs\/(.*).json$/, '$1'));
}


function renderUrlsByTemplate(urls: string[], templateUrl: string): void {
  const template = readFileSync(path.join('dist', `${templateUrl}.html`), 'utf-8');
  urls.filter(url => url !== templateUrl).forEach((url) => {
    console.log('Render by template: ', url);
    const article = JSON.parse(readFileSync(`./src/generated/docs/${url}.json`, 'utf-8'));
    const content = template
      .replace(/<article>.*<\/article>/, article.contents)
      .replace(/<title>.*<\/title>/, `${article.title} - Angular 官方文档`);
    const filename = path.join('dist', `${url}.html`);
    mkdirp.sync(path.dirname(filename));
    writeFileSync(filename, content, 'utf-8');
  });
}

describe('Prerender', function () {
  it('prerender', (done) => {
    const apiUrls = getApiUrls();
    const guideUrls = getGuideUrls().filter(url => url.match(/^(guide|tutorial|cli)/));
    const otherUrls = getGuideUrls().filter(url => !url.match(/^(guide|tutorial|cli)/));
    const urls = [guideUrls[0], apiUrls[0], otherUrls[0], 'index.html'];
    const tasks = urls.map(url => prerender(url));
    concat(...tasks).subscribe(undefined, undefined, () => {
      console.log('Start render by template');
      renderUrlsByTemplate(apiUrls, apiUrls[0]);
      renderUrlsByTemplate(guideUrls, guideUrls[0]);
      renderUrlsByTemplate(otherUrls, otherUrls[0]);
      console.log('All rendered');
      done();
    });
  });
});
