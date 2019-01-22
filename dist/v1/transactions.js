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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var qs_1 = __importDefault(require("qs"));
var errors = __importStar(require("../errors"));
var SignatureTypes;
(function (SignatureTypes) {
    SignatureTypes["Fiksaltrust"] = "fiskaltrust";
})(SignatureTypes || (SignatureTypes = {}));
var Transactions = /** @class */ (function () {
    function Transactions(options, http) {
        this.options = options;
        this.http = http;
        // this.signing = new Signing(options, http)
        this.endpoint = '/api/v1/transactions';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Transactions.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response_1, error_1;
            var _this = this;
            return __generator(this, function (_a) {
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
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_1 = _a.sent();
                        if (response_1.data.cursor && response_1.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_1.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_1.data.results,
                                metadata: { count: response_1.data.count, cursor: response_1.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionFetchFailed(undefined, { error: error_1 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Transactions.prototype.meta = function (q) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, queryString, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/meta";
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        queryString = qs_1.default.stringify(q);
                        if (queryString) {
                            uri = uri + "?" + queryString;
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 2:
                        response = _a.sent();
                        if (response.status !== 200)
                            reject(new errors.TransactionsGetMetaFailed());
                        return [2 /*return*/, resolve({
                                data: response.data.results[0],
                                metadata: { count: response.data.count }
                            })];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionsGetMetaFailed(undefined, { error: error_2 }))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return Transactions;
}());
exports.Transactions = Transactions;
var TransactionsLegacy = /** @class */ (function () {
    function TransactionsLegacy(options, http) {
        this.options = options;
        this.http = http;
        this.signing = new Signing(options, http);
        this.endpoint = '/api/v1/transactions';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    TransactionsLegacy.prototype.getAll = function (query) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var next, uri, response_2, error_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/legacy";
                        }
                        return [4 /*yield*/, this.http.getClient().get(uri)];
                    case 1:
                        response_2 = _a.sent();
                        if (response_2.data.cursor && response_2.data.cursor.next) {
                            next = function () { return _this.getAll({ uri: response_2.data.cursor.next }); };
                        }
                        return [2 /*return*/, resolve({
                                data: response_2.data.results,
                                metadata: { count: response_2.data.count, cursor: response_2.data.cursor },
                                next: next
                            })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionFetchFailed(undefined, { error: error_3 }))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    TransactionsLegacy.prototype.pdfUri = function (requestObject) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var query, transactionId, template, uri, response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = requestObject.query, transactionId = requestObject.transactionId, template = requestObject.template;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        uri = void 0;
                        if (query && query.uri) {
                            uri = query.uri;
                        }
                        else {
                            uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/" + transactionId + "/legacy/" + template + "/pdf";
                        }
                        if (query && query.format) {
                            uri = uri + "?format=" + query.format;
                        }
                        return [4 /*yield*/, this.http.getClient().post(uri, null, {
                                headers: {
                                    Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
                                }
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionPdfFailed(err_1.message))];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    return TransactionsLegacy;
}());
exports.TransactionsLegacy = TransactionsLegacy;
var Signing = /** @class */ (function () {
    function Signing(options, http) {
        this.options = options;
        this.http = http;
        this.endpoint = '/api/v1/transactions';
        this.options.base = this.options.base || 'https://api.tillhub.com';
    }
    Signing.prototype.initialise = function (singingResourceType, singingResource, signingSystem, signingConfiguration) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/initialise";
                        return [4 /*yield*/, this.http.getClient().post(uri, signingConfiguration, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionSigningInitialisationFailed(err_2.message))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Signing.prototype.yearly = function (singingResourceType, singingResource, signingSystem) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/yearly";
                        return [4 /*yield*/, this.http.getClient().post(uri, undefined, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionSigningYearlyReceiptFailed(err_3.message))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Signing.prototype.monthly = function (singingResourceType, singingResource, signingSystem) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/monthly";
                        return [4 /*yield*/, this.http.getClient().post(uri, undefined, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 2:
                        err_4 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionSigningMonthlyReceiptFailed(err_4.message))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    Signing.prototype.zero = function (singingResourceType, singingResource, signingSystem) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var uri, response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        uri = "" + this.options.base + this.endpoint + "/" + this.options.user + "/legacy/signing/" + singingResourceType + "/" + singingResource + "/" + signingSystem + "/zero";
                        return [4 /*yield*/, this.http.getClient().post(uri, undefined, {
                                headers: {
                                    Accept: 'application/json'
                                }
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, resolve({
                                data: response.data.results
                            })];
                    case 2:
                        err_5 = _a.sent();
                        return [2 /*return*/, reject(new errors.TransactionSigningZeroReceiptFailed(err_5.message))];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    return Signing;
}());
exports.Signing = Signing;
//# sourceMappingURL=transactions.js.map