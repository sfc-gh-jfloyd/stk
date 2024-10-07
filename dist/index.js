"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.snowsightClient = exports.createSnowletClient = void 0;
const SnowletPubSub_1 = require("./pubsub/SnowletPubSub");
const SnowsightPubSub_1 = require("./pubsub/SnowsightPubSub");
const SnowsightClient = __importStar(require("./snowlet/SnowletClient"));
const SnowsightClient_1 = require("./snowsight/SnowsightClient");
const createSnowletClient = ({ snowletId, iframe }) => (SnowsightClient.createSnowletClient((0, SnowletPubSub_1.createSnowletPubSub)({
    channelId: snowletId,
    iframe,
})));
exports.createSnowletClient = createSnowletClient;
const snowletId = window.snowletId || new URLSearchParams(window.location.search).get("snowletId");
if (snowletId) {
    const meta = document.createElement('meta');
    meta.httpEquiv = "Content-Security-Policy";
    meta.content = `default-src ${window.location.origin}; style-src ${window.location.origin} 'unsafe-inline'; script-src ${window.location.origin} 'unsafe-inline'; connect-src ${window.location.origin} ws://${window.location.host}/ws; frame-src 'none';`;
    document.head.append(meta);
}
exports.snowsightClient = (0, SnowsightClient_1.createSnowsightClient)((0, SnowsightPubSub_1.createSnowsightPubSub)({
    channelId: snowletId,
}));
__exportStar(require("./snowsight/SnowsightClient"), exports);
__exportStar(require("./snowsight/SnowsightRequests"), exports);
