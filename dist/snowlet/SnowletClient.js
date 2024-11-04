"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSnowletClient = void 0;
const Client_1 = require("../client/Client");
const createSnowletClient = (pubsub) => {
    return (0, Client_1.createClient)({
        caller: 'snowsight',
        pubsub,
        functionNames: {
            setPath: true,
        },
        onLog: (...args) => console.log(...args),
    });
};
exports.createSnowletClient = createSnowletClient;
