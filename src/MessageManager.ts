import { ResponseListener } from "./ResponseListener";

export interface Message {
  functionName: string;
  args: any[];
}

export interface MessageManager {
  sendMessage: (message: Message) => Promise<any>;
}

export const createMessageManager = (appId: string, responseListener: ResponseListener): MessageManager => {
  responseListener.start();
  let messageCount = 0;

  const getUniqueMessageId = () => {
    messageCount += 1;
    return `${appId}.${messageCount}`;
  };

  const send = (message: Message) => {
    window.parent.postMessage(message, "*");
  }

  return {
    sendMessage: (message) => {
      console.log("client", {message});
      return new Promise((resolve, reject) => {
        const messageId = getUniqueMessageId();
        const wrappedMessage = {
          ...message,
          appId,
          messageId,
        };
        responseListener.set(messageId, resolve, reject);
        send(wrappedMessage);
      });
    },
  };
};