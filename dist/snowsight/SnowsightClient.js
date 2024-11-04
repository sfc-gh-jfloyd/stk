"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowsightClient = void 0;
const Client_1 = require("../client/Client");
const createSnowsightClient = (pubsub) => {
    return (0, Client_1.createClient)({
        caller: 'snowlet',
        pubsub,
        functionNames: {
            executeQuery: true,
            requestPrivileges: true,
            requestReference: true,
            requestQuery: true,
            setPath: true,
            getAppName: true,
            getSdkUrl: true,
        },
        onLog: (...args) => console.log(...args),
    });
};
exports.createSnowsightClient = createSnowsightClient;
