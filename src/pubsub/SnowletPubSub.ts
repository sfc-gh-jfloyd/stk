import { createPubSub, PubSub } from "./PubSub";

export interface SnowletPubSub {
  channelId: string;
  iframe: HTMLIFrameElement;
}

/**
 * Create pubsub for communicating with Snowlet
 */
export const createSnowletPubSub = ({ channelId, iframe }: SnowletPubSub): PubSub => {
  return createPubSub({
    channelId,
    pubsubId: 'snowletPubSub',
    postMessage: message => iframe.contentWindow?.postMessage(message, '*'),
    addMessageListener: listener => window.addEventListener('message', listener), 
    removeMessageListener: listener => window.removeEventListener('message', listener),
  });
};