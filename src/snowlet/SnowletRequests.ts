/**
 * Requests which can be made to a Snowlet
 */
export interface SnowletRequests {
  setPath: (path: string) => Promise<void>;
}
