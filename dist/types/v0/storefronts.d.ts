import { Client } from '../client';
import { BaseError } from '../errors';
import { ThBaseHandler } from '../base';
export interface StorefrontsOptions {
    user?: string;
    base?: string;
}
export interface StorefrontsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface StorefrontsResponse {
    data: Storefront[];
    metadata: object;
}
export interface StorefrontResponse {
    data: Storefront;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Storefront {
    id?: string;
    name?: string;
    description?: string;
    type?: string;
    external_system_type?: string;
    resource_syncs_outbound?: string[];
    resource_syncs_inbound?: string[];
    link?: string;
    external_reference_id?: string;
    external_api_base?: string;
    auth?: object;
    metadata?: object;
}
export declare class Storefronts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: StorefrontsOptions;
    constructor(options: StorefrontsOptions, http: Client);
    getAll(queryOrOptions?: StorefrontsQuery | undefined): Promise<StorefrontsResponse>;
    get(storefrontId: string): Promise<StorefrontResponse>;
    put(storefrontId: string, storefront: Storefront): Promise<StorefrontResponse>;
    create(storefront: Storefront): Promise<StorefrontResponse>;
    delete(storefrontId: string): Promise<StorefrontResponse>;
}
export declare class StorefrontsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontsFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontsPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontsCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class StorefrontsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}