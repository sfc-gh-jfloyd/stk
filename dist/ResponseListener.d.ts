export interface MessageData {
    messageId: string;
    response: {
        error: any;
        value: any;
    };
}
export interface ResponseListener {
    set: (messageId: string, resolve: (value: any) => void, reject: (value: any) => void) => void;
    start: () => void;
    stop: () => void;
}
export declare const createResponseListener: () => ResponseListener;
