"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowsightPubSub = void 0;
const PubSub_1 = require("./PubSub");
const createSnowsightPubSub = ({ channelId, iframe }) => {
    return (0, PubSub_1.createPubSub)({
        channelId,
        postMessage: message => { var _a; return (_a = iframe.contentWindow) === null || _a === void 0 ? void 0 : _a.postMessage(message, '*'); },
        addMessageListener: listener => window.addEventListener('message', listener),
        removeMessageListener: listener => window.removeEventListener('message', listener),
    });
};
exports.createSnowsightPubSub = createSnowsightPubSub;
