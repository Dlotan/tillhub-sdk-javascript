"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesDeleteFailed = exports.CategoryCreationFailed = exports.CategoryPutFailed = exports.CategoryFetchFailed = exports.CategoriesFetchFailed = exports.Categories = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Categories = (function (_super) {
    tslib_1.__extends(Categories, _super);
    function Categories(options, http) {
        var _this = _super.call(this, http, {
            endpoint: Categories.baseEndpoint,
            base: options.base || 'https://api.tillhub.com'
        }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Categories.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Categories.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new CategoriesFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new CategoriesFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Categories.prototype.get = function (categoryId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + categoryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new CategoryFetchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new CategoryFetchFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Categories.prototype.put = function (categoryId, category) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri("/" + categoryId);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, category)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new CategoryPutFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Categories.prototype.create = function (category) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = this.uriHelper.generateBaseUri();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, category)];
                    case 2:
                        response = _a.sent();
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new CategoryCreationFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Categories.prototype.delete = function (storefrontId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + storefrontId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new CategoriesDeleteFailed());
                        return [2, resolve({
                                msg: response.data.msg
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new CategoriesDeleteFailed())];
                    case 4: return [2];
                }
            });
        }); });
    };
    Categories.baseEndpoint = '/api/v0/categories';
    return Categories;
}(base_1.ThBaseHandler));
exports.Categories = Categories;
var CategoriesFetchFailed = (function (_super) {
    tslib_1.__extends(CategoriesFetchFailed, _super);
    function CategoriesFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch categories'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoriesFetchFailed';
        Object.setPrototypeOf(_this, CategoriesFetchFailed.prototype);
        return _this;
    }
    return CategoriesFetchFailed;
}(errors_1.BaseError));
exports.CategoriesFetchFailed = CategoriesFetchFailed;
var CategoryFetchFailed = (function (_super) {
    tslib_1.__extends(CategoryFetchFailed, _super);
    function CategoryFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryFetchFailed';
        Object.setPrototypeOf(_this, CategoryFetchFailed.prototype);
        return _this;
    }
    return CategoryFetchFailed;
}(errors_1.BaseError));
exports.CategoryFetchFailed = CategoryFetchFailed;
var CategoryPutFailed = (function (_super) {
    tslib_1.__extends(CategoryPutFailed, _super);
    function CategoryPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryPutFailed';
        Object.setPrototypeOf(_this, CategoryPutFailed.prototype);
        return _this;
    }
    return CategoryPutFailed;
}(errors_1.BaseError));
exports.CategoryPutFailed = CategoryPutFailed;
var CategoryCreationFailed = (function (_super) {
    tslib_1.__extends(CategoryCreationFailed, _super);
    function CategoryCreationFailed(message, properties) {
        if (message === void 0) { message = 'Could not create category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoryCreationFailed';
        Object.setPrototypeOf(_this, CategoryCreationFailed.prototype);
        return _this;
    }
    return CategoryCreationFailed;
}(errors_1.BaseError));
exports.CategoryCreationFailed = CategoryCreationFailed;
var CategoriesDeleteFailed = (function (_super) {
    tslib_1.__extends(CategoriesDeleteFailed, _super);
    function CategoriesDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete category'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'CategoriesDeleteFailed';
        Object.setPrototypeOf(_this, CategoriesDeleteFailed.prototype);
        return _this;
    }
    return CategoriesDeleteFailed;
}(errors_1.BaseError));
exports.CategoriesDeleteFailed = CategoriesDeleteFailed;
//# sourceMappingURL=categories.js.map