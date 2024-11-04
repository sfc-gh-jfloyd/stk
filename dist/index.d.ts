import * as NativeApp from "./client/NativeAppClient";
import * as Snowflake from "./client/SnowflakeClient";
export interface ClientConfig {
    targetOrigin: string;
    targetWindow: Window;
}
export declare const createNativeAppClient: ({ targetOrigin, targetWindow }: ClientConfig) => NativeApp.NativeAppClient;
export declare const snowflakeClient: Snowflake.SnowflakeClient;
export declare const getSnowsightClient: () => Snowflake.SnowflakeClient;
export { NativeAppClient as SnowletClient } from './client/NativeAppClient';
export { NativeAppRequests } from './client/NativeAppRequests';
export * from './client/SnowflakeClient';
export * from './client/SnowflakeRequests';
