"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var Contents = /** @class */ (function () {
    function Contents(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/contents';
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    Contents.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (queryOrOptions && queryOrOptions.uri) {
                            uri = queryOrOptions.uri;
                        }
                        else {
                            queryString = '';
                            if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
                                queryString = qs_1.default.stringify(__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2 /*return*/, reject(new ContentsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new ContentsFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Contents.prototype.get = function (contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + contentId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new ContentFetchFailed(undefined, { status: response.status }));
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new ContentFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Contents.prototype.patch = function (contentId, content) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + contentId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().patch(uri, content)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new ContentPatchFailed(undefined, { error: error_3 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Contents.prototype.create = function (content) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().post(uri, content)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2 /*return*/, reject(new ContentCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    Contents.prototype.delete = function (contentId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + contentId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ContentDeleteFailed());
                        return [2 /*return*/, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new ContentDeleteFailed())];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Contents;
}());
exports.Contents = Contents;
var ContentsFetchFailed = /** @class */ (function (_super) {
    __extends(ContentsFetchFailed, _super);
    function ContentsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch contents'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentsFetchFailed';
        return _this;
    }
    return ContentsFetchFailed;
}(errors_1.BaseError));
exports.ContentsFetchFailed = ContentsFetchFailed;
var ContentFetchFailed = /** @class */ (function (_super) {
    __extends(ContentFetchFailed, _super);
    function ContentFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentFetchFailed';
        return _this;
    }
    return ContentFetchFailed;
}(errors_1.BaseError));
exports.ContentFetchFailed = ContentFetchFailed;
var ContentPatchFailed = /** @class */ (function (_super) {
    __extends(ContentPatchFailed, _super);
    function ContentPatchFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentPatchFailed';
        return _this;
    }
    return ContentPatchFailed;
}(errors_1.BaseError));
exports.ContentPatchFailed = ContentPatchFailed;
var ContentCreationFailed = /** @class */ (function (_super) {
    __extends(ContentCreationFailed, _super);
    function ContentCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentCreationFailed';
        return _this;
    }
    return ContentCreationFailed;
}(errors_1.BaseError));
exports.ContentCreationFailed = ContentCreationFailed;
var ContentDeleteFailed = /** @class */ (function (_super) {
    __extends(ContentDeleteFailed, _super);
    function ContentDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete content'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ContentDeleteFailed';
        return _this;
    }
    return ContentDeleteFailed;
}(errors_1.BaseError));
exports.ContentDeleteFailed = ContentDeleteFailed;
//# sourceMappingURL=contents.js.map