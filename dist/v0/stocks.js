"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StocksBook = exports.Stocks = void 0;
var tslib_1 = require("tslib");
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Stocks = (function (_super) {
    tslib_1.__extends(Stocks, _super);
    function Stocks(options, http) {
        var _this = _super.call(this, http, { endpoint: Stocks.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Stocks.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Stocks.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new StocksFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2, reject(new StocksFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Stocks.prototype.create = function (stock) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, stock)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StocksCreateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_2 = _a.sent();
                        return [2, reject(new StocksCreateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Stocks.prototype.update = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var body, stockId, uri, response, err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = requestObject.body, stockId = requestObject.stockId;
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + stockId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StocksUpdateFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_3 = _a.sent();
                        return [2, reject(new StocksUpdateFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Stocks.prototype.getLocations = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/locations");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        response.status !== 200 && reject(new StocksLocationsFetchFailed());
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2, reject(new StocksLocationsFetchFailed())];
                    case 3: return [2];
                }
            });
        }); });
    };
    Stocks.prototype.getOneLocation = function (locationId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/locations/" + locationId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StocksLocationFetchOneFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new StocksLocationFetchOneFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Stocks.prototype.transfer = function (body) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/transfer');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StocksTransferFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new StocksTransferFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Stocks.baseEndpoint = '/api/v0/stock';
    return Stocks;
}(base_1.ThBaseHandler));
exports.Stocks = Stocks;
var StocksBook = (function () {
    function StocksBook(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v0/stock';
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.uriHelper = new uri_helper_1.UriHelper(this.endpoint, this.options);
    }
    StocksBook.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/book");
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2, reject(new StocksBookFetchFailed(undefined, { error: error_3 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    StocksBook.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri("/book/meta");
                        uri = this.uriHelper.generateUriWithQuery(base);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new StocksBookGetMetaFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 2:
                        error_4 = _a.sent();
                        return [2, reject(new StocksBookGetMetaFailed(undefined, { error: error_4 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    return StocksBook;
}());
exports.StocksBook = StocksBook;
var StocksFetchFailed = (function (_super) {
    tslib_1.__extends(StocksFetchFailed, _super);
    function StocksFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksFetchFailed';
        Object.setPrototypeOf(_this, StocksFetchFailed.prototype);
        return _this;
    }
    return StocksFetchFailed;
}(baseError_1.BaseError));
var StocksCreateFailed = (function (_super) {
    tslib_1.__extends(StocksCreateFailed, _super);
    function StocksCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the stock'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksCreateFailed';
        Object.setPrototypeOf(_this, StocksCreateFailed.prototype);
        return _this;
    }
    return StocksCreateFailed;
}(baseError_1.BaseError));
var StocksUpdateFailed = (function (_super) {
    tslib_1.__extends(StocksUpdateFailed, _super);
    function StocksUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the stock'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksUpdateFailed';
        Object.setPrototypeOf(_this, StocksUpdateFailed.prototype);
        return _this;
    }
    return StocksUpdateFailed;
}(baseError_1.BaseError));
var StocksLocationsFetchFailed = (function (_super) {
    tslib_1.__extends(StocksLocationsFetchFailed, _super);
    function StocksLocationsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks locations'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksLocationsFetchFailed';
        Object.setPrototypeOf(_this, StocksLocationsFetchFailed.prototype);
        return _this;
    }
    return StocksLocationsFetchFailed;
}(baseError_1.BaseError));
var StocksLocationFetchOneFailed = (function (_super) {
    tslib_1.__extends(StocksLocationFetchOneFailed, _super);
    function StocksLocationFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch location'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksLocationFetchOneFailed';
        Object.setPrototypeOf(_this, StocksLocationFetchOneFailed.prototype);
        return _this;
    }
    return StocksLocationFetchOneFailed;
}(baseError_1.BaseError));
var StocksBookFetchFailed = (function (_super) {
    tslib_1.__extends(StocksBookFetchFailed, _super);
    function StocksBookFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the stocks book'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksBookFetchFailed';
        Object.setPrototypeOf(_this, StocksBookFetchFailed.prototype);
        return _this;
    }
    return StocksBookFetchFailed;
}(baseError_1.BaseError));
var StocksBookGetMetaFailed = (function (_super) {
    tslib_1.__extends(StocksBookGetMetaFailed, _super);
    function StocksBookGetMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch stocks book meta'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksBookGetMetaFailed';
        Object.setPrototypeOf(_this, StocksBookGetMetaFailed.prototype);
        return _this;
    }
    return StocksBookGetMetaFailed;
}(baseError_1.BaseError));
var StocksTransferFailed = (function (_super) {
    tslib_1.__extends(StocksTransferFailed, _super);
    function StocksTransferFailed(message, properties) {
        if (message === void 0) { message = 'Could not transfer the stock'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StocksTransferFailed';
        Object.setPrototypeOf(_this, StocksTransferFailed.prototype);
        return _this;
    }
    return StocksTransferFailed;
}(baseError_1.BaseError));
//# sourceMappingURL=stocks.js.map