export enum MessageType {
  REQUEST = 'REQUEST',
  RESPONSE = 'RESPONSE',
}

export interface Message {
  id: string;
  data: any;
  type: MessageType;
}

export type DeregisterListener = () => void;

export interface PubSub {
  publish: (event: string, message: Message) => void;
  subscribe: (event: string, listener: (message: Message, unsubscribe: DeregisterListener) => void) => DeregisterListener;
}

export interface PubSubMessage {
  pubsubId: string;
  event: string;
  message: Message;
}

export interface PubSubConfig {
  pubsubId: string;
  targetOrigin: string;
  targetWindow: Window;
}

export const createPubSub = ({ pubsubId, targetOrigin, targetWindow }: PubSubConfig): PubSub => {
  return {
    publish: (event, message) => {
      const pubsubMessage: PubSubMessage = {
        pubsubId,
        event,
        message,
      };

      targetWindow.postMessage(pubsubMessage, targetOrigin);
    },
    subscribe: (event, listener) => {
      let unsubscribe: () => void;
      const wrappedListener  = ({ data: pubsubMessage, origin }: MessageEvent<PubSubMessage>) => {
        // Ignore messages from other origins, events, and messages from this pubsub
        if (pubsubMessage.event !== event || pubsubMessage.pubsubId === pubsubId) {
          return;
        }

        listener(pubsubMessage.message, unsubscribe);
      };
      window.addEventListener('message', wrappedListener);
      unsubscribe = () => {
        window.removeEventListener('message', wrappedListener);
      };
      return unsubscribe;
    },
  };
};
