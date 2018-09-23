import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import * as klawSync from 'klaw-sync';

const rootElementPattern = /<aio-shell\b[\s\S]*<\/aio-shell>/;

const indexTemplate = fs.readFileSync('./dist/index.html', 'utf-8');
const aioShellTemplate = fs.readFileSync(__dirname + '/../assets/aio-shell-template.html');
const pageTemplate = indexTemplate.replace(rootElementPattern, `${aioShellTemplate}`);

function purge(text: string): string {
  return text.replace(/<!--\s*-->/g, '')
    .replace(/<!-- links (to|from) this doc[\s\S]*?-->/g, '');
}

function composePage(url) {
  const { title, contents } = JSON.parse(fs.readFileSync(`./dist/generated/docs/${url}.json`, 'utf-8'));

  if (!contents) {
    return;
  }
  const ssrContent = contents.replace(/href="(?!http)(.{2,}?)"/gi, 'href="/$1"');
  const pageContent = pageTemplate
    .replace('<title>Angular Docs</title>', `<title>${title} - Angular 官方文档</title>`)
    .replace('<aio-page-content-placeholder></aio-page-content-placeholder>', ssrContent);
  mkdirp.sync(path.dirname(`./dist/${url}`));
  fs.writeFileSync(`./dist/${url}.html`, purge(pageContent), 'utf-8');
}

function buildGuidePages(): void {
  const navigation = fs.readFileSync('./content/navigation.json', 'utf-8');
  navigation.match(/"url": "(.*?)"/g)
    .map((entry) => entry.replace(/^"url": "(.*?)".*$/, '$1'))
    .filter(url => url.slice(0, 4) !== 'http')
    .forEach(url => composePage(url));
}

function buildApiPages(): void {
  const apiList = klawSync('./dist/generated/docs/api', { nodir: true })
    .map(file => file.path.replace(/^.*generated\/docs(\/.*).json$/, '$1'));
  apiList.forEach(url => composePage(url));

  const links = apiList.map(url => `<a href="${url}">${url}</a>`).join('\n');
  const apiListContent = fs.readFileSync('./dist/api.html', 'utf-8')
    .replace(rootElementPattern, `<aio-shell><h3>API List</h3>${links}</aio-shell>`);

  fs.writeFileSync(`./dist/api.html`, purge(apiListContent), 'utf-8');
}

function buildIndexPage(): void {
  const indexTemplate = fs.readFileSync('./dist/index.html', 'utf-8');
  const aioShellIndex = fs.readFileSync(__dirname + '/../assets/aio-shell-index.html');
  const content = indexTemplate.replace(rootElementPattern, `${aioShellIndex}`);
  fs.writeFileSync(`./dist/index.html`, purge(content), 'utf-8');
}

buildGuidePages();
buildApiPages();
buildIndexPage();
