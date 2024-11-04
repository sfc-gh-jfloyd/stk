export interface QueryResponse {
    cols: {
        name: string;
        type: string;
    }[];
    rows: string[][];
}
/**
 * Privileges that can be granted to a native app
 */
export type APPLICATION_GRANTS = "EXECUTE TASK" | "EXECUTE MANAGED TASK" | "CREATE WAREHOUSE" | "MANAGE WAREHOUSES" | "CREATE DATABASE" | "CREATE SHARE" | "CREATE API INTEGRATION" | "IMPORTED PRIVILEGES ON SNOWFLAKE DB" | "IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE" | "CREATE COMPUTE POOL" | "BIND SERVICE ENDPOINT";
/**
 * Request for query to be execute with user's full privileges
 */
export interface QueryRequestArgs {
    /**
     * Query to be executed upon user approval
     */
    query: {
        sql: string;
        values: (string | boolean | number)[];
    };
    /**
     * Reason why this query is needed
     */
    reason: string;
}
/**
 * Requests which can be made to Snowflake
 */
export interface SnowflakeRequests {
    /**
     * Execute a query using the privileges of the user's application role
     */
    executeQuery: (sql: string, ...values: (string | boolean | number)[]) => Promise<QueryResponse>;
    /**
     * Request that the user configure the given reference
     */
    requestReference: (referenceName: string) => Promise<void>;
    /**
     * Request that the user grant the given privileges
     */
    requestPrivileges: (privileges: APPLICATION_GRANTS[]) => Promise<void>;
    /**
     * Request that the user allow the given query to be executed one-time using their full privileges
     */
    requestQuery: (args: QueryRequestArgs) => Promise<QueryResponse>;
    /**
     * Sets the paths of the app. Only needed when running a native app inside of Snowsight.
     */
    setPath: (path: string) => Promise<void>;
    /**
     * Gets the user specified name of this native app
     */
    getAppName: () => Promise<string>;
    /**
     * Gets the Snowsight URL for this user's native app instance
     */
    getSnowsightNativeAppUrl: () => Promise<string>;
}
/**
 * Map to include all snowlet request function names
 */
export declare const SNOWSIGHT_REQUEST_FUNCTION_NAME_MAP: {
    [key in keyof SnowflakeRequests]: true;
};
