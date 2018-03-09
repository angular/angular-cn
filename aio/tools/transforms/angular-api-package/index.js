/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const Package = require('dgeni').Package;

const basePackage = require('../angular-base-package');
const typeScriptPackage = require('dgeni-packages/typescript');
const { API_SOURCE_PATH, API_TEMPLATES_PATH, requireFolder } = require('../config');

module.exports = new Package('angular-api', [basePackage, typeScriptPackage])

  // Register the processors
  .processor(require('./processors/convertPrivateClassesToInterfaces'))
  .processor(require('./processors/generateApiListDoc'))
  .processor(require('./processors/addNotYetDocumentedProperty'))
  .processor(require('./processors/mergeDecoratorDocs'))
  .processor(require('./processors/extractDecoratedClasses'))
  .processor(require('./processors/matchUpDirectiveDecorators'))
  .processor(require('./processors/addMetadataAliases'))
  .processor(require('./processors/computeApiBreadCrumbs'))
  .processor(require('./processors/filterContainedDocs'))
  .processor(require('./processors/processClassLikeMembers'))
  .processor(require('./processors/markBarredODocsAsPrivate'))
  .processor(require('./processors/filterPrivateDocs'))
  .processor(require('./processors/computeSearchTitle'))
  .processor(require('./processors/simplifyMemberAnchors'))

  // Where do we get the source files?
  .config(function(readTypeScriptModules, readFilesProcessor, collectExamples, tsParser) {

    // Tell TypeScript how to load modules that start with with `@angular`
    tsParser.options.paths = { '@angular/*': [API_SOURCE_PATH + '/*'] };
    tsParser.options.baseUrl = '.';

    // API files are typescript
    readTypeScriptModules.basePath = API_SOURCE_PATH;
    readTypeScriptModules.ignoreExportsMatching = [/^[_ɵ]|^VERSION$/];
    readTypeScriptModules.hidePrivateMembers = true;

    // NOTE: This list shold be in sync with tools/gulp-tasks/public-api.js
    readTypeScriptModules.sourceFiles = [
      'animations/index.ts',
      'animations/browser/index.ts',
      'animations/browser/testing/index.ts',
      'common/http/index.ts',
      'common/http/testing/index.ts',
      'common/index.ts',
      'common/testing/index.ts',
      'core/index.ts',
      'core/testing/index.ts',
      'forms/index.ts',
      'http/index.ts',
      'http/testing/index.ts',
      'platform-browser/index.ts',
      'platform-browser/animations/index.ts',
      'platform-browser/testing/index.ts',
      'platform-browser-dynamic/index.ts',
      'platform-browser-dynamic/testing/index.ts',
      'platform-server/index.ts',
      'platform-server/testing/index.ts',
      'platform-webworker/index.ts',
      'platform-webworker-dynamic/index.ts',
      'router/index.ts',
      'router/testing/index.ts',
      'router/upgrade/index.ts',
      'service-worker/index.ts',
      'upgrade/index.ts',
      'upgrade/static/index.ts',
    ];

    // API Examples
    readFilesProcessor.sourceFiles = [
      {
        basePath: API_SOURCE_PATH,
        include: API_SOURCE_PATH + '/examples/**/*',
        fileReader: 'exampleFileReader'
      }
    ];
    collectExamples.exampleFolders.push('examples');
  })

  // Configure jsdoc-style tag parsing
  .config(function(parseTagsProcessor, getInjectables) {
    // Load up all the tag definitions in the tag-defs folder
    parseTagsProcessor.tagDefinitions =
        parseTagsProcessor.tagDefinitions.concat(getInjectables(requireFolder(__dirname, './tag-defs')));
  })


  .config(function(computePathsProcessor, EXPORT_DOC_TYPES, generateApiListDoc) {

    const API_SEGMENT = 'api';

    generateApiListDoc.outputFolder = API_SEGMENT;

    computePathsProcessor.pathTemplates.push({
      docTypes: ['module'],
      getPath: function computeModulePath(doc) {
        doc.moduleFolder = `${API_SEGMENT}/${doc.id.replace(/\/index$/, '')}`;
        return doc.moduleFolder;
      },
      outputPathTemplate: '${moduleFolder}.json'
    });
    computePathsProcessor.pathTemplates.push({
      docTypes: EXPORT_DOC_TYPES.concat(['decorator', 'directive', 'pipe']),
      pathTemplate: '${moduleDoc.moduleFolder}/${name}',
      outputPathTemplate: '${moduleDoc.moduleFolder}/${name}.json',
    });
  })

  .config(function(templateFinder) {
    // Where to find the templates for the API doc rendering
    templateFinder.templateFolders.unshift(API_TEMPLATES_PATH);
  })


  .config(function(convertToJsonProcessor, postProcessHtml, EXPORT_DOC_TYPES, autoLinkCode) {
    const DOCS_TO_CONVERT = EXPORT_DOC_TYPES.concat([
      'decorator', 'directive', 'pipe', 'module'
    ]);
    convertToJsonProcessor.docTypes = convertToJsonProcessor.docTypes.concat(DOCS_TO_CONVERT);
    postProcessHtml.docTypes = convertToJsonProcessor.docTypes.concat(DOCS_TO_CONVERT);
    autoLinkCode.docTypes = DOCS_TO_CONVERT;
    autoLinkCode.codeElements = ['code', 'code-example', 'code-pane'];
  });
