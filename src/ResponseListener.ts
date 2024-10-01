export interface MessageData {
  messageId: string;
  response: {
    error: any;
    value: any;
  };
}

export interface ResponseListener {
  set: (messageId: string, resolve: (value: any) => void, reject: (value: any) => void) => void;
  start: () => void;
  stop: () => void;
}

export const createResponseListener = (): ResponseListener => {
  const callTrackingMap: Record<string, any> = {};
  const onMessageEvent = (event: MessageEvent<MessageData>) => {
    const { data } = event;
    if (!data) {
      return;
    }

    const { messageId, response } = data;
    if (!messageId || !response) {
      return;
    }

    const callHandler = callTrackingMap[messageId];
    if (!callHandler) {
      console.error(`No handler found for message ${messageId}`);
      return;
    }

    if (response.error) {
      callTrackingMap[messageId].reject(response.error);
    } else {
      callTrackingMap[messageId].resolve(response.value);
    }

    delete callTrackingMap[messageId];
  };
  
  return {
    set: (messageId, resolve, reject) => {
      callTrackingMap[messageId] = { resolve, reject };
    },
    start: () => {
      window.addEventListener("message", onMessageEvent);
    },
    stop: () => {
      window.removeEventListener("message", onMessageEvent);
    },
  };
};