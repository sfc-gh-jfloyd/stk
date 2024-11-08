"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowletPubSub = void 0;
const PubSub_1 = require("./PubSub");
/**
 * Create pubsub for communicating with Snowlet
 */
const createSnowletPubSub = ({ channelId, iframe }) => {
    const iframeUrl = new URL(iframe.src);
    console.log({ origin: iframeUrl });
    return (0, PubSub_1.createPubSub)({
        channelId,
        pubsubId: 'snowletPubSub',
        postMessage: message => { var _a; return (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(message, iframeUrl.origin); },
        addMessageListener: listener => window.addEventListener('message', listener),
        removeMessageListener: listener => window.removeEventListener('message', listener),
    });
};
exports.createSnowletPubSub = createSnowletPubSub;
