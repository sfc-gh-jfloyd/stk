import { PubSub } from "./PubSub";
export interface SnowsightPubSubConfig {
    channelId: string;
    iframe: HTMLIFrameElement;
}
export declare const createSnowsightPubSub: ({ channelId, iframe }: SnowsightPubSubConfig) => PubSub;
