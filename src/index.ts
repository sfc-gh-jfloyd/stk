import { createPubSub } from "./pubsub/PubSub";
import * as SnowsightClient from "./snowlet/SnowletClient";
import * as SnowletClient from "./snowsight/SnowsightClient";

export interface ClientConfig {
  targetOrigin: string;
  targetWindow: Window;
}

export const createSnowletClient = ({ targetOrigin, targetWindow }: ClientConfig) => (
  SnowsightClient.createSnowletClient(
    createPubSub({
      pubsubId: 'snowsight',
      targetOrigin,
      targetWindow,
    })
  )
);

const createSnowletDevClient = (): SnowletClient.SnowsightClient => {
   const snowsightClient = SnowletClient.createSnowsightClient(
    createPubSub({
      pubsubId: 'snowlet',
      targetOrigin: "*",
      targetWindow: window.opener,
    })
  );

  const createPopupHandler = <T extends keyof SnowletClient.SnowsightClient> (functionName: T) => {
    return async (...args: Parameters<SnowletClient.SnowsightClient[T]>) => {
      const sdkUrl = await snowsightClient.getSdkUrl();
      const snowsight = window.open(
        sdkUrl,
        '_blank',
        `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=800,height=600,left=${window.screenX + window.innerWidth/2 - 400},top=${window.screenY + window.innerHeight / 2 - 300}`,
      );
      const windowSnowletClient = SnowletClient.createSnowsightClient(
        createPubSub({
          pubsubId: 'snowlet',
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
    ...snowsightClient,
    requestReference: createPopupHandler('requestReference'),
    requestPrivileges: createPopupHandler('requestPrivileges'),
    requestQuery: createPopupHandler('requestQuery'),
    setPath: () => Promise.resolve(),
    setHandler: (name, fn) => {
      if (name === 'setPath') {
        return () => undefined;
      }

      return snowsightClient.setHandler(name, fn);
    },
  };
};

const createSnowletIframeClient = () => {
  return SnowletClient.createSnowsightClient(
    createPubSub({
      pubsubId: 'snowlet',
      targetOrigin: "*",
      targetWindow: window.parent,
    })
  );
};

export const snowsightClient: SnowletClient.SnowsightClient = window.opener ? createSnowletDevClient() : createSnowletIframeClient();

export const getSnowsightClient = () => {
  return snowsightClient;
};

export { SnowletClient } from './snowlet/SnowletClient';
export { SnowletRequests } from './snowlet/SnowletRequests';
export * from './snowsight/SnowsightClient';
export * from './snowsight/SnowsightRequests';
