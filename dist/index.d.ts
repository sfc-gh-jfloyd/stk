import * as SnowsightClient from "./snowlet/SnowletClient";
export interface SnowletClientConfig {
    snowletId: string;
    iframe: HTMLIFrameElement;
}
export declare const createSnowletClient: ({ snowletId, iframe }: SnowletClientConfig) => SnowsightClient.SnowletClient;
export declare const snowsightClient: import("./snowsight/SnowsightClient").SnowsightClient;
export { SnowletClient } from './snowlet/SnowletClient';
export { SnowletRequests } from './snowlet/SnowletRequests';
export * from './snowsight/SnowsightClient';
export * from './snowsight/SnowsightRequests';
