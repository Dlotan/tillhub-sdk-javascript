import { Client } from '../client';
export interface CustomersOptions {
    user?: string;
    base?: string;
}
export interface CustomersQuery {
    limit?: number;
    uri?: string;
}
export interface CustomersResponse {
    data: object[];
    metadata: object;
    msg?: string;
}
export declare class Customers {
    endpoint: string;
    http: Client;
    options: CustomersOptions;
    constructor(options: CustomersOptions, http: Client);
    getAll(query?: CustomersQuery | undefined): Promise<CustomersResponse>;
    delete(customerId: string): Promise<CustomersResponse>;
    count(): Promise<CustomersResponse>;
}