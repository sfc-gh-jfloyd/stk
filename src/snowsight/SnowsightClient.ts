import { Client, createClient } from "../client/Client";
import { PubSub } from "../pubsub/PubSub";
import { SnowletRequests } from "../snowlet/SnowletRequests";
import { SnowsightRequests } from "./SnowsightRequests";

/**
 * Snowsight client can make requests to Snowsight and must handle requests to Snowlet.
 */
export type SnowsightClient = Client<SnowsightRequests, SnowletRequests>;

export const createSnowsightClient = (pubsub: PubSub): SnowsightClient => {
  return createClient<SnowsightRequests, SnowletRequests>({
    caller: 'snowlet',
    pubsub,
    functionNames: {
      executeQuery: true,
      requestPrivileges: true,
      requestReference: true,
      setPath: true,
    },
    parent: false,
  })
};
