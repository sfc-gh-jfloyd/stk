import { ResponseListener } from "./ResponseListener";
export interface Message {
    functionName: string;
    args: any[];
}
export interface MessageManager {
    sendMessage: (message: Message) => Promise<any>;
}
export declare const createMessageManager: (appId: string, responseListener: ResponseListener) => MessageManager;
