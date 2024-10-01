"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAppIdManager = void 0;
const createAppIdManager = () => {
    let resolve;
    const appIdPromise = new Promise(r => {
        resolve = r;
    });
    return {
        getAppId: () => appIdPromise,
        setAppId: (id) => {
            resolve(id);
        },
    };
};
exports.createAppIdManager = createAppIdManager;
