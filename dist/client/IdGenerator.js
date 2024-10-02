"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIdGenerator = void 0;
const createIdGenerator = (prefix) => {
    let idCounter = 0;
    return () => {
        const id = prefix + idCounter;
        idCounter = (idCounter + 1) % Number.MAX_SAFE_INTEGER;
        return id;
    };
};
exports.createIdGenerator = createIdGenerator;
