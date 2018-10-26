import { Client } from '../client';
export interface OrdersOptions {
    user?: string;
    base?: string;
}
export interface OrdersQuery {
    limit?: number;
    uri?: string;
    itemId?: string;
    order?: string;
    auto?: boolean;
    suggestion?: boolean;
    order_qty?: number;
}
export interface OrdersResponse {
    data: object[];
    metadata: object;
    msg?: string;
}
export interface OrderItems {
    added_at: string;
    issuer: object;
    order_qty: number;
    auto: boolean;
    suggestion: boolean;
    deleted?: boolean;
    order: string;
    product: string;
    stock?: string;
    location: string;
}
export interface OrderItemsCreateRequest {
    order_items: OrderItems[];
}
export declare class Orders {
    endpoint: string;
    http: Client;
    options: OrdersOptions;
    constructor(options: OrdersOptions, http: Client);
    getAll(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOrderItems(orderId: string | undefined): Promise<OrdersResponse>;
    deleteOrderItems(query: OrdersQuery): Promise<OrdersResponse>;
    createOrderItems(body: OrderItemsCreateRequest): Promise<OrdersResponse>;
    updateOrderItems(items: OrderItems[]): Promise<OrdersResponse>;
    getIncomingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    getOutgoingOrders(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
}
