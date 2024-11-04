"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowflakeClient = void 0;
const Client_1 = require("./Client");
const createSnowflakeClient = (pubsub) => {
    return (0, Client_1.createClient)({
        caller: 'native-app',
        pubsub,
        functionNames: {
            executeQuery: true,
            requestPrivileges: true,
            requestReference: true,
            requestQuery: true,
            setPath: true,
            getAppName: true,
            getSnowsightNativeAppUrl: true,
        },
        onLog: (...args) => console.log(...args),
    });
};
exports.createSnowflakeClient = createSnowflakeClient;
