import { createPubSub } from "./PubSub";

describe('createPubSub', () => {
  it('publishes and subscribes to events', async () => {
    const postMessage = jest.fn();
    const addMessageListener = jest.fn();
    const removeMessageListener = jest.fn();
    const pubsub = createPubSub({
      channelId: 'channel123',
      postMessage,
      addMessageListener,
      removeMessageListener,
    });

    pubsub.publish('event1', { id: '1', data: { text: 'hello world' } });
    expect(postMessage).toHaveBeenCalledWith({
      channelId: 'channel123',
      event: 'event1',
      message: {
        id: '1',
        text: 'hello world',
      },
    });

    const listener = jest.fn();
    const unsubscribe = pubsub.subscribe('event1', listener);
    expect(addEventListener).toHaveBeenCalledWith(expect.any(Function));
    unsubscribe();
    expect(removeEventListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
