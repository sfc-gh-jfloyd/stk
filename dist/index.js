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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSnowsightClient = exports.snowsightClient = exports.createSnowletClient = void 0;
const PubSub_1 = require("./pubsub/PubSub");
const SnowsightClient = __importStar(require("./snowlet/SnowletClient"));
const SnowletClient = __importStar(require("./snowsight/SnowsightClient"));
const createSnowletClient = ({ targetOrigin, targetWindow }) => (SnowsightClient.createSnowletClient((0, PubSub_1.createPubSub)({
    pubsubId: 'snowsight',
    targetOrigin,
    targetWindow,
})));
exports.createSnowletClient = createSnowletClient;
const createSnowletDevClient = () => {
    const snowsightClient = SnowletClient.createSnowsightClient((0, PubSub_1.createPubSub)({
        pubsubId: 'snowlet',
        targetOrigin: "*",
        targetWindow: window.opener,
    }));
    const createPopupHandler = (functionName) => {
        return (...args) => __awaiter(void 0, void 0, void 0, function* () {
            const sdkUrl = yield snowsightClient.getSdkUrl();
            const snowsight = window.open(sdkUrl, '_blank', `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=600,left=${window.screenX + window.innerWidth / 2 - 400},top=${window.screenY + window.innerHeight / 2 - 300}`);
            const windowSnowletClient = SnowletClient.createSnowsightClient((0, PubSub_1.createPubSub)({
                pubsubId: 'snowlet',
                targetOrigin: new URL(sdkUrl).origin,
                targetWindow: snowsight,
            }));
            const fn = windowSnowletClient[functionName];
            const result = yield fn(...args);
            snowsight === null || snowsight === void 0 ? void 0 : snowsight.close();
            return result;
        });
    };
    return Object.assign(Object.assign({}, snowsightClient), { requestReference: createPopupHandler('requestReference'), requestPrivileges: createPopupHandler('requestPrivileges'), requestQuery: createPopupHandler('requestQuery'), setPath: () => Promise.resolve(), setHandler: (name, fn) => {
            if (name === 'setPath') {
                return () => undefined;
            }
            return snowsightClient.setHandler(name, fn);
        } });
};
const createSnowletIframeClient = () => {
    return SnowletClient.createSnowsightClient((0, PubSub_1.createPubSub)({
        pubsubId: 'snowlet',
        targetOrigin: "*",
        targetWindow: window.parent,
    }));
};
exports.snowsightClient = window.opener ? createSnowletDevClient() : createSnowletIframeClient();
const getSnowsightClient = () => {
    return exports.snowsightClient;
};
exports.getSnowsightClient = getSnowsightClient;
__exportStar(require("./snowsight/SnowsightClient"), exports);
__exportStar(require("./snowsight/SnowsightRequests"), exports);
