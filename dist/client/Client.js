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
exports.createClient = void 0;
const PubSub_1 = require("../pubsub/PubSub");
const IdGenerator_1 = require("./IdGenerator");
const createClient = ({ caller, pubsub, functionNames, onLog = () => { }, }) => {
    const generateId = (0, IdGenerator_1.createIdGenerator)(caller);
    const createFunction = (functionName) => {
        return ((...args) => {
            const id = generateId();
            return new Promise((resolve, reject) => {
                pubsub.subscribe(functionName.toString(), (message, unsubscribe) => {
                    if (message.id !== id || message.type !== PubSub_1.MessageType.RESPONSE) {
                        return;
                    }
                    if ('resolve' in message.data) {
                        resolve(message.data.resolve);
                    }
                    else if ('reject' in message.data) {
                        reject(message.data.reject);
                    }
                    else {
                        reject(`invalid message for ${functionName.toString()}`);
                    }
                    onLog(`${caller} receives response for ${functionName.toString()}`, message.data);
                    unsubscribe();
                });
                onLog(`${caller} calls ${functionName.toString()}`, args);
                pubsub.subscribe('connected', (message, unsubscribe) => {
                    if (message.id !== id || message.type !== PubSub_1.MessageType.RESPONSE || message.data.functionName !== functionName) {
                        return;
                    }
                    pubsub.publish(functionName.toString(), {
                        id,
                        type: PubSub_1.MessageType.REQUEST,
                        data: args,
                    });
                    unsubscribe();
                    clearInterval(interval);
                });
                const interval = setInterval(() => {
                    pubsub.publish('connected', {
                        id,
                        type: PubSub_1.MessageType.REQUEST,
                        data: {
                            functionName,
                        },
                    });
                }, 5);
            });
        });
    };
    const handlers = {};
    const setHandler = (functionName, handler) => {
        if (functionName in handlers) {
            throw new Error(`Handler already set for function "${functionName.toString()}". You must remove the handler before setting a new one.`);
        }
        handlers[functionName] = handler;
        const unsubscribe = pubsub.subscribe(functionName.toString(), (message) => __awaiter(void 0, void 0, void 0, function* () {
            if (message.type !== PubSub_1.MessageType.REQUEST) {
                return;
            }
            try {
                onLog(`${caller} responds for ${functionName.toString()}`, message.data);
                const result = yield handler(...message.data);
                pubsub.publish(functionName.toString(), {
                    id: message.id,
                    type: PubSub_1.MessageType.RESPONSE,
                    data: {
                        resolve: result,
                    },
                });
            }
            catch (e) {
                pubsub.publish(functionName.toString(), {
                    id: message.id,
                    type: PubSub_1.MessageType.RESPONSE,
                    data: {
                        reject: e,
                    },
                });
            }
        }));
        pubsub.subscribe('connected', (message) => {
            if (message.type === PubSub_1.MessageType.REQUEST && message.data.functionName === functionName) {
                pubsub.publish('connected', {
                    id: message.id,
                    type: PubSub_1.MessageType.RESPONSE,
                    data: {
                        functionName,
                    },
                });
            }
        });
        return () => {
            delete handlers[functionName];
            unsubscribe();
        };
    };
    const functions = Object.keys(functionNames).reduce((map, functionName) => {
        map[functionName] = createFunction(functionName);
        return map;
    }, {});
    return Object.assign({ setHandler }, functions);
};
exports.createClient = createClient;
