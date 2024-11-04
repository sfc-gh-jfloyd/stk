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
    pubsubId: string;
    event: string;
    message: Message;
}
export interface PubSubConfig {
    pubsubId: string;
    targetOrigin: string;
    targetWindow: Window;
}
export declare const createPubSub: ({ pubsubId, targetOrigin, targetWindow }: PubSubConfig) => PubSub;
