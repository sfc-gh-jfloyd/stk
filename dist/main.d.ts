export interface QueryResponse {
    cols: {
        name: string;
        type: string;
    }[];
    rows: string[][];
}
export interface Client {
    executeQuery: (sql: string, ...values: (string | boolean | number)[]) => Promise<QueryResponse>;
}
declare const getClient: () => Promise<Client>;
export { getClient, };
