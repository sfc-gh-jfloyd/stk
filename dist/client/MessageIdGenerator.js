"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessageIdGenerator = void 0;
const createMessageIdGenerator = (prefix) => {
    let messageId = 0;
    return () => {
        const id = prefix + messageId;
        messageId = (messageId + 1) % Number.MAX_SAFE_INTEGER;
        return id;
    };
};
exports.createMessageIdGenerator = createMessageIdGenerator;
