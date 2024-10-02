"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPubSub = void 0;
const createPubSub = ({ channelId, postMessage, addMessageListener, removeMessageListener }) => {
    return {
        publish: (event, message) => {
            const pubsubMessage = {
                channelId,
                event,
                message,
            };
            console.log({ event, pubsubMessage });
            postMessage(pubsubMessage);
        },
        subscribe: (event, listener) => {
            const wrappedListener = ({ data: pubsubMessage }) => {
                // Ignore messages from other channels or events
                if (pubsubMessage.channelId !== channelId || pubsubMessage.event !== event) {
                    return;
                }
                console.log(pubsubMessage);
                listener(pubsubMessage.message);
            };
            addMessageListener(wrappedListener);
            return () => {
                removeMessageListener(wrappedListener);
            };
        },
    };
};
exports.createPubSub = createPubSub;