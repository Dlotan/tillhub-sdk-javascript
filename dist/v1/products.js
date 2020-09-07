"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BarcodeGetFailed = exports.ProductsBookStockFailed = exports.ProductsSearchFailed = exports.ProductsDeleteFailed = exports.ProductsBulkEditFailed = exports.ProductsUpdateFailed = exports.ProductsMetaFailed = exports.ProductsCountFailed = exports.ProductChildrenDetailsFetchFailed = exports.ProductDetailsFetchFailed = exports.ProductsImportFailed = exports.ProductsFetchFailed = exports.ProductFetchFailed = exports.ProductsCreateFailed = exports.Products = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var baseError_1 = require("../errors/baseError");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var pricebooks_1 = require("./pricebooks");
var pricebook_entries_1 = require("./pricebook-entries");
var Products = (function (_super) {
    tslib_1.__extends(Products, _super);
    function Products(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Products.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Products.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Products.prototype.create = function (product, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductsCreateFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_1 = _a.sent();
                        return [2, reject(new ProductsCreateFailed(undefined, { error: error_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.getAll = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_2;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, options);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new ProductsFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_2 = _a.sent();
                        return [2, reject(new ProductsFetchFailed(undefined, { error: error_2 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Products.prototype.import = function (options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, response_2, error_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (options && options.uri) {
                            uri = options.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/import" + (options && options.query ? "?" + qs_1.default.stringify(options.query) : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _a.sent();
                        if (response_2.status !== 200) {
                            return [2, reject(new ProductsImportFailed(undefined, { status: response_2.status }))];
                        }
                        if (response_2.data.cursor && response_2.data.cursor.next) {
                            next = function () { return _this.import({ uri: response_2.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2, reject(new ProductsImportFailed(undefined, { error: error_3 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Products.prototype.get = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new ProductFetchFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.getDetails = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId + "/details");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductDetailsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new ProductDetailsFetchFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.getChildrenDetails = function (productId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId + "/children/details");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductChildrenDetailsFetchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_6 = _a.sent();
                        return [2, reject(new ProductChildrenDetailsFetchFailed(undefined, { error: error_6 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.meta = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/meta');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductsMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2, reject(new ProductsMetaFailed('could not get product metadata unexpectedly', {
                                    status: response.status
                                }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        return [2, reject(new ProductsMetaFailed(undefined, { error: error_7 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.put = function (productId, product) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + productId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, product)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductsUpdateFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_8 = _a.sent();
                        return [2, reject(new ProductsUpdateFailed(undefined, { error: error_8 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.bulkEdit = function (products) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/bulk');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, products)];
                    case 2:
                        response = _a.sent();
                        if ([200, 202].includes(response.status) === false) {
                            return [2, reject(new ProductsBulkEditFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_9 = _a.sent();
                        return [2, reject(new ProductsBulkEditFailed(undefined, { error: error_9 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.count = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri('/meta');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductsCountFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_10 = _a.sent();
                        return [2, reject(new ProductsCountFailed(undefined, { error: error_10 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.delete = function (productId, deleteOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (deleteOptions) {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId + "?" + qs_1.default.stringify(deleteOptions);
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + productId;
                        }
                        return [4, this.http.getClient().delete(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductsDeleteFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 2:
                        error_11 = _a.sent();
                        return [2, reject(new ProductsDeleteFailed(undefined, { error: error_11 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Products.prototype.search = function (query) {
        var _this = this;
        var _query = typeof query === 'string' ? { q: query } : query;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_12;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/search');
                        uri = this.uriHelper.generateUriWithQuery(base, _query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new ProductsSearchFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_12 = _a.sent();
                        return [2, reject(new ProductsSearchFailed(undefined, { error: error_12 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.bookStock = function (requestOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + requestOptions.productId + "/stock/book");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, requestOptions.body)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new ProductsBookStockFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new ProductsBookStockFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.checkBarcode = function (code) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_13;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/barcode');
                        uri = this.uriHelper.generateUriWithQuery(base, { code: code });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new BarcodeGetFailed(undefined, {
                                status: response.status
                            }));
                        return [2, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_13 = _a.sent();
                        if (error_13.response && error_13.response.status === 409) {
                            return [2, reject(new BarcodeGetFailed(undefined, {
                                    status: error_13.response.status,
                                    name: error_13.response.data.name,
                                    data: error_13.response.data.results
                                }))];
                        }
                        return [2, reject(new BarcodeGetFailed(undefined, { error: error_13 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Products.prototype.pricebooks = function () {
        return new pricebooks_1.Pricebooks(this.options, this.http, this.uriHelper);
    };
    Products.prototype.pricebookEntries = function () {
        return new pricebook_entries_1.PricebookEntries(this.options, this.http, this.uriHelper);
    };
    Products.baseEndpoint = '/api/v1/products';
    return Products;
}(base_1.ThBaseHandler));
exports.Products = Products;
var ProductsCreateFailed = (function (_super) {
    tslib_1.__extends(ProductsCreateFailed, _super);
    function ProductsCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsCreateFailed';
        Object.setPrototypeOf(_this, ProductsCreateFailed.prototype);
        return _this;
    }
    return ProductsCreateFailed;
}(baseError_1.BaseError));
exports.ProductsCreateFailed = ProductsCreateFailed;
var ProductFetchFailed = (function (_super) {
    tslib_1.__extends(ProductFetchFailed, _super);
    function ProductFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductFetchFailed';
        Object.setPrototypeOf(_this, ProductFetchFailed.prototype);
        return _this;
    }
    return ProductFetchFailed;
}(baseError_1.BaseError));
exports.ProductFetchFailed = ProductFetchFailed;
var ProductsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductsFetchFailed, _super);
    function ProductsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsFetchFailed';
        Object.setPrototypeOf(_this, ProductsFetchFailed.prototype);
        return _this;
    }
    return ProductsFetchFailed;
}(baseError_1.BaseError));
exports.ProductsFetchFailed = ProductsFetchFailed;
var ProductsImportFailed = (function (_super) {
    tslib_1.__extends(ProductsImportFailed, _super);
    function ProductsImportFailed(message, properties) {
        if (message === void 0) { message = 'Could not import the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsImportFailed';
        Object.setPrototypeOf(_this, ProductsImportFailed.prototype);
        return _this;
    }
    return ProductsImportFailed;
}(baseError_1.BaseError));
exports.ProductsImportFailed = ProductsImportFailed;
var ProductDetailsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductDetailsFetchFailed, _super);
    function ProductDetailsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the details of the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductDetailsFetchFailed';
        Object.setPrototypeOf(_this, ProductDetailsFetchFailed.prototype);
        return _this;
    }
    return ProductDetailsFetchFailed;
}(baseError_1.BaseError));
exports.ProductDetailsFetchFailed = ProductDetailsFetchFailed;
var ProductChildrenDetailsFetchFailed = (function (_super) {
    tslib_1.__extends(ProductChildrenDetailsFetchFailed, _super);
    function ProductChildrenDetailsFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the details of the children products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductChildrenDetailsFetchFailed';
        Object.setPrototypeOf(_this, ProductChildrenDetailsFetchFailed.prototype);
        return _this;
    }
    return ProductChildrenDetailsFetchFailed;
}(baseError_1.BaseError));
exports.ProductChildrenDetailsFetchFailed = ProductChildrenDetailsFetchFailed;
var ProductsCountFailed = (function (_super) {
    tslib_1.__extends(ProductsCountFailed, _super);
    function ProductsCountFailed(message, properties) {
        if (message === void 0) { message = 'Could not count the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsCountFailed';
        Object.setPrototypeOf(_this, ProductsCountFailed.prototype);
        return _this;
    }
    return ProductsCountFailed;
}(baseError_1.BaseError));
exports.ProductsCountFailed = ProductsCountFailed;
var ProductsMetaFailed = (function (_super) {
    tslib_1.__extends(ProductsMetaFailed, _super);
    function ProductsMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get products metadata'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsMetaFailed';
        Object.setPrototypeOf(_this, ProductsMetaFailed.prototype);
        return _this;
    }
    return ProductsMetaFailed;
}(baseError_1.BaseError));
exports.ProductsMetaFailed = ProductsMetaFailed;
var ProductsUpdateFailed = (function (_super) {
    tslib_1.__extends(ProductsUpdateFailed, _super);
    function ProductsUpdateFailed(message, properties) {
        if (message === void 0) { message = 'Could not update the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsUpdateFailed';
        Object.setPrototypeOf(_this, ProductsUpdateFailed.prototype);
        return _this;
    }
    return ProductsUpdateFailed;
}(baseError_1.BaseError));
exports.ProductsUpdateFailed = ProductsUpdateFailed;
var ProductsBulkEditFailed = (function (_super) {
    tslib_1.__extends(ProductsBulkEditFailed, _super);
    function ProductsBulkEditFailed(message, properties) {
        if (message === void 0) { message = 'Could not bulk edit the products'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBulkEditFailed';
        Object.setPrototypeOf(_this, ProductsBulkEditFailed.prototype);
        return _this;
    }
    return ProductsBulkEditFailed;
}(baseError_1.BaseError));
exports.ProductsBulkEditFailed = ProductsBulkEditFailed;
var ProductsDeleteFailed = (function (_super) {
    tslib_1.__extends(ProductsDeleteFailed, _super);
    function ProductsDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsDeleteFailed';
        Object.setPrototypeOf(_this, ProductsDeleteFailed.prototype);
        return _this;
    }
    return ProductsDeleteFailed;
}(baseError_1.BaseError));
exports.ProductsDeleteFailed = ProductsDeleteFailed;
var ProductsSearchFailed = (function (_super) {
    tslib_1.__extends(ProductsSearchFailed, _super);
    function ProductsSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsSearchFailed';
        Object.setPrototypeOf(_this, ProductsSearchFailed.prototype);
        return _this;
    }
    return ProductsSearchFailed;
}(baseError_1.BaseError));
exports.ProductsSearchFailed = ProductsSearchFailed;
var ProductsBookStockFailed = (function (_super) {
    tslib_1.__extends(ProductsBookStockFailed, _super);
    function ProductsBookStockFailed(message, properties) {
        if (message === void 0) { message = 'Could not book stock for the product'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'ProductsBookStockFailed';
        Object.setPrototypeOf(_this, ProductsBookStockFailed.prototype);
        return _this;
    }
    return ProductsBookStockFailed;
}(baseError_1.BaseError));
exports.ProductsBookStockFailed = ProductsBookStockFailed;
var BarcodeGetFailed = (function (_super) {
    tslib_1.__extends(BarcodeGetFailed, _super);
    function BarcodeGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not check for barcode collision'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'BarcodeGetFailed';
        Object.setPrototypeOf(_this, BarcodeGetFailed.prototype);
        return _this;
    }
    return BarcodeGetFailed;
}(baseError_1.BaseError));
exports.BarcodeGetFailed = BarcodeGetFailed;
//# sourceMappingURL=products.js.map