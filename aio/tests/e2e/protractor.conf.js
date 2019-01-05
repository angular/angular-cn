// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

const MaxInt32 = Math.pow(2, 31) - 1;
exports.config = {
  allScriptsTimeout: MaxInt32,
  specs: [
    './*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
    // For Travis
    chromeOptions: {
      args: ['--no-sandbox']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: MaxInt32,
    print: function() {}
  },
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'tests/e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
