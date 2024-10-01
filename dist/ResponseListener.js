"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResponseListener = void 0;
const createResponseListener = () => {
    const callTrackingMap = {};
    const onMessageEvent = (event) => {
        const { data } = event;
        if (!data) {
            return;
        }
        const { messageId, response } = data;
        if (!messageId || !response) {
            return;
        }
        const callHandler = callTrackingMap[messageId];
        if (!callHandler) {
            console.error(`No handler found for message ${messageId}`);
            return;
        }
        if (response.error) {
            callTrackingMap[messageId].reject(response.error);
        }
        else {
            callTrackingMap[messageId].resolve(response.value);
        }
        delete callTrackingMap[messageId];
    };
    return {
        set: (messageId, resolve, reject) => {
            callTrackingMap[messageId] = { resolve, reject };
        },
        start: () => {
            window.addEventListener("message", onMessageEvent);
        },
        stop: () => {
            window.removeEventListener("message", onMessageEvent);
        },
    };
};
exports.createResponseListener = createResponseListener;
