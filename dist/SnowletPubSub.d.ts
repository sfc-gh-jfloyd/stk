import { PubSub } from "./PubSub";
export interface SnowletPubSubConfig {
    channelId: string;
}
export declare const createSnowletPubSub: ({ channelId }: SnowletPubSubConfig) => PubSub;
