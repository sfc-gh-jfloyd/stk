import { createPubSub, PubSub } from "./PubSub";

export interface SnowsightPubSubConfig {
  channelId: string;
}

/**
 * Create subsub for communicating with Snowsight
 */
export const createSnowsightPubSub = ({ channelId }: SnowsightPubSubConfig): PubSub => {
  return createPubSub({
    channelId,
    pubsubId: 'snowsightPubSub',
    postMessage: message => window.parent.postMessage(message, '*'),
    addMessageListener: listener => window.addEventListener('message', listener),
    removeMessageListener: listener => window.removeEventListener('message', listener),
  });
};
