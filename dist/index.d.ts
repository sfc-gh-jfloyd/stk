import * as NativeApp from "./client/NativeAppClient";
import * as Snowflake from "./client/SnowflakeClient";
export interface ClientConfig {
    targetOrigin: string;
    targetWindow: Window;
}
export declare const createNativeAppClient: ({ targetOrigin, targetWindow }: ClientConfig) => NativeApp.NativeAppClient;
export declare const snowflakeClient: Snowflake.SnowflakeClient;
export declare const createSnowflakeClient: () => Snowflake.SnowflakeClient;
export { NativeAppClient } from './client/NativeAppClient';
export { NativeAppRequests } from './client/NativeAppRequests';
export { SnowflakeClient } from './client/SnowflakeClient';
export { SnowflakeRequests, QueryResponse } from './client/SnowflakeRequests';
export { SnowflakeTheme } from "./client/Theme";
