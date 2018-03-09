/* eslint jasmine/prefer-toHaveBeenCalledWith:0 */
const fs = require('fs');
const {resolve} = require('canonical-path');
const {generateDocs} = require('./index.js');
const { DOCS_OUTPUT_PATH } = require('../config');

describe('authors-package (integration tests)', () => {
  let originalJasmineTimeout;
  let files;

  beforeAll(() => {
    originalJasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });
  afterAll(() => jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout);

  beforeEach(() => {
    files = [];
    spyOn(fs, 'writeFile').and.callFake((file, content, callback) => {
      files.push(file);
      callback();
    });
  });

  it('should generate marketing docs if the "fileChanged" is a marketing doc', (done) => {
    generateDocs('aio/content/marketing/about.html', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'about.json'));
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, '../navigation.json'));
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, '../contributors.json'));
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, '../resources.json'));
      done();
    });
  });

  it('should generate tutorial docs if the "fileChanged" is a tutorial doc', (done) => {
    generateDocs('aio/content/tutorial/toh-pt5.md', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'tutorial/toh-pt5.json'));
      done();
    });
  });

  it('should generate tutorial docs if the "fileChanged" is the tutorial index', (done) => {
    generateDocs('aio/content/tutorial/index.md', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'tutorial.json'));
      done();
    });
  });

  it('should generate tutorial docs if the "fileChanged" is a tutorial example', (done) => {
    generateDocs('aio/content/examples/toh-pt3/app/app.component.1.html', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'tutorial/toh-pt3.json'));
      done();
    });
  });

  it('should generate guide doc if the "fileChanged" is a guide doc', (done) => {
    generateDocs('aio/content/guide/architecture.md', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'guide/architecture.json'));
      done();
    });
  });

  it('should generate guide doc if the "fileChanged" is a guide example', (done) => {
    generateDocs('aio/content/examples/architecture/src/app/app.module.ts', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'guide/architecture.json'));
      done();
    });
  });

  it('should generate API doc if the "fileChanged" is an API doc', (done) => {
    generateDocs('packages/forms/src/form_builder.ts', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'api/forms/FormBuilder.json'));
      done();
    });
  }, 16000);

  it('should generate API doc if the "fileChanged" is an API example', (done) => {
    generateDocs('packages/examples/forms/ts/formBuilder/form_builder_example.ts', { silent: true }).then(() => {
      expect(fs.writeFile).toHaveBeenCalled();
      expect(files).toContain(resolve(DOCS_OUTPUT_PATH, 'api/forms/FormBuilder.json'));
      done();
    });
  }, 16000);
});
