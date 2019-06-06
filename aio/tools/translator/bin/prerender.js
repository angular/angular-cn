"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
var klawSync = require("klaw-sync");
var mkdirp_1 = require("mkdirp");
var html_minifier_1 = require("html-minifier");
var path_1 = require("path");
var puppeteer_1 = require("puppeteer");
var lodash_1 = require("lodash");
var minifyOptions = {
    collapseWhitespace: true,
    ignoreCustomFragments: [/<code>[\s\S]*?<\/code>/],
    minifyCSS: true,
    minifyJS: true,
    removeComments: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true
};
function getGuideUrls() {
    var navigation = fs_1.readFileSync('./content/navigation.json', 'utf-8');
    return (navigation.match(/"url": "(.*?)"/g) || [])
        .map(function (entry) { return entry.replace(/^"url": "(.*?)".*$/, '$1'); })
        .filter(function (url) { return url.slice(0, 4) !== 'http'; });
}
function getApiUrls() {
    return klawSync('./dist/generated/docs/api', { nodir: true })
        .map(function (file) { return file.path.replace(/^.*generated\/docs\/(.*).json$/, '$1'); });
}
var urls = getGuideUrls().concat(getApiUrls(), ['index.html']);
function filterResource(request) {
    var type = request.resourceType();
    if (['image', 'stylesheet', 'font'].indexOf(type) !== -1) {
        request.abort();
    }
    else {
        request["continue"]();
    }
}
function renderPage(browser, url) {
    return __awaiter(this, void 0, void 0, function () {
        var page, content, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.newPage()];
                case 1:
                    page = _a.sent();
                    return [4 /*yield*/, page.setRequestInterception(true)];
                case 2:
                    _a.sent();
                    page.on('request', filterResource);
                    return [4 /*yield*/, page.goto("http://localhost:4200/" + url, { waitUntil: 'domcontentloaded' })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('aio-doc-viewer>div')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.content()];
                case 5:
                    content = _a.sent();
                    filename = path_1.join('dist', url + ".html");
                    mkdirp_1.sync(path_1.dirname(filename));
                    fs_1.writeFileSync(filename, html_minifier_1.minify(content, minifyOptions), 'utf-8');
                    return [4 /*yield*/, page.close()];
                case 6:
                    _a.sent();
                    console.log("rendered " + url + ".");
                    return [2 /*return*/];
            }
        });
    });
}
function renderPageGroup(browser, urls) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(urls.map(function (url) { return renderPage(browser, url); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function prerender() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, groups, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer_1.launch({ defaultViewport: { width: 1280, height: 768 } })];
                case 1:
                    browser = _a.sent();
                    groups = lodash_1.chunk(lodash_1.uniq(urls), 4);
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < groups.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, renderPageGroup(browser, groups[i])];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    ++i;
                    return [3 /*break*/, 2];
                case 5: return [4 /*yield*/, browser.close()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
prerender().then(function () {
    process.exit(0);
})["catch"](function (e) {
    console.error(e);
    process.exit(-1);
});
