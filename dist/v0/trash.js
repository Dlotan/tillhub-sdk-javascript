"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverFailed = exports.TrashFetchFailed = exports.Trash = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Trash = (function (_super) {
    tslib_1.__extends(Trash, _super);
    function Trash(options, http) {
        var _this = _super.call(this, http, { endpoint: Trash.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Trash.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Trash.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response_1 = _a.sent();
                        response_1.status !== 200 &&
                            reject(new TrashFetchFailed(undefined, { status: response_1.status }));
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new TrashFetchFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Trash.prototype.recover = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/untrash');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new RecoverFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new RecoverFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Trash.baseEndpoint = '/api/v0/trash';
    return Trash;
}(base_1.ThBaseHandler));
exports.Trash = Trash;
var TrashFetchFailed = (function (_super) {
    tslib_1.__extends(TrashFetchFailed, _super);
    function TrashFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the trashed Record<string, unknown>s'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'TrashFetchFailed';
        Object.setPrototypeOf(_this, TrashFetchFailed.prototype);
        return _this;
    }
    return TrashFetchFailed;
}(errors_1.BaseError));
exports.TrashFetchFailed = TrashFetchFailed;
var RecoverFailed = (function (_super) {
    tslib_1.__extends(RecoverFailed, _super);
    function RecoverFailed(message, properties) {
        if (message === void 0) { message = 'Could not recover the Record<string, unknown>'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'RecoverFailed';
        Object.setPrototypeOf(_this, RecoverFailed.prototype);
        return _this;
    }
    return RecoverFailed;
}(errors_1.BaseError));
exports.RecoverFailed = RecoverFailed;
//# sourceMappingURL=trash.js.map