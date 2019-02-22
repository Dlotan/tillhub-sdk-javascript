import { Client } from '../client';
export interface CustomersOptions {
    user?: string;
    base?: string;
}
export interface CustomersQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
    };
}
export interface CustomersCreateOptions {
    generate_customer_number?: boolean;
}
export interface CustomersMetaQuery {
    deleted?: boolean;
}
export interface CustomersResponse {
    data: Customer[];
    metadata: object;
    next?: () => Promise<CustomersResponse>;
}
export interface CustomerResponse {
    data: Customer;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Customer {
    id?: string;
}
export interface CustomerPhonenumbers {
    main?: string;
    home?: string;
    mobile?: string;
    work?: string;
}
export interface CustomerContacts {
    email?: {
        enabled: boolean;
    };
    newsletter?: {
        enabled: boolean;
    };
    phone?: {
        enabled: boolean;
    };
    post?: {
        enabled: boolean;
    };
}
export declare type CustomerAddressType = 'delivery' | 'billing';
export interface CustomerAddress {
    lines: string[] | null;
    street: string | null;
    street_number: string | null;
    locality: string | null;
    region: string | null;
    postal_code: string | null;
    country: string | null;
    type: CustomerAddressType | null;
}
export interface CustomerCompany {
    name: string;
}
export interface CustomerImage {
    '1x': string;
    avatar: string;
}
export interface CustomerInternalDiscount {
    id: string;
    amount: number;
    type: 'percentage' | 'value';
    account: string;
    name: string;
    group: 'cart' | 'customer';
}
export interface CustomerDiscount {
    amount: number;
    type: 'percent' | 'value';
    group: 'cart' | 'customer';
}
export interface Customer {
    gender?: string | null;
    firstname?: string;
    lastname?: string;
    middlename?: string | null;
    displayname?: string | null;
    phonenumbers?: string | null;
    email?: string | null;
    customer_number?: string | null;
    company?: CustomerCompany | null;
    description?: string | null;
    is_b2b?: boolean;
    date_of_birth?: string | null;
    image?: CustomerImage | null;
    active?: boolean;
    contacts?: CustomerContacts | null;
    metadata?: object | null;
    addresses?: CustomerAddress[] | null;
    comment?: string | null;
    discounts?: Array<CustomerInternalDiscount | CustomerDiscount> | null;
    client_id?: string | null;
    external_reference?: string | null;
}
export declare class Customers {
    endpoint: string;
    http: Client;
    options: CustomersOptions;
    constructor(options: CustomersOptions, http: Client);
    getAll(queryOrOptions?: CustomersQuery | undefined): Promise<CustomersResponse>;
    get(customerId: string): Promise<CustomerResponse>;
    put(customerId: string, customer: Customer): Promise<CustomerResponse>;
    create(customer: Customer, options?: CustomersCreateOptions): Promise<CustomerResponse>;
    meta(q?: CustomersMetaQuery | undefined): Promise<CustomersResponse>;
    delete(customerId: string): Promise<CustomerResponse>;
    count(): Promise<CustomersResponse>;
    search(searchTerm: string): Promise<CustomersResponse>;
}
