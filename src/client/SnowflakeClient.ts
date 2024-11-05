import { Client, createClient } from "./Client";
import { PubSub } from "../pubsub/PubSub";
import { NativeAppRequests } from "./NativeAppRequests";
import { SnowflakeRequests } from "./SnowflakeRequests";

/**
 * Snowsight client can make requests to Snowsight and must handle requests to Snowlet.
 */
export type SnowflakeClient = Client<SnowflakeRequests, NativeAppRequests>;

export const createSnowflakeClient = (pubsub: PubSub): SnowflakeClient => {
  return createClient<SnowflakeRequests, NativeAppRequests>({
    caller: 'native-app',
    pubsub,
    functionNames: {
      executeQuery: true,
      requestPrivileges: true,
      requestReference: true,
      requestQuery: true,
      setPath: true,
      getAppName: true,
      getSnowsightNativeAppUrl: true,
      getTheme: true,
    },
    onLog: (...args) => console.log(...args),
  })
};
