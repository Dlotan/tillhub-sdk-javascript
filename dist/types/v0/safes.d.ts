import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface SafesOptions {
    user?: string;
    base?: string;
}
export interface SafesQuery {
    limit?: number;
    uri?: string;
}
export interface SafeResponse {
    data: SafesResponse;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface SafesResponse {
    data: object[];
    metadata: object;
}
export interface AmountItem {
    currency: string;
    amount: number;
}
export interface Safe {
    type?: string;
    account_number?: string;
    name?: string;
    custom_id?: string;
    cost_center?: string;
    location?: string;
    state?: string;
    limit_upper?: number;
    limit_lower?: number;
    items?: Array<AmountItem> | null;
    metadata?: object;
    deleted?: boolean;
    active?: boolean;
}
export declare class Safes {
    endpoint: string;
    http: Client;
    options: SafesOptions;
    uriHelper: UriHelper;
    constructor(options: SafesOptions, http: Client);
    getAll(query?: SafesQuery | undefined): Promise<SafesResponse>;
    get(safeId: string): Promise<SafeResponse>;
    meta(): Promise<SafesResponse>;
    create(safe: Safe): Promise<SafeResponse>;
    put(safeId: string, safe: Safe): Promise<SafeResponse>;
}