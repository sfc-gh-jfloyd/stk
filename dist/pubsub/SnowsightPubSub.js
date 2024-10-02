"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowsightPubSub = void 0;
const PubSub_1 = require("./PubSub");
/**
 * Create subsub for communicating with Snowsight
 */
const createSnowsightPubSub = ({ channelId }) => {
    return (0, PubSub_1.createPubSub)({
        channelId,
        postMessage: message => window.parent.postMessage(message, '*'),
        addMessageListener: listener => window.addEventListener('message', listener),
        removeMessageListener: listener => window.removeEventListener('message', listener),
    });
};
exports.createSnowsightPubSub = createSnowsightPubSub;
