"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VouchersFetchFailed = exports.Vouchers = void 0;
var tslib_1 = require("tslib");
var errors_1 = require("../errors");
var uri_helper_1 = require("../uri-helper");
var vouchers_1 = require("../v0/vouchers");
var Vouchers = (function (_super) {
    tslib_1.__extends(Vouchers, _super);
    function Vouchers(options, http) {
        var _this = _super.call(this, options, http) || this;
        _this.endpointV1 = Vouchers.baseEndpointV1;
        _this.uriHelperV1 = new uri_helper_1.UriHelper(_this.endpointV1, options);
        return _this;
    }
    Vouchers.prototype.getAll = function (optionsOrQuery) {
        var _this = this;
        return new Promise(function (resolve, reject) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var next, base, uri, response_1, error_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        base = this.uriHelperV1.generateBaseUri();
                        uri = this.uriHelperV1.generateUriWithQuery(base, optionsOrQuery);
                        return [4, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.status !== 200) {
                            return [2, reject(new VouchersFetchFailed(undefined, { status: response_1.status }))];
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
                        return [2, reject(new VouchersFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2];
                }
            });
        }); });
    };
    Vouchers.baseEndpointV1 = '/api/v1/vouchers';
    return Vouchers;
}(vouchers_1.Vouchers));
exports.Vouchers = Vouchers;
var VouchersFetchFailed = (function (_super) {
    tslib_1.__extends(VouchersFetchFailed, _super);
    function VouchersFetchFailed(message, properties) {
        if (message === void 0) { message = 'Could not fetch the vouchers'; }
        var _this = _super.call(this, message, properties) || this;
        _this.message = message;
        _this.name = 'VouchersFetchFailed';
        Object.setPrototypeOf(_this, VouchersFetchFailed.prototype);
        return _this;
    }
    return VouchersFetchFailed;
}(errors_1.BaseError));
exports.VouchersFetchFailed = VouchersFetchFailed;
//# sourceMappingURL=vouchers.js.map