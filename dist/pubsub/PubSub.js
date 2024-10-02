"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPubSub = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["REQUEST"] = "REQUEST";
    MessageType["RESPONSE"] = "RESPONSE";
})(MessageType || (exports.MessageType = MessageType = {}));
const createPubSub = ({ channelId, pubsubId, postMessage, addMessageListener, removeMessageListener }) => {
    return {
        publish: (event, message) => {
            // console.log('publish', event, message)
            const pubsubMessage = {
                channelId,
                pubsubId,
                event,
                message,
            };
            postMessage(pubsubMessage);
        },
        subscribe: (event, listener) => {
            let unsubscribe;
            const wrappedListener = ({ data: pubsubMessage }) => {
                // Ignore messages from other channels, events, and messages from this pubsub
                if (pubsubMessage.channelId !== channelId || pubsubMessage.event !== event || pubsubMessage.pubsubId === pubsubId) {
                    return;
                }
                // console.log('subscribe', pubsubMessage, pubsubId);
                listener(pubsubMessage.message, unsubscribe);
            };
            addMessageListener(wrappedListener);
            unsubscribe = () => {
                removeMessageListener(wrappedListener);
            };
            return unsubscribe;
        },
    };
};
exports.createPubSub = createPubSub;
