import { Client } from '../client';
export interface AuditsOptions {
    user?: string;
    base?: string;
}
export interface AuditsQuery {
    type?: string | string[];
    limit?: number;
    cursor_field?: string;
    embed?: string | string[];
    uri?: string;
    branch?: string;
    register?: string;
    staff?: string;
    start?: string;
    end?: string;
}
export interface AuditsMetaQuery {
    type?: string | string[];
}
export interface AuditActionsGetOneRequestObject {
    auditActionId: string;
    query?: AuditsQuery;
}
export interface AuditActionsCreateBody {
    actions: object[];
}
export interface AuditsResponse {
    data?: object[];
    metadata?: object;
    msg?: string;
    next?: () => Promise<AuditsResponse>;
}
export declare class AuditActions {
    endpoint: string;
    http: Client;
    options: AuditsOptions;
    constructor(options: AuditsOptions, http: Client);
    getAll(q?: AuditsQuery | undefined): Promise<AuditsResponse>;
    meta(q?: AuditsMetaQuery | undefined): Promise<AuditsResponse>;
    get(requestObject: AuditActionsGetOneRequestObject): Promise<AuditsResponse>;
    create(body: AuditActionsCreateBody): Promise<AuditsResponse>;
}
