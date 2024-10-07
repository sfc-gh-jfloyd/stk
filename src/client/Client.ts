import { MessageType, PubSub } from "../pubsub/PubSub";
import { createIdGenerator } from "./IdGenerator";
import { Requests } from "./Requests";

export type HandlerRemover = () => void;

export type Handler<F extends Requests> = (functionName: keyof F, handler: F[typeof functionName]) => HandlerRemover;

/**
 * Type F represents the Requests the client can make.
 * Type H represents the Requests the client has to handle.
 */
export type Client<F extends Requests, H extends Requests> = F & {
  setHandler: <K extends keyof H>(functionName: K, handler: H[K]) => HandlerRemover;
}

export interface ClientConfig<F extends Requests> {
  caller: string;
  pubsub: PubSub;
  functionNames: {
    [k in keyof F]: true;
  };
  onLog?: (...args: any[]) => void;
}

export const createClient = <F extends Requests, H extends Requests>({ 
  caller, 
  pubsub, 
  functionNames,
  onLog = () => {},
}: ClientConfig<F>): Client<F, H> => {
  const generateId = createIdGenerator(caller);
  
  const createFunction = <T extends keyof F>(functionName: T): F[T] => {
    return ((...args: any[]) => {
      const id = generateId();
      return new Promise<any>((resolve, reject) => {
        pubsub.subscribe(functionName.toString(), (message, unsubscribe) => {
          if (message.id !== id || message.type !== MessageType.RESPONSE) {
            return;
          }

          if ('resolve' in message.data) {
            resolve(message.data.resolve);
          } else if ('reject' in message.data) {
            reject(message.data.reject);
          } else {
            reject(`invalid message for ${functionName.toString()}`);
          }
          onLog(`${caller} receives response for ${functionName.toString()}`, message.data);
          unsubscribe();
        });

        onLog(`${caller} calls ${functionName.toString()}`, args);

        pubsub.subscribe('connected', (message, unsubscribe) => {
          if (message.id !== id || message.type !== MessageType.RESPONSE || message.data.functionName !== functionName) {
            return;
          }

          pubsub.publish(functionName.toString(), {
            id,
            type: MessageType.REQUEST,
            data: args,
          });
          unsubscribe();
          clearInterval(interval);
        });

        const interval = setInterval(() => {
          pubsub.publish('connected', {
            id,
            type: MessageType.REQUEST,
            data: {
              functionName,
            },
          });
        }, 5);
      });
    }) as any;
  };

  const handlers: { [key in keyof H]?: H[keyof H] } = {};

  const setHandler = <K extends keyof H>(functionName: K, handler: H[K]) => {
    if (functionName in handlers) {
      throw new Error(`Handler already set for function "${functionName.toString()}". You must remove the handler before setting a new one.`);
    }

    handlers[functionName] = handler;
    const unsubscribe = pubsub.subscribe(functionName.toString(), async (message) => {
      if (message.type !== MessageType.REQUEST) {
        return;
      }
      try {
        onLog(`${caller} responds for ${functionName.toString()}`, message.data);
        const result = await (handler as any)(...message.data);
        pubsub.publish(functionName.toString(), {
          id: message.id,
          type: MessageType.RESPONSE,
          data: {
            resolve: result,
          },
        });
      } catch (e) {
        pubsub.publish(functionName.toString(), {
          id: message.id,
          type: MessageType.RESPONSE,
          data: {
            reject: e,
          },
        });
      }
    });

    pubsub.subscribe('connected', (message) => {
      if (message.type === MessageType.REQUEST && message.data.functionName === functionName) {
        pubsub.publish('connected', {
          id: message.id,
          type: MessageType.RESPONSE,
          data: {
            functionName,
          },
        });
      }
    });

    return () => {
      delete handlers[functionName];
      unsubscribe();
    };
  }

  const functions = (Object.keys(functionNames) as (keyof F)[]).reduce((map, functionName) => {
    map[functionName] = createFunction(functionName);
    return map;
  }, {} as F);

  return {
    setHandler,
    ...functions,
  };
};
