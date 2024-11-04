import { Client, createClient } from "../client/Client";
import { SnowletRequests } from "./SnowletRequests";
import { SnowsightRequests } from "../snowsight/SnowsightRequests";
import { PubSub } from "../pubsub/PubSub";

/**
 * Snowlet client can make requests to Snowlet and must handle requests to Snowsight.
 */
export type SnowletClient = Client<SnowletRequests, SnowsightRequests>;

export const createSnowletClient = (pubsub: PubSub): SnowletClient => {
  return createClient<SnowletRequests, SnowsightRequests>({
    caller: 'snowsight',
    pubsub,
    functionNames: {
      setPath: true,
    },
    onLog: (...args) => console.log(...args),
  })
};
