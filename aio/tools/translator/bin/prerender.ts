import { readFileSync, writeFileSync } from 'fs';
import * as klawSync from 'klaw-sync';
import { sync as mkdirp } from 'mkdirp';
import { minify } from 'html-minifier';
import { dirname, join } from 'path';
import { launch } from 'puppeteer';

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

const urls = [...getGuideUrls(), ...getApiUrls(), 'index.html'];

async function prerender() {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();
  for (let i = 0; i < urls.length; ++i) {
    const url = urls[i];
    await page.goto(`http://localhost:4200/${url}`, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('#top-of-page');
    const content = await page.content();
    const filename = join('dist', `${url}.html`);
    mkdirp(dirname(filename));
    writeFileSync(filename, minify(content, minifyOptions), 'utf-8');
    console.log(`rendered ${url}...`);
  }
}

prerender().then(() => {
  process.exit(0);
}).catch(() => {
  process.exit(-1);
});
