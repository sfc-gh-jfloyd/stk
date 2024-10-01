export interface AppIdManager {
  getAppId: () => Promise<string>;
  setAppId: (id: string) => void; 
}

export const createAppIdManager = (): AppIdManager => {
  let resolve: (value: string) => void | undefined;

  const appIdPromise = new Promise<string>(r => {
    resolve = r;
  });

  return {
    getAppId: () => appIdPromise,
    setAppId: (id: string) => {
      resolve(id)
    },
  };
};