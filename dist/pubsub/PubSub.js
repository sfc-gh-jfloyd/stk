"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPubSub = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["REQUEST"] = "REQUEST";
    MessageType["RESPONSE"] = "RESPONSE";
})(MessageType || (exports.MessageType = MessageType = {}));
const createPubSub = ({ pubsubId, targetOrigin, targetWindow }) => {
    return {
        publish: (event, message) => {
            const pubsubMessage = {
                pubsubId,
                event,
                message,
            };
            targetWindow.postMessage(pubsubMessage, targetOrigin);
        },
        subscribe: (event, listener) => {
            let unsubscribe;
            const wrappedListener = ({ data: pubsubMessage, origin }) => {
                // Ignore messages from other origins, events, and messages from this pubsub
                if (pubsubMessage.event !== event || pubsubMessage.pubsubId === pubsubId) {
                    return;
                }
                listener(pubsubMessage.message, unsubscribe);
            };
            window.addEventListener('message', wrappedListener);
            unsubscribe = () => {
                window.removeEventListener('message', wrappedListener);
            };
            return unsubscribe;
        },
    };
};
exports.createPubSub = createPubSub;
