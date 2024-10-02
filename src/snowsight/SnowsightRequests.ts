export interface QueryResponse {
  cols: {
    name: string;
    type: string;
  }[];
  rows: string[][];
}

export type APPLICATION_GRANTS = "EXECUTE TASK" | "EXECUTE MANAGED TASK" | "CREATE WAREHOUSE" | "MANAGE WAREHOUSES" | "CREATE DATABASE" | "CREATE SHARE" | "CREATE API INTEGRATION" | "IMPORTED PRIVILEGES ON SNOWFLAKE DB" | "IMPORTED PRIVILEGES ON DATABASE SNOWFLAKE" | "CREATE COMPUTE POOL" | "BIND SERVICE ENDPOINT";

/**
 * Requests which can be made to Snowsight
 */
export interface SnowsightRequests {
  executeQuery: (sql: string, ...values: (string | boolean | number)[]) => Promise<QueryResponse>;
  requestReference: (referenceName: string) => Promise<void>;
  requestPrivileges: (privileges: APPLICATION_GRANTS[]) => Promise<void>;
  setPath: (path: string) => Promise<void>;
}

/**
 * Map to include all snowlet request function names
 */
export const SNOWSIGHT_REQUEST_FUNCTION_NAME_MAP: { [key in keyof SnowsightRequests]: true } = {
  executeQuery: true,
  requestPrivileges: true,
  requestReference: true,
  setPath: true,
};
