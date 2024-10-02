export interface Message {
    id: string;
    [key: string]: any;
}
export type DeregisterListener = () => void;
export interface PubSub {
    publish: (event: string, message: Message) => void;
    subscribe: (event: string, listener: (message: Message) => void) => DeregisterListener;
}
export interface PubSubConfig {
    channelId: string;
    postMessage: (message: any) => void;
    addMessageListener: (listener: (message: any) => void) => void;
    removeMessageListener: (listener: (message: any) => void) => void;
}
export declare const createPubSub: ({ channelId, postMessage, addMessageListener, removeMessageListener }: PubSubConfig) => PubSub;
