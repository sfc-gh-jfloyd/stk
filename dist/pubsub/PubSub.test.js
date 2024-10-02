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
const PubSub_1 = require("./PubSub");
describe('createPubSub', () => {
    it('publishes and subscribes to events', () => __awaiter(void 0, void 0, void 0, function* () {
        const postMessage = jest.fn();
        const addMessageListener = jest.fn();
        const removeMessageListener = jest.fn();
        const pubsub = (0, PubSub_1.createPubSub)({
            channelId: 'channel123',
            pubsubId: 'test',
            postMessage,
            addMessageListener,
            removeMessageListener,
        });
        pubsub.publish('event1', { id: '1', data: { text: 'hello world' }, type: PubSub_1.MessageType.REQUEST });
        expect(postMessage).toHaveBeenCalledWith({
            channelId: 'channel123',
            event: 'event1',
            pubsubId: 'test',
            message: {
                id: '1',
                data: {
                    text: 'hello world',
                },
            },
        });
        const listener = jest.fn();
        const unsubscribe = pubsub.subscribe('event1', listener);
        expect(addMessageListener).toHaveBeenCalledWith(expect.any(Function));
        unsubscribe();
        expect(removeMessageListener).toHaveBeenCalledWith(expect.any(Function));
    }));
});
