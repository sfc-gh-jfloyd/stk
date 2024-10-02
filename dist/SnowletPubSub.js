"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowletPubSub = void 0;
const PubSub_1 = require("./PubSub");
const createSnowletPubSub = ({ channelId }) => {
    return (0, PubSub_1.createPubSub)({
        channelId,
        postMessage: message => window.parent.postMessage(message, '*'),
        addMessageListener: listener => window.addEventListener('message', listener),
        removeMessageListener: listener => window.removeEventListener('message', listener),
    });
};
exports.createSnowletPubSub = createSnowletPubSub;
