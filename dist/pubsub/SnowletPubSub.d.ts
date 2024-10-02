import { PubSub } from "./PubSub";
export interface SnowletPubSub {
    channelId: string;
    iframe: HTMLIFrameElement;
}
/**
 * Create pubsub for communicating with Snowlet
 */
export declare const createSnowletPubSub: ({ channelId, iframe }: SnowletPubSub) => PubSub;
