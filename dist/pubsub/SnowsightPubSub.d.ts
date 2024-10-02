import { PubSub } from "./PubSub";
export interface SnowsightPubSubConfig {
    channelId: string;
}
/**
 * Create subsub for communicating with Snowsight
 */
export declare const createSnowsightPubSub: ({ channelId }: SnowsightPubSubConfig) => PubSub;
