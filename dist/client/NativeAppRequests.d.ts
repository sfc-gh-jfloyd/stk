import { SnowflakeTheme } from "./Theme";
/**
 * Requests which can be made to a Native App
 */
export interface NativeAppRequests {
    setPath: (path: string) => Promise<void>;
    setTheme: (theme: SnowflakeTheme) => Promise<void>;
}
