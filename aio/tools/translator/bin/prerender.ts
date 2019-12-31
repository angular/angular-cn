import { readFileSync, writeFileSync } from 'fs';
import { minify } from 'html-minifier';
import * as klawSync from 'klaw-sync';
import { chunk, uniq } from 'lodash';
import { sync as mkdirp } from 'mkdirp';
import { dirname, join } from 'path';
import { Browser, launch, Request } from 'puppeteer';

const minifyOptions = {
  collapseWhitespace: true,
  ignoreCustomFragments: [/<code>[\s\S]*?<\/code>/],
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
};

function getGuideUrls(): string[] {
  const navigation = readFileSync('./content/navigation.json', 'utf-8');
  return (navigation.match(/"url": "(.*?)"/g) || [])
    .map((entry) => entry.replace(/^"url": "(.*?)".*$/, '$1'))
    .filter(url => url.slice(0, 4) !== 'http');
}

function getApiUrls(): string[] {
  return klawSync('./dist/generated/docs/api', { nodir: true })
    .map(file => file.path.replace(/^.*generated\/docs\/(.*).json$/, '$1'));
}

const urls = [...getGuideUrls(), ...getApiUrls(), 'translations/cn/about.html', 'index.html'];

function filterResource(request: Request) {
  const type = request.resourceType();
  if (['image', 'stylesheet', 'font'].indexOf(type) !== -1) {
    request.abort();
  } else {
    request.continue();
  }
}

async function renderPage(browser: Browser, url: string) {
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', filterResource);
  await page.goto(`http://localhost:4200/${url}`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('aio-doc-viewer>div');
  const content = await page.content();
  const filename = join('dist', `${url}.html`);
  mkdirp(dirname(filename));
  writeFileSync(filename, minify(content, minifyOptions), 'utf-8');
  await page.close();
  console.log(`rendered ${url}.`);
}

async function renderPageGroup(browser: Browser, urls: string[]) {
  await Promise.all(urls.map(url => renderPage(browser, url)));
}

async function prerender() {
  const browser = await launch({ defaultViewport: { width: 1280, height: 768 } });
  const groups = chunk(uniq(urls), 4);
  for (let i = 0; i < groups.length; ++i) {
    await renderPageGroup(browser, groups[i]);
  }
  await browser.close();
}

prerender().then(() => {
  process.exit(0);
}).catch((e) => {
  console.error(e);
  process.exit(-1);
});
