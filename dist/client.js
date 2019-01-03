"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var environment_1 = require("./environment");
var defaultHeaders = {
    'X-Client-Type': 'Tillhub SDK JavaScript',
    'X-Client-Version': environment_1.environment.VERSION
};
/**
 * The Tillhub HTTP client is an axios instance that carries the state of of Authentication
 * in - if default headers have been set - has Authorization header.
 *
 * Since this class is a singleton we are destroying state internally through `.clearInstance()`.
 */
var Client = /** @class */ (function () {
    function Client(options) {
        this.axiosInstance = axios_1.default.create({
            // baseURL: options.base || 'https://api.tillhub.com',
            timeout: options.timeout || 10000,
            headers: __assign({}, options.headers, defaultHeaders)
        });
    }
    Client.getInstance = function (options) {
        // use headers in any case
        if (Client.instance) {
            Client.instance.setDefaults(options);
        }
        if (!Client.instance) {
            Client.instance = new Client(options);
            // ... any one time initialization goes here ...
        }
        return Client.instance;
    };
    Client.clearInstance = function () {
        Client.instance.clearDefaults();
    };
    Client.prototype.getClient = function () {
        return this.axiosInstance;
    };
    Client.prototype.setDefaults = function (options) {
        this.axiosInstance.defaults.headers.common = __assign({}, this.axiosInstance.defaults.headers.common, options.headers);
        return Client.instance;
    };
    Client.prototype.clearDefaults = function () {
        this.axiosInstance.defaults.headers.common = __assign({}, defaultHeaders);
    };
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=client.js.map