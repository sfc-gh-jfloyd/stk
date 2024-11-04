import * as SnowsightClient from "./snowlet/SnowletClient";
import * as SnowletClient from "./snowsight/SnowsightClient";
export interface ClientConfig {
    targetOrigin: string;
    targetWindow: Window;
}
export declare const createSnowletClient: ({ targetOrigin, targetWindow }: ClientConfig) => SnowsightClient.SnowletClient;
export declare let snowsightClient: SnowletClient.SnowsightClient;
export declare const getSnowsightClient: () => SnowletClient.SnowsightClient;
export { SnowletClient } from './snowlet/SnowletClient';
export { SnowletRequests } from './snowlet/SnowletRequests';
export * from './snowsight/SnowsightClient';
export * from './snowsight/SnowsightRequests';
