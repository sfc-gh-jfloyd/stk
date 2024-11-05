"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNativeAppClient = void 0;
const Client_1 = require("./Client");
const createNativeAppClient = (pubsub) => {
    return (0, Client_1.createClient)({
        caller: 'snowflake',
        pubsub,
        functionNames: {
            setPath: true,
            setTheme: true,
        },
        onLog: (...args) => console.log(...args),
    });
};
exports.createNativeAppClient = createNativeAppClient;
