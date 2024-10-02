export interface Message {
  id: string;
  data: any;
}

export type DeregisterListener = () => void;

export interface PubSub {
  publish: (event: string, message: Message) => void;
  subscribe: (event: string, listener: (message: Message) => void) => DeregisterListener;
}

interface PubSubMessage {
  channelId: string;
  event: string;
  message: Message;
}

export interface PubSubConfig {
  channelId: string;
  postMessage: (message: any) => void;
  addMessageListener: (listener: (message: any) => void) => void;
  removeMessageListener: (listener: (message: any) => void) => void;
}

export const createPubSub = ({ channelId, postMessage, addMessageListener, removeMessageListener }: PubSubConfig): PubSub => {
  return {
    publish: (event, message) => {
      const pubsubMessage: PubSubMessage = {
        channelId,
        event,
        message,
      };

      postMessage(pubsubMessage);
    },
    subscribe: (event, listener) => {
      const wrappedListener  = ({ data: pubsubMessage }: MessageEvent<PubSubMessage>) => {
        // Ignore messages from other channels or events
        if (pubsubMessage.channelId !== channelId || pubsubMessage.event !== event) {
          return;
        }

        listener(pubsubMessage.message);
      };
      addMessageListener(wrappedListener);
      return () => {
        removeMessageListener(wrappedListener);
      };
    },
  };
};
