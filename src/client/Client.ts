import { PubSub } from "../pubsub/PubSub";
import { createMessageIdGenerator } from "./MessageIdGenerator";
import { Requests } from "./Requests";

export type HandlerRemover = () => void;

export type Handler<F extends Requests> = (functionName: keyof F, handler: F[typeof functionName]) => HandlerRemover;

/**
 * Type F represents the Requests the client can make.
 * Type H represents the Requests the client has to handle.
 */
export type Client<F extends Requests, H extends Requests> = F & {
  setHandler: <K extends keyof H>(functoinName: K, handler: H[K]) => HandlerRemover;
}

export interface ClientConfig<F extends Requests> {
  caller: string;
  pubsub: PubSub;
  functionNames: {
    [k in keyof F]: true;
  };
}

export const createClient = <F extends Requests, H extends Requests>({ 
  caller, 
  pubsub, 
  functionNames,
}: ClientConfig<F>): Client<F, H> => {
  const generateId = createMessageIdGenerator(caller);
  
  const createFunction = <T extends keyof F>(functionName: T): F[T] => {
    return ((...args: any[]) => {
      const id = generateId();
      return new Promise<any>((resolve, reject) => {
        const unsubscribe = pubsub.subscribe(functionName.toString(), message => {
          if (message.id !== id) {
            return;
          }

          if (message.data.resolve) {
            resolve(message.data.resolve);
          } else if (message.data.reject) {
            reject(message.data.reject);
          } else {
            reject(`invalid message for ${functionName.toString()}`);
          }

          unsubscribe();
        });
        pubsub.publish(functionName.toString(), {
          id,
          data: args,
        })
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
      try {
        console.log(`${caller} calls ${functionName.toString()}`, message.data);
        const result = await (handler as any)(...message.data);
        pubsub.publish(functionName.toString(), {
          id: message.id,
          data: {
            resolve: result,
          },
        });
      } catch (e) {
        pubsub.publish(functionName.toString(), {
          id: message.id,
          data: {
            reject: e,
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