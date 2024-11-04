"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowsightPubSub = void 0;
const PubSub_1 = require("./PubSub");
/**
 * Create subsub for communicating with Snowsight
 */
const createSnowsightPubSub = ({ channelId }) => {
    const snowsightUrl = new URL(window.parent.location.href);
    console.log({ snowsightUrl });
    return (0, PubSub_1.createPubSub)({
        channelId,
        pubsubId: 'snowsightPubSub',
        postMessage: message => window.parent.postMessage(message, snowsightUrl.origin),
        addMessageListener: listener => window.addEventListener('message', listener),
        removeMessageListener: listener => window.removeEventListener('message', listener),
    });
};
exports.createSnowsightPubSub = createSnowsightPubSub;
