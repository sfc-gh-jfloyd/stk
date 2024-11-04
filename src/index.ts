import { createPubSub } from "./pubsub/PubSub";
import * as NativeApp from "./client/NativeAppClient";
import * as Snowflake from "./client/SnowflakeClient";

export interface ClientConfig {
  targetOrigin: string;
  targetWindow: Window;
}

export const createNativeAppClient = ({ targetOrigin, targetWindow }: ClientConfig) => (
  NativeApp.createNativeAppClient(
    createPubSub({
      pubsubId: 'native-app',
      targetOrigin,
      targetWindow,
    })
  )
);

const createSnowflakeClient = (): Snowflake.SnowflakeClient => {
   const snowflakeClient = Snowflake.createSnowflakeClient(
    createPubSub({
      pubsubId: 'snowflake',
      targetOrigin: "*",
      targetWindow: window.opener,
    })
  );

  const createPopupHandler = <T extends keyof Snowflake.SnowflakeClient> (functionName: T) => {
    return async (...args: Parameters<Snowflake.SnowflakeClient[T]>) => {
      const snowsightNativeAppURl = await snowflakeClient.getSnowsightNativeAppUrl();
      const sdkUrl = snowsightNativeAppURl + "/sdk";
      const snowsight = window.open(
        sdkUrl,
        '_blank',
        `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=600,left=${window.screenX + window.innerWidth/2 - 400},top=${window.screenY + window.innerHeight / 2 - 300}`,
      );
      const windowSnowletClient = Snowflake.createSnowflakeClient(
        createPubSub({
          pubsubId: 'snowflake',
          targetOrigin: new URL(sdkUrl).origin,
          targetWindow: snowsight!,
        })
      );

      const fn = windowSnowletClient[functionName] as any;
      
      const result = await fn(...args);
      snowsight?.close();
      return result;
    };
  };

  return {
    ...snowflakeClient,
    requestReference: createPopupHandler('requestReference'),
    requestPrivileges: createPopupHandler('requestPrivileges'),
    requestQuery: createPopupHandler('requestQuery'),
    setPath: () => Promise.resolve(),
    setHandler: (name, fn) => {
      if (name === 'setPath') {
        return () => undefined;
      }

      return snowflakeClient.setHandler(name, fn);
    },
  };
};

const createNativeAppIframeClient = () => {
  return Snowflake.createSnowflakeClient(
    createPubSub({
      pubsubId: 'native-app',
      targetOrigin: "*",
      targetWindow: window.parent,
    })
  );
};

export const snowflakeClient: Snowflake.SnowflakeClient = window.opener ? createSnowflakeClient() : createNativeAppIframeClient();

export const getSnowsightClient = () => {
  return snowflakeClient;
};

export { NativeAppClient as SnowletClient } from './client/NativeAppClient';
export { NativeAppRequests } from './client/NativeAppRequests';
export * from './client/SnowflakeClient';
export * from './client/SnowflakeRequests';
