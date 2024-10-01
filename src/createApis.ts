import { createAppIdManager } from './AppIdManager';
import { createMessageManager } from './MessageManager';
import { createResponseListener } from './ResponseListener';
import { SnowletClient } from './SnowletClient';

export const createApis = () => {
  const { getAppId, setAppId } = createAppIdManager();

  setAppId((window as any).snowletAppId);

  return {
    createClient: async (): Promise<SnowletClient> => {
      const appId = await getAppId();
      console.log("client", { appId });
      const responseListener = createResponseListener();
      const { sendMessage } = createMessageManager(appId, responseListener);

      const createFunction = (functionName: string) => {
        return (...args: any[]) => {
          return sendMessage({
            functionName,
            args,
          });
        };
      }

      return {
        executeQuery: createFunction('executeQuery'),
        requestPrivileges: createFunction('requestPrivileges'),
        requestReference: createFunction('requestReference'),
        setPath: createFunction('setPath'),
        addPathListener: (listener) => {
          window.addEventListener('message', (e) => {
            const { data } = e;
            const { snowletPath } = data;
            listener(snowletPath);
          });
        },
      };
    },
  };
};
