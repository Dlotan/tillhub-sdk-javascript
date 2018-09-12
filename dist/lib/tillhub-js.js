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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var transactions_1 = require("./v0/transactions");
var v0 = __importStar(require("./v0"));
exports.v0 = v0;
var v1 = __importStar(require("./v1"));
exports.v1 = v1;
var deliveries_1 = require("./v0/deliveries");
var client_1 = require("./client");
var errors = __importStar(require("./errors"));
exports.defaultOptions = {
    base: 'https://api.tillhub.com'
};
var TillhubClient = /** @class */ (function () {
    function TillhubClient(options) {
        // super()
        if (!options)
            return;
        this.handleOptions(options);
    }
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    TillhubClient.prototype.init = function (options) {
        if (options === void 0) { options = exports.defaultOptions; }
        // in cases where credentials and / or tokens and / or users are already
        // we will short circuit the client initialisations
        if (this.handleOptions(options))
            return;
        // in all other cases we will instantiate clients, that need to be authenticated
        // by the caller before any API will be available
        var clientOptions = {
            headers: {}
        };
        this.auth = new v1.Auth({ base: options ? options.base : exports.defaultOptions.base });
        this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
    };
    TillhubClient.prototype.handleOptions = function (options) {
        this.options = options;
        this.options.base = this.options.base || 'https://api.tillhub.com';
        this.user = this.options.user;
        if (options.credentials) {
            var authOptions = {
                credentials: options.credentials,
                base: this.options.base,
                user: this.user
            };
            var clientOptions = {
                headers: {}
            };
            this.auth = new v1.Auth(authOptions);
            this.http = client_1.Client.getInstance(clientOptions).setDefaults(clientOptions);
            return true;
        }
        return false;
    };
    /**
     * Create an authenticated transactions instance
     *
     */
    TillhubClient.prototype.transactions = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new transactions_1.Transactions({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.prototype.taxes = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new v0.Taxes({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.prototype.product = function () {
        if (!this.options || !this.options.base || !this.http || !this.auth) {
            throw new errors.UninstantiatedClient();
        }
        return new v1.Product({ user: this.auth.user, base: this.options.base }, this.http);
    };
    TillhubClient.prototype.deliveries = function () {
        if (!this.options ||
            !this.options.base ||
            !this.http ||
            !this.auth ||
            !this.auth.authenticated) {
            throw new errors.UninstantiatedClient();
        }
        return new deliveries_1.Deliveries({ user: this.auth.user, base: this.options.base }, this.http);
    };
    return TillhubClient;
}());
exports.TillhubClient = TillhubClient;
var Tillhub = /** @class */ (function (_super) {
    __extends(Tillhub, _super);
    function Tillhub(options) {
        return _super.call(this, options) || this;
    }
    Tillhub.getInstance = function (options) {
        if (!Tillhub.instance) {
            Tillhub.instance = new Tillhub(options);
        }
        return Tillhub.instance;
    };
    return Tillhub;
}(TillhubClient));
exports.Tillhub = Tillhub;
exports.default = Tillhub.getInstance({ base: exports.defaultOptions.base });
//# sourceMappingURL=tillhub-js.js.map