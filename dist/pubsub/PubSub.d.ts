export declare enum MessageType {
    REQUEST = "REQUEST",
    RESPONSE = "RESPONSE"
}
export interface Message {
    id: string;
    data: any;
    type: MessageType;
}
export type DeregisterListener = () => void;
export interface PubSub {
    publish: (event: string, message: Message) => void;
    subscribe: (event: string, listener: (message: Message, unsubscribe: DeregisterListener) => void) => DeregisterListener;
}
export interface PubSubMessage {
    channelId: string;
    pubsubId: string;
    event: string;
    message: Message;
}
export interface PubSubConfig {
    channelId: string;
    pubsubId: string;
    postMessage: (message: any) => void;
    addMessageListener: (listener: (message: any) => void) => void;
    removeMessageListener: (listener: (message: any) => void) => void;
}
export declare const createPubSub: ({ channelId, pubsubId, postMessage, addMessageListener, removeMessageListener }: PubSubConfig) => PubSub;
