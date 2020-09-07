"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffSearchFailed = exports.StaffMetaFailed = exports.MakeUserStaffFailed = exports.StaffNumberGetFailed = exports.StaffPinGetFailed = exports.StaffMemberCreateFailed = exports.StaffDeleteFailed = exports.StaffPutFailed = exports.StaffFetchOneFailed = exports.StaffFetchFailed = exports.Staff = void 0;
var tslib_1 = require("tslib");
var qs_1 = tslib_1.__importDefault(require("qs"));
var just_typeof_1 = tslib_1.__importDefault(require("just-typeof"));
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var base_1 = require("../base");
var Staff = (function (_super) {
    tslib_1.__extends(Staff, _super);
    function Staff(options, http) {
        var _this = _super.call(this, http, { endpoint: Staff.baseEndpoint, base: options.base || 'https://api.tillhub.com' }) || this;
        _this.options = options;
        _this.http = http;
        _this.endpoint = Staff.baseEndpoint;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        _this.uriHelper = new uri_helper_1.UriHelper(_this.endpoint, _this.options);
        return _this;
    }
    Staff.prototype.getAll = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, uri, queryString, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
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
                                queryString = qs_1.default.stringify(tslib_1.__assign({ limit: queryOrOptions.limit }, queryOrOptions.query));
                            }
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + (queryString ? "?" + queryString : '');
                        }
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new StaffFetchFailed(undefined, { status: response_1.status }))];
                        }
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2, reject(new StaffFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Staff.prototype.create = function (staffMember, query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(uri, staffMember)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new StaffMemberCreateFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count },
                                errors: response.data.errors || []
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2, reject(new StaffMemberCreateFailed(undefined, { error: error_2 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.getOne = function (staffId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffFetchOneFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_3 = _a.sent();
                        return [2, reject(new StaffFetchOneFailed(undefined, { error: error_3 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.get = function (staffId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffFetchOneFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_4 = _a.sent();
                        return [2, reject(new StaffFetchOneFailed(undefined, { error: error_4 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.put = function (staffId, staff) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().put(uri, staff)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffPutFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_5 = _a.sent();
                        return [2, reject(new StaffPutFailed(undefined, { error: error_5 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.delete = function (staffId) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + staffId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().delete(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffDeleteFailed(undefined, { status: response.status }));
                        return [2, resolve({ msg: response.data.msg })];
                    case 3:
                        error_6 = _a.sent();
                        return [2, reject(new StaffDeleteFailed(undefined, { error: error_6 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.getPin = function (providedPin) {
        var _this = this;
        var queryString = qs_1.default.stringify(providedPin, { addQueryPrefix: true });
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/pin" + queryString;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffPinGetFailed(undefined, {
                                status: response.status
                            }));
                        return [2, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_7 = _a.sent();
                        if (error_7.response && error_7.response.status === 409) {
                            return [2, reject(new StaffPinGetFailed(undefined, {
                                    status: error_7.response.status,
                                    name: error_7.response.data.name
                                }))];
                        }
                        return [2, reject(new StaffPinGetFailed(undefined, { error: error_7 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.getStaffNumber = function (providedStaffNumber) {
        var _this = this;
        var queryString = qs_1.default.stringify(providedStaffNumber, { addQueryPrefix: true });
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, response, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/staff_number" + queryString;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffNumberGetFailed(undefined, {
                                status: response.status
                            }));
                        return [2, resolve({
                                data: response.data.results,
                                msg: response.data.msg,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_8 = _a.sent();
                        if (error_8.response && error_8.response.status === 409) {
                            return [2, reject(new StaffNumberGetFailed(undefined, {
                                    status: error_8.response.status,
                                    name: error_8.response.data.name
                                }))];
                        }
                        return [2, reject(new StaffNumberGetFailed(undefined, { error: error_8 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.getFilters = function (queryOrOptions) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, resp, resources_1, list, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelper.generateBaseUri();
                        uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new StaffFetchFailed(undefined, { status: response.status }))];
                        }
                        resp = response.data.results || [];
                        resources_1 = ['staff_number', 'lastname', 'firstname', 'email', 'phonenumbers'];
                        list = resp.reduce(function (acc, curr) {
                            var obj = {};
                            resources_1.forEach(function (key) {
                                obj[key] = acc[key] || [];
                                var currValue = curr[key];
                                if (key === 'phonenumbers' && currValue) {
                                    currValue =
                                        currValue.mobile ||
                                            currValue.main ||
                                            currValue.home ||
                                            currValue.work ||
                                            currValue.any ||
                                            null;
                                }
                                if (currValue && !obj[key].includes(currValue)) {
                                    obj[key].push(currValue);
                                }
                            });
                            return obj;
                        }, {});
                        return [2, resolve({
                                data: list,
                                metadata: { resources: resources_1 }
                            })];
                    case 2:
                        error_9 = _a.sent();
                        return [2, reject(new StaffFetchFailed(undefined, { error: error_9 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Staff.prototype.makeUser = function (staffID, makeUserObj) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, response, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri("/" + staffID + "/make_user");
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().post(base, makeUserObj)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 && reject(new MakeUserStaffFailed());
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_10 = _a.sent();
                        return [2, reject(new MakeUserStaffFailed(undefined, { error: error_10 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.meta = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var base, uri, response, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        base = this.uriHelper.generateBaseUri('/meta');
                        uri = this.uriHelper.generateUriWithQuery(base, query);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200) {
                            return [2, reject(new StaffMetaFailed(undefined, { status: response.status }))];
                        }
                        if (!response.data.results[0]) {
                            return [2, reject(new StaffMetaFailed(undefined, { status: response.status }))];
                        }
                        return [2, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2, reject(new StaffMetaFailed(undefined, { error: err_1 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.prototype.search = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var uri, base, response, error_11;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof query === 'string') {
                            uri = this.uriHelper.generateBaseUri("/search?q=" + query);
                        }
                        else if (just_typeof_1.default(query) === 'object') {
                            base = this.uriHelper.generateBaseUri('/search');
                            uri = this.uriHelper.generateUriWithQuery(base, query);
                        }
                        else {
                            return [2, reject(new StaffSearchFailed('Could not search for staff - query type is invalid'))];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        response.status !== 200 &&
                            reject(new StaffSearchFailed(undefined, { status: response.status }));
                        return [2, resolve({
                                data: response.data.results,
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_11 = _a.sent();
                        return [2, reject(new StaffSearchFailed(undefined, { error: error_11 }))];
                    case 4: return [2];
                }
            });
        }); });
    };
    Staff.baseEndpoint = '/api/v0/staff';
    return Staff;
}(base_1.ThBaseHandler));
exports.Staff = Staff;
var StaffFetchFailed = (function (_super) {
    tslib_1.__extends(StaffFetchFailed, _super);
    function StaffFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch all the Staff members'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchFailed';
        Object.setPrototypeOf(_this, StaffFetchFailed.prototype);
        return _this;
    }
    return StaffFetchFailed;
}(errors_1.BaseError));
exports.StaffFetchFailed = StaffFetchFailed;
var StaffFetchOneFailed = (function (_super) {
    tslib_1.__extends(StaffFetchOneFailed, _super);
    function StaffFetchOneFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffFetchOneFailed';
        Object.setPrototypeOf(_this, StaffFetchOneFailed.prototype);
        return _this;
    }
    return StaffFetchOneFailed;
}(errors_1.BaseError));
exports.StaffFetchOneFailed = StaffFetchOneFailed;
var StaffPutFailed = (function (_super) {
    tslib_1.__extends(StaffPutFailed, _super);
    function StaffPutFailed(message, properties) {
        if (message === void 0) { message = 'Could not alter the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPutFailed';
        Object.setPrototypeOf(_this, StaffPutFailed.prototype);
        return _this;
    }
    return StaffPutFailed;
}(errors_1.BaseError));
exports.StaffPutFailed = StaffPutFailed;
var StaffDeleteFailed = (function (_super) {
    tslib_1.__extends(StaffDeleteFailed, _super);
    function StaffDeleteFailed(message, properties) {
        if (message === void 0) { message = 'Could not delete the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffDeleteFailed';
        Object.setPrototypeOf(_this, StaffDeleteFailed.prototype);
        return _this;
    }
    return StaffDeleteFailed;
}(errors_1.BaseError));
exports.StaffDeleteFailed = StaffDeleteFailed;
var StaffMemberCreateFailed = (function (_super) {
    tslib_1.__extends(StaffMemberCreateFailed, _super);
    function StaffMemberCreateFailed(message, properties) {
        if (message === void 0) { message = 'Could not create the Staff member'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffMemberCreateFailed';
        Object.setPrototypeOf(_this, StaffMemberCreateFailed.prototype);
        return _this;
    }
    return StaffMemberCreateFailed;
}(errors_1.BaseError));
exports.StaffMemberCreateFailed = StaffMemberCreateFailed;
var StaffPinGetFailed = (function (_super) {
    tslib_1.__extends(StaffPinGetFailed, _super);
    function StaffPinGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get a unique Staff pin number'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffPinGetFailed';
        Object.setPrototypeOf(_this, StaffPinGetFailed.prototype);
        return _this;
    }
    return StaffPinGetFailed;
}(errors_1.BaseError));
exports.StaffPinGetFailed = StaffPinGetFailed;
var StaffNumberGetFailed = (function (_super) {
    tslib_1.__extends(StaffNumberGetFailed, _super);
    function StaffNumberGetFailed(message, properties) {
        if (message === void 0) { message = 'Could not get a unique Staff number'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffNumberGetFailed';
        Object.setPrototypeOf(_this, StaffNumberGetFailed.prototype);
        return _this;
    }
    return StaffNumberGetFailed;
}(errors_1.BaseError));
exports.StaffNumberGetFailed = StaffNumberGetFailed;
var MakeUserStaffFailed = (function (_super) {
    tslib_1.__extends(MakeUserStaffFailed, _super);
    function MakeUserStaffFailed(message, properties) {
        if (message === void 0) { message = 'Could not make the staff member a user'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'MakeUserStaffFailed';
        Object.setPrototypeOf(_this, MakeUserStaffFailed.prototype);
        return _this;
    }
    return MakeUserStaffFailed;
}(errors_1.BaseError));
exports.MakeUserStaffFailed = MakeUserStaffFailed;
var StaffMetaFailed = (function (_super) {
    tslib_1.__extends(StaffMetaFailed, _super);
    function StaffMetaFailed(message, properties) {
        if (message === void 0) { message = 'Could not get meta of staff'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffMetaFailed';
        Object.setPrototypeOf(_this, StaffMetaFailed.prototype);
        return _this;
    }
    return StaffMetaFailed;
}(errors_1.BaseError));
exports.StaffMetaFailed = StaffMetaFailed;
var StaffSearchFailed = (function (_super) {
    tslib_1.__extends(StaffSearchFailed, _super);
    function StaffSearchFailed(message, properties) {
        if (message === void 0) { message = 'Could not search for staff'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'StaffSearchFailed';
        Object.setPrototypeOf(_this, StaffSearchFailed.prototype);
        return _this;
    }
    return StaffSearchFailed;
}(errors_1.BaseError));
exports.StaffSearchFailed = StaffSearchFailed;
//# sourceMappingURL=staff.js.map