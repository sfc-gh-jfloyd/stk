import { createPubSub, MessageType } from "./PubSub";

describe('createPubSub', () => {
  it('publishes and subscribes to events', async () => {
    const postMessage = jest.fn();
    const addMessageListener = jest.fn();
    const removeMessageListener = jest.fn();
    const pubsub = createPubSub({
      channelId: 'channel123',
      pubsubId: 'test',
      postMessage,
      addMessageListener,
      removeMessageListener,
    });

    pubsub.publish('event1', { id: '1', data: { text: 'hello world' }, type: MessageType.REQUEST });
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
  });
});
