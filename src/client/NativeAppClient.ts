import { Client, createClient } from "./Client";
import { NativeAppRequests } from "./NativeAppRequests";
import { SnowflakeRequests } from "./SnowflakeRequests";
import { PubSub } from "../pubsub/PubSub";

/**
 * Native app client can make requests to the native app and must handle requests from Snowflake.
 */
export type NativeAppClient = Client<NativeAppRequests, SnowflakeRequests>;

export const createNativeAppClient = (pubsub: PubSub): NativeAppClient => {
  return createClient<NativeAppRequests, SnowflakeRequests>({
    caller: 'snowflake',
    pubsub,
    functionNames: {
      setPath: true,
    },
    onLog: (...args) => console.log(...args),
  })
};
