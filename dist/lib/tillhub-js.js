"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
var EventEmitter = require("events");
var Auth_1 = require("./v0/Auth");
var Transactions_1 = require("./v0/Transactions");
var Client_1 = require("./Client");
var errors = require("./Errors");
var v0_1 = require("./v0");
exports.v0 = v0_1.default;
var v1_1 = require("./v1");
exports.v1 = v1_1.default;
var Tillhub = /** @class */ (function (_super) {
    __extends(Tillhub, _super);
    function Tillhub(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.options.base = _this.options.base || 'https://api.tillhub.com';
        var authOptions = {
            type: Auth_1.AuthTypes.username,
            credentials: options.credentials,
            base: _this.options.base
        };
        // const clientOptions: ClientOptions = {
        //   base: options.base || 'https://api.tillhub.com'
        // }
        // this.client = Client.getInstance(clientOptions)
        _this.auth = new v1_1.default.Auth(authOptions);
        return _this;
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    Tillhub.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, authErr, authResponse, clientOptions, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.auth.authenticate()];
                    case 1:
                        _a = _b.sent(), authErr = _a[0], authResponse = _a[1];
                        if (authErr)
                            throw authErr;
                        if (authResponse) {
                            this.user = authResponse.user;
                            clientOptions = {
                                headers: {
                                    Authorization: "Bearer " + authResponse.token,
                                    'X-Client-ID': authResponse.user
                                }
                            };
                            this.http = Client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
                            return [2 /*return*/, this.auth];
                        }
                        throw new errors.AuthenticationFailed();
                    case 2:
                        err_1 = _b.sent();
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Create an authenticated transactions instance
     *
     */
    Tillhub.prototype.transactions = function () {
        if (!this.http)
            throw new errors.UninstantiatedClient();
        return new Transactions_1.Transactions({ user: this.user, base: this.options.base }, this.http);
    };
    return Tillhub;
}(EventEmitter));
exports.Tillhub = Tillhub;
//# sourceMappingURL=tillhub-js.js.map