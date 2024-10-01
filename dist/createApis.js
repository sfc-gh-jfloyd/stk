"use strict";
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
exports.createApis = void 0;
const AppIdManager_1 = require("./AppIdManager");
const MessageManager_1 = require("./MessageManager");
const ResponseListener_1 = require("./ResponseListener");
const createApis = () => {
    const { getAppId, setAppId } = (0, AppIdManager_1.createAppIdManager)();
    setAppId(window.snowletAppId);
    return {
        createClient: () => __awaiter(void 0, void 0, void 0, function* () {
            const appId = yield getAppId();
            console.log("client", { appId });
            const responseListener = (0, ResponseListener_1.createResponseListener)();
            const { sendMessage } = (0, MessageManager_1.createMessageManager)(appId, responseListener);
            const createFunction = (functionName) => {
                return (...args) => {
                    return sendMessage({
                        functionName,
                        args,
                    });
                };
            };
            return {
                executeQuery: createFunction('executeQuery'),
                requestPrivileges: createFunction('requestPrivileges'),
                requestReference: createFunction('requestReference'),
                setPath: createFunction('setPath'),
                addPathListener: (listener) => {
                    window.addEventListener('message', (e) => {
                        const { data } = e;
                        const { snowletPath } = data;
                        listener(snowletPath);
                    });
                },
            };
        }),
    };
};
exports.createApis = createApis;
