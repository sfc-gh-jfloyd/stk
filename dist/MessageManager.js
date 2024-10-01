"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageManager = void 0;
const createMessageManager = (appId, responseListener) => {
    responseListener.start();
    let messageCount = 0;
    const getUniqueMessageId = () => {
        messageCount += 1;
        return `${appId}.${messageCount}`;
    };
    const send = (message) => {
        window.parent.postMessage(message, "*");
    };
    return {
        sendMessage: (message) => {
            console.log("client", { message });
            return new Promise((resolve, reject) => {
                const messageId = getUniqueMessageId();
                const wrappedMessage = Object.assign(Object.assign({}, message), { appId,
                    messageId });
                responseListener.set(messageId, resolve, reject);
                send(wrappedMessage);
            });
        },
    };
};
exports.createMessageManager = createMessageManager;
