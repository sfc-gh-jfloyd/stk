import { createIdGenerator } from "../client/IdGenerator";

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
  channelId: string;
  pubsubId: string;
  event: string;
  message: Message;
}

export interface PubSubConfig {
  channelId: string;
  pubsubId: string;
  postMessage: (message: any) => void;
  addMessageListener: (listener: (message: any) => void) => void;
  removeMessageListener: (listener: (message: any) => void) => void;
}

export const createPubSub = ({ channelId, pubsubId, postMessage, addMessageListener, removeMessageListener }: PubSubConfig): PubSub => {
  return {
    publish: (event, message) => {
      // console.log('publish', event, message)
      const pubsubMessage: PubSubMessage = {
        channelId,
        pubsubId,
        event,
        message,
      };

      postMessage(pubsubMessage);
    },
    subscribe: (event, listener) => {
      let unsubscribe: () => void;
      const wrappedListener  = ({ data: pubsubMessage }: MessageEvent<PubSubMessage>) => {
        // Ignore messages from other channels, events, and messages from this pubsub
        if (pubsubMessage.channelId !== channelId || pubsubMessage.event !== event || pubsubMessage.pubsubId === pubsubId) {
          return;
        }

        // console.log('subscribe', pubsubMessage, pubsubId);

        listener(pubsubMessage.message, unsubscribe);
      };
      addMessageListener(wrappedListener);
      unsubscribe = () => {
        removeMessageListener(wrappedListener);
      };
      return unsubscribe;
    },
  };
};
