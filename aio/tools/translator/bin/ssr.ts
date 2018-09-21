import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import * as path from 'path';

function buildInnerPages(): void {
  const navigation = fs.readFileSync('./content/navigation.json', 'utf-8');
  const indexTemplate = fs.readFileSync('./dist/index.html', 'utf-8');
  const aioShellTemplate = fs.readFileSync(__dirname + '/../assets/aio-shell-template.html');
  const pageTemplate = indexTemplate.replace('<aio-shell></aio-shell>', `<aio-shell>${aioShellTemplate}</aio-shell>`);
  const urls = navigation.match(/"url": "(.*?)"/g)
    .map((entry) => entry.replace(/^"url": "(.*?)".*$/, '$1'))
    .filter(url => url.slice(0, 4) !== 'http')
    .forEach(url => {
      const generated: { title: string, contents: string } = JSON.parse(fs.readFileSync(`./dist/generated/docs/${url}.json`, 'utf-8'));

      const content = generated.contents.replace(/href="(?!http)(.{2,}?)"/gi, 'href="/$1"');
      const pageContent = pageTemplate
        .replace('<title>Angular Docs</title>', `<title>${generated.title} - Angular 官方文档</title>`)
        .replace('<aio-page-content-placeholder></aio-page-content-placeholder>', content);
      mkdirp.sync(path.dirname(`./dist/${url}`));
      fs.writeFileSync(`./dist/${url}.html`, pageContent, 'utf-8');
    });
}

function buildIndexPage(): void {
  const indexTemplate = fs.readFileSync('./dist/index.html', 'utf-8');
  const aioShellIndex = fs.readFileSync(__dirname + '/../assets/aio-shell-index.html');
  const content = indexTemplate.replace('<aio-shell></aio-shell>', `<aio-shell>${aioShellIndex}</aio-shell>`);
  fs.writeFileSync(`./dist/index.html`, content, 'utf-8');
}

buildInnerPages();
buildIndexPage();
