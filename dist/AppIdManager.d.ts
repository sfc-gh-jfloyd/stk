export interface AppIdManager {
    getAppId: () => Promise<string>;
    setAppId: (id: string) => void;
}
export declare const createAppIdManager: () => AppIdManager;
